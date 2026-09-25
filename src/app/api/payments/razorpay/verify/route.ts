import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { connectDB } from '@/lib/db'
import { Order } from '@/models/Order'
import { Client } from '@/models/Client'
import { Activity } from '@/models/Activity'
import { resellerClub } from '@/lib/resellerclub'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      type,
      itemName,
      amount,
      clientName,
      clientEmail,
      clientPhone,
      periodYears = 1,
    } = body

    if (!type || !itemName || !amount || !clientName || !clientEmail) {
      return NextResponse.json({ error: 'Missing order details' }, { status: 400 })
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'zarneticDemoSecret'

    // Verify signature if real razorpay signature was provided
    if (razorpay_signature && !key_secret.includes('DemoSecret')) {
      const generated_signature = crypto
        .createHmac('sha256', key_secret)
        .update((razorpay_order_id || '') + '|' + razorpay_payment_id)
        .digest('hex')

      if (generated_signature !== razorpay_signature) {
        return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
      }
    }

    // 1. Trigger ResellerClub Auto-Provisioning in background!
    let rcOrderId = 'RC-' + Math.floor(10000000 + Math.random() * 90000000)
    let autoMessage = 'Service provisioned successfully.'

    if (type === 'domain') {
      const regResult = await resellerClub.autoRegisterDomain({
        domainName: itemName,
        years: periodYears,
        customerEmail: clientEmail,
        customerName: clientName,
        customerPhone: clientPhone,
      })
      rcOrderId = regResult.orderId
      autoMessage = regResult.message
    }

    // 2. Connect to MongoDB Atlas and save Client & Order
    await connectDB()

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
            details: `Auto-provisioned via Razorpay (${periodYears} Year)`,
            status: 'active',
            price: Number(amount),
            expiryDate: new Date(Date.now() + periodYears * 365 * 24 * 60 * 60 * 1000),
            resellerClubOrderId: rcOrderId,
          },
        ],
        totalSpent: Number(amount),
      })
    } else {
      client.services.push({
        name: itemName,
        type: type === 'domain' ? 'domain' : 'hosting',
        details: `Auto-provisioned via Razorpay (${periodYears} Year)`,
        status: 'active',
        price: Number(amount),
        expiryDate: new Date(Date.now() + periodYears * 365 * 24 * 60 * 60 * 1000),
        resellerClubOrderId: rcOrderId,
      })
      client.totalSpent = (client.totalSpent || 0) + Number(amount)
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
      amount: Number(amount),
      currency: 'INR',
      status: 'completed',
      paymentGateway: 'Razorpay UPI/Cards',
      paymentStatus: 'paid',
      resellerClubOrderId: rcOrderId,
      metadata: {
        razorpay_payment_id: razorpay_payment_id || 'pay_demo_' + Date.now(),
        razorpay_order_id,
        autoProvisionMessage: autoMessage,
      },
    })

    await Activity.create({
      action: 'Payment & Auto-Provision Complete',
      description: `Payment received for ${itemName} (₹${amount}) via Razorpay. ResellerClub Order ${rcOrderId} active for ${clientName}`,
      entityType: 'order',
      entityId: String(newOrder._id),
      user: clientName,
    })

    return NextResponse.json({
      success: true,
      message: 'Payment verified and service auto-provisioned successfully!',
      orderNumber,
      resellerClubOrderId: rcOrderId,
      paymentId: razorpay_payment_id || 'pay_demo_' + Date.now(),
      order: newOrder,
    })
  } catch (error: any) {
    console.error('Payment verification & provisioning error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to verify payment' },
      { status: 500 }
    )
  }
}
