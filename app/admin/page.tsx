'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  ShieldCheck, 
  Server, 
  Database, 
  Clock, 
  Plus, 
  Trash2, 
  RefreshCw, 
  LogOut, 
  Key,
  Users
} from 'lucide-react'

// Configuration
const API_BASE = "https://api.captain-epm.com/api/Admin"

interface License {
  licenseKey: string
  email: string
  features: string
  status: string
  usedSeats: number
  maxSeats: number
  expirationDate: string
}

interface ServerHealth {
  status: string
  database: string
  uptime: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminKey, setAdminKey] = useState('')
  const [licenses, setLicenses] = useState<License[]>([])
  const [health, setHealth] = useState<ServerHealth>({ status: '...', database: '...', uptime: '...' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Create Modal State
  const [showModal, setShowModal] = useState(false)
  const [newLicense, setNewLicense] = useState({
    key: '',
    plan: 'Pro,AI',
    seats: 1,
    expiry: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    email: ''
  })

  useEffect(() => {
    const key = sessionStorage.getItem('adminKey')
    if (key) {
      setAdminKey(key)
      verifyAndLoad(key)
    }
    // Start polling health regardless of auth
    const interval = setInterval(checkHealth, 5000)
    checkHealth()
    return () => clearInterval(interval)
  }, [])

  const checkHealth = async () => {
    try {
      const res = await axios.get(`${API_BASE}/health`)
      setHealth(res.data)
    } catch (e) {
      setHealth({ status: 'OFFLINE', database: '-', uptime: '-' })
    }
  }

  const verifyAndLoad = async (key: string) => {
    setLoading(true)
    try {
      // Direct call to fetch licenses acts as verification
      const res = await axios.get(`${API_BASE}/licenses`, { headers: { 'X-Admin-Key': key } })
      setLicenses(res.data)
      setIsAuthenticated(true)
      sessionStorage.setItem('adminKey', key)
      setError('')
    } catch (e: any) {
      console.error(e)
      if (e.response?.status === 401) {
        handleLogout()
        setError('Invalid Admin Key')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!adminKey) return
    verifyAndLoad(adminKey)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminKey')
    setIsAuthenticated(false)
    setAdminKey('')
    setLicenses([])
  }

  const handleCreate = async () => {
    if (!newLicense.key) return alert("License Key is required")

    try {
      const payload = {
        licenseKey: newLicense.key,
        features: newLicense.plan,
        maxSeats: Number(newLicense.seats),
        expirationDate: newLicense.expiry,
        email: newLicense.email,
        status: "Active"
      }

      await axios.post(`${API_BASE}/create`, payload, { 
        headers: { 'X-Admin-Key': adminKey } 
      })

      setShowModal(false)
      verifyAndLoad(adminKey) // Reload list
      alert("License Created!")
    } catch (e: any) {
      alert("Failed to create: " + (e.response?.data || e.message))
    }
  }

  const handleDelete = async (key: string) => {
    if (!confirm(`Permanently delete license ${key}?`)) return
    try {
      await axios.delete(`${API_BASE}/delete/${key}`, { headers: { 'X-Admin-Key': adminKey } })
      verifyAndLoad(adminKey)
    } catch (e: any) {
      alert("Failed to delete: " + (e.response?.data || e.message))
    }
  }

  const handleReset = async (key: string) => {
    if (!confirm(`Reset all seats for ${key}?`)) return
    try {
      await axios.post(`${API_BASE}/reset-bindings/${key}`, {}, { headers: { 'X-Admin-Key': adminKey } })
      verifyAndLoad(adminKey)
      alert("Seats reset successfully.")
    } catch (e: any) {
      alert("Failed to reset: " + (e.response?.data || e.message))
    }
  }

  // --- Render Login Screen ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="text-primary-600" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
            <p className="text-gray-500">Enter your secure key to manage licenses</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Admin Key</label>
              <input 
                type="password" 
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                placeholder="••••••••••••••••"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Access Portal'}
            </button>
          </form>

          {/* Health Footer */}
          <div className="mt-8 pt-6 border-t flex justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Server size={14} />
              <span className={health.status === 'Online' ? 'text-green-600 font-medium' : 'text-red-500'}>
                {health.status}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Database size={14} />
              <span>{health.database}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // --- Render Dashboard ---
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Bar */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-primary-600" />
            <span className="font-bold text-gray-900">Captain Admin</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
             <div className="hidden md:flex items-center gap-4 text-gray-500 bg-gray-50 px-4 py-1.5 rounded-full">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${health.status === 'Online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  API: {health.status}
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <Database size={14} /> {health.database}
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <Clock size={14} /> {health.uptime}
                </div>
             </div>
             
             <button onClick={handleLogout} className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition">
               <LogOut size={18} />
               <span className="hidden sm:inline">Logout</span>
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">License Management</h1>
            <p className="text-gray-500">Manage customer access and subscriptions</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition shadow-sm"
          >
            <Plus size={18} />
            Create License
          </button>
        </div>

        {/* License Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm border-b">
                <th className="px-6 py-4 font-medium">License / Customer</th>
                <th className="px-6 py-4 font-medium">Plan Features</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Seats</th>
                <th className="px-6 py-4 font-medium">Expiration</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {licenses.map((lic) => (
                <tr key={lic.licenseKey} className="hover:bg-gray-50 transition group">
                  <td className="px-6 py-4">
                    <div className="font-mono font-medium text-gray-900">{lic.licenseKey}</div>
                    <div className="text-sm text-gray-500">{lic.email || 'No email'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {lic.features.split(',').map(f => (
                        <span key={f} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">
                          {f}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                       lic.status === 'Active' 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : 'bg-red-50 text-red-700 border-red-200'
                     }`}>
                       <span className={`w-1.5 h-1.5 rounded-full ${lic.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                       {lic.status}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                       <Users size={14} className="text-gray-400" />
                       {lic.usedSeats} / {lic.maxSeats}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(lic.expirationDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                      <button 
                        onClick={() => handleReset(lic.licenseKey)}
                        title="Reset Seats"
                        className="p-1.5 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded"
                      >
                        <RefreshCw size={16} />
                      </button>
                      <button 
                         onClick={() => handleDelete(lic.licenseKey)}
                         title="Delete License"
                         className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {licenses.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No licenses found. Create one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg text-gray-900">Create New License</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">License Key</label>
                  <div className="relative">
                    <Key size={16} className="absolute left-3 top-3 text-gray-400"/>
                    <input 
                      type="text" 
                      className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                      placeholder="e.g. CORP-2024-X99"
                      value={newLicense.key}
                      onChange={(e) => setNewLicense({...newLicense, key: e.target.value})}
                    />
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Plan Features</label>
                    <select 
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none bg-white"
                      value={newLicense.plan}
                      onChange={(e) => setNewLicense({...newLicense, plan: e.target.value})}
                    >
                      <option value="Pro,AI">Pro (Individual)</option>
                      <option value="Enterprise,AI,Audit">Enterprise (Team)</option>
                      <option value="Ultimate,AI,Audit,Policy">Ultimate (Custom)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Seats</label>
                    <input 
                      type="number" 
                      min="1"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                      value={newLicense.seats}
                      onChange={(e) => setNewLicense({...newLicense, seats: Number(e.target.value)})}
                    />
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Expiration</label>
                     <input 
                        type="date" 
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                        value={newLicense.expiry}
                        onChange={(e) => setNewLicense({...newLicense, expiry: e.target.value})}
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Customer Email</label>
                     <input 
                        type="email" 
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                        placeholder="client@company.com"
                        value={newLicense.email}
                        onChange={(e) => setNewLicense({...newLicense, email: e.target.value})}
                     />
                  </div>
               </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreate}
                className="px-4 py-2 bg-primary-600 text-white font-medium hover:bg-primary-700 rounded-lg shadow-sm transition"
              >
                Create License
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
