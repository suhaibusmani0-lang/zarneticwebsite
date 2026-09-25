import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Lead } from '@/models/Lead'
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

    const lead = await Lead.findById(id)
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    if (lead.status === 'Converted' && lead.convertedClientId) {
      const existingClient = await Client.findById(lead.convertedClientId)
      if (existingClient) {
        return NextResponse.json({
          success: true,
          message: 'Lead is already converted to client',
          client: existingClient,
        })
      }
    }

    let client = await Client.findOne({ email: lead.email })
    if (!client) {
      client = await Client.create({
        name: body.name || lead.name,
        email: lead.email,
        phone: body.phone || lead.phone,
        company: body.company || lead.company,
        address: body.address || '',
        gstNumber: body.gstNumber || '',
        status: 'active',
        notes: `Converted from Lead on ${new Date().toLocaleDateString()}. Initial Notes: ${lead.notes || 'None'}`,
        convertedFromLeadId: lead._id,
        services: lead.serviceInterested
          ? [
              {
                name: lead.serviceInterested,
                type: 'web_development',
                details: `Service requirement: ${lead.serviceInterested} (Budget: ${lead.budget || 'Custom'})`,
                status: 'active',
                startDate: new Date(),
              },
            ]
          : [],
      })
    }

    lead.status = 'Converted'
    lead.convertedClientId = client._id as any
    await lead.save()

    await Activity.create({
      action: 'Lead Converted',
      description: `Lead "${lead.name}" successfully converted to official Client "${client.name}"!`,
      entityType: 'client',
      entityId: String(client._id),
      user: 'Admin',
    })

    return NextResponse.json({
      success: true,
      message: `Lead ${lead.name} has been converted into client successfully!`,
      client,
      lead,
    })
  } catch (error: any) {
    console.error('Lead conversion error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to convert lead to client' },
      { status: 500 }
    )
  }
}
