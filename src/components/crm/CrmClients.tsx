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
} from 'lucide-react'

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
  hostingExpiryDate?: string
  amcExpiryDate?: string
  amcAmount?: number
  sslExpiryDate?: string
  status: 'active' | 'inactive' | 'pending'
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
    hostingExpiryDate: '',
    amcExpiryDate: '',
    amcAmount: 0,
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
      hostingExpiryDate: '',
      amcExpiryDate: '',
      amcAmount: 0,
      sslExpiryDate: '',
      status: 'active',
      notes: '',
      servicesList: 'Custom Web Development',
    })
    setShowAddModal(true)
  }

  const openEditModal = (client: ClientData) => {
    setEditingClient(client)
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
      hostingExpiryDate: client.hostingExpiryDate ? client.hostingExpiryDate.split('T')[0] : '',
      amcExpiryDate: client.amcExpiryDate ? client.amcExpiryDate.split('T')[0] : '',
      amcAmount: client.amcAmount || 0,
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
      const payload = {
        ...formData,
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
  const sendRenewalReminder = (client: ClientData, type: 'domain' | 'hosting' | 'amc') => {
    const phone = (client.whatsapp || client.phone || '').replace(/[^0-9]/g, '')
    if (!phone) {
      alert('Client does not have a phone/WhatsApp number added.')
      return
    }
    const cleanPhone = phone.startsWith('91') || phone.length > 10 ? phone : `91${phone}`

    let expiryDate = client.domainExpiryDate
    let serviceLabel = `Domain (${client.domainName || 'Registered Domain'})`

    if (type === 'hosting') {
      expiryDate = client.hostingExpiryDate
      serviceLabel = `Cloud Hosting Plan`
    } else if (type === 'amc') {
      expiryDate = client.amcExpiryDate
      serviceLabel = `Annual Website AMC (₹${client.amcAmount || 0})`
    }

    const formattedDate = expiryDate ? new Date(expiryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Soon'

    const message = encodeURIComponent(
      `Hello ${client.name},\n\nThis is an official renewal reminder from Zarnetic.\nYour ${serviceLabel} is scheduled to expire on ${formattedDate}.\n\nTo prevent any downtime or service suspension, please renew your service at:\nhttps://zarnetic.com/client-portal\n\nOr reply here to generate an instant renewal UPI payment link.\n\nBest regards,\nBilling Desk, Zarnetic`
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
                  <th className="py-3.5 px-4">Hosting & AMC</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {clients.map((c) => {
                  const bdayInfo = getBirthdayInfo(c.dob)
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
                              <Globe className="w-3 h-3" />
                              <span>{c.domainName}</span>
                            </div>
                            {c.domainExpiryDate && (
                              <div className="text-[11px] text-zinc-400 mt-1 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-amber-400" />
                                <span>Exp: {new Date(c.domainExpiryDate).toLocaleDateString('en-IN')}</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-zinc-600">—</span>
                        )}
                      </td>

                      {/* Hosting & AMC */}
                      <td className="py-4 px-4 space-y-1">
                        {c.hostingExpiryDate && (
                          <div className="text-[11px] text-zinc-300 flex items-center gap-1">
                            <Server className="w-3 h-3 text-purple-400" />
                            <span>Hosting: {new Date(c.hostingExpiryDate).toLocaleDateString('en-IN')}</span>
                          </div>
                        )}
                        {c.amcExpiryDate && (
                          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                            <span>AMC: ₹{c.amcAmount || 0} ({new Date(c.amcExpiryDate).toLocaleDateString('en-IN')})</span>
                          </div>
                        )}
                        {!c.hostingExpiryDate && !c.amcExpiryDate && (
                          <span className="text-zinc-600">—</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            c.status === 'active'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
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

                          {/* Renewal Reminder Button */}
                          {(c.domainExpiryDate || c.hostingExpiryDate || c.amcExpiryDate) && (
                            <button
                              onClick={() =>
                                sendRenewalReminder(
                                  c,
                                  c.amcExpiryDate ? 'amc' : c.domainExpiryDate ? 'domain' : 'hosting'
                                )
                              }
                              title="Send Renewal Notice via WhatsApp"
                              className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 transition-colors"
                            >
                              <Send className="w-3.5 h-3.5" />
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

                          {/* Edit (Available for custom clients) */}
                          <button
                            onClick={() => openEditModal(c)}
                            title="Edit Client"
                            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete (Available for custom clients) */}
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
              {editingClient ? 'Edit Client Profile' : 'Add New Custom Agency Client'}
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Enter client credentials, DOB, domain/hosting expiry dates, and AMC terms.
            </p>

            <form onSubmit={handleSaveClient} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 mb-1.5 font-semibold">Client Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1.5 font-semibold">Company / Brand Name</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Swift Logistics Pvt Ltd"
                    className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1.5 font-semibold">Email Address *</label>
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
                  <label className="block text-zinc-400 mb-1.5 font-semibold">Phone / WhatsApp Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value, whatsapp: e.target.value })}
                    placeholder="e.g. 919876543210"
                    className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-pink-400 mb-1.5 font-semibold flex items-center gap-1">
                    <Cake className="w-3.5 h-3.5" />
                    <span>Client Date of Birth (DOB)</span>
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                {/* Primary Domain */}
                <div>
                  <label className="block text-blue-400 mb-1.5 font-semibold flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Primary Domain Name</span>
                  </label>
                  <input
                    type="text"
                    value={formData.domainName}
                    onChange={(e) => setFormData({ ...formData, domainName: e.target.value })}
                    placeholder="e.g. mycompany.com"
                    className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Domain Expiry Date */}
                <div>
                  <label className="block text-zinc-400 mb-1.5 font-semibold">Domain Expiry Date</label>
                  <input
                    type="date"
                    value={formData.domainExpiryDate}
                    onChange={(e) => setFormData({ ...formData, domainExpiryDate: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                {/* Hosting Expiry Date */}
                <div>
                  <label className="block text-zinc-400 mb-1.5 font-semibold">Hosting Expiry Date</label>
                  <input
                    type="date"
                    value={formData.hostingExpiryDate}
                    onChange={(e) => setFormData({ ...formData, hostingExpiryDate: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                {/* AMC Contract Amount */}
                <div>
                  <label className="block text-emerald-400 mb-1.5 font-semibold">Annual AMC Fee (₹)</label>
                  <input
                    type="number"
                    value={formData.amcAmount}
                    onChange={(e) => setFormData({ ...formData, amcAmount: Number(e.target.value) })}
                    placeholder="e.g. 15000"
                    className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* AMC Expiry Date */}
                <div>
                  <label className="block text-emerald-400 mb-1.5 font-semibold">AMC Expiry / Renewal Date</label>
                  <input
                    type="date"
                    value={formData.amcExpiryDate}
                    onChange={(e) => setFormData({ ...formData, amcExpiryDate: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  />
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
