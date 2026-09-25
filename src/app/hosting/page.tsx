'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Server,
  Zap,
  Check,
  ArrowRight,
  HardDrive,
  Cpu,
  Layers,
  Sparkles,
  Loader2,
  CreditCard,
} from 'lucide-react'
import { HOSTING_PLANS, HostingPlan } from '@/lib/resellerclub'
import { startRazorpayCheckout } from '@/lib/razorpayClient'

export default function HostingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly')
  const [selectedPlan, setSelectedPlan] = useState<HostingPlan | null>(null)

  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [primaryDomain, setPrimaryDomain] = useState('')
  const [submittingOrder, setSubmittingOrder] = useState(false)
  const [orderResult, setOrderResult] = useState<{
    orderNumber: string
    resellerClubOrderId: string
    paymentId: string
  } | null>(null)

  const handlePayAndDeploy = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPlan || !clientName || !clientEmail) return

    setSubmittingOrder(true)
    const amount = billingCycle === 'yearly' ? selectedPlan.priceYearly : selectedPlan.priceMonthly

    await startRazorpayCheckout({
      amount,
      type: 'hosting',
      itemName: `${selectedPlan.name} Hosting (${billingCycle.toUpperCase()}) ${primaryDomain ? '- ' + primaryDomain : ''}`,
      clientName,
      clientEmail,
      clientPhone,
      periodYears: billingCycle === 'yearly' ? 1 : 0.08,
      onSuccess: (data) => {
        setOrderResult({
          orderNumber: data.orderNumber,
          resellerClubOrderId: data.resellerClubOrderId,
          paymentId: data.paymentId,
        })
        setSubmittingOrder(false)
      },
      onError: (err) => {
        alert(err.message || 'Payment or hosting deployment failed')
        setSubmittingOrder(false)
      },
    })
  }

  return (
    <div className="min-h-screen bg-[#07090E] text-white pt-28 pb-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-purple-600/15 via-blue-600/10 to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-purple-400 mb-6 uppercase tracking-widest">
            <Server className="w-3.5 h-3.5" />
            <span>High-Speed Cloud Hosting</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold font-space tracking-tight mb-6">
            Ultra-Fast Cloud Hosting for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-red-400">
              Modern Businesses
            </span>
          </h1>

          <p className="text-gray-400 text-base md:text-lg mb-8">
            NVMe Gen4 SSD storage, LiteSpeed caching server, free automated daily backups, and instant UPI/Card activation.
          </p>

          <div className="inline-flex items-center p-1.5 rounded-2xl bg-white/5 border border-white/10">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly Billed
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer flex items-center gap-2 ${
                billingCycle === 'yearly'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Annual Billed</span>
              <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {HOSTING_PLANS.map((plan) => {
            const isFeatured = plan.featured
            const displayPrice = billingCycle === 'yearly' ? Math.round(plan.priceYearly / 12) : plan.priceMonthly
            const totalPrice = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 transition-all flex flex-col justify-between ${
                  isFeatured
                    ? 'bg-gradient-to-b from-blue-900/30 via-[#0E1424] to-[#0D111A] border-2 border-blue-500/50 shadow-2xl shadow-blue-500/10 scale-105'
                    : 'bg-[#0D111A] border border-white/10 hover:border-white/20'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-red-600 to-blue-600 text-[11px] font-bold tracking-wider uppercase text-white shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>Best Seller</span>
                  </div>
                )}

                <div>
                  <div className="text-xl font-bold font-space text-white mb-1">{plan.name}</div>
                  <p className="text-xs text-gray-400 mb-6 h-10">{plan.tagline}</p>

                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl md:text-5xl font-black text-white">₹{displayPrice}</span>
                    <span className="text-gray-400 text-sm">/month</span>
                  </div>
                  <div className="text-xs text-gray-400 mb-8">
                    {billingCycle === 'yearly' ? `Billed ₹${totalPrice}/yr` : 'Billed monthly'}
                  </div>

                  <div className="space-y-3 pb-6 mb-6 border-b border-white/10 text-xs">
                    <div className="flex items-center gap-2.5 text-gray-300">
                      <Layers className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>{plan.websites}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-gray-300">
                      <HardDrive className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{plan.storage}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-gray-300">
                      <Cpu className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>{plan.ram}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-gray-300">
                      <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{plan.bandwidth}</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 mb-8">
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-gray-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedPlan(plan)
                    setOrderResult(null)
                  }}
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-lg ${
                    isFeatured
                      ? 'bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <span>Select Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )
          })}
        </div>

        <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-white/[0.02] border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold font-space text-white mb-1">99.9%</div>
            <div className="text-xs text-gray-400">Uptime SLA</div>
          </div>
          <div>
            <div className="text-3xl font-bold font-space text-emerald-400 mb-1">10 Gbps</div>
            <div className="text-xs text-gray-400">Network Uplink</div>
          </div>
          <div>
            <div className="text-3xl font-bold font-space text-blue-400 mb-1">NVMe Gen4</div>
            <div className="text-xs text-gray-400">Ultra-fast SSD</div>
          </div>
          <div>
            <div className="text-3xl font-bold font-space text-purple-400 mb-1">24/7/365</div>
            <div className="text-xs text-gray-400">Expert Support</div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#0F1420] border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedPlan(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-xl bg-white/5 cursor-pointer"
              >
                ✕
              </button>

              {orderResult ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Hosting Activated!</h3>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-left space-y-1.5 my-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Hosting Package:</span>
                      <span className="font-bold text-white">{selectedPlan.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Order / Invoice #:</span>
                      <span className="text-blue-400 font-mono">{orderResult.orderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Provisioning ID:</span>
                      <span className="text-emerald-400 font-mono">{orderResult.resellerClubOrderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Payment ID:</span>
                      <span className="text-purple-400 font-mono">{orderResult.paymentId}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPlan(null)
                      setOrderResult(null)
                    }}
                    className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePayAndDeploy}>
                  <div className="mb-6">
                    <div className="text-xs font-semibold uppercase text-purple-400 tracking-wider mb-1">
                      Configure & Instant Activation
                    </div>
                    <h3 className="text-2xl font-bold font-space text-white">{selectedPlan.name}</h3>
                    <div className="text-sm text-gray-400 mt-1">
                      Total Payable:{' '}
                      <span className="font-bold text-emerald-400 text-lg">
                        ₹{billingCycle === 'yearly' ? selectedPlan.priceYearly : selectedPlan.priceMonthly}
                      </span>{' '}
                      ({billingCycle.toUpperCase()})
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Suhaib Khan"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="suhaib@zarnetic.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+91 9876543210"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">Domain to Link (Optional)</label>
                      <input
                        type="text"
                        value={primaryDomain}
                        onChange={(e) => setPrimaryDomain(e.target.value)}
                        placeholder="mywebsite.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submittingOrder}
                    className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition cursor-pointer disabled:opacity-60"
                  >
                    {submittingOrder ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Deploying Hosting...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        <span>Pay ₹{billingCycle === 'yearly' ? selectedPlan.priceYearly : selectedPlan.priceMonthly} & Deploy Now</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
