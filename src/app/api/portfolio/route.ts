import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Portfolio } from '@/models/Portfolio'
import { Activity } from '@/models/Activity'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    const query: Record<string, any> = {}
    if (category && category !== 'all') {
      query.category = { $regex: category, $options: 'i' }
    }
    if (featured === 'true') {
      query.featured = true
    }

    const items = await Portfolio.find(query).sort({ order: 1, createdAt: -1 })
    return NextResponse.json({ success: true, items })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch portfolio projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const {
      title,
      slug,
      clientName,
      category,
      brief,
      logoUrl,
      bannerUrl,
      url,
      challenge,
      solution,
      results,
      techStack,
      timeline,
      testimonial,
      isPremium = true,
      featured = false,
      order = 0,
    } = body

    if (!title || !clientName || !category || !brief) {
      return NextResponse.json(
        { error: 'Title, Client Name, Category, and Brief are required' },
        { status: 400 }
      )
    }

    const finalSlug = (slug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    const existing = await Portfolio.findOne({ slug: finalSlug })
    if (existing) {
      return NextResponse.json(
        { error: `A portfolio project with slug "${finalSlug}" already exists` },
        { status: 400 }
      )
    }

    const project = await Portfolio.create({
      title,
      slug: finalSlug,
      clientName,
      category,
      brief,
      logoUrl,
      bannerUrl,
      url,
      challenge,
      solution,
      results: Array.isArray(results) ? results : (results ? [results] : []),
      techStack: Array.isArray(techStack) ? techStack : (techStack ? techStack.split(',').map((s: string) => s.trim()) : []),
      timeline,
      testimonial,
      isPremium,
      featured,
      order: Number(order) || 0,
    })

    await Activity.create({
      action: 'Portfolio Added',
      description: `New project added: ${title} (${clientName})`,
      entityType: 'portfolio',
      entityId: String(project._id),
      user: 'Admin',
    })

    return NextResponse.json({ success: true, project }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to create portfolio item' },
      { status: 500 }
    )
  }
}
