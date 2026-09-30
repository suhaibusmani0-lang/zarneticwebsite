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
  Check,
} from 'lucide-react'
import { formatDateDMY } from '@/lib/dateUtils'

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
  // Billing cycle state
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

  // Invoice Number & Strictly Formatted DD/MM/YYYY Dates
  const invoiceNumber = `ZAR-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${client._id.slice(-4).toUpperCase()}`
  const todayFormatted = formatDateDMY(now)
  const renewalDueFormatted = client.nextBillingDate ? formatDateDMY(client.nextBillingDate) : todayFormatted

  // Trigger browser print
  const handlePrint = () => {
    window.print()
  }

  // Send Invoice Breakdown on WhatsApp (100% Professional English)
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
      `*TAX INVOICE & RENEWAL NOTICE - ZARNETIC*\n` +
      `-----------------------------------------\n` +
      `*Client:* ${client.name} (${client.company || 'Enterprise Account'})\n` +
      `*Invoice No:* ${invoiceNumber}\n` +
      `*Billing Cycle:* ${cycleText}\n` +
      `*Invoice Date:* ${todayFormatted}\n` +
      `*Due Date:* ${renewalDueFormatted}\n\n` +
      `*SERVICE BREAKDOWN:*\n` +
      `1. Domain Renewal (${client.domainName || 'Registered Domain'}): ₹${domainFee.toLocaleString('en-IN')}\n` +
      `2. Cloud Hosting & Annual Maintenance (AMC): ₹${hostingMaintenanceFee.toLocaleString('en-IN')}\n` +
      (includeGst ? `3. GST (18%): ₹${gstAmount.toLocaleString('en-IN')}\n` : '') +
      (previousDue > 0 ? `*4. Previous Outstanding Due:* ₹${previousDue.toLocaleString('en-IN')} (${overdueDays > 0 ? `${overdueDays} Days Overdue` : 'Pending'})\n` : '') +
      `-----------------------------------------\n` +
      `*TOTAL PAYABLE AMOUNT: ₹${grandPayable.toLocaleString('en-IN')}*\n` +
      `-----------------------------------------\n\n` +
      `*PAYMENT OPTIONS:*\n` +
      `• Instant UPI ID: zarnetic@upi\n` +
      `• Bank Remittance: ZARNETIC TECHNOLOGIES | HDFC Bank\n` +
      `• Customer Portal: https://zarnetic.com/client-portal\n\n` +
      `Please remit payment to ensure uninterrupted cloud infrastructure and service availability. Thank you for choosing Zarnetic!`
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
            .print-shadow-none {
              box-shadow: none !important;
            }
          }
        `}</style>

        {/* Top Action Bar (hidden in print) */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-xl bg-red-600/10 border border-red-500/20 text-red-500 shadow-inner">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white font-space">
                Tax Invoice & Remittance Generator
              </h3>
              <p className="text-xs text-zinc-400">
                18% GST, Domain & Hosting+AMC Breakdown, Overdue Days Tracking, and 1-Click WhatsApp / PDF Export.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-zinc-300" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleSendWhatsApp}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-lg shadow-emerald-950/40 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>WhatsApp Invoice</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
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
            <label className="block text-amber-400 mb-1 font-medium">Previous Balance Due (₹)</label>
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
              <div className="flex items-center gap-2.5">
                <span className="text-2xl font-black tracking-wider text-red-600 font-space">
                  ZARNETIC
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-red-600/10 text-red-500 border border-red-500/20 uppercase tracking-widest">
                  TAX INVOICE
                </span>
              </div>
              <div className="text-xs text-zinc-400 print-black mt-1.5 space-y-0.5">
                <p className="font-semibold text-zinc-200 print-black">Zarnetic Technologies Pvt. Ltd.</p>
                <p>Cloud Hosting, Domain Management & Enterprise Digital Engineering</p>
                <p>Website: <span className="text-blue-400">https://zarnetic.com</span> • Support: billing@zarnetic.com</p>
                <p className="font-mono text-[11px] text-zinc-300 print-black">GSTIN: 07AAAAZ0000A1Z5 • CIN: U72900DL2024PTC123456</p>
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
                  <span className="font-semibold">Renewal Due Date:</span>{' '}
                  <span className="text-amber-400 font-bold">
                    {renewalDueFormatted}
                  </span>
                </div>
              )}
              <div className="text-zinc-400 print-black">
                <span className="font-semibold">Place of Supply:</span> Delhi (07)
              </div>
            </div>
          </div>

          {/* Client Details & Overdue Notice Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-zinc-900/60 print-bg-light border border-white/5 print-border p-4 rounded-xl">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                Billed To (Client / Account Holder):
              </span>
              <div className="font-bold text-sm text-white print-black">{client.name}</div>
              {client.company && <div className="text-zinc-300 print-black font-semibold mt-0.5">{client.company}</div>}
              {client.email && <div className="text-zinc-400 print-black mt-1">{client.email}</div>}
              {client.phone && <div className="text-zinc-400 print-black">{client.phone}</div>}
              {client.address && <div className="text-zinc-400 print-black mt-1">{client.address}</div>}
              {client.gstNumber && (
                <div className="text-[11px] text-zinc-300 print-black mt-1 font-mono">
                  Client GSTIN: {client.gstNumber}
                </div>
              )}
            </div>

            <div className="bg-zinc-900/60 print-bg-light border border-white/5 print-border p-4 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                  Service & Infrastructure Summary:
                </span>
                <div className="text-zinc-300 print-black flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-semibold">{client.domainName || 'Registered Web Domain'}</span>
                </div>
                {client.domainExpiryDate && (
                  <div className="text-[11px] text-zinc-400 print-black mt-1">
                    Domain Registration Valid Till: <span className="text-white print-black font-medium">{formatDateDMY(client.domainExpiryDate)}</span>
                  </div>
                )}
                {(client.hostingMaintenanceExpiryDate || client.amcExpiryDate) && (
                  <div className="text-[11px] text-zinc-400 print-black mt-0.5">
                    Hosting + AMC Service Valid Till:{' '}
                    <span className="text-white print-black font-medium">
                      {formatDateDMY(client.hostingMaintenanceExpiryDate || client.amcExpiryDate)}
                    </span>
                  </div>
                )}
              </div>

              {/* Status Alert Badge */}
              <div className="mt-3 pt-2 border-t border-white/5 print-border">
                {previousDue > 0 || overdueDays > 0 ? (
                  <div className="flex items-center gap-2 text-red-400 font-bold text-xs bg-red-950/30 p-2 rounded-lg border border-red-800/30">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>
                      {overdueDays > 0 ? `Payment Overdue by ${overdueDays} Days` : 'Outstanding Balance Due'} (Pending: ₹
                      {previousDue.toLocaleString('en-IN')})
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs bg-emerald-950/20 p-2 rounded-lg border border-emerald-800/20">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Account in Good Standing (Zero Outstanding Balance)</span>
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
                  <th className="py-3 px-4">Description of Service & Scope</th>
                  <th className="py-3 px-4">HSN / SAC</th>
                  <th className="py-3 px-4">Billing Period</th>
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

                {/* 2. Hosting + Maintenance (AMC) */}
                <tr>
                  <td className="py-3.5 px-4 font-mono text-zinc-500">02</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white print-black">
                      Cloud Hosting & Annual Maintenance Contract (AMC Package)
                    </div>
                    <div className="text-[11px] text-zinc-400 print-black">
                      High-Speed Cloud SSD Hosting, 99.9% Uptime, SSL Certificate, Automated Backups & Technical Support
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
                <span>Bank Wire & UPI Remittance Details</span>
              </div>
              <div className="space-y-1 text-zinc-400 print-black text-[11px]">
                <p><span className="font-semibold text-zinc-300 print-black">Beneficiary Name:</span> ZARNETIC TECHNOLOGIES</p>
                <p><span className="font-semibold text-zinc-300 print-black">Bank:</span> HDFC Bank Ltd.</p>
                <p><span className="font-semibold text-zinc-300 print-black">Account Number:</span> 50200084920193</p>
                <p><span className="font-semibold text-zinc-300 print-black">IFSC Code:</span> HDFC0001234</p>
                <p className="font-mono text-emerald-400 print-black"><span className="font-semibold text-zinc-300 print-black">Instant UPI ID:</span> zarnetic@upi</p>
                <p className="text-[10px] text-zinc-500 print-black pt-1">
                  Online Portal: <span className="text-blue-400 underline">https://zarnetic.com/client-portal</span>
                </p>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="w-full sm:w-1/2 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-white/5 print-border text-zinc-400 print-black">
                <span>Subtotal (Taxable Value):</span>
                <span className="font-mono font-semibold text-zinc-200 print-black">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {includeGst && (
                <>
                  {gstType === 'intra' ? (
                    <>
                      <div className="flex justify-between py-1 text-zinc-400 print-black">
                        <span>Central GST (CGST @ 9%):</span>
                        <span className="font-mono text-zinc-300 print-black">
                          ₹{cgst.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5 print-border text-zinc-400 print-black">
                        <span>State GST (SGST @ 9%):</span>
                        <span className="font-mono text-zinc-300 print-black">
                          ₹{sgst.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between py-1 border-b border-white/5 print-border text-zinc-400 print-black">
                      <span>Integrated GST (IGST @ 18%):</span>
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
                  <span>Previous Outstanding Balance:</span>
                  <span className="font-mono">
                    +₹{previousDue.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              <div className="flex justify-between py-2.5 border-t-2 border-red-500 text-sm font-bold text-white print-black bg-red-950/20 p-2.5 rounded-xl">
                <span>Total Net Payable Amount:</span>
                <span className="font-mono text-lg text-red-400 font-black">
                  ₹{grandPayable.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Terms */}
          <div className="pt-4 border-t border-white/10 print-border text-[10px] text-zinc-500 print-black text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-2">
            <p>This is a computer-generated tax invoice issued by Zarnetic Technologies Pvt. Ltd. No physical signature is required.</p>
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
                <strong className="text-emerald-400">₹{grandPayable.toLocaleString('en-IN')}</strong>, clear outstanding due amount, and automatically increment renewal date by{' '}
                <strong className="text-white uppercase">{cycle}</strong>.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold rounded-xl cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={handleMarkPaid}
              disabled={markingPaid}
              className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950/40 flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
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

