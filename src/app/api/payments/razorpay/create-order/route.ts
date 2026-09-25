import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency = 'INR', itemName, type } = body

    if (!amount) {
      return NextResponse.json({ error: 'Amount is required' }, { status: 400 })
    }

    const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_zarneticDemoKey'
    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'zarneticDemoSecret'

    let orderId = 'order_' + Date.now().toString(36) + Math.random().toString(36).slice(-6)

    // Attempt real Razorpay order if live/test key is set
    if (key_id && !key_id.includes('DemoKey')) {
      try {
        const razorpay = new Razorpay({
          key_id,
          key_secret,
        })

        const options = {
          amount: Math.round(Number(amount) * 100), // paise
          currency,
          receipt: 'rcpt_' + Date.now().toString().slice(-8),
          notes: {
            itemName: itemName || 'Domain/Hosting',
            type: type || 'domain',
          },
        }

        const rzpOrder = await razorpay.orders.create(options)
        orderId = rzpOrder.id
      } catch (err: any) {
        console.warn('Razorpay order create fallback:', err?.message)
      }
    }

    return NextResponse.json({
      success: true,
      orderId,
      amount: Math.round(Number(amount) * 100),
      currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || key_id,
    })
  } catch (error: any) {
    console.error('Razorpay create-order error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to initialize payment' },
      { status: 500 }
    )
  }
}
