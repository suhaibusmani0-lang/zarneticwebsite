import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Lead } from '@/models/Lead'
import { Activity } from '@/models/Activity'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''

    const query: Record<string, any> = {}

    if (status && status !== 'all') {
      query.status = status
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ]
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 }).limit(200)

    const statusCounts = await Lead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ])

    const countsMap: Record<string, number> = {
      New: 0,
      Contacted: 0,
      Qualified: 0,
      'Proposal Sent': 0,
      Negotiation: 0,
      Converted: 0,
      Lost: 0,
    }

    statusCounts.forEach((sc) => {
      if (sc._id) countsMap[sc._id] = sc.count
    })

    return NextResponse.json({
      success: true,
      leads,
      total: leads.length,
      counts: countsMap,
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error?.message || 'Database not connected',
      leads: [],
      total: 0,
      counts: {},
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const { name, email, phone, company, serviceInterested, budget, notes, source } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and Email are required' }, { status: 400 })
    }

    const lead = await Lead.create({
      name,
      email: email.toLowerCase().trim(),
      phone,
      company,
      serviceInterested,
      budget,
      notes,
      source: source || 'Manual Entry',
      status: 'New',
    })

    await Activity.create({
      action: 'Lead Created',
      description: `New lead added: ${name} (${company || 'Individual'})`,
      entityType: 'lead',
      entityId: String(lead._id),
      user: 'Admin',
    })

    return NextResponse.json({ success: true, lead }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to create lead' },
      { status: 500 }
    )
  }
}
