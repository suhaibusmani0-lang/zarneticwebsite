import { NextRequest, NextResponse } from 'next/server'
import { resellerClub } from '@/lib/resellerclub'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const domain = searchParams.get('domain')
    const tldsParam = searchParams.get('tlds')

    if (!domain) {
      return NextResponse.json({ error: 'Domain query parameter is required' }, { status: 400 })
    }

    const tlds = tldsParam
      ? tldsParam.split(',').map((t) => t.trim().replace(/^\./, ''))
      : ['com', 'in', 'net', 'org', 'co', 'io', 'ai', 'online', 'tech']

    const results = await resellerClub.checkDomainAvailability(domain, tlds)
    const suggestions = await resellerClub.getDomainSuggestions(domain)

    return NextResponse.json({
      success: true,
      query: domain,
      results,
      suggestions,
      isConfigured: resellerClub.isConfigured(),
    })
  } catch (error: any) {
    console.error('Domain check error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to check domain availability' },
      { status: 500 }
    )
  }
}
