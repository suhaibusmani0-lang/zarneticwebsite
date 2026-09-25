'use client'

import React from 'react'
import { TrendingUp, UserCheck, CheckCircle2, Globe, Clock } from 'lucide-react'
import { ActivityItem } from './types'

interface OverviewProps {
  stats: {
    totalLeads: number
    totalClients: number
    totalOrders: number
    convertedLeads: number
    conversionRate: number
    totalRevenue: number
  }
  activities: ActivityItem[]
}

export function CrmOverview({ stats, activities }: OverviewProps) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-400 uppercase font-semibold">Total Leads</span>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black font-space text-white">{stats.totalLeads}</div>
          <div className="text-[11px] text-gray-400 mt-1">Across all campaigns</div>
        </div>

        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-400 uppercase font-semibold">Active Clients</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black font-space text-white">{stats.totalClients}</div>
          <div className="text-[11px] text-emerald-400 mt-1">Converted accounts</div>
        </div>

        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-400 uppercase font-semibold">Conversion Rate</span>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black font-space text-white">{stats.conversionRate}%</div>
          <div className="text-[11px] text-purple-400 mt-1">Lead to client wins</div>
        </div>

        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-400 uppercase font-semibold">Store Orders</span>
            <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400">
              <Globe className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black font-space text-white">{stats.totalOrders}</div>
          <div className="text-[11px] text-gray-400 mt-1">Domains & Cloud hosting</div>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10">
        <h3 className="text-lg font-bold font-space text-white mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-400" />
          <span>Real-time Activity Stream</span>
        </h3>

        {activities.length === 0 ? (
          <p className="text-xs text-gray-500">No activity logged yet.</p>
        ) : (
          <div className="space-y-3">
            {activities.map((act) => (
              <div
                key={act._id}
                className="flex items-start justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs"
              >
                <div>
                  <span className="font-bold text-white mr-2">[{act.action}]</span>
                  <span className="text-gray-300">{act.description}</span>
                </div>
                <span className="text-[10px] text-gray-500 shrink-0 ml-4">
                  {new Date(act.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
