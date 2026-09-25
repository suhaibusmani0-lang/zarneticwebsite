'use client'

import React, { useState } from 'react'
import { FileText, Printer, CheckCircle2 } from 'lucide-react'
import { PortalOrder, PortalClient } from './types'

interface InvoicesProps {
  orders: PortalOrder[]
  client: PortalClient
}

export function PortalInvoices({ orders, client }: InvoicesProps) {
  const [selectedInvoice, setSelectedInvoice] = useState<PortalOrder | null>(null)

  if (orders.length === 0) {
    return (
      <div className="p-16 text-center rounded-3xl bg-white/[0.02] border border-white/5">
        <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-white mb-2">No Invoices Found</h3>
        <p className="text-xs text-gray-400 max-w-sm mx-auto">
          No billing transactions have been recorded under this account yet.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order._id}
          className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-3">
                <span className="text-base font-bold font-space text-white">{order.itemName}</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase">
                  {order.paymentStatus}
                </span>
              </div>
              <div className="text-xs text-gray-400 flex flex-wrap items-center gap-3 mt-1">
                <span>Invoice: <strong className="text-gray-300 font-mono">{order.orderNumber}</strong></span>
                <span>•</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span className="text-gray-400">{order.paymentGateway || 'Razorpay'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
            <div className="text-right">
              <div className="text-xl font-bold text-white">₹{order.amount}</div>
              <div className="text-[10px] text-gray-400">Inclusive of Taxes</div>
            </div>

            <button
              onClick={() => setSelectedInvoice(order)}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-blue-400" />
              <span>Print Invoice</span>
            </button>
          </div>
        </div>
      ))}

      {/* Printable Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl bg-white text-black rounded-3xl p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-black p-2 rounded-xl bg-gray-100 cursor-pointer print:hidden"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex justify-between items-start pb-6 mb-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-black tracking-wider text-black">ZARNETIC</h2>
                <p className="text-xs text-gray-500">Next-Gen Digital Solutions & Cloud Infrastructure</p>
                <p className="text-xs text-gray-500">Website: zarnetic.com • Email: billing@zarnetic.com</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">
                  TAX INVOICE
                </span>
                <div className="text-sm font-mono font-bold mt-2">{selectedInvoice.orderNumber}</div>
                <div className="text-xs text-gray-500">
                  Date: {new Date(selectedInvoice.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Billed To */}
            <div className="mb-6 p-4 rounded-xl bg-gray-50 text-xs text-gray-700">
              <span className="font-bold text-gray-900 block mb-1">BILLED TO:</span>
              <p className="font-semibold text-black text-sm">{client.name}</p>
              <p>{client.email}</p>
              {client.phone && <p>{client.phone}</p>}
              {client.company && <p>{client.company}</p>}
            </div>

            {/* Item Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-100 text-gray-700 uppercase font-semibold">
                  <tr>
                    <th className="p-3">Description</th>
                    <th className="p-3 text-center">Period</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-3">
                      <div className="font-bold text-black">{selectedInvoice.itemName}</div>
                      <div className="text-[11px] text-gray-500">
                        Type: {selectedInvoice.type.toUpperCase()} • ResellerClub Order: {selectedInvoice.resellerClubOrderId || 'N/A'}
                      </div>
                    </td>
                    <td className="p-3 text-center">1 Year</td>
                    <td className="p-3 text-right font-bold">₹{selectedInvoice.amount}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Total */}
            <div className="flex justify-end mb-8">
              <div className="w-48 space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-black">₹{selectedInvoice.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (0%):</span>
                  <span>₹0.00</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 text-sm font-black text-black">
                  <span>Total Paid:</span>
                  <span>₹{selectedInvoice.amount}</span>
                </div>
                <div className="text-[10px] text-emerald-600 font-bold uppercase text-right">
                  Payment Status: {selectedInvoice.paymentStatus}
                </div>
              </div>
            </div>

            {/* Print Button */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 print:hidden">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-black cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-black text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Tax Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
