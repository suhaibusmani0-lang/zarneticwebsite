import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Client } from '@/models/Client'
import { Activity } from '@/models/Activity'

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await context.params
    const client = await Client.findById(id)

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, client })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch client' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await context.params
    const body = await request.json()

    const client = await Client.findByIdAndUpdate(id, body, { new: true })
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    await Activity.create({
      action: 'Client Updated',
      description: `Client profile for "${client.name}" was updated`,
      entityType: 'client',
      entityId: String(id),
      user: 'Admin',
    })

    return NextResponse.json({ success: true, client })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to update client' },
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
    const client = await Client.findByIdAndDelete(id)
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    await Activity.create({
      action: 'Client Deleted',
      description: `Client profile for "${client.name}" was deleted`,
      entityType: 'client',
      entityId: String(id),
      user: 'Admin',
    })

    return NextResponse.json({ success: true, message: 'Client deleted' })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to delete client' },
      { status: 500 }
    )
  }
}
