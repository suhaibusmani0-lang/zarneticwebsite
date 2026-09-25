export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false)
    if ((window as any).Razorpay) return resolve(true)

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export interface CheckoutOptions {
  amount: number // in INR
  type: 'domain' | 'hosting' | 'combo'
  itemName: string
  clientName: string
  clientEmail: string
  clientPhone?: string
  periodYears?: number
  onSuccess: (result: any) => void
  onError: (err: any) => void
}

export async function startRazorpayCheckout(options: CheckoutOptions) {
  try {
    // 1. Create order on server
    const orderRes = await fetch('/api/payments/razorpay/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: options.amount,
        type: options.type,
        itemName: options.itemName,
        clientName: options.clientName,
        clientEmail: options.clientEmail,
        clientPhone: options.clientPhone,
      }),
    })

    const orderData = await orderRes.json()
    if (!orderRes.ok || !orderData.success) {
      throw new Error(orderData.error || 'Failed to initialize payment gateway')
    }

    const isLoaded = await loadRazorpayScript()

    // If Razorpay script loaded and key is valid
    if (isLoaded && (window as any).Razorpay && !orderData.keyId.includes('DemoKey')) {
      const rzpOptions = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'Zarnetic Systems',
        description: `${options.itemName} (${options.type.toUpperCase()})`,
        image: '/suhaib.jpeg',
        order_id: orderData.orderId,
        prefill: {
          name: options.clientName,
          email: options.clientEmail,
          contact: options.clientPhone || '',
        },
        theme: {
          color: '#FF2020',
        },
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('/api/payments/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                type: options.type,
                itemName: options.itemName,
                amount: options.amount,
                clientName: options.clientName,
                clientEmail: options.clientEmail,
                clientPhone: options.clientPhone,
                periodYears: options.periodYears || 1,
              }),
            })
            const verifyData = await verifyRes.json()
            if (verifyRes.ok && verifyData.success) {
              options.onSuccess(verifyData)
            } else {
              options.onError(new Error(verifyData.error || 'Verification failed'))
            }
          } catch (e: any) {
            options.onError(e)
          }
        },
      }

      const rzp = new (window as any).Razorpay(rzpOptions)
      rzp.open()
      return
    }

    // Interactive Demo / Sandbox Checkout Simulator (if Razorpay credentials are demo)
    const simulatedPaymentId = 'pay_demo_' + Math.random().toString(36).slice(-10)
    const verifyRes = await fetch('/api/payments/razorpay/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        razorpay_order_id: orderData.orderId,
        razorpay_payment_id: simulatedPaymentId,
        type: options.type,
        itemName: options.itemName,
        amount: options.amount,
        clientName: options.clientName,
        clientEmail: options.clientEmail,
        clientPhone: options.clientPhone,
        periodYears: options.periodYears || 1,
      }),
    })
    const verifyData = await verifyRes.json()
    if (verifyRes.ok && verifyData.success) {
      options.onSuccess(verifyData)
    } else {
      options.onError(new Error(verifyData.error || 'Verification failed'))
    }
  } catch (err: any) {
    options.onError(err)
  }
}
