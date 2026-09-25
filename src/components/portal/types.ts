export interface PortalService {
  name: string
  type: string
  details?: string
  status: string
  price?: number
  startDate?: string
  expiryDate?: string
  resellerClubOrderId?: string
}

export interface PortalOrder {
  _id: string
  orderNumber: string
  itemName: string
  type: string
  amount: number
  currency: string
  status: string
  paymentStatus: string
  paymentGateway?: string
  resellerClubOrderId?: string
  createdAt: string
  metadata?: any
}

export interface PortalClient {
  name: string
  email: string
  phone?: string
  company?: string
  status: string
}
