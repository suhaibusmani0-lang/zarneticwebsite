import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'tlqdif3h',
  api_key: process.env.CLOUDINARY_API_KEY || '993538721635369',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'P3-T9vCvmpC84VB3u9IPtAeOxGM',
  secure: true,
})

export async function uploadToCloudinary(
  fileBuffer: Buffer | string,
  folder: string = 'zarnetic_crm',
  resourceType: 'auto' | 'image' | 'raw' = 'auto'
): Promise<{ url: string; public_id: string; format?: string; bytes?: number }> {
  return new Promise((resolve, reject) => {
    if (typeof fileBuffer === 'string' && fileBuffer.startsWith('http')) {
      cloudinary.uploader.upload(
        fileBuffer,
        { folder, resource_type: resourceType },
        (error, result) => {
          if (error || !result) return reject(error || new Error('Upload failed'))
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            bytes: result.bytes,
          })
        }
      )
      return
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (error || !result) return reject(error || new Error('Upload stream failed'))
        resolve({
          url: result.secure_url,
          public_id: result.public_id,
          format: result.format,
          bytes: result.bytes,
        })
      }
    )

    if (Buffer.isBuffer(fileBuffer)) {
      uploadStream.end(fileBuffer)
    } else {
      const buf = Buffer.from(fileBuffer, 'base64')
      uploadStream.end(buf)
    }
  })
}

export default cloudinary
