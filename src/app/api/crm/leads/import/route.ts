import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Lead } from '@/models/Lead'
import { Activity } from '@/models/Activity'
import { parseLeadsFromExcelBuffer } from '@/lib/excelParser'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { totalRows, validLeads, errors } = parseLeadsFromExcelBuffer(buffer)

    if (validLeads.length === 0) {
      return NextResponse.json(
        { error: 'No valid leads found in file. Please check column headers.', errors },
        { status: 400 }
      )
    }

    const batchId = 'BATCH-' + Date.now()

    const docsToInsert = validLeads.map((l) => ({
      ...l,
      source: `Excel Import (${file.name})`,
      importedBatchId: batchId,
      status: 'New',
    }))

    const inserted = await Lead.insertMany(docsToInsert, { ordered: false }).catch((err: any) => {
      return err.insertedDocs || []
    })

    const count = Array.isArray(inserted) ? inserted.length : validLeads.length

    await Activity.create({
      action: 'Excel Leads Imported',
      description: `Imported ${count} new leads from file "${file.name}" (Batch ${batchId})`,
      entityType: 'lead',
      user: 'Admin',
      metadata: { fileName: file.name, totalRows, importedCount: count, errorsCount: errors.length },
    })

    return NextResponse.json({
      success: true,
      message: `Successfully imported ${count} leads out of ${totalRows} rows!`,
      importedCount: count,
      totalRows,
      errors,
      batchId,
    })
  } catch (error: any) {
    console.error('Excel import error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to process Excel file' },
      { status: 500 }
    )
  }
}
