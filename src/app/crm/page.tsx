'use client'

import React, { useState, useEffect } from 'react'
import {
  Users,
  UserCheck,
  TrendingUp,
  SlidersHorizontal,
  Clock,
  Sparkles,
  LogOut,
  ShieldCheck,
  Building,
  Globe,
} from 'lucide-react'
import { LeadItem, ActivityItem } from '@/components/crm/types'
import { CrmOverview } from '@/components/crm/CrmOverview'
import { CrmLeads } from '@/components/crm/CrmLeads'
import { CrmClients } from '@/components/crm/CrmClients'
import { CrmPortfolio } from '@/components/crm/CrmPortfolio'
import { CrmRenewals } from '@/components/crm/CrmRenewals'
import { CrmSettings } from '@/components/crm/CrmSettings'
import { CrmAdminLogin } from '@/components/crm/CrmAdminLogin'

export default function CRMPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [activeTab, setActiveTab] = useState<'clients' | 'renewals' | 'portfolio' | 'leads' | 'overview' | 'settings'>('clients')

  const [stats, setStats] = useState({
    totalLeads: 0,
    totalClients: 0,
    totalOrders: 0,
    convertedLeads: 0,
    conversionRate: 0,
    totalRevenue: 0,
  })
  const [activities, setActivities] = useState<ActivityItem[]>([])

  const [leads, setLeads] = useState<LeadItem[]>([])
  const [leadsLoading, setLeadsLoading] = useState(false)
  const [leadSearch, setLeadSearch] = useState('')
  const [selectedStage, setSelectedStage] = useState('all')
  const [stageCounts, setStageCounts] = useState<Record<string, number>>({})

  // Check Admin Session on Mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/check')
        const data = await res.json()
        setIsAuthenticated(!!data.authenticated)
      } catch {
        setIsAuthenticated(false)
      }
    }
    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats()
      fetchLeads()
    }
  }, [isAuthenticated])

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
    } catch {}
    setIsAuthenticated(false)
  }

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/crm/stats')
      const data = await res.json()
      if (data.success) {
        setStats(data.stats)
        setActivities(data.recentActivities || [])
      }
    } catch (e) {
      console.error(e)
    }
  }

  const fetchLeads = async () => {
    setLeadsLoading(true)
    try {
      const url = new URL('/api/crm/leads', window.location.origin)
      if (leadSearch) url.searchParams.set('search', leadSearch)
      if (selectedStage && selectedStage !== 'all') url.searchParams.set('status', selectedStage)

      const res = await fetch(url.toString())
      const data = await res.json()
      if (data.success) {
        setLeads(data.leads || [])
        if (data.counts) setStageCounts(data.counts)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLeadsLoading(false)
    }
  }

  // If still checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center">
        <span className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // If not authenticated, render Admin Login screen
  if (!isAuthenticated) {
    return <CrmAdminLogin onSuccess={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="min-h-screen bg-[#040404] text-white pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-semibold">
                Zarnetic Enterprise CRM • Admin Panel
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-space text-white">
              Agency Master Operations & Automation
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400 bg-zinc-900 border border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin Logged In</span>
            </span>

            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-red-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Master Tab Switcher */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#0e0e0e] border border-white/10 w-fit mb-8 overflow-x-auto max-w-full shadow-lg">
          {[
            { id: 'clients', label: 'Clients Directory', icon: UserCheck },
            { id: 'renewals', label: 'Expiry & Renewals', icon: Clock },
            { id: 'portfolio', label: 'Portfolio CMS', icon: Sparkles },
            { id: 'leads', label: 'Leads & Excel Import', icon: TrendingUp },
            { id: 'overview', label: 'KPI Analytics', icon: Users },
            { id: 'settings', label: 'API Integrations', icon: SlidersHorizontal },
          ].map((tab) => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-2 transition cursor-pointer shrink-0 ${
                  active
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-950/40'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'clients' && <CrmClients />}

        {activeTab === 'renewals' && <CrmRenewals />}

        {activeTab === 'portfolio' && <CrmPortfolio />}

        {activeTab === 'leads' && (
          <CrmLeads
            leads={leads}
            leadsLoading={leadsLoading}
            leadSearch={leadSearch}
            setLeadSearch={setLeadSearch}
            selectedStage={selectedStage}
            setSelectedStage={setSelectedStage}
            stageCounts={stageCounts}
            fetchLeads={fetchLeads}
            onLeadConverted={() => {
              fetchStats()
            }}
          />
        )}

        {activeTab === 'overview' && (
          <CrmOverview stats={stats} activities={activities} />
        )}

        {activeTab === 'settings' && <CrmSettings />}
      </div>
    </div>
  )
}
