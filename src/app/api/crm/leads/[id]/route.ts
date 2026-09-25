import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Lead } from '@/models/Lead'
import { Activity } from '@/models/Activity'

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await context.params
    const body = await request.json()

    const oldLead = await Lead.findById(id)
    if (!oldLead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    const updatedLead = await Lead.findByIdAndUpdate(id, body, { new: true })

    if (body.status && body.status !== oldLead.status) {
      await Activity.create({
        action: 'Stage Changed',
        description: `Lead "${oldLead.name}" moved from [${oldLead.status}] to [${body.status}]`,
        entityType: 'lead',
        entityId: String(id),
        user: 'Admin',
      })
    }

    return NextResponse.json({ success: true, lead: updatedLead })
  } catch (error: any) {
    console.error('Update lead error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to update lead' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await context.params
    const lead = await Lead.findByIdAndDelete(id)
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    await Activity.create({
      action: 'Lead Deleted',
      description: `Lead "${lead.name}" was removed`,
      entityType: 'lead',
      entityId: String(id),
      user: 'Admin',
    })

    return NextResponse.json({ success: true, message: 'Lead deleted successfully' })
  } catch (error: any) {
    console.error('Delete lead error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to delete lead' },
      { status: 500 }
    )
  }
}
