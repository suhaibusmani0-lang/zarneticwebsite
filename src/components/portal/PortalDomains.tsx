'use client'

import React, { useState } from 'react'
import { Globe, ExternalLink, Copy, Check, ShieldCheck, Zap } from 'lucide-react'
import { PortalService } from './types'

interface DomainsProps {
  domains: PortalService[]
  customerPanelUrl: string
}

export function PortalDomains({ domains, customerPanelUrl }: DomainsProps) {
  const [copiedNs, setCopiedNs] = useState<string | null>(null)
  const [selectedDomainDns, setSelectedDomainDns] = useState<PortalService | null>(null)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedNs(text)
    setTimeout(() => setCopiedNs(null), 2000)
  }

  if (domains.length === 0) {
    return (
      <div className="p-16 text-center rounded-3xl bg-white/[0.02] border border-white/5">
        <Globe className="w-12 h-12 text-gray-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-white mb-2">No Domains Found</h3>
        <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
          You haven&apos;t registered any domains under this email yet. Explore available domains starting from ₹499/yr.
        </p>
        <a
          href="/domains"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-blue-600 text-white font-semibold text-xs rounded-xl shadow-lg"
        >
          <span>Find & Register Domain</span>
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {domains.map((dom, idx) => (
        <div
          key={idx}
          className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Globe className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-1">
                <h4 className="text-xl font-bold font-space text-white">{dom.name}</h4>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  {dom.status}
                </span>
              </div>

              <p className="text-xs text-gray-400 mb-3">{dom.details || 'Standard Registration'}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                {dom.expiryDate && (
                  <div>
                    <span className="text-gray-500">Renews on: </span>
                    <span className="text-white font-medium">
                      {new Date(dom.expiryDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {dom.resellerClubOrderId && (
                  <div>
                    <span className="text-gray-500">Provision ID: </span>
                    <span className="text-blue-400 font-mono">{dom.resellerClubOrderId}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setSelectedDomainDns(dom)}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Nameservers / DNS</span>
            </button>

            <a
              href={customerPanelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-950/40 transition cursor-pointer"
            >
              <span>Manage DNS & Control Panel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      ))}

      {/* DNS Records Modal */}
      {selectedDomainDns && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#0F1420] border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedDomainDns(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-xl bg-white/5 cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold font-space text-white mb-1">
              DNS Configuration: {selectedDomainDns.name}
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Assigned global Anycast Nameservers for fast DNS propagation worldwide.
            </p>

            <div className="space-y-3 mb-6">
              {['ns1.zarnetic.com', 'ns2.zarnetic.com'].map((ns) => (
                <div
                  key={ns}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono"
                >
                  <span className="text-white font-medium">{ns}</span>
                  <button
                    onClick={() => handleCopy(ns)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition cursor-pointer"
                    title="Copy Nameserver"
                  >
                    {copiedNs === ns ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200 mb-6 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white mb-1">Advanced DNS Editor (A, CNAME, MX)</p>
                <p className="text-gray-300 text-[11px]">
                  To create custom subdomains, MX email records, or point to Shopify / Vercel, click below to open your control panel.
                </p>
              </div>
            </div>

            <a
              href={customerPanelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
            >
              <span>Open Customer Control Panel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
