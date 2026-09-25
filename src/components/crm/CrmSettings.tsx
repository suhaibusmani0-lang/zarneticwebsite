'use client'

import React from 'react'
import { Globe, Upload, Server, ShieldAlert } from 'lucide-react'

export function CrmSettings() {
  return (
    <div className="max-w-4xl space-y-6">
      <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-6 h-6 text-blue-400" />
          <div>
            <h3 className="text-lg font-bold text-white">ResellerClub HTTP REST API</h3>
            <p className="text-xs text-gray-400">Domain & Web Hosting Gateway</p>
          </div>
        </div>

        <div className="space-y-3 text-xs bg-black/40 p-4 rounded-2xl border border-white/5 font-mono mb-4">
          <div className="flex justify-between">
            <span className="text-gray-400">API Key:</span>
            <span className="text-emerald-400">D5SHagYXLWwup...MaMiE (Configured)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Reseller User ID:</span>
            <span className="text-amber-400 font-bold">Needs Reseller ID from WebPro Panel</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
          <p className="font-bold mb-1 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4" />
            Important ResellerClub Setup Steps:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-amber-300/90">
            <li>Apne ResellerClub / WebPro panel me jaakar top right se apna <strong>Reseller ID</strong> copy karein aur <code>.env.local</code> me <code>RESELLERCLUB_AUTH_USER_ID</code> me paste karein.</li>
            <li>Apne WebPro panel me <strong>Settings ➔ Pro-Suite ➔ API Settings</strong> me jakar apna server/system IP address <strong>Whitelist</strong> karein.</li>
          </ol>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <Upload className="w-6 h-6 text-purple-400" />
          <div>
            <h3 className="text-lg font-bold text-white">Cloudinary Storage CDN</h3>
            <p className="text-xs text-gray-400">Proposals, Client Invoices, and Documents</p>
          </div>
        </div>

        <div className="space-y-2 text-xs bg-black/40 p-4 rounded-2xl border border-white/5 font-mono">
          <div className="flex justify-between">
            <span className="text-gray-400">Cloud Name:</span>
            <span className="text-emerald-400">tlqdif3h (Connected)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">API Key:</span>
            <span className="text-emerald-400">993538721635369 (Verified)</span>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <Server className="w-6 h-6 text-emerald-400" />
          <div>
            <h3 className="text-lg font-bold text-white">MongoDB Atlas Database</h3>
            <p className="text-xs text-gray-400">Leads, Clients, Services, and Orders Collections</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200">
          <p>
            MongoDB URI configure hai <code>.env.local</code> me. Bas aapko apna database user password <code>&lt;db_password&gt;</code> ki jagah replace karna hai.
          </p>
        </div>
      </div>
    </div>
  )
}
