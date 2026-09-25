import { NextResponse } from 'next/server'
import { generateSampleExcelBuffer } from '@/lib/excelParser'

export async function GET() {
  try {
    const buffer = generateSampleExcelBuffer()

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="zarnetic_sample_leads_template.xlsx"',
      },
    })
  } catch (error: any) {
    console.error('Sample excel generation error:', error)
    return NextResponse.json({ error: 'Failed to generate template' }, { status: 500 })
  }
}
