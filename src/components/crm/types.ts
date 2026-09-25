export interface LeadItem {
  _id: string
  name: string
  email: string
  phone?: string
  company?: string
  serviceInterested?: string
  budget?: string
  status: string
  source: string
  notes?: string
  createdAt: string
  convertedClientId?: string
}

export interface ClientItem {
  _id: string
  name: string
  email: string
  phone?: string
  company?: string
  status: string
  services: {
    name: string
    type: string
    details?: string
    status: string
    price?: number
    expiryDate?: string
  }[]
  documents: {
    title: string
    url: string
    uploadedAt: string
  }[]
  totalSpent: number
  notes?: string
  createdAt: string
}

export interface ActivityItem {
  _id: string
  action: string
  description: string
  user: string
  createdAt: string
}

export const STAGES = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Converted', 'Lost']
