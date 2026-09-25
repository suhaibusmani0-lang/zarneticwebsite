import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Client } from '@/models/Client'
import { Order } from '@/models/Order'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')?.toLowerCase().trim()

    if (!email) {
      return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 })
    }

    const client = await Client.findOne({ email })
    const orders = await Order.find({ clientEmail: email }).sort({ createdAt: -1 })

    if (!client && orders.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No active account or purchases found for this email address. Please make sure you enter the email used during checkout.',
        },
        { status: 404 }
      )
    }

    // Separate domains and hosting from client services
    const services = client?.services || []
    const domains = services.filter((s) => s.type === 'domain')
    const hosting = services.filter((s) => s.type === 'hosting')
    const otherServices = services.filter((s) => s.type !== 'domain' && s.type !== 'hosting')

    return NextResponse.json({
      success: true,
      client: client || {
        name: orders[0]?.clientName || 'Valued Client',
        email,
        phone: orders[0]?.clientPhone || '',
        status: 'active',
      },
      domains,
      hosting,
      otherServices,
      orders,
      customerPanelUrl: 'https://rclubindia.webpropanel.com',
    })
  } catch (error: any) {
    console.error('Client portal services fetch error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch services' },
      { status: 500 }
    )
  }
}
