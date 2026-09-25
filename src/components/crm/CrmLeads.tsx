'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileSpreadsheet,
  Plus,
  Search,
  CheckCircle2,
  Briefcase,
  UserCheck,
  RefreshCw,
  Loader2,
  Check,
  Upload,
  Download,
  ArrowRight,
} from 'lucide-react'
import { LeadItem, STAGES } from './types'

interface LeadsProps {
  leads: LeadItem[]
  leadsLoading: boolean
  leadSearch: string
  setLeadSearch: (s: string) => void
  selectedStage: string
  setSelectedStage: (s: string) => void
  stageCounts: Record<string, number>
  fetchLeads: () => void
  onLeadConverted: () => void
}

export function CrmLeads({
  leads,
  leadsLoading,
  leadSearch,
  setLeadSearch,
  selectedStage,
  setSelectedStage,
  stageCounts,
  fetchLeads,
  onLeadConverted,
}: LeadsProps) {
  const [convertingLeadId, setConvertingLeadId] = useState<string | null>(null)
  const [showAddLeadModal, setShowAddLeadModal] = useState(false)
  const [showImportExcelModal, setShowImportExcelModal] = useState(false)

  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceInterested: 'Web Development & Hosting',
    budget: '',
    notes: '',
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadingExcel, setUploadingExcel] = useState(false)
  const [importSummary, setImportSummary] = useState<string | null>(null)

  const handleUpdateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/crm/leads/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        fetchLeads()
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleConvertLead = async (lead: LeadItem) => {
    if (lead.status === 'Converted') {
      alert('This lead is already converted to a client!')
      return
    }

    if (!confirm(`Are you sure you want to convert "${lead.name}" to an official Client?`)) {
      return
    }

    setConvertingLeadId(lead._id)
    try {
      const res = await fetch(`/api/crm/leads/${lead._id}/convert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      if (res.ok && data.success) {
        alert(`🎉 Success! ${lead.name} is now an official Client!`)
        fetchLeads()
        onLeadConverted()
      } else {
        alert(data.error || 'Failed to convert lead')
      }
    } catch (e) {
      alert('Conversion failed due to network error')
    } finally {
      setConvertingLeadId(null)
    }
  }

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/crm/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setShowAddLeadModal(false)
        setNewLead({
          name: '',
          email: '',
          phone: '',
          company: '',
          serviceInterested: 'Web Development & Hosting',
          budget: '',
          notes: '',
        })
        fetchLeads()
        onLeadConverted()
      } else {
        alert(data.error || 'Failed to create lead')
      }
    } catch (e) {
      alert('Error creating lead')
    }
  }

  const handleExcelImport = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return

    setUploadingExcel(true)
    setImportSummary(null)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const res = await fetch('/api/crm/leads/import', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()

      if (res.ok && data.success) {
        setImportSummary(`✅ ${data.message}`)
        fetchLeads()
        onLeadConverted()
        setTimeout(() => {
          setShowImportExcelModal(false)
          setSelectedFile(null)
          setImportSummary(null)
        }, 2000)
      } else {
        alert(data.error || 'Excel parsing failed')
      }
    } catch (e) {
      alert('Upload error')
    } finally {
      setUploadingExcel(false)
    }
  }

  return (
    <div>
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          <button
            onClick={() => {
              setSelectedStage('all')
              fetchLeads()
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition ${
              selectedStage === 'all'
                ? 'bg-white text-black font-bold'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            All ({leads.length})
          </button>

          {STAGES.map((stg) => {
            const count = stageCounts[stg] || 0
            return (
              <button
                key={stg}
                onClick={() => {
                  setSelectedStage(stg)
                  fetchLeads()
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition flex items-center gap-1.5 ${
                  selectedStage === stg
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                <span>{stg}</span>
                <span className="text-[10px] bg-black/40 px-1.5 py-0.2 rounded-full font-mono">
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowImportExcelModal(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-xs font-semibold text-white flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Import Excel</span>
          </button>
          <button
            onClick={() => setShowAddLeadModal(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-xs font-semibold text-white flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={leadSearch}
            onChange={(e) => setLeadSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchLeads()}
            placeholder="Search leads by name, email, company, phone..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          onClick={fetchLeads}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${leadsLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Leads List */}
      {leadsLoading ? (
        <div className="p-16 text-center text-gray-400 flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-sm">Loading leads from MongoDB...</p>
        </div>
      ) : leads.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-white/[0.02] border border-white/5">
          <FileSpreadsheet className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">No Leads Found</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
            You haven&apos;t added any leads in this filter. Upload an Excel file or add a lead directly.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setShowImportExcelModal(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white rounded-xl cursor-pointer"
            >
              Import Excel File
            </button>
            <button
              onClick={() => setShowAddLeadModal(true)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-medium text-white rounded-xl cursor-pointer"
            >
              Add Single Lead
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {leads.map((lead) => {
            const isConverted = lead.status === 'Converted'
            return (
              <div
                key={lead._id}
                className="p-4 md:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center text-base font-bold font-space shrink-0 ${
                      isConverted
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}
                  >
                    {lead.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-base font-bold text-white tracking-wide">
                        {lead.name}
                      </span>
                      {lead.company && (
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Briefcase className="w-3 h-3 text-gray-500" />
                          {lead.company}
                        </span>
                      )}
                      <span className="text-[10px] bg-white/5 text-gray-400 px-2 py-0.5 rounded-full border border-white/5">
                        {lead.source}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 mt-1">
                      <span>{lead.email}</span>
                      {lead.phone && <span>• {lead.phone}</span>}
                      {lead.budget && (
                        <span className="text-amber-400 font-medium">• Budget: {lead.budget}</span>
                      )}
                      {lead.serviceInterested && (
                        <span className="text-blue-400">• Req: {lead.serviceInterested}</span>
                      )}
                    </div>

                    {lead.notes && (
                      <p className="text-xs text-gray-500 mt-2 bg-black/30 px-3 py-1.5 rounded-lg border border-white/5">
                        {lead.notes}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/5">
                  <select
                    value={lead.status}
                    onChange={(e) => handleUpdateLeadStatus(lead._id, e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-gray-200 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    {STAGES.map((s) => (
                      <option key={s} value={s} className="bg-[#0F1420] text-white">
                        {s}
                      </option>
                    ))}
                  </select>

                  {isConverted ? (
                    <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Converted Client</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleConvertLead(lead)}
                      disabled={convertingLeadId === lead._id}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-950/40 transition cursor-pointer disabled:opacity-50"
                    >
                      {convertingLeadId === lead._id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <UserCheck className="w-3.5 h-3.5" />
                      )}
                      <span>Convert to Client</span>
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add Lead Modal */}
      <AnimatePresence>
        {showAddLeadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#0F1420] border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setShowAddLeadModal(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-xl bg-white/5 cursor-pointer"
              >
                ✕
              </button>

              <h3 className="text-xl font-bold font-space text-white mb-6">Add New Sales Lead</h3>

              <form onSubmit={handleCreateLead} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newLead.name}
                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={newLead.email}
                      onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                      placeholder="rahul@example.com"
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={newLead.phone}
                      onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Company</label>
                    <input
                      type="text"
                      value={newLead.company}
                      onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                      placeholder="e.g. Apex Media"
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Budget</label>
                    <input
                      type="text"
                      value={newLead.budget}
                      onChange={(e) => setNewLead({ ...newLead, budget: e.target.value })}
                      placeholder="₹50,000"
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Service Interested</label>
                  <input
                    type="text"
                    value={newLead.serviceInterested}
                    onChange={(e) => setNewLead({ ...newLead, serviceInterested: e.target.value })}
                    placeholder="Custom Web App + Domain + Hosting"
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Notes</label>
                  <textarea
                    rows={2}
                    value={newLead.notes}
                    onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                    placeholder="Client requirements, meeting notes, etc."
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-semibold rounded-xl text-sm transition cursor-pointer shadow-lg mt-2"
                >
                  Save Lead
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Import Excel Modal */}
      <AnimatePresence>
        {showImportExcelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#0F1420] border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => {
                  setShowImportExcelModal(false)
                  setSelectedFile(null)
                  setImportSummary(null)
                }}
                className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-xl bg-white/5 cursor-pointer"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-space text-white">Import Leads from Excel</h3>
                  <p className="text-xs text-gray-400">Supports .xlsx, .xls, and .csv files</p>
                </div>
              </div>

              {importSummary ? (
                <div className="py-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Import Successful!</h4>
                  <p className="text-xs text-gray-300">{importSummary}</p>
                </div>
              ) : (
                <form onSubmit={handleExcelImport} className="mt-6 space-y-5">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-white/20 hover:border-emerald-500/50 rounded-2xl p-8 text-center cursor-pointer transition bg-white/[0.02]"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".xlsx, .xls, .csv"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) setSelectedFile(e.target.files[0])
                      }}
                    />
                    <Upload className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                    {selectedFile ? (
                      <div>
                        <p className="text-sm font-bold text-white">{selectedFile.name}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {(selectedFile.size / 1024).toFixed(1)} KB • Click to change
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Click to select or drag & drop Excel sheet
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Auto-detects Name, Email, Phone, Company, Service, Budget
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Don&apos;t have a file ready?</span>
                    <button
                      type="button"
                      onClick={() => (window.location.href = '/api/crm/leads/sample-excel')}
                      className="text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download Sample Excel</span>
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={!selectedFile || uploadingExcel}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer disabled:opacity-50"
                  >
                    {uploadingExcel ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Parsing & Importing Leads...</span>
                      </>
                    ) : (
                      <>
                        <span>Start Batch Import</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
