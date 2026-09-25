import mongoose, { Schema, Document, Model } from 'mongoose'

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Proposal Sent'
  | 'Negotiation'
  | 'Converted'
  | 'Lost'

export interface ILead extends Document {
  name: string
  email: string
  phone?: string
  company?: string
  serviceInterested?: string
  budget?: string
  status: LeadStatus
  source: string
  notes?: string
  tags?: string[]
  assignedTo?: string
  convertedClientId?: mongoose.Types.ObjectId
  importedBatchId?: string
  createdAt: Date
  updatedAt: Date
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    serviceInterested: { type: String, default: 'Web Development & Hosting' },
    budget: { type: String },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Converted', 'Lost'],
      default: 'New',
      index: true,
    },
    source: { type: String, default: 'Direct Website', index: true },
    notes: { type: String },
    tags: [{ type: String }],
    assignedTo: { type: String, default: 'Admin' },
    convertedClientId: { type: Schema.Types.ObjectId, ref: 'Client' },
    importedBatchId: { type: String },
  },
  {
    timestamps: true,
  }
)

export const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema)
