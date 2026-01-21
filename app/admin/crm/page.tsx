'use client'

import { useState } from 'react'
import { Search, Filter, MoreVertical, Mail, Phone, Building, Globe, ShieldCheck, CheckCircle, XCircle, Users } from 'lucide-react'

// Mock Data
interface Customer {
    email: string
    licenses: string[]
    totalSeats: number
    status: 'Active' | 'Inactive'
}

// Ensure the mock data type is correct
const mockCustomers: Customer[] = [
    { email: 'admin@corp.com', licenses: ['ENT-KEY-CORP1'], totalSeats: 10, status: 'Active' },
    { email: 'user@startup.io', licenses: ['PRO-KEY-SOL01'], totalSeats: 1, status: 'Active' },
    { email: 'finance@global.net', licenses: [], totalSeats: 0, status: 'Inactive' },
]

export default function CRMPage() {
    const [searchTerm, setSearchTerm] = useState('')

    // Derive licenses for view in case we want to show raw license data later
    const licenses = [
        { licenseKey: 'ENT-KEY-CORP1', email: 'admin@corp.com', seats: 10, status: 'Active' },
        { licenseKey: 'PRO-KEY-SOL01', email: 'user@startup.io', seats: 1, status: 'Active' },
        { licenseKey: 'OLD-KEY-X99', email: 'finance@global.net', seats: 0, status: 'Expired' }
    ]

    // Construct customer list from mock data or license aggregation
    // For this UI demo, we will use the mockCustomers array directly to ensure stability
    const displayCustomers = mockCustomers.filter(c => c.email.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Customer Relationship</h1>
                    <p className="text-slate-400">View and manage customer details</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl border border-slate-700 transition">
                        <Filter size={18} />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-900 px-4 py-2 rounded-xl font-bold transition shadow-lg shadow-teal-500/20">
                        <Mail size={18} />
                        Email Blast
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* List */}
                <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
                    <div className="p-4 border-b border-slate-700/50 flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search customers..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500 transition"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <table className="w-full text-left">
                        <thead className="bg-slate-900/50 text-slate-400 text-sm">
                            <tr>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Licenses</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {displayCustomers.map((c) => (
                                <tr key={c.email} className="hover:bg-slate-700/30 transition group cursor-pointer">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
                                                {c.email.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-medium text-white">{c.email}</div>
                                                <div className="text-xs text-slate-500">Total Seats: {c.totalSeats}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-slate-300 font-mono">{c.licenses.length} Active Keys</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${c.status === 'Active'
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                : 'bg-slate-700 text-slate-400 border-slate-600'
                                            }`}>
                                            {c.status === 'Active' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                            {c.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-500 hover:text-white transition">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {displayCustomers.length === 0 && (
                        <div className="p-8 text-center text-slate-500">
                            No customers found matching your search.
                        </div>
                    )}
                </div>

                {/* Details Panel Placeholder */}
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center text-slate-600 mb-4 border border-slate-700 shadow-inner">
                        <Users size={32} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">Select a Customer</h3>
                    <p className="text-slate-400 text-sm max-w-xs">Click on a customer from the list to view detailed profile, license history, and activity logs.</p>
                </div>
            </div>
        </div>
    )
}
