'use client'

import React, { useState } from 'react'
import {
  X,
  Printer,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Building,
  Mail,
  Phone,
  Globe,
  Server,
  ShieldCheck,
  CreditCard,
  QrCode,
  FileText,
  DollarSign,
  Calendar,
} from 'lucide-react'

export interface ClientInvoiceData {
  _id: string
  name: string
  email: string
  phone?: string
  whatsapp?: string
  company?: string
  gstNumber?: string
  address?: string
  domainName?: string
  domainExpiryDate?: string
  domainPrice?: number
  hostingMaintenancePrice?: number
  hostingMaintenanceExpiryDate?: string
  amcAmount?: number
  amcExpiryDate?: string
  hostingExpiryDate?: string
  billingCycle?: 'monthly' | 'quarterly' | 'half_yearly' | 'yearly'
  billingAmount?: number
  dueAmount?: number
  nextBillingDate?: string
  paymentStatus?: 'paid' | 'pending' | 'overdue'
  overdueDays?: number
  services?: Array<{ name: string; price?: number }>
}

interface CrmInvoiceModalProps {
  client: ClientInvoiceData
  onClose: () => void
  onMarkPaidSuccess?: () => void
}

export function CrmInvoiceModal({ client, onClose, onMarkPaidSuccess }: CrmInvoiceModalProps) {
  // Billing cycle state (can be switched on invoice)
  const [cycle, setCycle] = useState<'monthly' | 'quarterly' | 'half_yearly' | 'yearly'>(
    client.billingCycle || 'yearly'
  )

  // Prices
  const [domainFee, setDomainFee] = useState<number>(client.domainPrice || 1200)
  const [hostingMaintenanceFee, setHostingMaintenanceFee] = useState<number>(
    client.hostingMaintenancePrice || client.amcAmount || (cycle === 'monthly' ? 1200 : 12000)
  )
  const [previousDue, setPreviousDue] = useState<number>(client.dueAmount || 0)

  // Tax configuration: 18% GST (Intra-state: CGST 9% + SGST 9%, Inter-state: IGST 18%)
  const [gstType, setGstType] = useState<'intra' | 'inter'>('intra')
  const [includeGst, setIncludeGst] = useState<boolean>(true)

  // Mark as paid loading
  const [markingPaid, setMarkingPaid] = useState<boolean>(false)
  const [markPaidSuccessMsg, setMarkPaidSuccessMsg] = useState<string | null>(null)

  // Calculations
  const subtotal = Number(domainFee || 0) + Number(hostingMaintenanceFee || 0)
  const gstRate = includeGst ? 0.18 : 0
  const gstAmount = Math.round(subtotal * gstRate)
  const cgst = Math.round(gstAmount / 2)
  const sgst = gstAmount - cgst
  const igst = gstAmount
  const currentInvoiceTotal = subtotal + gstAmount
  const grandPayable = currentInvoiceTotal + Number(previousDue || 0)

  // Overdue days calculation
  const now = new Date()
  let overdueDays = client.overdueDays || 0
  if (client.nextBillingDate && !overdueDays) {
    const diff = Math.floor((now.getTime() - new Date(client.nextBillingDate).getTime()) / (1000 * 60 * 60 * 24))
    if (diff > 0) overdueDays = diff
  }

  // Invoice Number
  const invoiceNumber = `ZAR-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${client._id.slice(-4).toUpperCase()}`
  const todayFormatted = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

  // Trigger browser print
  const handlePrint = () => {
    window.print()
  }

  // Send Invoice Breakdown on WhatsApp
  const handleSendWhatsApp = () => {
    const phone = (client.whatsapp || client.phone || '').replace(/[^0-9]/g, '')
    if (!phone) {
      alert('Client does not have a phone or WhatsApp number.')
      return
    }
    const cleanPhone = phone.startsWith('91') || phone.length > 10 ? phone : `91${phone}`

    const cycleText =
      cycle === 'monthly'
        ? 'Monthly'
        : cycle === 'quarterly'
        ? 'Quarterly'
        : cycle === 'half_yearly'
        ? 'Half-Yearly'
        : 'Annual / Yearly'

    const message = encodeURIComponent(
      `*TAX INVOICE / BILL NOTICE - ZARNETIC*\n` +
      `-----------------------------------------\n` +
      `*Client:* ${client.name} (${client.company || 'Website Account'})\n` +
      `*Invoice No:* ${invoiceNumber}\n` +
      `*Billing Cycle:* ${cycleText}\n` +
      `*Date:* ${todayFormatted}\n\n` +
      `*BILL DETAILS:*\n` +
      `1. Domain Renewal (${client.domainName || 'Registered Domain'}): ₹${domainFee.toLocaleString('en-IN')}\n` +
      `2. Hosting + Maintenance (AMC): ₹${hostingMaintenanceFee.toLocaleString('en-IN')}\n` +
      (includeGst ? `3. GST (18%): ₹${gstAmount.toLocaleString('en-IN')}\n` : '') +
      (previousDue > 0 ? `*4. Previous Outstanding Due:* ₹${previousDue.toLocaleString('en-IN')} (${overdueDays > 0 ? `${overdueDays} dino se bakaya` : 'Due'})\n` : '') +
      `-----------------------------------------\n` +
      `*TOTAL PAYABLE AMOUNT: ₹${grandPayable.toLocaleString('en-IN')}*\n` +
      `-----------------------------------------\n\n` +
      `*PAYMENT OPTIONS:*\n` +
      `• UPI ID: zarnetic@upi\n` +
      `• Bank Transfer: ZARNETIC TECHNOLOGIES | HDFC Bank\n` +
      `• Instant Pay Portal: https://zarnetic.com/client-portal\n\n` +
      `Please clear the renewal bill to ensure zero downtime. Thank you for partnering with Zarnetic!`
    )

    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank')
  }

  // Handle Mark as Paid
  const handleMarkPaid = async () => {
    setMarkingPaid(true)
    setMarkPaidSuccessMsg(null)
    try {
      const res = await fetch(`/api/crm/clients/${client._id}/mark-paid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          billingCycle: cycle,
          paidAmount: grandPayable,
          invoiceNumber,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to mark as paid')

      setMarkPaidSuccessMsg(data.message || 'Payment recorded! Next billing date updated.')
      if (onMarkPaidSuccess) {
        setTimeout(() => {
          onMarkPaidSuccess()
        }, 1500)
      }
    } catch (err: any) {
      alert(err.message || 'Error marking payment')
    } finally {
      setMarkingPaid(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Container */}
      <div className="bg-[#0f0f10] border border-white/10 rounded-2xl w-full max-w-4xl p-4 sm:p-8 shadow-2xl relative my-6 text-zinc-200">
        
        {/* Print Styles */}
        <style jsx global>{`
          @media print {
            body * {
              visibility: hidden;
            }
            #printable-invoice, #printable-invoice * {
              visibility: visible;
            }
            #printable-invoice {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              color: black !important;
              background: white !important;
              padding: 24px;
            }
            .no-print {
              display: none !important;
            }
            .print-black {
              color: #111827 !important;
            }
            .print-border {
              border-color: #e5e7eb !important;
            }
            .print-bg-light {
              background-color: #f9fafb !important;
            }
          }
        `}</style>

        {/* Top Action Bar (hidden in print) */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-red-600/10 border border-red-500/20 text-red-500">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white font-space">
                Tax Invoice & Bill Generator
              </h3>
              <p className="text-xs text-zinc-400">
                18% GST, Domain & Hosting+AMC breakdown, Bakaya Days, and 1-Click WhatsApp / PDF Export.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4 text-zinc-300" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleSendWhatsApp}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-lg shadow-emerald-950/40"
            >
              <Send className="w-4 h-4" />
              <span>WhatsApp Bill</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Bill Controls (hidden in print) */}
        <div className="no-print grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-zinc-900/70 border border-white/5 rounded-xl mb-6 text-xs">
          <div>
            <label className="block text-zinc-400 mb-1 font-medium">Billing Cycle</label>
            <select
              value={cycle}
              onChange={(e) => setCycle(e.target.value as any)}
              className="w-full px-2.5 py-1.5 bg-zinc-800 border border-white/10 rounded-lg text-white font-semibold focus:outline-none focus:border-red-500"
            >
              <option value="monthly">Monthly Plan (1 Month)</option>
              <option value="quarterly">Quarterly Plan (3 Months)</option>
              <option value="half_yearly">Half-Yearly Plan (6 Months)</option>
              <option value="yearly">Yearly / Annual Plan (1 Year)</option>
            </select>
          </div>

          <div>
            <label className="block text-blue-400 mb-1 font-medium">Domain Fee (₹)</label>
            <input
              type="number"
              value={domainFee}
              onChange={(e) => setDomainFee(Number(e.target.value))}
              className="w-full px-2.5 py-1.5 bg-zinc-800 border border-white/10 rounded-lg text-white font-semibold focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-emerald-400 mb-1 font-medium">Hosting + AMC Fee (₹)</label>
            <input
              type="number"
              value={hostingMaintenanceFee}
              onChange={(e) => setHostingMaintenanceFee(Number(e.target.value))}
              className="w-full px-2.5 py-1.5 bg-zinc-800 border border-white/10 rounded-lg text-white font-semibold focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-amber-400 mb-1 font-medium">Previous Due / Bakaya (₹)</label>
            <input
              type="number"
              value={previousDue}
              onChange={(e) => setPreviousDue(Number(e.target.value))}
              className="w-full px-2.5 py-1.5 bg-zinc-800 border border-white/10 rounded-lg text-white font-semibold focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Printable Tax Invoice Container */}
        <div id="printable-invoice" className="bg-[#141416] print-bg-light border border-white/10 print-border rounded-2xl p-6 sm:p-8 space-y-6">
          
          {/* Header & Logo */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-white/10 print-border">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-wider text-red-600 font-space">
                  ZARNETIC
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600/10 text-red-500 border border-red-500/20">
                  TAX INVOICE
                </span>
              </div>
              <div className="text-xs text-zinc-400 print-black mt-1 space-y-0.5">
                <p className="font-semibold text-zinc-300 print-black">Zarnetic Technologies Pvt. Ltd.</p>
                <p>Cloud Hosting, Domain Management & Software Engineering</p>
                <p>Website: <span className="text-blue-400">https://zarnetic.com</span> | Email: billing@zarnetic.com</p>
                <p className="font-mono text-[11px] text-zinc-300 print-black">GSTIN: 07AAAAZ0000A1Z5</p>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-1 text-xs">
              <div className="text-sm font-bold text-white print-black font-mono">
                {invoiceNumber}
              </div>
              <div className="text-zinc-400 print-black">
                <span className="font-semibold">Invoice Date:</span> {todayFormatted}
              </div>
              <div className="text-zinc-400 print-black">
                <span className="font-semibold">Billing Cycle:</span>{' '}
                <span className="font-bold text-white print-black uppercase tracking-wider">
                  {cycle}
                </span>
              </div>
              {client.nextBillingDate && (
                <div className="text-zinc-400 print-black">
                  <span className="font-semibold">Next Renewal Due:</span>{' '}
                  <span className="text-amber-400 font-bold">
                    {new Date(client.nextBillingDate).toLocaleDateString('en-IN')}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Client Details & Overdue Notice Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-zinc-900/60 print-bg-light border border-white/5 print-border p-4 rounded-xl">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                Billed To (Client):
              </span>
              <div className="font-bold text-sm text-white print-black">{client.name}</div>
              {client.company && <div className="text-zinc-300 print-black font-semibold">{client.company}</div>}
              {client.email && <div className="text-zinc-400 print-black mt-1">{client.email}</div>}
              {client.phone && <div className="text-zinc-400 print-black">{client.phone}</div>}
              {client.address && <div className="text-zinc-400 print-black mt-1">{client.address}</div>}
              {client.gstNumber && (
                <div className="text-[11px] text-zinc-400 print-black mt-1 font-mono">
                  Client GSTIN: {client.gstNumber}
                </div>
              )}
            </div>

            <div className="bg-zinc-900/60 print-bg-light border border-white/5 print-border p-4 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                  Service & Account Summary:
                </span>
                <div className="text-zinc-300 print-black flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-semibold">{client.domainName || 'No domain linked'}</span>
                </div>
                {client.domainExpiryDate && (
                  <div className="text-[11px] text-zinc-400 print-black mt-0.5">
                    Domain Valid Till: {new Date(client.domainExpiryDate).toLocaleDateString('en-IN')}
                  </div>
                )}
                {(client.hostingMaintenanceExpiryDate || client.amcExpiryDate) && (
                  <div className="text-[11px] text-zinc-400 print-black mt-0.5">
                    Hosting + AMC Valid Till:{' '}
                    {new Date(client.hostingMaintenanceExpiryDate || client.amcExpiryDate || '').toLocaleDateString('en-IN')}
                  </div>
                )}
              </div>

              {/* Bakaya Din (Overdue) Badge */}
              <div className="mt-3 pt-2 border-t border-white/5 print-border">
                {previousDue > 0 || overdueDays > 0 ? (
                  <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs bg-red-950/30 p-2 rounded-lg border border-red-800/30">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>
                      {overdueDays > 0 ? `${overdueDays} Din Se Paisa Bakaya Hai` : 'Payment Overdue'} (Pending: ₹
                      {previousDue.toLocaleString('en-IN')})
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs bg-emerald-950/20 p-2 rounded-lg border border-emerald-800/20">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Account Up-to-Date (Koi Bakaya Nahi)</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="overflow-x-auto border border-white/10 print-border rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900/90 print-bg-light text-zinc-400 print-black uppercase tracking-wider text-[10px] border-b border-white/10 print-border">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Description of Service</th>
                  <th className="py-3 px-4">HSN/SAC</th>
                  <th className="py-3 px-4">Cycle</th>
                  <th className="py-3 px-4 text-right">Taxable Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 print-border">
                {/* 1. Domain Registration & Renewal */}
                <tr>
                  <td className="py-3.5 px-4 font-mono text-zinc-500">01</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white print-black">
                      Domain Registration & Management
                    </div>
                    <div className="text-[11px] text-zinc-400 print-black">
                      {client.domainName ? `Domain: ${client.domainName}` : 'Top-Level Domain Name Renewal & DNS Protection'}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-zinc-400 print-black">998313</td>
                  <td className="py-3.5 px-4 capitalize text-zinc-300 print-black">{cycle}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-white print-black">
                    ₹{domainFee.toLocaleString('en-IN')}
                  </td>
                </tr>

                {/* 2. Hosting + Maintenance (AMC) Combined Ek Sath */}
                <tr>
                  <td className="py-3.5 px-4 font-mono text-zinc-500">02</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white print-black">
                      Cloud Hosting + Website Maintenance (AMC)
                    </div>
                    <div className="text-[11px] text-zinc-400 print-black">
                      High-Speed Cloud SSD Hosting, 99.9% Uptime, SSL Certificate, Security Patches & Technical Support
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-zinc-400 print-black">998315</td>
                  <td className="py-3.5 px-4 capitalize text-zinc-300 print-black">{cycle}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-white print-black">
                    ₹{hostingMaintenanceFee.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals & Tax Breakdown */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pt-2">
            {/* Bank & Payment Information */}
            <div className="w-full sm:w-1/2 p-4 bg-zinc-900/60 print-bg-light border border-white/5 print-border rounded-xl text-xs space-y-2">
              <div className="font-bold text-white print-black flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-red-500" />
                <span>Bank & UPI Remittance Details</span>
              </div>
              <div className="space-y-1 text-zinc-400 print-black text-[11px]">
                <p><span className="font-semibold text-zinc-300 print-black">Account Name:</span> ZARNETIC TECHNOLOGIES</p>
                <p><span className="font-semibold text-zinc-300 print-black">Bank:</span> HDFC Bank Ltd.</p>
                <p><span className="font-semibold text-zinc-300 print-black">Account No:</span> 50200084920193</p>
                <p><span className="font-semibold text-zinc-300 print-black">IFSC Code:</span> HDFC0001234</p>
                <p className="font-mono text-emerald-400 print-black"><span className="font-semibold text-zinc-300 print-black">UPI ID:</span> zarnetic@upi</p>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="w-full sm:w-1/2 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-white/5 print-border text-zinc-400 print-black">
                <span>Subtotal (Taxable):</span>
                <span className="font-mono font-semibold text-zinc-200 print-black">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {includeGst && (
                <>
                  {gstType === 'intra' ? (
                    <>
                      <div className="flex justify-between py-1 text-zinc-400 print-black">
                        <span>CGST (9%):</span>
                        <span className="font-mono text-zinc-300 print-black">
                          ₹{cgst.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5 print-border text-zinc-400 print-black">
                        <span>SGST (9%):</span>
                        <span className="font-mono text-zinc-300 print-black">
                          ₹{sgst.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between py-1 border-b border-white/5 print-border text-zinc-400 print-black">
                      <span>IGST (18%):</span>
                      <span className="font-mono text-zinc-300 print-black">
                        ₹{igst.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}
                </>
              )}

              <div className="flex justify-between py-1.5 text-zinc-300 print-black font-semibold">
                <span>Current Invoice Total (incl. 18% GST):</span>
                <span className="font-mono font-bold text-white print-black">
                  ₹{currentInvoiceTotal.toLocaleString('en-IN')}
                </span>
              </div>

              {previousDue > 0 && (
                <div className="flex justify-between py-1 text-red-400 font-semibold border-t border-white/5 print-border">
                  <span>Previous Bakaya (Outstanding Due):</span>
                  <span className="font-mono">
                    +₹{previousDue.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              <div className="flex justify-between py-2 border-t-2 border-red-500 text-sm font-bold text-white print-black bg-red-950/20 p-2 rounded-lg">
                <span>Total Net Payable:</span>
                <span className="font-mono text-base text-red-400 font-extrabold">
                  ₹{grandPayable.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Terms */}
          <div className="pt-4 border-t border-white/10 print-border text-[10px] text-zinc-500 print-black text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-2">
            <p>This is a computer-generated tax invoice issued by Zarnetic. No signature is required.</p>
            <p className="font-semibold text-zinc-400 print-black">Thank you for your business!</p>
          </div>
        </div>

        {/* Mark as Paid Action Bottom Bar (hidden in print) */}
        <div className="no-print mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-zinc-400">
            {markPaidSuccessMsg ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                {markPaidSuccessMsg}
              </span>
            ) : (
              <span>
                Clicking <strong className="text-white">Mark as Paid</strong> will record{' '}
                <strong className="text-emerald-400">₹{grandPayable.toLocaleString('en-IN')}</strong>, clear due amount, and automatically increment next billing date by{' '}
                <strong className="text-white uppercase">{cycle}</strong>.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold rounded-xl"
            >
              Close
            </button>

            <button
              onClick={handleMarkPaid}
              disabled={markingPaid}
              className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950/40 flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              {markingPaid ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
              <span>Mark as Paid & Update Next Date</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

