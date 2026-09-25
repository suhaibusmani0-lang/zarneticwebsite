import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Client } from '@/models/Client'

export async function GET() {
  try {
    await connectDB()
    const clients = await Client.find().lean()

    const now = new Date()
    const thirtyDaysAhead = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

    const domainRenewals: any[] = []
    const hostingRenewals: any[] = []
    const amcRenewals: any[] = []
    const upcomingBirthdays: any[] = []

    for (const c of clients) {
      // 1. Domain Expiry
      if (c.domainExpiryDate) {
        const exp = new Date(c.domainExpiryDate)
        const daysLeft = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        if (daysLeft <= 30) {
          domainRenewals.push({
            clientId: c._id,
            clientName: c.name,
            company: c.company,
            phone: c.phone || c.whatsapp,
            email: c.email,
            item: c.domainName || 'Primary Domain',
            type: 'Domain',
            expiryDate: exp,
            daysLeft,
            status: daysLeft < 0 ? 'expired' : daysLeft <= 7 ? 'critical' : 'upcoming',
          })
        }
      }

      // 2. Hosting Expiry
      if (c.hostingExpiryDate) {
        const exp = new Date(c.hostingExpiryDate)
        const daysLeft = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        if (daysLeft <= 30) {
          hostingRenewals.push({
            clientId: c._id,
            clientName: c.name,
            company: c.company,
            phone: c.phone || c.whatsapp,
            email: c.email,
            item: `${c.domainName || c.company || 'Cloud'} Hosting`,
            type: 'Hosting',
            expiryDate: exp,
            daysLeft,
            status: daysLeft < 0 ? 'expired' : daysLeft <= 7 ? 'critical' : 'upcoming',
          })
        }
      }

      // 3. AMC Expiry
      if (c.amcExpiryDate) {
        const exp = new Date(c.amcExpiryDate)
        const daysLeft = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        if (daysLeft <= 45) {
          amcRenewals.push({
            clientId: c._id,
            clientName: c.name,
            company: c.company,
            phone: c.phone || c.whatsapp,
            email: c.email,
            item: `Annual AMC Contract (₹${c.amcAmount || 0})`,
            type: 'AMC',
            amount: c.amcAmount || 0,
            expiryDate: exp,
            daysLeft,
            status: daysLeft < 0 ? 'expired' : daysLeft <= 7 ? 'critical' : 'upcoming',
          })
        }
      }

      // Also check client.services array for any other services
      if (Array.isArray(c.services)) {
        for (const s of c.services) {
          if (s.expiryDate) {
            const exp = new Date(s.expiryDate)
            const daysLeft = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
            if (daysLeft <= 30) {
              const listToPush = s.type === 'domain' ? domainRenewals : s.type === 'hosting' ? hostingRenewals : amcRenewals
              // only push if not already included
              if (!listToPush.some((item) => String(item.clientId) === String(c._id) && item.item === s.name)) {
                listToPush.push({
                  clientId: c._id,
                  clientName: c.name,
                  company: c.company,
                  phone: c.phone || c.whatsapp,
                  email: c.email,
                  item: s.name,
                  type: s.type.toUpperCase(),
                  expiryDate: exp,
                  daysLeft,
                  status: daysLeft < 0 ? 'expired' : daysLeft <= 7 ? 'critical' : 'upcoming',
                })
              }
            }
          }
        }
      }

      // 4. Birthday check
      if (c.dob) {
        const dob = new Date(c.dob)
        const currentYear = now.getFullYear()
        // Birthday in current year
        const bdayThisYear = new Date(currentYear, dob.getMonth(), dob.getDate())
        const daysToBday = Math.ceil((bdayThisYear.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

        // Check if today or within next 30 days
        if (daysToBday >= 0 && daysToBday <= 30) {
          upcomingBirthdays.push({
            clientId: c._id,
            clientName: c.name,
            company: c.company,
            phone: c.phone || c.whatsapp,
            email: c.email,
            dob,
            isToday: daysToBday === 0,
            daysLeft: daysToBday,
          })
        }
      }
    }

    // Sort by most urgent
    domainRenewals.sort((a, b) => a.daysLeft - b.daysLeft)
    hostingRenewals.sort((a, b) => a.daysLeft - b.daysLeft)
    amcRenewals.sort((a, b) => a.daysLeft - b.daysLeft)
    upcomingBirthdays.sort((a, b) => a.daysLeft - b.daysLeft)

    return NextResponse.json({
      success: true,
      stats: {
        domainRenewalsCount: domainRenewals.length,
        hostingRenewalsCount: hostingRenewals.length,
        amcRenewalsCount: amcRenewals.length,
        birthdaysCount: upcomingBirthdays.length,
      },
      domainRenewals,
      hostingRenewals,
      amcRenewals,
      upcomingBirthdays,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch renewals' },
      { status: 500 }
    )
  }
}
