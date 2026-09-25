import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IOrder extends Document {
  orderNumber: string
  clientId?: mongoose.Types.ObjectId
  clientName: string
  clientEmail: string
  clientPhone?: string
  type: 'domain' | 'hosting' | 'combo' | 'web_project'
  itemName: string
  periodYears?: number
  amount: number
  currency: string
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'
  resellerClubOrderId?: string
  paymentGateway?: string
  paymentStatus: 'unpaid' | 'paid' | 'refunded'
  metadata?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientPhone: { type: String },
    type: {
      type: String,
      enum: ['domain', 'hosting', 'combo', 'web_project'],
      required: true,
    },
    itemName: { type: String, required: true },
    periodYears: { type: Number, default: 1 },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'cancelled'],
      default: 'pending',
    },
    resellerClubOrderId: { type: String },
    paymentGateway: { type: String, default: 'Manual / Razorpay / ResellerClub' },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'refunded'],
      default: 'unpaid',
    },
    metadata: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  }
)

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)
