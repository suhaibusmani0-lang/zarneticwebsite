'use client'

import React, { useState, useEffect } from 'react'
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Cake,
  Clock,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Server,
  Globe,
  Building,
  Mail,
  Phone,
  AlertCircle,
  CheckCircle2,
  Calendar,
  X,
  RefreshCw,
  Send,
  FileText,
  DollarSign,
  ArrowUpRight,
} from 'lucide-react'
import { CrmInvoiceModal } from './CrmInvoiceModal'

interface Service {
  name: string
  type: string
  status: string
  expiryDate?: string
  price?: number
}

interface ClientData {
  _id: string
  name: string
  email: string
  phone?: string
  whatsapp?: string
  company?: string
  clientType: 'reseller' | 'custom'
  dob?: string
  domainName?: string
  domainExpiryDate?: string
  domainPrice?: number
  hostingExpiryDate?: string
  amcExpiryDate?: string
  amcAmount?: number
  hostingMaintenancePrice?: number
  hostingMaintenanceExpiryDate?: string
  sslExpiryDate?: string
  status: 'active' | 'inactive' | 'pending'
  billingCycle?: 'monthly' | 'quarterly' | 'half_yearly' | 'yearly'
  billingAmount?: number
  dueAmount?: number
  nextBillingDate?: string
  paymentStatus?: 'paid' | 'pending' | 'overdue'
  overdueDays?: number
  daysUntilDue?: number
  isOverdue?: boolean
  services: Service[]
  notes?: string
  totalSpent: number
  createdAt: string
}

export function CrmClients() {
  const [activeTab, setActiveTab] = useState<'custom' | 'reseller'>('custom')
  const [clients, setClients] = useState<ClientData[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingClient, setEditingClient] = useState<ClientData | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [invoiceClient, setInvoiceClient] = useState<ClientData | null>(null)

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    company: '',
    clientType: 'custom' as 'custom' | 'reseller',
    dob: '',
    domainName: '',
    domainExpiryDate: '',
    domainPrice: 0,
    hostingMaintenancePrice: 0,
    hostingMaintenanceExpiryDate: '',
    hostingExpiryDate: '',
    amcExpiryDate: '',
    amcAmount: 0,
    billingCycle: 'yearly' as 'monthly' | 'quarterly' | 'half_yearly' | 'yearly',
    billingAmount: 0,
    dueAmount: 0,
    nextBillingDate: '',
    paymentStatus: 'paid' as 'paid' | 'pending' | 'overdue',
    sslExpiryDate: '',
    status: 'active' as 'active' | 'inactive' | 'pending',
    notes: '',
    servicesList: 'Custom Web Development',
  })

  const fetchClients = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/crm/clients?type=${activeTab}&search=${encodeURIComponent(search)}`)
      const data = await res.json()
      if (data.success) {
        setClients(data.clients || [])
      }
    } catch (err) {
      console.error('Failed to load clients:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [activeTab, search])

  const openAddModal = () => {
    setEditingClient(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      whatsapp: '',
      company: '',
      clientType: activeTab,
      dob: '',
      domainName: '',
      domainExpiryDate: '',
      domainPrice: 1200,
      hostingMaintenancePrice: 12000,
      hostingMaintenanceExpiryDate: '',
      hostingExpiryDate: '',
      amcExpiryDate: '',
      amcAmount: 0,
      billingCycle: 'yearly',
      billingAmount: 13200,
      dueAmount: 0,
      nextBillingDate: '',
      paymentStatus: 'paid',
      sslExpiryDate: '',
      status: 'active',
      notes: '',
      servicesList: 'Custom Web Development',
    })
    setShowAddModal(true)
  }

  const openEditModal = (client: ClientData) => {
    setEditingClient(client)
    const hMaintenancePrice = client.hostingMaintenancePrice || client.amcAmount || 0
    const hMaintenanceDate = client.hostingMaintenanceExpiryDate || client.amcExpiryDate || client.hostingExpiryDate || ''

    setFormData({
      name: client.name || '',
      email: client.email || '',
      phone: client.phone || '',
      whatsapp: client.whatsapp || client.phone || '',
      company: client.company || '',
      clientType: client.clientType || 'custom',
      dob: client.dob ? client.dob.split('T')[0] : '',
      domainName: client.domainName || '',
      domainExpiryDate: client.domainExpiryDate ? client.domainExpiryDate.split('T')[0] : '',
      domainPrice: client.domainPrice || 0,
      hostingMaintenancePrice: hMaintenancePrice,
      hostingMaintenanceExpiryDate: hMaintenanceDate ? hMaintenanceDate.split('T')[0] : '',
      hostingExpiryDate: client.hostingExpiryDate ? client.hostingExpiryDate.split('T')[0] : '',
      amcExpiryDate: client.amcExpiryDate ? client.amcExpiryDate.split('T')[0] : '',
      amcAmount: client.amcAmount || 0,
      billingCycle: client.billingCycle || 'yearly',
      billingAmount: client.billingAmount || 0,
      dueAmount: client.dueAmount || 0,
      nextBillingDate: client.nextBillingDate ? client.nextBillingDate.split('T')[0] : '',
      paymentStatus: client.paymentStatus || 'paid',
      sslExpiryDate: client.sslExpiryDate ? client.sslExpiryDate.split('T')[0] : '',
      status: client.status || 'active',
      notes: client.notes || '',
      servicesList: client.services?.map((s) => s.name).join(', ') || 'Custom Web Development',
    })
    setShowAddModal(true)
  }

  const handleSaveClient = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const computedAmount =
        Number(formData.billingAmount) ||
        (Number(formData.domainPrice) || 0) + (Number(formData.hostingMaintenancePrice) || 0)

      const payload = {
        ...formData,
        billingAmount: computedAmount,
        hostingMaintenancePrice: Number(formData.hostingMaintenancePrice) || 0,
        domainPrice: Number(formData.domainPrice) || 0,
        dueAmount: Number(formData.dueAmount) || 0,
        paymentStatus: Number(formData.dueAmount) > 0 ? 'overdue' : formData.paymentStatus,
        services: formData.servicesList
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
          .map((name) => ({
            name,
            type: name.toLowerCase().includes('host') ? 'hosting' : name.toLowerCase().includes('domain') ? 'domain' : 'web_development',
            status: 'active',
          })),
      }

      const url = editingClient ? `/api/crm/clients/${editingClient._id}` : '/api/crm/clients'
      const method = editingClient ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save client')

      setShowAddModal(false)
      fetchClients()
    } catch (err: any) {
      alert(err.message || 'Operation failed')
    }
  }

  const handleDeleteClient = async () => {
    if (!deleteId) return
    try {
      const res = await fetch(`/api/crm/clients/${deleteId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      setDeleteId(null)
      fetchClients()
    } catch (err: any) {
      alert(err.message || 'Could not delete client')
    }
  }

  // Quick Mark as Paid handler
  const handleQuickMarkPaid = async (client: ClientData) => {
    const cycle = client.billingCycle || 'yearly'
    if (
      !confirm(
        `Mark payment as PAID for "${client.name}"?\nThis will clear any due amount and advance their renewal date by ${cycle}.`
      )
    ) {
      return
    }

    try {
      const res = await fetch(`/api/crm/clients/${client._id}/mark-paid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          billingCycle: cycle,
          paidAmount: client.dueAmount || client.billingAmount || 0,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to record payment')

      alert(data.message || 'Payment recorded successfully!')
      fetchClients()
    } catch (err: any) {
      alert(err.message || 'Error updating payment')
    }
  }

  // Calculate birthday days left
  const getBirthdayInfo = (dobStr?: string) => {
    if (!dobStr) return null
    const dob = new Date(dobStr)
    const now = new Date()
    const currentYear = now.getFullYear()
    const bdayThisYear = new Date(currentYear, dob.getMonth(), dob.getDate())
    const diffDays = Math.ceil((bdayThisYear.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return { isToday: true, text: '🎂 Birthday Today!' }
    if (diffDays > 0 && diffDays <= 7) return { isToday: false, text: `🎂 Birthday in ${diffDays} days` }
    return null
  }

  // Send Birthday Wish via WhatsApp
  const sendBirthdayWish = (client: ClientData) => {
    const phone = (client.whatsapp || client.phone || '').replace(/[^0-9]/g, '')
    if (!phone) {
      alert('Client does not have a phone/WhatsApp number added.')
      return
    }
    const cleanPhone = phone.startsWith('91') || phone.length > 10 ? phone : `91${phone}`
    const message = encodeURIComponent(
      `Dear ${client.name},\n\nTeam Zarnetic wishes you a very Happy Birthday! 🎂🎉 May this special year bring you unmatched success, prosperity, and joy.\n\nWarm regards,\nTeam Zarnetic | https://zarnetic.com`
    )
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank')
  }

  // Send Renewal Reminder via WhatsApp
  const sendRenewalReminder = (client: ClientData) => {
    const phone = (client.whatsapp || client.phone || '').replace(/[^0-9]/g, '')
    if (!phone) {
      alert('Client does not have a phone/WhatsApp number added.')
      return
    }
    const cleanPhone = phone.startsWith('91') || phone.length > 10 ? phone : `91${phone}`

    const domainExp = client.domainExpiryDate
      ? new Date(client.domainExpiryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      : null
    const hmExp = (client.hostingMaintenanceExpiryDate || client.amcExpiryDate || client.hostingExpiryDate)
      ? new Date(client.hostingMaintenanceExpiryDate || client.amcExpiryDate || client.hostingExpiryDate || '').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      : null

    const totalDue = client.dueAmount || client.billingAmount || 0
    const overdueText = client.overdueDays && client.overdueDays > 0 ? ` (${client.overdueDays} dino se bakaya)` : ''

    const message = encodeURIComponent(
      `Hello ${client.name},\n\nThis is an official renewal reminder from Zarnetic.\n` +
      (client.domainName ? `• Domain: ${client.domainName} (Expires: ${domainExp || 'Soon'})\n` : '') +
      `• Hosting & Maintenance Plan (Renewal: ${hmExp || 'Soon'})\n` +
      `• Total Renewal Amount: ₹${totalDue.toLocaleString('en-IN')}${overdueText}\n\n` +
      `To prevent any service interruption or domain suspension, please renew your plan online:\nhttps://zarnetic.com/client-portal\n\n` +
      `Or reply here to generate an instant renewal UPI payment link.\n\nBest regards,\nBilling Support Desk, Zarnetic`
    )
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank')
  }

  return (
    <div className="space-y-6">
      {/* Top Controls & Category Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0a0a0a] border border-white/10 p-4 rounded-2xl">
        {/* 2 Column Tabs: Reseller vs Custom */}
        <div className="flex items-center gap-2 p-1.5 bg-zinc-900/90 rounded-xl border border-white/5">
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'custom'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-950/40'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Custom Clients (Agency)</span>
          </button>

          <button
            onClick={() => setActiveTab('reseller')}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'reseller'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-950/40'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Reseller Clients (Online)</span>
          </button>
        </div>

        {/* Search & Add Button */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, company, domain..."
              className="pl-9 pr-4 py-2 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 w-64"
            />
          </div>

          <button
            onClick={fetchClients}
            title="Refresh"
            className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-xl text-zinc-400 hover:text-white transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {activeTab === 'custom' && (
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-950/40"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Client</span>
            </button>
          )}
        </div>
      </div>

      {/* Clients Table / List */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-zinc-500 text-sm">
            <span className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin mb-3" />
            <span>Loading {activeTab} clients...</span>
          </div>
        ) : clients.length === 0 ? (
          <div className="py-16 text-center text-zinc-500">
            <p className="text-sm font-medium">No {activeTab} clients found.</p>
            {activeTab === 'custom' && (
              <button
                onClick={openAddModal}
                className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl"
              >
                + Add First Custom Client
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900/80 text-zinc-400 uppercase tracking-wider text-[11px] border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-4">Client / Company</th>
                  <th className="py-3.5 px-4">Contacts & DOB</th>
                  <th className="py-3.5 px-4">Domain & Expiry</th>
                  <th className="py-3.5 px-4">Hosting + Maintenance (AMC)</th>
                  <th className="py-3.5 px-4">Cycle & Amount</th>
                  <th className="py-3.5 px-4">Due & Bakaya Days</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {clients.map((c) => {
                  const bdayInfo = getBirthdayInfo(c.dob)
                  const hmPrice = c.hostingMaintenancePrice || c.amcAmount || 0
                  const hmDate = c.hostingMaintenanceExpiryDate || c.amcExpiryDate || c.hostingExpiryDate
                  const packageAmount = c.billingAmount || (c.domainPrice || 0) + hmPrice
                  const isDue = (c.dueAmount && c.dueAmount > 0) || c.isOverdue || c.paymentStatus === 'overdue'

                  return (
                    <tr key={c._id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Name & Company */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-white text-sm flex items-center gap-2">
                          <span>{c.name}</span>
                          {bdayInfo && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30 animate-pulse">
                              {bdayInfo.text}
                            </span>
                          )}
                        </div>
                        <div className="text-zinc-400 text-xs mt-0.5">{c.company || 'Individual Client'}</div>
                        {c.services && c.services.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {c.services.map((s, idx) => (
                              <span
                                key={idx}
                                className="px-1.5 py-0.5 text-[9px] rounded bg-white/5 border border-white/10 text-zinc-300"
                              >
                                {s.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>

                      {/* Contact & DOB */}
                      <td className="py-4 px-4 space-y-1">
                        <div className="flex items-center gap-1.5 text-zinc-300">
                          <Mail className="w-3 h-3 text-zinc-500" />
                          <span>{c.email}</span>
                        </div>
                        {c.phone && (
                          <div className="flex items-center gap-1.5 text-zinc-400">
                            <Phone className="w-3 h-3 text-zinc-500" />
                            <span>{c.phone}</span>
                          </div>
                        )}
                        {c.dob && (
                          <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
                            <Cake className="w-3 h-3 text-pink-400" />
                            <span>
                              DOB: {new Date(c.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Domain & Expiry */}
                      <td className="py-4 px-4">
                        {c.domainName ? (
                          <div>
                            <div className="font-semibold text-blue-400 flex items-center gap-1">
                              <Globe className="w-3.5 h-3.5" />
                              <span>{c.domainName}</span>
                            </div>
                            <div className="text-[11px] text-zinc-400 mt-1 space-y-0.5">
                              {c.domainPrice ? (
                                <div className="text-zinc-300 font-medium">Fee: ₹{c.domainPrice.toLocaleString('en-IN')}</div>
                              ) : null}
                              {c.domainExpiryDate && (
                                <div className="flex items-center gap-1 text-amber-400">
                                  <Clock className="w-3 h-3" />
                                  <span>Exp: {new Date(c.domainExpiryDate).toLocaleDateString('en-IN')}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <span className="text-zinc-600">—</span>
                        )}
                      </td>

                      {/* Hosting + Maintenance (Combined Ek Sath) */}
                      <td className="py-4 px-4">
                        {hmPrice > 0 || hmDate ? (
                          <div>
                            <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                              <Server className="w-3.5 h-3.5 text-emerald-400" />
                              <span>₹{hmPrice.toLocaleString('en-IN')}</span>
                              <span className="text-[10px] text-zinc-500">/ {c.billingCycle || 'yr'}</span>
                            </div>
                            {hmDate && (
                              <div className="text-[11px] text-zinc-400 mt-1 flex items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Renewal: {new Date(hmDate).toLocaleDateString('en-IN')}</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-zinc-600">—</span>
                        )}
                      </td>

                      {/* Cycle & Package Amount */}
                      <td className="py-4 px-4 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            {c.billingCycle || 'Yearly'}
                          </span>
                          <span className="font-bold text-white text-xs">
                            ₹{packageAmount.toLocaleString('en-IN')}
                          </span>
                        </div>
                        {c.nextBillingDate && (
                          <div className="text-[11px] text-zinc-400 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                            <span>Next: {new Date(c.nextBillingDate).toLocaleDateString('en-IN')}</span>
                          </div>
                        )}
                      </td>

                      {/* Due Amount & Bakaya Din */}
                      <td className="py-4 px-4">
                        {isDue ? (
                          <div className="space-y-1">
                            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-red-950/40 text-red-400 border border-red-800/40">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>₹{(c.dueAmount || packageAmount).toLocaleString('en-IN')} Due</span>
                            </div>
                            <div className="text-[11px] font-bold text-red-400">
                              {c.overdueDays && c.overdueDays > 0
                                ? `🔴 ${c.overdueDays} Din Se Bakaya`
                                : '🔴 Payment Overdue'}
                            </div>
                          </div>
                        ) : c.daysUntilDue && c.daysUntilDue <= 15 ? (
                          <div className="space-y-1">
                            <span className="inline-flex px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
                              🟡 Due in ${c.daysUntilDue} Days
                            </span>
                            <div className="text-[10px] text-zinc-400">No overdue balance</div>
                          </div>
                        ) : (
                          <div className="space-y-0.5">
                            <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              🟢 Paid / No Dues
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Generate 18% GST Bill / Invoice */}
                          <button
                            onClick={() => setInvoiceClient(c)}
                            title="Generate 18% GST Tax Invoice / PDF"
                            className="px-2.5 py-1.5 rounded-lg bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/30 text-blue-400 font-bold text-xs flex items-center gap-1 transition-all"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Bill (GST)</span>
                          </button>

                          {/* Quick Mark as Paid Button */}
                          <button
                            onClick={() => handleQuickMarkPaid(c)}
                            title="Mark as Paid & Advance Next Renewal Date"
                            className="p-1.5 rounded-lg bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/30 text-emerald-400 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Renewal Notice WhatsApp */}
                          {(c.domainExpiryDate || hmDate) && (
                            <button
                              onClick={() => sendRenewalReminder(c)}
                              title="Send Renewal Notice via WhatsApp"
                              className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 transition-colors"
                            >
                              <Send className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Birthday Wish Button */}
                          {c.dob && (
                            <button
                              onClick={() => sendBirthdayWish(c)}
                              title="Send Birthday Greeting via WhatsApp"
                              className="p-1.5 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-400 transition-colors"
                            >
                              <Cake className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Direct WhatsApp Chat */}
                          {(c.whatsapp || c.phone) && (
                            <a
                              href={`https://wa.me/${(c.whatsapp || c.phone || '').replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              title="WhatsApp Chat"
                              className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 transition-colors"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {/* Edit */}
                          <button
                            onClick={() => openEditModal(c)}
                            title="Edit Client"
                            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => setDeleteId(c._id)}
                            title="Delete Client"
                            className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/40 text-red-400 border border-red-800/40 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e0e0e] border border-white/10 rounded-2xl w-full max-w-2xl p-6 shadow-2xl relative my-8">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 text-zinc-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1 font-space">
              {editingClient ? 'Edit Client Billing & Profile' : 'Add New Custom Agency Client'}
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Set billing cycle (monthly/yearly), domain date, combined hosting+maintenance fees, and due amounts.
            </p>

            <form onSubmit={handleSaveClient} className="space-y-4 text-xs">
              {/* Section 1: Basic Profile */}
              <div className="p-3.5 bg-zinc-900/50 border border-white/5 rounded-xl space-y-3">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                  1. Client & Contact Details
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">Client Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">Company / Brand Name</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Swift Logistics Pvt Ltd"
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@company.com"
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">Phone / WhatsApp Number</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value, whatsapp: e.target.value })}
                      placeholder="e.g. 919876543210"
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-pink-400 mb-1 font-semibold flex items-center gap-1">
                      <Cake className="w-3.5 h-3.5" />
                      <span>Date of Birth (DOB)</span>
                    </label>
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Domain Details */}
              <div className="p-3.5 bg-zinc-900/50 border border-white/5 rounded-xl space-y-3">
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  <span>2. Domain Setup & Expiry</span>
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">Domain Name</label>
                    <input
                      type="text"
                      value={formData.domainName}
                      onChange={(e) => setFormData({ ...formData, domainName: e.target.value })}
                      placeholder="e.g. mybrand.com"
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">Domain Expiry Date</label>
                    <input
                      type="date"
                      value={formData.domainExpiryDate}
                      onChange={(e) => setFormData({ ...formData, domainExpiryDate: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">Domain Price (₹)</label>
                    <input
                      type="number"
                      value={formData.domainPrice}
                      onChange={(e) => setFormData({ ...formData, domainPrice: Number(e.target.value) })}
                      placeholder="e.g. 1200"
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Hosting + Maintenance (Combined Ek Sath) */}
              <div className="p-3.5 bg-zinc-900/50 border border-white/5 rounded-xl space-y-3">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5" />
                  <span>3. Hosting + Maintenance (AMC) Charge Ek Sath</span>
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">
                      Hosting + Maintenance Fee (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.hostingMaintenancePrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hostingMaintenancePrice: Number(e.target.value),
                          amcAmount: Number(e.target.value),
                        })
                      }
                      placeholder="e.g. 12000"
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">
                      Hosting + AMC Renewal Date
                    </label>
                    <input
                      type="date"
                      value={formData.hostingMaintenanceExpiryDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hostingMaintenanceExpiryDate: e.target.value,
                          hostingExpiryDate: e.target.value,
                          amcExpiryDate: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Billing Cycle, Package Amount & Bakaya (Due) */}
              <div className="p-3.5 bg-zinc-900/50 border border-white/5 rounded-xl space-y-3">
                <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>4. Billing Cycle, Package Fee & Bakaya (Due Amount)</span>
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">Billing Cycle</label>
                    <select
                      value={formData.billingCycle}
                      onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value as any })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white font-semibold focus:outline-none focus:border-purple-500"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly (3 Months)</option>
                      <option value="half_yearly">Half-Yearly (6 Months)</option>
                      <option value="yearly">Yearly (Annual)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">
                      Total Package Fee (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.billingAmount}
                      onChange={(e) => setFormData({ ...formData, billingAmount: Number(e.target.value) })}
                      placeholder="e.g. 13200"
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-red-400 mb-1 font-semibold">
                      Bakaya / Due Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.dueAmount}
                      onChange={(e) => setFormData({ ...formData, dueAmount: Number(e.target.value) })}
                      placeholder="0 if all clear"
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white font-bold focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">Next Renewal / Billing Date</label>
                    <input
                      type="date"
                      value={formData.nextBillingDate}
                      onChange={(e) => setFormData({ ...formData, nextBillingDate: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">Payment Status</label>
                    <select
                      value={formData.paymentStatus}
                      onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value as any })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="paid">Paid (All Clear)</option>
                      <option value="pending">Pending</option>
                      <option value="overdue">Overdue (Bakaya)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">Account Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1.5 font-semibold">
                  Subscribed Services (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.servicesList}
                  onChange={(e) => setFormData({ ...formData, servicesList: e.target.value })}
                  placeholder="Custom Web Development, SEO, NGO Compliance, Hosting..."
                  className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1.5 font-semibold">Internal Notes / Requirements</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Key project deliverables, server credentials note, special clauses..."
                  className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-xl shadow-lg shadow-red-950/40"
                >
                  {editingClient ? 'Save Changes' : 'Create Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {invoiceClient && (
        <CrmInvoiceModal
          client={invoiceClient}
          onClose={() => setInvoiceClient(null)}
          onMarkPaidSuccess={() => {
            setInvoiceClient(null)
            fetchClients()
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e0e0e] border border-red-900/40 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h4 className="text-base font-bold text-white mb-2">Delete Client Record?</h4>
            <p className="text-xs text-zinc-400 mb-6">
              Are you sure you want to remove this client? This will delete all linked services, renewal alerts, and records permanently.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteClient}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold"
              >
                Yes, Delete Client
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
