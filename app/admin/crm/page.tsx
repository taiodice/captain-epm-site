'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Users,
    UserPlus,
    Mail,
    StickyNote
} from 'lucide-react'

// Remove unused variables to satisfy linter
// import { ShieldCheck, Phone, Briefcase } from 'lucide-react' 

const API_BASE = "https://api.captain-epm.com/api/Admin"

interface Customer {
    email: string
    licenses: string[]
    totalSeats: number
    status: string
}

interface Lead {
    id: string
    name: string
    email: string
    company: string
    status: 'New' | 'Contacted' | 'Qualified' | 'Lost'
    notes: string
}

export default function CrmPage() {
    const [adminKey, setAdminKey] = useState('')
    const [activeTab, setActiveTab] = useState<'customers' | 'leads'>('customers')

    // Data
    const [customers, setCustomers] = useState<Customer[]>([])
    const [leads, setLeads] = useState<Lead[]>([])
    // const [loading, setLoading] = useState(true) // Unused state

    useEffect(() => {
        const key = sessionStorage.getItem('adminKey')
        if (!key) {
            window.location.href = '/admin' // Redirect to login if not found
            return
        }
        setAdminKey(key)
        loadData(key)
    }, [])

    const loadData = async (key: string) => {
        // setLoading(true)
        try {
            // 1. Fetch Licenses to build Customer List
            const res = await axios.get(`${API_BASE}/licenses`, { headers: { 'X-Admin-Key': key } })
            const licenses: any[] = res.data

            // Group by Email to form "Customers"
            const custMap = new Map<string, Customer>()

            licenses.forEach(l => {
                if (!l.email) return
                // Explicitly define type to prevent 'never[]' inference on empty array
                const existing: Customer = custMap.get(l.email) || {
                    email: l.email,
                    licenses: [],
                    totalSeats: 0,
                    status: 'Active'
                }

                existing.licenses.push(l.licenseKey)
                existing.totalSeats += l.maxSeats
                // If any license is active, customer is active
                if (l.status === 'Active') existing.status = 'Active'

                custMap.set(l.email, existing)
            })

            setCustomers(Array.from(custMap.values()))

            // 2. Load Leads (Mocked for now as we don't have a DB table yet)
            const storedLeads = localStorage.getItem('crm_leads')
            if (storedLeads) {
                setLeads(JSON.parse(storedLeads))
            } else {
                setLeads([
                    { id: '1', name: 'John Doe', email: 'john@example.com', company: 'Acme Corp', status: 'New', notes: 'Interested in Enterprise plan.' }
                ])
            }

        } catch (e) {
            console.error(e)
            alert("Failed to load CRM data.")
        } finally {
            // setLoading(false)
        }
    }

    const handleAddLead = () => {
        const name = prompt("Lead Name:")
        if (!name) return
        const email = prompt("Lead Email:")
        const newLead: Lead = {
            id: Date.now().toString(),
            name,
            email: email || '',
            company: 'Unknown',
            status: 'New',
            notes: ''
        }
        const updated = [...leads, newLead]
        setLeads(updated)
        localStorage.setItem('crm_leads', JSON.stringify(updated))
    }

    const updateLeadStatus = (id: string, newStatus: any) => {
        const updated = leads.map(l => l.id === id ? { ...l, status: newStatus } : l)
        setLeads(updated)
        localStorage.setItem('crm_leads', JSON.stringify(updated))
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* CRM Tabs */}
                <div className="flex space-x-1 rounded-xl bg-gray-200 p-1 mb-8 w-fit">
                    <button
                        onClick={() => setActiveTab('customers')}
                        className={`w-32 rounded-lg py-2.5 text-sm font-medium leading-5 transition ${activeTab === 'customers' ? 'bg-white shadow text-primary-700' : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
                            }`}
                    >
                        Customers
                    </button>
                    <button
                        onClick={() => setActiveTab('leads')}
                        className={`w-32 rounded-lg py-2.5 text-sm font-medium leading-5 transition ${activeTab === 'leads' ? 'bg-white shadow text-primary-700' : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
                            }`}
                    >
                        Leads
                    </button>
                </div>

                {activeTab === 'customers' && (
                    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                        <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
                            <h3 className="font-semibold text-gray-900">Active Customers ({customers.length})</h3>
                        </div>
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-600 border-b">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Customer Email</th>
                                    <th className="px-6 py-3 font-medium">Licenses</th>
                                    <th className="px-6 py-3 font-medium">Total Seats</th>
                                    <th className="px-6 py-3 font-medium">Status</th>
                                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {customers.map((c, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                                            <Mail size={16} className="text-gray-400" />
                                            {c.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {c.licenses.length} License(s)
                                        </td>
                                        <td className="px-6 py-4 font-mono text-gray-600">
                                            {c.totalSeats}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                {c.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-primary-600 cursor-pointer hover:underline">
                                            View Details
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'leads' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">Sales Pipeline</h2>
                            <button onClick={handleAddLead} className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">
                                <UserPlus size={18} /> Add Lead
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {leads.map(lead => (
                                <div key={lead.id} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                {lead.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                                                <p className="text-xs text-gray-500">{lead.company}</p>
                                            </div>
                                        </div>
                                        <select
                                            value={lead.status}
                                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                            className={`text-xs font-medium px-2 py-1 rounded-full border-none outline-none cursor-pointer ${lead.status === 'New' ? 'bg-blue-100 text-blue-700' :
                                                lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-700' :
                                                    lead.status === 'Qualified' ? 'bg-green-100 text-green-700' :
                                                        'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            <option value="New">New</option>
                                            <option value="Contacted">Contacted</option>
                                            <option value="Qualified">Qualified</option>
                                            <option value="Lost">Lost</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                                        <div className="flex items-center gap-2">
                                            <Mail size={14} /> {lead.email}
                                        </div>
                                        {lead.notes && (
                                            <div className="flex items-start gap-2 bg-gray-50 p-2 rounded text-xs italic">
                                                <StickyNote size={14} className="mt-0.5" />
                                                {lead.notes}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
