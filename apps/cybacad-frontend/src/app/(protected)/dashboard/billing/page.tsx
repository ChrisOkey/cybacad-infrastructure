"use client";

import React from "react";
import { CheckCircle, CreditCard, Clock } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="max-w-5xl mx-auto text-white">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Billing & Plans</h1>
        <p className="text-slate-400">Manage your subscription and payment methods.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Current Plan */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Plan Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <CreditCard className="w-32 h-32 text-blue-500" />
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-1">Current Plan</div>
                  <h2 className="text-3xl font-bold text-white">Pro Analyst</h2>
                </div>
                <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20">
                  Active
                </span>
              </div>
              
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-white">$29</span>
                <span className="text-slate-500">/ month</span>
              </div>

              <div className="space-y-3 mb-8">
                {["Unlimited Lab Access", "Premium Video Content", "Official Certifications", "Priority Support"].map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-slate-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-500" /> {feat}
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-bold transition-colors">
                  Cancel Subscription
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold transition-colors">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>

          {/* Invoice History */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Invoice History</h3>
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              {[
                { date: "Oct 1, 2023", amount: "$29.00", status: "Paid" },
                { date: "Sep 1, 2023", amount: "$29.00", status: "Paid" },
                { date: "Aug 1, 2023", amount: "$29.00", status: "Paid" },
              ].map((inv, i) => (
                <div key={i} className="flex justify-between items-center p-4 border-b border-slate-800 last:border-0 hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-slate-800 rounded text-slate-400">
                      <FileTextIcon />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Invoice #{1001 + i}</div>
                      <div className="text-xs text-slate-500">{inv.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-white">{inv.amount}</div>
                    <div className="text-xs text-green-400 font-medium">{inv.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Payment Method */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-fit">
          <h3 className="text-lg font-bold text-white mb-6">Payment Method</h3>
          
          <div className="flex items-center gap-4 p-4 border border-blue-500/30 bg-blue-500/5 rounded-lg mb-4">
            <div className="w-10 h-6 bg-slate-700 rounded flex items-center justify-center text-xs font-bold text-white">
              VISA
            </div>
            <div>
              <div className="text-sm font-bold text-white">•••• 4242</div>
              <div className="text-xs text-slate-400">Expires 12/25</div>
            </div>
          </div>

          <button className="w-full py-2 border border-slate-700 hover:bg-slate-800 rounded-lg text-sm font-bold text-slate-300 transition-colors flex items-center justify-center gap-2">
            <CreditCard className="w-4 h-4" /> Update Card
          </button>
        </div>

      </div>
    </div>
  );
}

// Simple internal icon for invoices
function FileTextIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
  );
}