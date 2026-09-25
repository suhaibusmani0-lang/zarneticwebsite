'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Globe, ArrowRight, ShieldCheck, Server, UserCheck } from 'lucide-react'
import Link from 'next/link'

export function HomeDomainSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return
    router.push(`/domains?domain=${encodeURIComponent(searchTerm.trim())}`)
  }

  return (
    <section className="w-full py-12 relative z-20 -mt-10 mb-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-500" />
          <div className="relative bg-[#0D111A]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
            {/* Header with Quick Navigation Links */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-1.5 mb-1">
                  <Globe className="w-3.5 h-3.5" />
                  <span>ResellerClub Official Cloud Gateway</span>
                </span>
                <h3 className="text-xl md:text-2xl font-bold font-space text-white">
                  Search & Buy Your Domain Online
                </h3>
              </div>

              {/* Direct Service Quick Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="/domains"
                  className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 transition"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span>Domain Search</span>
                </Link>
                <Link
                  href="/hosting"
                  className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 transition"
                >
                  <Server className="w-3.5 h-3.5 text-purple-400" />
                  <span>Cloud Hosting</span>
                </Link>
                <Link
                  href="/client-portal"
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-xs font-semibold text-blue-300 flex items-center gap-1.5 transition"
                >
                  <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Client Portal</span>
                </Link>
              </div>
            </div>

            {/* Quick Search Form */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter your ideal domain name (e.g. zarnetic.com)..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm md:text-base focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 font-bold rounded-2xl text-white text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer shrink-0"
              >
                <span>Check Availability</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Popular TLD Badges */}
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-5 pt-5 border-t border-white/5 text-xs text-gray-400">
              <span className="font-medium text-gray-300">Popular TLDs:</span>
              <Link href="/domains" className="hover:text-white transition">
                <strong className="text-white">.com</strong> ₹899/yr
              </Link>
              <span>•</span>
              <Link href="/domains" className="hover:text-white transition">
                <strong className="text-white">.in</strong> ₹499/yr
              </Link>
              <span>•</span>
              <Link href="/domains" className="hover:text-white transition">
                <strong className="text-white">.net</strong> ₹999/yr
              </Link>
              <span>•</span>
              <Link href="/domains" className="hover:text-white transition">
                <strong className="text-white">.org</strong> ₹949/yr
              </Link>
              <span>•</span>
              <Link href="/domains" className="hover:text-white transition">
                <strong className="text-white">.io</strong> ₹3,499/yr
              </Link>
              <span>•</span>
              <Link href="/domains" className="hover:text-white transition">
                <strong className="text-white">.ai</strong> ₹6,499/yr
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
