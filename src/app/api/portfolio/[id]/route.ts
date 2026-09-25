import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Portfolio } from '@/models/Portfolio'
import { Activity } from '@/models/Activity'

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await context.params
    const project = await Portfolio.findById(id)
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, project })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Error fetching project' }, { status: 500 })
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

    if (body.techStack && typeof body.techStack === 'string') {
      body.techStack = body.techStack.split(',').map((s: string) => s.trim())
    }
    if (body.results && typeof body.results === 'string') {
      body.results = body.results.split('\n').map((s: string) => s.trim()).filter(Boolean)
    }

    const project = await Portfolio.findByIdAndUpdate(id, body, { new: true })
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    await Activity.create({
      action: 'Portfolio Updated',
      description: `Project updated: ${project.title}`,
      entityType: 'portfolio',
      entityId: String(id),
      user: 'Admin',
    })

    return NextResponse.json({ success: true, project })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Error updating project' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await context.params
    const project = await Portfolio.findByIdAndDelete(id)
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    await Activity.create({
      action: 'Portfolio Deleted',
      description: `Project deleted: ${project.title}`,
      entityType: 'portfolio',
      entityId: String(id),
      user: 'Admin',
    })

    return NextResponse.json({ success: true, message: 'Project deleted' })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Error deleting project' }, { status: 500 })
  }
}
