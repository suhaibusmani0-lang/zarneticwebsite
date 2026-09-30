'use client'

import React, { useState, useEffect } from 'react'
import {
  Clock,
  Cake,
  AlertTriangle,
  ShieldCheck,
  Send,
  MessageCircle,
  ExternalLink,
  Globe,
  Server,
  RefreshCw,
  Calendar,
  CheckCircle2,
  DollarSign,
  FileText,
  AlertCircle,
} from 'lucide-react'
import { CrmInvoiceModal } from './CrmInvoiceModal'

interface RenewalItem {
  clientId: string
  clientName: string
  company?: string
  phone?: string
  email: string
  item: string
  type: 'Domain' | 'Hosting' | 'AMC' | 'Hosting + AMC'
  amount?: number
  dueAmount?: number
  billingCycle?: 'monthly' | 'quarterly' | 'half_yearly' | 'yearly'
  expiryDate: string
  daysLeft: number
  overdueDays?: number
  status: 'expired' | 'critical' | 'upcoming'
}

interface BirthdayItem {
  clientId: string
  clientName: string
  company?: string
  phone?: string
  email: string
  dob: string
  isToday: boolean
  daysLeft: number
}

export function CrmRenewals() {
  const [data, setData] = useState<{
    stats: any
    domainRenewals: RenewalItem[]
    hostingRenewals: RenewalItem[]
    amcRenewals: RenewalItem[]
    upcomingBirthdays: BirthdayItem[]
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<'all' | 'domains' | 'amc' | 'birthdays'>('all')
  const [invoiceClient, setInvoiceClient] = useState<any | null>(null)

  const fetchRenewals = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/crm/renewals')
      const json = await res.json()
      if (json.success) {
        setData(json)
      }
    } catch (err) {
      console.error('Failed to load renewals:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRenewals()
  }, [])

  const sendReminder = (item: RenewalItem) => {
    const phone = (item.phone || '').replace(/[^0-9]/g, '')
    if (!phone) {
      alert('Client does not have a phone/WhatsApp number.')
      return
    }
    const cleanPhone = phone.startsWith('91') || phone.length > 10 ? phone : `91${phone}`
    const formattedDate = new Date(item.expiryDate).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })

    const overdueNote =
      item.daysLeft < 0
        ? `*ALREADY EXPIRED (${Math.abs(item.daysLeft)} dino se bakaya)*`
        : `scheduled in ${item.daysLeft} days`

    const message = encodeURIComponent(
      `Hello ${item.clientName},\n\nThis is an official renewal & billing alert from Zarnetic.\n` +
      `Your ${item.type} [${item.item}] is ${overdueNote} (Date: ${formattedDate}).\n` +
      (item.amount ? `• Renewal Amount: ₹${item.amount.toLocaleString('en-IN')}\n` : '') +
      (item.dueAmount && item.dueAmount > 0 ? `• Previous Outstanding Due: ₹${item.dueAmount.toLocaleString('en-IN')}\n` : '') +
      `\nTo prevent website downtime or domain suspension, please renew your plan online:\nhttps://zarnetic.com/client-portal\n\n` +
      `Or reply here to receive an instant UPI scan link.\n\nBest regards,\nBilling Support Desk, Zarnetic`
    )
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank')
  }

  const sendBirthdayWish = (bday: BirthdayItem) => {
    const phone = (bday.phone || '').replace(/[^0-9]/g, '')
    if (!phone) {
      alert('Client does not have a phone/WhatsApp number.')
      return
    }
    const cleanPhone = phone.startsWith('91') || phone.length > 10 ? phone : `91${phone}`
    const message = encodeURIComponent(
      `Dear ${bday.clientName},\n\nTeam Zarnetic wishes you a very Happy Birthday! 🎂🎉 May this year bring you immense success, health, and great milestones in business.\n\nWarm regards,\nZarnetic Digital Engineering | https://zarnetic.com`
    )
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank')
  }

  const handleMarkPaid = async (r: RenewalItem) => {
    const cycle = r.billingCycle || 'yearly'
    if (
      !confirm(
        `Mark payment as PAID for "${r.clientName}"?\nThis will clear any due amount and advance their renewal date by ${cycle}.`
      )
    ) {
      return
    }

    try {
      const res = await fetch(`/api/crm/clients/${r.clientId}/mark-paid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          billingCycle: cycle,
          paidAmount: r.amount || r.dueAmount || 0,
        }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to record payment')

      alert(json.message || 'Payment recorded successfully!')
      fetchRenewals()
    } catch (err: any) {
      alert(err.message || 'Error updating payment')
    }
  }

  const allRenewals: RenewalItem[] = [
    ...(data?.domainRenewals || []),
    ...(data?.amcRenewals || []),
    ...(data?.hostingRenewals || []),
  ].sort((a, b) => a.daysLeft - b.daysLeft)

  const displayedRenewals =
    activeFilter === 'domains'
      ? data?.domainRenewals || []
      : activeFilter === 'amc'
      ? data?.amcRenewals || []
      : allRenewals

  return (
    <div className="space-y-6">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Domain Expiries */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Domain Renewals
            </span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-space text-white">
            {data?.stats?.domainRenewalsCount || 0}
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">Expiring within 30 days</p>
        </div>

        {/* Hosting + Maintenance Expiries */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Hosting + AMC Contracts
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-space text-white">
            {data?.stats?.amcRenewalsCount || 0}
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">Hosting + AMC combined packages</p>
        </div>

        {/* Total Overdue */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
              Overdue / Bakaya Expiries
            </span>
            <div className="p-2 rounded-xl bg-red-500/10 text-red-400">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-space text-red-400">
            {allRenewals.filter((r) => r.daysLeft < 0).length}
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">Clients with overdue renewal dates</p>
        </div>

        {/* Birthdays */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-pink-400 uppercase tracking-wider">
              Birthdays (30 Days)
            </span>
            <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400">
              <Cake className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-space text-pink-400">
            {data?.stats?.birthdaysCount || 0}
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">Clients to wish & delight</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0a0a0a] border border-white/10 p-4 rounded-2xl">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: `All Expiries (${allRenewals.length})` },
            { id: 'domains', label: `Domains (${data?.stats?.domainRenewalsCount || 0})` },
            { id: 'amc', label: `Hosting + AMC (${data?.stats?.amcRenewalsCount || 0})` },
            { id: 'birthdays', label: `🎂 Birthdays (${data?.stats?.birthdaysCount || 0})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFilter === tab.id
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-950/40'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={fetchRenewals}
          className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-xl text-zinc-400 hover:text-white"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Birthdays Queue */}
      {activeFilter === 'birthdays' ? (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Cake className="w-4 h-4 text-pink-400" />
              <span>Upcoming Client Birthdays</span>
            </h3>
            <span className="text-xs text-zinc-500">Wish clients to strengthen agency relations</span>
          </div>

          {!data?.upcomingBirthdays || data.upcomingBirthdays.length === 0 ? (
            <div className="py-16 text-center text-zinc-500 text-xs">
              No birthdays in the next 30 days. Add DOBs in Custom Clients to get automatic alerts!
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {data.upcomingBirthdays.map((bday, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center justify-center font-bold text-sm">
                      🎂
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{bday.clientName}</span>
                        {bday.isToday ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500 text-white animate-bounce">
                            🎉 TODAY!
                          </span>
                        ) : (
                          <span className="text-[11px] text-pink-400 font-semibold">
                            In {bday.daysLeft} days
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-zinc-400">
                        {bday.company || 'Individual'} • DOB:{' '}
                        {new Date(bday.dob).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                        })}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => sendBirthdayWish(bday)}
                    className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-pink-950/40 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Birthday Wish</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Renewals Table */
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900/80 text-zinc-400 uppercase tracking-wider text-[11px] border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-4">Service & Plan</th>
                  <th className="py-3.5 px-4">Client Name</th>
                  <th className="py-3.5 px-4">Cycle & Amount</th>
                  <th className="py-3.5 px-4">Expiry Date</th>
                  <th className="py-3.5 px-4">Due & Bakaya Days</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {displayedRenewals.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-zinc-500">
                      No upcoming expiries found in this category!
                    </td>
                  </tr>
                ) : (
                  displayedRenewals.map((r, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-bold text-white text-sm flex items-center gap-2">
                          {r.type === 'Domain' ? (
                            <Globe className="w-4 h-4 text-blue-400" />
                          ) : (
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          )}
                          <span>{r.item}</span>
                        </div>
                        <div className="text-[11px] text-zinc-500 uppercase tracking-wider mt-0.5">
                          {r.type} {r.amount ? `(₹${r.amount.toLocaleString('en-IN')})` : ''}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-semibold text-zinc-200">{r.clientName}</div>
                        <div className="text-zinc-500 text-[11px]">{r.company || r.email}</div>
                      </td>

                      <td className="py-4 px-4 space-y-0.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          {r.billingCycle || 'Yearly'}
                        </span>
                        {r.amount ? (
                          <div className="text-white font-bold text-xs mt-1">
                            ₹{r.amount.toLocaleString('en-IN')}
                          </div>
                        ) : null}
                      </td>

                      <td className="py-4 px-4 text-zinc-300">
                        {new Date(r.expiryDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>

                      {/* Due Amount & Bakaya Din */}
                      <td className="py-4 px-4">
                        {r.daysLeft < 0 ? (
                          <div className="space-y-0.5">
                            <span className="font-bold text-red-500 text-xs block">
                              🔴 {Math.abs(r.daysLeft)} Din Se Bakaya
                            </span>
                            {r.dueAmount ? (
                              <span className="text-[11px] text-red-400 font-semibold">
                                Due: ₹{r.dueAmount.toLocaleString('en-IN')}
                              </span>
                            ) : null}
                          </div>
                        ) : r.daysLeft === 0 ? (
                          <span className="font-bold text-amber-400">Expires Today!</span>
                        ) : (
                          <span className="font-semibold text-zinc-300">
                            {r.daysLeft} days remaining
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            r.daysLeft < 0
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                              : r.daysLeft <= 7
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse'
                              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          {r.daysLeft < 0 ? 'Overdue' : r.daysLeft <= 7 ? 'Critical' : 'Pending'}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Generate Bill Modal */}
                          <button
                            onClick={() =>
                              setInvoiceClient({
                                _id: r.clientId,
                                name: r.clientName,
                                email: r.email,
                                phone: r.phone,
                                company: r.company,
                                domainName: r.type === 'Domain' ? r.item : '',
                                domainPrice: r.type === 'Domain' ? r.amount : 1200,
                                hostingMaintenancePrice: r.type !== 'Domain' ? r.amount : 12000,
                                billingCycle: r.billingCycle || 'yearly',
                                dueAmount: r.dueAmount || r.amount || 0,
                                nextBillingDate: r.expiryDate,
                                overdueDays: r.daysLeft < 0 ? Math.abs(r.daysLeft) : 0,
                              })
                            }
                            title="Generate 18% GST Tax Invoice / PDF"
                            className="px-2.5 py-1.5 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/30 text-blue-400 font-bold text-xs flex items-center gap-1 transition-all"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Bill (GST)</span>
                          </button>

                          {/* Quick Mark Paid */}
                          <button
                            onClick={() => handleMarkPaid(r)}
                            title="Mark as Paid & Advance Renewal Date"
                            className="p-1.5 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/30 text-emerald-400 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Send WhatsApp Reminder */}
                          <button
                            onClick={() => sendReminder(r)}
                            title="Send WhatsApp Renewal Notice"
                            className="p-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 transition-colors"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Invoice Modal in Renewals */}
      {invoiceClient && (
        <CrmInvoiceModal
          client={invoiceClient}
          onClose={() => setInvoiceClient(null)}
          onMarkPaidSuccess={() => {
            setInvoiceClient(null)
            fetchRenewals()
          }}
        />
      )}
    </div>
  )
}
