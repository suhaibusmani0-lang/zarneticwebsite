import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

// Disable buffering so failed connections fail immediately instead of hanging
mongoose.set('bufferCommands', false)

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null }

if (!global.mongooseCache) {
  global.mongooseCache = cached
}

export async function connectDB() {
  if (!MONGODB_URI || MONGODB_URI.includes('<db_password>')) {
    throw new Error(
      'MongoDB password is not set! Please replace <db_password> in .env.local with your MongoDB Atlas password.'
    )
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      console.log('✅ Connected to MongoDB Atlas!')
      return m
    }).catch((err) => {
      console.error('❌ MongoDB Connection Error:', err.message)
      cached.promise = null
      throw new Error(`MongoDB connection failed: ${err.message}`)
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}
