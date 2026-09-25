'use client'

import React, { useState, useEffect } from 'react'
import {
  Globe,
  Server,
  FileText,
  LogOut,
  User,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
} from 'lucide-react'
import { PortalClient, PortalService, PortalOrder } from '@/components/portal/types'
import { PortalLogin } from '@/components/portal/PortalLogin'
import { PortalDomains } from '@/components/portal/PortalDomains'
import { PortalHosting } from '@/components/portal/PortalHosting'
import { PortalInvoices } from '@/components/portal/PortalInvoices'

export default function ClientPortalPage() {
  const [activeTab, setActiveTab] = useState<'domains' | 'hosting' | 'invoices'>('domains')
  const [clientEmail, setClientEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Data states
  const [client, setClient] = useState<PortalClient | null>(null)
  const [domains, setDomains] = useState<PortalService[]>([])
  const [hosting, setHosting] = useState<PortalService[]>([])
  const [orders, setOrders] = useState<PortalOrder[]>([])
  const [customerPanelUrl, setCustomerPanelUrl] = useState<string>('https://rclubindia.webpropanel.com')

  // Check saved session on mount
  useEffect(() => {
    const saved = localStorage.getItem('zarnetic_client_email')
    if (saved) {
      handleFetchServices(saved)
    }
  }, [])

  const handleFetchServices = async (email: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/client-portal/services?email=${encodeURIComponent(email)}`)
      const data = await res.json()

      if (res.ok && data.success) {
        setClient(data.client)
        setDomains(data.domains || [])
        setHosting(data.hosting || [])
        setOrders(data.orders || [])
        if (data.customerPanelUrl) setCustomerPanelUrl(data.customerPanelUrl)
        setClientEmail(email)
        localStorage.setItem('zarnetic_client_email', email)
      } else {
        setError(data.error || 'Failed to find records for this email.')
      }
    } catch (e: any) {
      setError('Network connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('zarnetic_client_email')
    setClientEmail(null)
    setClient(null)
    setDomains([])
    setHosting([])
    setOrders([])
  }

  // If not logged in, show sleek login
  if (!clientEmail || !client) {
    return (
      <div className="min-h-screen bg-[#07090E] text-white pt-28 pb-20 px-4">
        <PortalLogin onLogin={handleFetchServices} loading={loading} error={error} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#07090E] text-white pt-28 pb-24">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Top Header Card */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#0D111A] border border-white/10 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-purple-600 to-red-600 flex items-center justify-center text-white text-2xl font-bold font-space shrink-0 shadow-lg">
              {client.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400">
                  Client Dashboard Active
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold font-space text-white">
                {client.name}
              </h1>
              <p className="text-xs text-gray-400">{client.email} {client.company ? `• ${client.company}` : ''}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={customerPanelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-950/40 transition cursor-pointer"
            >
              <span>Access cPanel & Web Control</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => handleFetchServices(clientEmail)}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition cursor-pointer"
              title="Refresh My Services"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 w-fit mb-8 overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('domains')}
            className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-2 transition cursor-pointer shrink-0 ${
              activeTab === 'domains'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>My Active Domains ({domains.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('hosting')}
            className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-2 transition cursor-pointer shrink-0 ${
              activeTab === 'hosting'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>My Cloud Hosting ({hosting.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-2 transition cursor-pointer shrink-0 ${
              activeTab === 'invoices'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Tax Invoices & Billing ({orders.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'domains' && (
          <PortalDomains domains={domains} customerPanelUrl={customerPanelUrl} />
        )}

        {activeTab === 'hosting' && (
          <PortalHosting hosting={hosting} customerPanelUrl={customerPanelUrl} />
        )}

        {activeTab === 'invoices' && (
          <PortalInvoices orders={orders} client={client} />
        )}
      </div>
    </div>
  )
}
