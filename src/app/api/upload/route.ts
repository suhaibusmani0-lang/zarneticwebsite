import { NextRequest, NextResponse } from 'next/server'
import { uploadToCloudinary } from '@/lib/cloudinary'
import { connectDB } from '@/lib/db'
import { Client } from '@/models/Client'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const clientId = formData.get('clientId') as string | null
    const title = formData.get('title') as string | null
    const folder = (formData.get('folder') as string) || 'zarnetic_crm'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const isImage = file.type.startsWith('image/')
    const result = await uploadToCloudinary(
      buffer,
      folder,
      isImage ? 'image' : 'raw'
    )

    if (clientId) {
      await connectDB()
      await Client.findByIdAndUpdate(clientId, {
        $push: {
          documents: {
            title: title || file.name,
            url: result.url,
            publicId: result.public_id,
            uploadedAt: new Date(),
            fileType: file.type,
          },
        },
      })
    }

    return NextResponse.json({
      success: true,
      url: result.url,
      publicId: result.public_id,
      format: result.format,
      fileName: file.name,
    })
  } catch (error: any) {
    console.error('Cloudinary upload error:', error)
    return NextResponse.json(
      { error: error?.message || 'File upload failed' },
      { status: 500 }
    )
  }
}
