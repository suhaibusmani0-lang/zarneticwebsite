'use client'

import React, { useState, useEffect } from 'react'
import {
  FolderPlus,
  Edit2,
  Trash2,
  ExternalLink,
  Plus,
  X,
  Upload,
  CheckCircle2,
  Sparkles,
  Layers,
  Globe,
  Tag,
  Calendar,
  MessageSquare,
  Search,
  RefreshCw,
} from 'lucide-react'

interface PortfolioItem {
  _id?: string
  title: string
  slug: string
  clientName: string
  category: string
  brief: string
  logoUrl?: string
  bannerUrl?: string
  url?: string
  challenge?: string
  solution?: string
  results: string[]
  techStack: string[]
  timeline?: string
  testimonial?: { quote: string; author: string; role: string }
  isPremium: boolean
  featured: boolean
}

export function CrmPortfolio() {
  const [projects, setProjects] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [uploadingLogo, setUploadingLogo] = useState(false)

  // Form State
  const [form, setForm] = useState({
    title: '',
    slug: '',
    clientName: '',
    category: 'Web Development',
    brief: '',
    logoUrl: '',
    bannerUrl: '',
    url: '',
    timeline: '4-8 weeks',
    challenge: '',
    solution: '',
    resultsText: '+140% Conversion Rate\n99.99% Uptime Architecture\n50% Faster Page Loads',
    techStackText: 'Next.js, TypeScript, Tailwind CSS, Node.js, MongoDB',
    quote: '',
    quoteAuthor: '',
    quoteRole: '',
    isPremium: true,
  })

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/portfolio')
      const data = await res.json()
      if (data.success) {
        setProjects(data.items || [])
      }
    } catch (err) {
      console.error('Error fetching portfolio items:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const openAddModal = () => {
    setEditingItem(null)
    setForm({
      title: '',
      slug: '',
      clientName: '',
      category: 'Web Development',
      brief: '',
      logoUrl: '',
      bannerUrl: '',
      url: '',
      timeline: '6 weeks',
      challenge: '',
      solution: '',
      resultsText: '+140% Conversion Rate\n99.99% Cloud SLA\n50% Faster Page Loads',
      techStackText: 'Next.js, TypeScript, Tailwind CSS, Node.js, MongoDB',
      quote: '',
      quoteAuthor: '',
      quoteRole: '',
      isPremium: true,
    })
    setShowModal(true)
  }

  const openEditModal = (item: PortfolioItem) => {
    setEditingItem(item)
    setForm({
      title: item.title,
      slug: item.slug,
      clientName: item.clientName,
      category: item.category,
      brief: item.brief,
      logoUrl: item.logoUrl || '',
      bannerUrl: item.bannerUrl || '',
      url: item.url || '',
      timeline: item.timeline || '6 weeks',
      challenge: item.challenge || '',
      solution: item.solution || '',
      resultsText: Array.isArray(item.results) ? item.results.join('\n') : '',
      techStackText: Array.isArray(item.techStack) ? item.techStack.join(', ') : '',
      quote: item.testimonial?.quote || '',
      quoteAuthor: item.testimonial?.author || '',
      quoteRole: item.testimonial?.role || '',
      isPremium: item.isPremium ?? true,
    })
    setShowModal(true)
  }

  // Handle Logo Upload via Cloudinary API
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingLogo(true)

    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      uploadFormData.append('folder', 'zarnetic/portfolio')

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      })
      const data = await res.json()
      if (data.url) {
        setForm((prev) => ({ ...prev, logoUrl: data.url }))
      } else {
        alert(data.error || 'Upload failed')
      }
    } catch (err: any) {
      alert(err.message || 'Image upload error')
    } finally {
      setUploadingLogo(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload = {
        title: form.title,
        slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        clientName: form.clientName,
        category: form.category,
        brief: form.brief,
        logoUrl: form.logoUrl,
        bannerUrl: form.bannerUrl,
        url: form.url,
        timeline: form.timeline,
        challenge: form.challenge,
        solution: form.solution,
        results: form.resultsText.split('\n').map((s) => s.trim()).filter(Boolean),
        techStack: form.techStackText.split(',').map((s) => s.trim()).filter(Boolean),
        testimonial: form.quote
          ? {
              quote: form.quote,
              author: form.quoteAuthor || 'Project Lead',
              role: form.quoteRole || form.clientName,
            }
          : undefined,
        isPremium: form.isPremium,
      }

      const url = editingItem?._id ? `/api/portfolio/${editingItem._id}` : '/api/portfolio'
      const method = editingItem?._id ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Save failed')

      setShowModal(false)
      fetchProjects()
    } catch (err: any) {
      alert(err.message || 'Operation failed')
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      const res = await fetch(`/api/portfolio/${deleteId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setDeleteId(null)
      fetchProjects()
    } catch (err: any) {
      alert(err.message || 'Could not delete')
    }
  }

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.clientName.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0a0a0a] border border-white/10 p-5 rounded-2xl">
        <div>
          <h2 className="text-xl font-bold text-white font-space flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Portfolio Project CMS</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Add projects with logos and case studies. Changes reflect live on <code className="text-zinc-300">/portfolio</code> instantly!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="pl-9 pr-4 py-2 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 w-56"
            />
          </div>

          <button
            onClick={fetchProjects}
            className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-xl text-zinc-400 hover:text-white"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-lg shadow-red-950/40"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-zinc-500 text-sm">
          <span className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin mb-3" />
          <span>Loading portfolio items...</span>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-16 text-center text-zinc-500">
          <p className="text-sm font-medium">No custom projects added yet.</p>
          <p className="text-xs text-zinc-600 mt-1">Default static case studies are currently active on website.</p>
          <button
            onClick={openAddModal}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl"
          >
            + Add Your First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <div
              key={p._id || p.slug}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-white/20 transition-all shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-md bg-white/5 border border-white/10 text-zinc-300">
                    {p.category}
                  </span>
                  <div className="flex items-center gap-1">
                    {p.isPremium && (
                      <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {p.logoUrl && (
                  <div className="w-12 h-12 rounded-xl bg-white p-2 mb-3 flex items-center justify-center shadow-md">
                    <img src={p.logoUrl} alt={p.title} className="max-h-full max-w-full object-contain" />
                  </div>
                )}

                <h3 className="text-base font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-zinc-400 font-medium mb-3">{p.clientName}</p>
                <p className="text-xs text-zinc-500 line-clamp-3 mb-4 leading-relaxed">{p.brief}</p>

                {p.techStack && p.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.techStack.slice(0, 4).map((tech, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 bg-zinc-900 border border-white/5 rounded text-zinc-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      title="Visit Live Website"
                      className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-blue-400 text-xs flex items-center gap-1 border border-white/5"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Live Site</span>
                    </a>
                  )}
                  <a
                    href={`/portfolio/${p.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs flex items-center gap-1 border border-white/5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Case Study</span>
                  </a>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(p)}
                    title="Edit"
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  {p._id && (
                    <button
                      onClick={() => setDeleteId(p._id!)}
                      title="Delete"
                      className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/40 text-red-400 border border-red-800/40 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e0e0e] border border-white/10 rounded-2xl w-full max-w-3xl p-6 shadow-2xl relative my-8">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-zinc-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1 font-space">
              {editingItem ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Enter brand name, project details, results metrics, logo, and case study.
            </p>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Royal Logistics Portal"
                    className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Client / Company Name *</label>
                  <input
                    type="text"
                    required
                    value={form.clientName}
                    onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                    placeholder="e.g. Royal Heritage Inc"
                    className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Energy & Logistics">Energy & Logistics</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Non-Profit & NGO">Non-Profit & NGO</option>
                    <option value="Healthcare & Wellness">Healthcare & Wellness</option>
                    <option value="Food & Beverages">Food & Beverages</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                  </select>
                </div>
              </div>

              {/* Logo Upload & Live URL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Brand Logo (Cloudinary / URL)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={form.logoUrl}
                      onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
                      placeholder="Paste Image URL or Upload..."
                      className="flex-1 px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                    />
                    <label className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl cursor-pointer flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingLogo ? '...' : 'Upload'}</span>
                      <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Live Project Website URL</label>
                  <input
                    type="url"
                    value={form.url}
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Project Overview / Brief *</label>
                <textarea
                  rows={2}
                  required
                  value={form.brief}
                  onChange={(e) => setForm({ ...form, brief: e.target.value })}
                  placeholder="Short description of the platform, the client's business, and objectives achieved..."
                  className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">The Challenge</label>
                  <textarea
                    rows={3}
                    value={form.challenge}
                    onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                    placeholder="What problems was the client facing?"
                    className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Our Engineered Solution</label>
                  <textarea
                    rows={3}
                    value={form.solution}
                    onChange={(e) => setForm({ ...form, solution: e.target.value })}
                    placeholder="How did Zarnetic architect the solution?"
                    className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Key Results (One per line)</label>
                  <textarea
                    rows={3}
                    value={form.resultsText}
                    onChange={(e) => setForm({ ...form, resultsText: e.target.value })}
                    placeholder="+140% Mobile Conversions\n99.9% Uptime\n35% Reduction in Costs"
                    className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Tech Stack (Comma-separated)</label>
                  <textarea
                    rows={3}
                    value={form.techStackText}
                    onChange={(e) => setForm({ ...form, techStackText: e.target.value })}
                    placeholder="Next.js, TypeScript, Tailwind, MongoDB, AWS, Docker"
                    className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-xl shadow-lg shadow-red-950/40"
                >
                  {editingItem ? 'Update Project' : 'Publish Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e0e0e] border border-red-900/40 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h4 className="text-base font-bold text-white mb-2">Delete Project?</h4>
            <p className="text-xs text-zinc-400 mb-6">
              Are you sure you want to remove this project? It will be removed from the live website portfolio instantly.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
