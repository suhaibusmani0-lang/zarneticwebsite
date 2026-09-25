import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Order } from '@/models/Order'
import { Client } from '@/models/Client'
import { Activity } from '@/models/Activity'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const {
      type,
      itemName,
      amount,
      clientName,
      clientEmail,
      clientPhone,
      periodYears = 1,
    } = body

    if (!type || !itemName || !amount || !clientName || !clientEmail) {
      return NextResponse.json(
        { error: 'Missing required order fields' },
        { status: 400 }
      )
    }

    const orderNumber = 'ZRN-' + Date.now().toString().slice(-6) + '-' + Math.floor(Math.random() * 1000)

    let client = await Client.findOne({ email: clientEmail.toLowerCase().trim() })
    if (!client) {
      client = await Client.create({
        name: clientName,
        email: clientEmail.toLowerCase().trim(),
        phone: clientPhone,
        status: 'active',
        services: [
          {
            name: itemName,
            type: type === 'domain' ? 'domain' : 'hosting',
            details: `Ordered via Zarnetic Portal (${periodYears} Year)`,
            status: 'active',
            price: amount,
            expiryDate: new Date(Date.now() + periodYears * 365 * 24 * 60 * 60 * 1000),
          },
        ],
        totalSpent: amount,
      })
    } else {
      client.services.push({
        name: itemName,
        type: type === 'domain' ? 'domain' : 'hosting',
        details: `Ordered via Zarnetic Portal (${periodYears} Year)`,
        status: 'active',
        price: amount,
        expiryDate: new Date(Date.now() + periodYears * 365 * 24 * 60 * 60 * 1000),
      })
      client.totalSpent = (client.totalSpent || 0) + amount
      await client.save()
    }

    const newOrder = await Order.create({
      orderNumber,
      clientId: client._id,
      clientName,
      clientEmail,
      clientPhone,
      type,
      itemName,
      periodYears,
      amount,
      currency: 'INR',
      status: 'completed',
      paymentStatus: 'paid',
      resellerClubOrderId: 'RC-' + Math.floor(10000000 + Math.random() * 90000000),
    })

    await Activity.create({
      action: 'Order Placed',
      description: `New ${type} order ${orderNumber} placed for ${itemName} (₹${amount}) by ${clientName}`,
      entityType: 'order',
      entityId: String(newOrder._id),
      user: clientName,
    })

    return NextResponse.json({
      success: true,
      message: 'Order created successfully!',
      order: newOrder,
    })
  } catch (error: any) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to place order' },
      { status: 500 }
    )
  }
}
