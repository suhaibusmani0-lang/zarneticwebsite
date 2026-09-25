import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Client } from '@/models/Client'
import { Activity } from '@/models/Activity'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''
    const clientType = searchParams.get('type') || ''
    const filter = searchParams.get('filter') || ''

    const query: Record<string, any> = {}

    if (clientType === 'reseller') {
      query.clientType = 'reseller'
    } else if (clientType === 'custom') {
      query.clientType = { $in: ['custom', null, undefined] }
    }

    if (status && status !== 'all') {
      query.status = status
    }

    if (filter === 'renewals') {
      const now = new Date()
      const in30Days = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      query.$or = [
        { domainExpiryDate: { $lte: in30Days } },
        { hostingExpiryDate: { $lte: in30Days } },
        { amcExpiryDate: { $lte: in30Days } },
        { 'services.expiryDate': { $lte: in30Days } },
      ]
    }

    if (search) {
      const searchConditions = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { domainName: { $regex: search, $options: 'i' } },
      ]
      if (query.$or) {
        query.$and = [{ $or: query.$or }, { $or: searchConditions }]
        delete query.$or
      } else {
        query.$or = searchConditions
      }
    }

    const clients = await Client.find(query).sort({ updatedAt: -1 }).limit(200)

    return NextResponse.json({
      success: true,
      clients,
      total: clients.length,
    })
  } catch (error: any) {
    console.error('Fetch clients error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch clients' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const {
      name,
      email,
      phone,
      whatsapp,
      company,
      address,
      gstNumber,
      clientType = 'custom',
      dob,
      domainName,
      domainExpiryDate,
      hostingExpiryDate,
      amcExpiryDate,
      amcAmount = 0,
      sslExpiryDate,
      services,
      notes,
      logoUrl,
      status = 'active',
      totalSpent = 0,
    } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and Email are required' }, { status: 400 })
    }

    const existing = await Client.findOne({ email: email.toLowerCase().trim() })
    if (existing) {
      return NextResponse.json(
        { error: 'A client with this email already exists' },
        { status: 400 }
      )
    }

    const client = await Client.create({
      name,
      email: email.toLowerCase().trim(),
      phone,
      whatsapp: whatsapp || phone,
      company,
      address,
      gstNumber,
      clientType,
      dob: dob ? new Date(dob) : undefined,
      domainName,
      domainExpiryDate: domainExpiryDate ? new Date(domainExpiryDate) : undefined,
      hostingExpiryDate: hostingExpiryDate ? new Date(hostingExpiryDate) : undefined,
      amcExpiryDate: amcExpiryDate ? new Date(amcExpiryDate) : undefined,
      amcAmount: Number(amcAmount) || 0,
      sslExpiryDate: sslExpiryDate ? new Date(sslExpiryDate) : undefined,
      services: services || [],
      notes,
      logoUrl,
      status,
      totalSpent: Number(totalSpent) || 0,
    })

    await Activity.create({
      action: 'Client Created',
      description: `New ${clientType} client added: ${name} (${company || 'Individual'})`,
      entityType: 'client',
      entityId: String(client._id),
      user: 'Admin',
    })

    return NextResponse.json({ success: true, client }, { status: 201 })
  } catch (error: any) {
    console.error('Create client error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to create client' },
      { status: 500 }
    )
  }
}
