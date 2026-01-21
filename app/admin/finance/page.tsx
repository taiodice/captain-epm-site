'use client'

import { DollarSign, TrendingUp, TrendingDown, CreditCard, Download, Calendar } from 'lucide-react'

export default function FinancePage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Financial Overview</h1>
                    <p className="text-slate-400">Track revenue, expenses, and billing</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl border border-slate-700 transition">
                        <Calendar size={18} />
                        Last 30 Days
                    </button>
                    <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-900 px-4 py-2 rounded-xl font-bold transition shadow-lg shadow-teal-500/20">
                        <Download size={18} />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl relative overflow-hidden group hover:border-teal-500/30 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                        <DollarSign size={80} />
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 mb-2 font-medium uppercase text-xs tracking-wider">
                        Monthly Recurring Revenue
                    </div>
                    <div className="text-4xl font-bold text-white mb-4">$42,500</div>
                    <div className="flex items-center text-emerald-400 text-sm font-semibold">
                        <TrendingUp size={16} className="mr-1" />
                        +12.5% <span className="text-slate-500 font-normal ml-2">vs last month</span>
                    </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl relative overflow-hidden group hover:border-blue-500/30 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                        <CreditCard size={80} />
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 mb-2 font-medium uppercase text-xs tracking-wider">
                        Active Subscriptions
                    </div>
                    <div className="text-4xl font-bold text-white mb-4">124</div>
                    <div className="flex items-center text-emerald-400 text-sm font-semibold">
                        <TrendingUp size={16} className="mr-1" />
                        +8 <span className="text-slate-500 font-normal ml-2">new this month</span>
                    </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl relative overflow-hidden group hover:border-purple-500/30 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                        <TrendingDown size={80} />
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 mb-2 font-medium uppercase text-xs tracking-wider">
                        Churn Rate
                    </div>
                    <div className="text-4xl font-bold text-white mb-4">1.2%</div>
                    <div className="flex items-center text-emerald-400 text-sm font-semibold">
                        <TrendingDown size={16} className="mr-1" />
                        -0.4% <span className="text-slate-500 font-normal ml-2">improvement</span>
                    </div>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-700/50">
                    <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-900/50 text-slate-400 text-sm">
                        <tr>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                        <tr className="hover:bg-slate-700/30 transition">
                            <td className="px-6 py-4 text-white font-medium">Acme Corp</td>
                            <td className="px-6 py-4 text-slate-400">Oct 24, 2024</td>
                            <td className="px-6 py-4 text-white">$2,499.00</td>
                            <td className="px-6 py-4"><span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20">Paid</span></td>
                        </tr>
                        <tr className="hover:bg-slate-700/30 transition">
                            <td className="px-6 py-4 text-white font-medium">Startup Inc</td>
                            <td className="px-6 py-4 text-slate-400">Oct 23, 2024</td>
                            <td className="px-6 py-4 text-white">$499.00</td>
                            <td className="px-6 py-4"><span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20">Paid</span></td>
                        </tr>
                        <tr className="hover:bg-slate-700/30 transition">
                            <td className="px-6 py-4 text-white font-medium">Global Tech</td>
                            <td className="px-6 py-4 text-slate-400">Oct 21, 2024</td>
                            <td className="px-6 py-4 text-white">$9,999.00</td>
                            <td className="px-6 py-4"><span className="text-xs bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded border border-yellow-500/20">Pending</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
