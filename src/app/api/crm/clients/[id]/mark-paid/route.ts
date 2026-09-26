import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Client } from '@/models/Client'
import { Activity } from '@/models/Activity'

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await context.params
    const body = await request.json().catch(() => ({}))

    const client = await Client.findById(id)
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    const cycle = body.billingCycle || client.billingCycle || 'yearly'

    // Calculate next billing date
    const baseDate = client.nextBillingDate && new Date(client.nextBillingDate) > new Date()
      ? new Date(client.nextBillingDate)
      : new Date()

    const newNextDate = new Date(baseDate)

    switch (cycle) {
      case 'monthly':
        newNextDate.setMonth(newNextDate.getMonth() + 1)
        break
      case 'quarterly':
        newNextDate.setMonth(newNextDate.getMonth() + 3)
        break
      case 'half_yearly':
        newNextDate.setMonth(newNextDate.getMonth() + 6)
        break
      case 'yearly':
      default:
        newNextDate.setFullYear(newNextDate.getFullYear() + 1)
        break
    }

    // Also update individual service expiries if they were expired or near expiry
    const updateExpiry = (oldDate?: Date): Date | undefined => {
      if (!oldDate) return undefined
      const base = new Date(oldDate) > new Date() ? new Date(oldDate) : new Date()
      const updated = new Date(base)
      switch (cycle) {
        case 'monthly':
          updated.setMonth(updated.getMonth() + 1)
          break
        case 'quarterly':
          updated.setMonth(updated.getMonth() + 3)
          break
        case 'half_yearly':
          updated.setMonth(updated.getMonth() + 6)
          break
        case 'yearly':
        default:
          updated.setFullYear(updated.getFullYear() + 1)
          break
      }
      return updated
    }

    if (client.domainExpiryDate) {
      client.domainExpiryDate = updateExpiry(client.domainExpiryDate)
    }
    if (client.hostingExpiryDate) {
      client.hostingExpiryDate = updateExpiry(client.hostingExpiryDate)
    }
    if (client.amcExpiryDate) {
      client.amcExpiryDate = updateExpiry(client.amcExpiryDate)
    }

    client.billingCycle = cycle
    client.nextBillingDate = newNextDate
    client.paymentStatus = 'paid'
    client.lastPaymentDate = new Date()

    if (body.paidAmount && typeof body.paidAmount === 'number') {
      client.totalSpent = (client.totalSpent || 0) + body.paidAmount
    }
    if (body.invoiceNumber) {
      client.lastInvoiceNumber = body.invoiceNumber
    }

    await client.save()

    const cycleLabel =
      cycle === 'monthly'
        ? '1 Month'
        : cycle === 'quarterly'
        ? '3 Months'
        : cycle === 'half_yearly'
        ? '6 Months'
        : '1 Year'

    await Activity.create({
      action: 'Payment Received & Renewed',
      description: `Marked as paid for "${client.name}" (${cycleLabel}). Next renewal date updated to ${newNextDate.toLocaleDateString('en-IN')}`,
      entityType: 'client',
      entityId: String(id),
      user: 'Admin',
    })

    return NextResponse.json({
      success: true,
      client,
      newNextDate,
      message: `Payment recorded! Next billing date updated to ${newNextDate.toLocaleDateString('en-IN')}`,
    })
  } catch (error: any) {
    console.error('Mark paid error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to update payment' },
      { status: 500 }
    )
  }
}
