'use client'

import React from 'react'
import { Server, ExternalLink, HardDrive, Cpu, Layers, ShieldCheck, Mail, Database, FolderGit2 } from 'lucide-react'
import { PortalService } from './types'

interface HostingProps {
  hosting: PortalService[]
  customerPanelUrl: string
}

export function PortalHosting({ hosting, customerPanelUrl }: HostingProps) {
  if (hosting.length === 0) {
    return (
      <div className="p-16 text-center rounded-3xl bg-white/[0.02] border border-white/5">
        <Server className="w-12 h-12 text-gray-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-white mb-2">No Active Hosting Plans</h3>
        <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
          You don&apos;t have any active cloud hosting containers yet. Deploy high-speed NVMe hosting starting from ₹99/mo.
        </p>
        <a
          href="/hosting"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-xs rounded-xl shadow-lg"
        >
          <span>Explore Hosting Plans</span>
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {hosting.map((host, idx) => (
        <div
          key={idx}
          className="p-6 md:p-8 rounded-3xl bg-[#0D111A] border border-white/10 hover:border-purple-500/40 transition"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 mb-6 border-b border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-purple-900/40">
                <Server className="w-7 h-7" />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="text-2xl font-bold font-space text-white">{host.name}</h4>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    {host.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{host.details || 'Enterprise Cloud Container'}</p>
                {host.resellerClubOrderId && (
                  <p className="text-[11px] text-gray-500 mt-1 font-mono">
                    Provision ID: {host.resellerClubOrderId}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={customerPanelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-red-950/40 transition cursor-pointer"
              >
                <span>Access cPanel / Server Control</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                <span>Storage</span>
              </div>
              <div className="font-bold text-white text-sm">NVMe Gen4 SSD</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span>RAM & Speed</span>
              </div>
              <div className="font-bold text-white text-sm">LiteSpeed + LSCache</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>SSL Security</span>
              </div>
              <div className="font-bold text-emerald-400 text-sm">Active & Auto-Renew</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Uptime SLA</span>
              </div>
              <div className="font-bold text-white text-sm">99.9% High Availability</div>
            </div>
          </div>

          {/* Quick Access Tools */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs">
            <span className="text-gray-400 font-medium">Quick 1-Click Access:</span>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={customerPanelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white flex items-center gap-1.5 transition"
              >
                <FolderGit2 className="w-3.5 h-3.5 text-blue-400" />
                <span>File Manager</span>
              </a>
              <a
                href={customerPanelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white flex items-center gap-1.5 transition"
              >
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>phpMyAdmin (MySQL)</span>
              </a>
              <a
                href={customerPanelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white flex items-center gap-1.5 transition"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>Business Webmail</span>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
