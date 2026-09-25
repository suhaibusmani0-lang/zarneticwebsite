import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IClientDocument {
  title: string
  url: string
  publicId?: string
  uploadedAt: Date
  fileType?: string
}

export interface IClientService {
  name: string
  type: 'domain' | 'hosting' | 'web_development' | 'seo' | 'maintenance' | 'amc' | 'other'
  details?: string
  status: 'active' | 'pending' | 'expired' | 'suspended'
  startDate?: Date
  expiryDate?: Date
  price?: number
  resellerClubOrderId?: string
}

export interface IClient extends Document {
  name: string
  email: string
  phone?: string
  whatsapp?: string
  company?: string
  avatarUrl?: string
  logoUrl?: string
  address?: string
  gstNumber?: string
  clientType: 'reseller' | 'custom'
  dob?: Date
  domainName?: string
  domainExpiryDate?: Date
  hostingExpiryDate?: Date
  amcExpiryDate?: Date
  amcAmount?: number
  sslExpiryDate?: Date
  status: 'active' | 'inactive' | 'pending'
  services: IClientService[]
  documents: IClientDocument[]
  notes?: string
  convertedFromLeadId?: mongoose.Types.ObjectId
  totalSpent: number
  createdAt: Date
  updatedAt: Date
}

const ClientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    whatsapp: { type: String, trim: true },
    company: { type: String, trim: true },
    avatarUrl: { type: String },
    logoUrl: { type: String },
    address: { type: String },
    gstNumber: { type: String },
    clientType: {
      type: String,
      enum: ['reseller', 'custom'],
      default: 'custom',
      index: true,
    },
    dob: { type: Date },
    domainName: { type: String, trim: true },
    domainExpiryDate: { type: Date },
    hostingExpiryDate: { type: Date },
    amcExpiryDate: { type: Date },
    amcAmount: { type: Number, default: 0 },
    sslExpiryDate: { type: Date },
    status: {
      type: String,
      enum: ['active', 'inactive', 'pending'],
      default: 'active',
      index: true,
    },
    services: [
      {
        name: { type: String, required: true },
        type: {
          type: String,
          enum: ['domain', 'hosting', 'web_development', 'seo', 'maintenance', 'amc', 'other'],
          required: true,
        },
        details: { type: String },
        status: {
          type: String,
          enum: ['active', 'pending', 'expired', 'suspended'],
          default: 'active',
        },
        startDate: { type: Date, default: Date.now },
        expiryDate: { type: Date },
        price: { type: Number },
        resellerClubOrderId: { type: String },
      },
    ],
    documents: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true },
        publicId: { type: String },
        uploadedAt: { type: Date, default: Date.now },
        fileType: { type: String },
      },
    ],
    notes: { type: String },
    convertedFromLeadId: { type: Schema.Types.ObjectId, ref: 'Lead' },
    totalSpent: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
)

export const Client: Model<IClient> =
  mongoose.models.Client || mongoose.model<IClient>('Client', ClientSchema)
