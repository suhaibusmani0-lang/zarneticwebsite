import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IActivity extends Document {
  action: string
  description: string
  entityType: 'lead' | 'client' | 'order' | 'portfolio' | 'system'
  entityId?: string
  user: string
  metadata?: Record<string, any>
  createdAt: Date
}

const ActivitySchema = new Schema<IActivity>(
  {
    action: { type: String, required: true },
    description: { type: String, required: true },
    entityType: {
      type: String,
      enum: ['lead', 'client', 'order', 'portfolio', 'system'],
      default: 'system',
    },
    entityId: { type: String },
    user: { type: String, default: 'Admin' },
    metadata: { type: Schema.Types.Mixed },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
)

export const Activity: Model<IActivity> =
  mongoose.models.Activity || mongoose.model<IActivity>('Activity', ActivitySchema)
