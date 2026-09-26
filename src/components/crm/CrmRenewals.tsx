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
} from 'lucide-react'

interface RenewalItem {
  clientId: string
  clientName: string
  company?: string
  phone?: string
  email: string
  item: string
  type: 'Domain' | 'Hosting' | 'AMC'
  amount?: number
  expiryDate: string
  daysLeft: number
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
  const [activeFilter, setActiveFilter] = useState<'all' | 'domains' | 'hosting' | 'amc' | 'birthdays'>('all')

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

    const message = encodeURIComponent(
      `Hello ${item.clientName},\n\nThis is an urgent service notice from Zarnetic.\nYour ${item.type} [${item.item}] is scheduled to expire on ${formattedDate} (${item.daysLeft < 0 ? 'ALREADY EXPIRED' : `in ${item.daysLeft} days`}).\n\nTo prevent website disruption or domain suspension, please renew your plan online:\nhttps://zarnetic.com/client-portal\n\nOr reply to this message for immediate assistance.\n\nBest regards,\nBilling Support Desk, Zarnetic`
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

  const allRenewals: RenewalItem[] = [
    ...(data?.domainRenewals || []),
    ...(data?.hostingRenewals || []),
    ...(data?.amcRenewals || []),
  ].sort((a, b) => a.daysLeft - b.daysLeft)

  const displayedRenewals =
    activeFilter === 'domains'
      ? data?.domainRenewals || []
      : activeFilter === 'hosting'
      ? data?.hostingRenewals || []
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

        {/* Hosting Expiries */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Hosting Renewals
            </span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Server className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-space text-white">
            {data?.stats?.hostingRenewalsCount || 0}
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">Cloud plans up for renewal</p>
        </div>

        {/* AMC Expiries */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              AMC Contracts
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-space text-white">
            {data?.stats?.amcRenewalsCount || 0}
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">Annual maintenance up for bill</p>
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
            { id: 'hosting', label: `Hosting (${data?.stats?.hostingRenewalsCount || 0})` },
            { id: 'amc', label: `AMC Contracts (${data?.stats?.amcRenewalsCount || 0})` },
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

      {/* Birthdays Queue (When Birthdays Filter is Active) */}
      {activeFilter === 'birthdays' ? (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Cake className="w-4 h-4 text-pink-400" />
              <span>Upcoming Client Birthdays</span>
            </h3>
            <span className="text-xs text-zinc-500">Wish clients to strengthen long-term agency relationships</span>
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
                  <th className="py-3.5 px-4">Expiry Date</th>
                  <th className="py-3.5 px-4">Days Left</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {displayedRenewals.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-zinc-500">
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
                          ) : r.type === 'Hosting' ? (
                            <Server className="w-4 h-4 text-purple-400" />
                          ) : (
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          )}
                          <span>{r.item}</span>
                        </div>
                        <div className="text-[11px] text-zinc-500 uppercase tracking-wider mt-0.5">
                          {r.type} {r.amount ? `(₹${r.amount})` : ''}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-semibold text-zinc-200">{r.clientName}</div>
                        <div className="text-zinc-500 text-[11px]">{r.company || r.email}</div>
                      </td>

                      <td className="py-4 px-4 text-zinc-300">
                        {new Date(r.expiryDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`font-bold ${
                            r.daysLeft < 0
                              ? 'text-red-500'
                              : r.daysLeft <= 7
                              ? 'text-amber-400'
                              : 'text-zinc-300'
                          }`}
                        >
                          {r.daysLeft < 0
                            ? `Expired ${Math.abs(r.daysLeft)} days ago`
                            : r.daysLeft === 0
                            ? 'Expires Today!'
                            : `${r.daysLeft} days remaining`}
                        </span>
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
                        <button
                          onClick={() => sendReminder(r)}
                          className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-semibold text-xs flex items-center gap-1.5 ml-auto transition-colors"
                        >
                          <Send className="w-3 h-3" />
                          <span>WhatsApp Reminder</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
