import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IPortfolioTestimonial {
  quote: string
  author: string
  role: string
}

export interface IPortfolio extends Document {
  title: string
  slug: string
  clientName: string
  category: string
  brief: string
  logoUrl?: string
  bannerUrl?: string
  url?: string
  challenge?: string
  solution?: string
  results: string[]
  techStack: string[]
  timeline?: string
  testimonial?: IPortfolioTestimonial
  isPremium: boolean
  featured: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const PortfolioSchema = new Schema<IPortfolio>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    clientName: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    brief: { type: String, required: true },
    logoUrl: { type: String },
    bannerUrl: { type: String },
    url: { type: String },
    challenge: { type: String },
    solution: { type: String },
    results: [{ type: String }],
    techStack: [{ type: String }],
    timeline: { type: String },
    testimonial: {
      quote: { type: String },
      author: { type: String },
      role: { type: String },
    },
    isPremium: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
)

export const Portfolio: Model<IPortfolio> =
  mongoose.models.Portfolio || mongoose.model<IPortfolio>('Portfolio', PortfolioSchema)
