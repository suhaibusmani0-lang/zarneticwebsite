'use client'

import React, { useState } from 'react'
import { ShieldCheck, Mail, ArrowRight, Loader2 } from 'lucide-react'

interface LoginProps {
  onLogin: (email: string) => Promise<void>
  loading: boolean
  error: string | null
}

export function PortalLogin({ onLogin, loading, error }: LoginProps) {
  const [emailInput, setEmailInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailInput.trim()) return
    onLogin(emailInput.trim())
  }

  return (
    <div className="max-w-md mx-auto py-16">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-500" />
        <div className="relative bg-[#0D111A] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-red-600 flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-blue-900/40">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold font-space text-white mb-2">Zarnetic Client Suite</h2>
          <p className="text-xs text-gray-400 mb-8">
            Enter your registered email address to access your active domains, hosting containers, and invoices.
          </p>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 text-left">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="e.g. suhaib@zarnetic.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Account...</span>
                </>
              ) : (
                <>
                  <span>Enter My Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-[11px] text-gray-500 mt-6">
            Instant 1-Click Access • Protected by 256-bit encryption
          </p>
        </div>
      </div>
    </div>
  )
}
