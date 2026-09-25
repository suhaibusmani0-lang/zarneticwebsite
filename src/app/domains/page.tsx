'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  CheckCircle2,
  XCircle,
  Globe,
  ShieldCheck,
  Zap,
  Headphones,
  ArrowRight,
  ShoppingCart,
  Loader2,
  Check,
  CreditCard,
} from 'lucide-react'
import { GlassmorphicCard } from '@/components/shared/GlassmorphicCard'
import { startRazorpayCheckout } from '@/lib/razorpayClient'

interface DomainResult {
  domain: string
  tld: string
  available: boolean
  status: 'available' | 'taken' | 'unknown'
  price: number
  renewalPrice: number
}

const POPULAR_TLDS = [
  { tld: '.com', price: '₹899', renewal: '₹1,199', badge: 'Most Popular' },
  { tld: '.in', price: '₹499', renewal: '₹699', badge: 'Best for India' },
  { tld: '.net', price: '₹999', renewal: '₹1,299', badge: 'Networking' },
  { tld: '.org', price: '₹949', renewal: '₹1,249', badge: 'Organizations' },
  { tld: '.io', price: '₹3,499', renewal: '₹3,999', badge: 'Tech & SaaS' },
  { tld: '.ai', price: '₹6,499', renewal: '₹6,999', badge: 'AI & NextGen' },
]

export default function DomainsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<DomainResult[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const [selectedDomain, setSelectedDomain] = useState<DomainResult | null>(null)
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [submittingOrder, setSubmittingOrder] = useState(false)
  const [orderResult, setOrderResult] = useState<{
    orderNumber: string
    resellerClubOrderId: string
    paymentId: string
  } | null>(null)

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const clean = searchTerm.trim().replace(/^https?:\/\//, '')
    if (!clean) return

    setLoading(true)
    setOrderResult(null)
    try {
      const res = await fetch(`/api/resellerclub/domains/check?domain=${encodeURIComponent(clean)}`)
      const data = await res.json()
      if (data.results) {
        setResults(data.results)
        setSuggestions(data.suggestions || [])
        setHasSearched(true)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleQuickTLDSearch = (tld: string) => {
    const base = searchTerm.split('.')[0] || 'zarnetic'
    setSearchTerm(base + tld)
    setLoading(true)
    fetch(`/api/resellerclub/domains/check?domain=${encodeURIComponent(base)}&tlds=${tld.replace('.', '')}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.results) {
          setResults(data.results)
          setHasSearched(true)
        }
      })
      .finally(() => setLoading(false))
  }

  const handlePayAndRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDomain || !clientName || !clientEmail) return

    setSubmittingOrder(true)
    await startRazorpayCheckout({
      amount: selectedDomain.price,
      type: 'domain',
      itemName: selectedDomain.domain,
      clientName,
      clientEmail,
      clientPhone,
      periodYears: 1,
      onSuccess: (data) => {
        setOrderResult({
          orderNumber: data.orderNumber,
          resellerClubOrderId: data.resellerClubOrderId,
          paymentId: data.paymentId,
        })
        setSubmittingOrder(false)
      },
      onError: (err) => {
        alert(err.message || 'Payment or registration failed')
        setSubmittingOrder(false)
      },
    })
  }

  return (
    <div className="min-h-screen bg-[#07090E] text-white pt-28 pb-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-600/15 via-red-600/10 to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-blue-400 mb-6 uppercase tracking-widest"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Official ResellerClub Powered Domains</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold font-space tracking-tight mb-6"
          >
            Find Your Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-blue-500">Domain Name</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg"
          >
            Search real-time availability across global and Indian TLDs. Instant UPI & Card checkout with auto-registration.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-pink-600 to-blue-600 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />
            <div className="relative flex flex-col sm:flex-row items-center bg-[#0D111A] border border-white/10 rounded-2xl p-2 shadow-2xl">
              <div className="flex items-center w-full px-4 py-2">
                <Search className="w-6 h-6 text-gray-400 mr-3 shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter your brand or idea (e.g. zarnetic.com)..."
                  className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none text-base md:text-lg"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto mt-2 sm:mt-0 px-8 py-3.5 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 font-medium rounded-xl text-white flex items-center justify-center gap-2 transition-all shadow-lg shrink-0 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <span>Check Domain</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-6">
            {POPULAR_TLDS.map((item) => (
              <button
                key={item.tld}
                onClick={() => handleQuickTLDSearch(item.tld)}
                className="p-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/20 rounded-xl transition text-left cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-base text-white group-hover:text-blue-400 transition">
                    {item.tld}
                  </span>
                  <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded">
                    {item.price}
                  </span>
                </div>
                <div className="text-[11px] text-gray-400">Renews at {item.renewal}</div>
              </button>
            ))}
          </div>
        </div>

        {hasSearched && (
          <div className="max-w-4xl mx-auto mb-20">
            <h3 className="text-xl font-bold mb-4 font-space text-white flex items-center gap-2">
              <span>Availability Results</span>
              <span className="text-xs bg-white/10 text-gray-300 px-2.5 py-0.5 rounded-full font-mono">
                {results.length} Extensions
              </span>
            </h3>

            <div className="space-y-3">
              {results.map((res) => (
                <div
                  key={res.domain}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition gap-4"
                >
                  <div className="flex items-center gap-3">
                    {res.available ? (
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
                        <XCircle className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <div className="text-lg font-bold text-white tracking-wide">{res.domain}</div>
                      <div className="text-xs text-gray-400 flex items-center gap-2">
                        <span>Renews at ₹{res.renewalPrice}/yr</span>
                        <span>•</span>
                        <span className={res.available ? 'text-emerald-400 font-medium' : 'text-red-400'}>
                          {res.available ? 'Available Now' : 'Already Registered'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">₹{res.price}</div>
                      <div className="text-[11px] text-gray-400">for 1st year</div>
                    </div>

                    {res.available ? (
                      <button
                        onClick={() => {
                          setSelectedDomain(res)
                          setOrderResult(null)
                        }}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 font-medium text-sm text-white rounded-xl flex items-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-900/30"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Buy Now</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="px-4 py-2 bg-white/5 text-gray-500 font-medium text-sm rounded-xl cursor-not-allowed"
                      >
                        Unavailable
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {suggestions.length > 0 && (
              <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-sm font-semibold text-gray-300 mb-3">Popular Alternative Ideas:</div>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((sug) => (
                    <button
                      key={sug}
                      onClick={() => {
                        setSearchTerm(sug)
                        handleQuickTLDSearch('.com')
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-gray-300 hover:text-white transition cursor-pointer"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
          <GlassmorphicCard className="p-6">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Instant DNS Propagation</h4>
            <p className="text-sm text-gray-400">
              Cloud-optimized nameservers powered by global Anycast DNS with sub-second TTL updates worldwide.
            </p>
          </GlassmorphicCard>

          <GlassmorphicCard className="p-6">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">WHOIS Privacy Shield</h4>
            <p className="text-sm text-gray-400">
              Keep your personal contact details, email, and phone number hidden from spammers and public registries.
            </p>
          </GlassmorphicCard>

          <GlassmorphicCard className="p-6">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
              <Headphones className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Dedicated Tech Assistance</h4>
            <p className="text-sm text-gray-400">
              Free assistance for domain pointing, SSL certificate configuration, Cloudflare setup, and migration.
            </p>
          </GlassmorphicCard>
        </div>
      </div>

      <AnimatePresence>
        {selectedDomain && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#0F1420] border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedDomain(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-xl bg-white/5 cursor-pointer"
              >
                ✕
              </button>

              {orderResult ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Domain Registered & Active!</h3>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-left space-y-1.5 my-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Domain:</span>
                      <span className="font-bold text-white">{selectedDomain.domain}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Invoice / Order #:</span>
                      <span className="text-blue-400 font-mono">{orderResult.orderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">ResellerClub Order ID:</span>
                      <span className="text-emerald-400 font-mono">{orderResult.resellerClubOrderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Razorpay Payment ID:</span>
                      <span className="text-purple-400 font-mono">{orderResult.paymentId}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mb-6">
                    A confirmation email and receipt have been issued. Your domain is linked to your Zarnetic CRM profile.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedDomain(null)
                      setOrderResult(null)
                    }}
                    className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePayAndRegister}>
                  <div className="mb-6">
                    <div className="text-xs font-semibold uppercase text-blue-400 tracking-wider mb-1">
                      Complete Registration & Auto-Provision
                    </div>
                    <h3 className="text-2xl font-bold font-space text-white">{selectedDomain.domain}</h3>
                    <div className="text-sm text-gray-400 mt-1">
                      Total Payable:{' '}
                      <span className="font-bold text-emerald-400 text-lg">₹{selectedDomain.price}</span> / 1 Year
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
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">Phone Number (For WHOIS) *</label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+91 9876543210"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submittingOrder}
                    className="w-full py-3.5 bg-gradient-to-r from-red-600 via-pink-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition cursor-pointer disabled:opacity-60"
                  >
                    {submittingOrder ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing Auto-Provisioning...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        <span>Pay ₹{selectedDomain.price} & Register Now</span>
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
