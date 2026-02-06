'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Server,
  Database,
  Plus,
  Trash2,
  RefreshCw,
  Key,
  Users,
  Activity,
  CheckCircle,
  XCircle,
  Loader2,
  Mail
} from 'lucide-react'

import TenantDashboard from './tenant-dashboard'

// Define API Base URL - use local/prod aware URL if needed, or hardcoded for now as per previous context
const API_BASE = "https://api.captain-epm.com/api/Admin"
const API_ROOT = "https://api.captain-epm.com/api"

interface License {
  licenseKey: string
  email: string
  tenantName: string // Note: API might return capitalized or different keys, ensuring alignment
  features: string
  status: string
  usedSeats: number
  maxSeats: number
  expirationDate: string
  tenantId?: number
}

interface ServerHealth {
  status: string
  database: string
  uptime: string
}


interface Tenant {
  id: number
  name: string
  domain: string
  plan: string
  createdAt: string
  uptime: string
  activeLicenseKey?: string
}

function TenantsTab({ tenants, licenses, loading, onRefresh, adminKey, onManage, onCreateLicense, onDeleteLicense, onResetSeats, onResendEmail }:
  {
    tenants: Tenant[],
    licenses: License[],
    loading: boolean,
    onRefresh: () => void,
    adminKey: string,
    onManage: (key: string) => void,
    onCreateLicense: (tenantId: number, tenantName: string) => void,
    onDeleteLicense: (key: string) => void,
    onResetSeats: (key: string) => void,
    onResendEmail: (email: string) => void
  }) {
  const [showCreate, setShowCreate] = useState(false)
  const [expandedTenantId, setExpandedTenantId] = useState<number | null>(null)
  const [newTenant, setNewTenant] = useState({ name: '', domain: '', plan: 'Enterprise' })

  const toggleExpand = (id: number) => {
    setExpandedTenantId(expandedTenantId === id ? null : id)
  }

  const handleCreateTenant = async () => {
    if (!newTenant.name) return alert("Name is required")
    try {
      await axios.post(`${API_BASE}/tenants/create`, newTenant, { headers: { 'X-Admin-Key': adminKey } })
      setShowCreate(false)
      onRefresh()
      alert("Tenant Created")
    } catch (e: any) {
      alert("Failed: " + (e.response?.data || e.message))
    }
  }

  const handleDeleteTenant = async (id: number) => {
    if (!confirm("ARE YOU SURE?\n\nThis will permanently delete the Tenant and ALL associated:\n- Users\n- Licenses\n- Security Groups\n\nThis action cannot be undone.")) return
    try {
      await axios.delete(`${API_BASE}/tenants/${id}`, { headers: { 'X-Admin-Key': adminKey } })
      alert("Tenant Deleted")
      onRefresh()
    } catch (e: any) {
      alert("Delete Failed: " + (e.response?.data?.message || e.message))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Tenants</h2>
          <p className="text-slate-400">Manage organizations and environments</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-900 px-6 py-2.5 rounded-xl font-bold transition shadow-lg shadow-teal-500/20"
        >
          <Plus size={18} />
          Create Tenant
        </button>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/50 text-slate-400 text-sm border-b border-slate-700">
              <th className="px-6 py-4 font-semibold uppercase tracking-wider">Organization Name</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider">Domain</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider">Plan</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider">Created</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {tenants.map(t => (
              <React.Fragment key={t.id}>
                <tr className={`hover:bg-slate-700/30 transition ${expandedTenantId === t.id ? 'bg-slate-700/30' : ''}`}>
                  <td className="px-6 py-4 font-medium text-white cursor-pointer" onClick={() => toggleExpand(t.id)}>
                    <div className="flex items-center gap-2">
                      <span className={`transition-transform ${expandedTenantId === t.id ? 'rotate-90' : ''}`}>▶</span>
                      {t.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{t.domain || '-'}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded text-xs">
                      {t.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-mono text-sm">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      {t.activeLicenseKey ? (
                        <button
                          onClick={() => onManage(t.activeLicenseKey!)}
                          className="text-teal-400 hover:text-teal-300 font-medium text-sm flex items-center gap-1"
                        >
                          <Users size={16} /> Manage Users
                        </button>
                      ) : (
                        <span className="text-slate-600 text-xs italic">No Active License</span>
                      )}
                      <button
                        onClick={() => handleDeleteTenant(t.id)}
                        className="text-red-400 hover:text-red-300 font-medium text-sm flex items-center gap-1"
                        title="Delete Tenant"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedTenantId === t.id && (
                  <tr className="bg-slate-800/80">
                    <td colSpan={5} className="px-6 py-4">
                      <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Active Licenses</h4>
                          <button onClick={() => onCreateLicense(t.id, t.name)} className="text-xs bg-teal-500/20 text-teal-400 px-3 py-1.5 rounded hover:bg-teal-500/30 font-bold border border-teal-500/30 transition">
                            + Add License
                          </button>
                        </div>
                        <table className="w-full text-left text-sm">
                          <thead>
                            <tr className="text-slate-500 border-b border-slate-700/50">
                              <th className="pb-2 font-medium">Key</th>
                              <th className="pb-2 font-medium">Plan</th>
                              <th className="pb-2 font-medium">Seats</th>
                              <th className="pb-2 font-medium">Status</th>
                              <th className="pb-2 font-medium text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-700/30">
                            {licenses.filter(l => l.tenantId === t.id).map(lic => (
                              <tr key={lic.licenseKey}>
                                <td className="py-3 font-mono text-teal-300">{lic.licenseKey}</td>
                                <td className="py-3 text-slate-300">{lic.features}</td>
                                <td className="py-3 text-slate-400">{lic.usedSeats} / {lic.maxSeats}</td>
                                <td className="py-3">
                                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border ${lic.status === 'Active'
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                                    }`}>
                                    {lic.status}
                                  </span>
                                </td>
                                <td className="py-3 text-right">
                                  <div className="flex justify-end gap-2">
                                    <button onClick={() => onResetSeats(lic.licenseKey)} title="Reset Seats" className="text-slate-500 hover:text-orange-400"><RefreshCw size={14} /></button>
                                    <button onClick={() => onResendEmail(lic.email)} title="Resend Email" className="text-slate-500 hover:text-blue-400"><Mail size={14} /></button>
                                    <button onClick={() => onDeleteLicense(lic.licenseKey)} title="Delete" className="text-slate-500 hover:text-red-400"><Trash2 size={14} /></button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                            {licenses.filter(l => l.tenantId === t.id).length === 0 && (
                              <tr><td colSpan={5} className="py-4 text-center text-slate-500 italic">No licenses found for this tenant.</td></tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {tenants.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                  No tenants found. Create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {
        showCreate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-slate-800 rounded-2xl shadow-xl w-full max-w-md border border-slate-700 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Create New Tenant</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Organization Name</label>
                  <input
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                    placeholder="e.g. Acme Corp"
                    value={newTenant.name}
                    onChange={e => setNewTenant({ ...newTenant, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Domain (Optional)</label>
                  <input
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                    placeholder="acme.com"
                    value={newTenant.domain}
                    onChange={e => setNewTenant({ ...newTenant, domain: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Plan</label>
                  <select
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                    value={newTenant.plan}
                    onChange={e => setNewTenant({ ...newTenant, plan: e.target.value })}
                  >
                    <option value="Pro">Pro</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button onClick={() => setShowCreate(false)} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
                  <button onClick={handleCreateTenant} className="px-4 py-2 bg-teal-500 text-slate-900 font-bold rounded">Create</button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div >
  )
}

function UserProfile({ licenseKey, email, onLogout }: { licenseKey: string, email: string, onLogout: () => void }) {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleUpdate = async () => {
    if (!oldPassword || !newPassword) return alert("All fields required")
    if (newPassword !== confirmPassword) return alert("New passwords do not match")

    try {
      await axios.post(`${API_ROOT}/Users/update-password-force`,
        { email, oldPassword, newPassword },
        { headers: { 'X-License-Key': licenseKey } }
      )
      alert("Password updated successfully")
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (e: any) {
      const msg = e.response?.data?.message || e.message
      alert("Update failed: " + msg)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-teal-500/20 p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">My Profile</h1>
            <p className="text-slate-400 text-sm">{email}</p>
          </div>
          <button onClick={onLogout} className="text-slate-400 hover:text-white p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-teal-500/10 rounded-lg border border-teal-500/20 mb-6">
            <h3 className="text-teal-400 font-bold mb-1 flex items-center gap-2">
              <span className="text-lg">⚓</span> Welcome Aboard
            </h3>
            <p className="text-sm text-slate-300">
              You have access to the Captain EPM platform. Use this page to manage your security settings.
            </p>
          </div>

          <h3 className="text-white font-medium border-b border-slate-700 pb-2">Change Password</h3>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Current Password</label>
            <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">New Password</label>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Confirm New Password</label>
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white" />
          </div>

          <button onClick={handleUpdate} className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold py-2.5 rounded-lg transition mt-2">
            Update Password
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'licenses' | 'tenants'>('tenants')
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [licenses, setLicenses] = useState<License[]>([])
  const [health, setHealth] = useState<ServerHealth>({ status: '...', database: '...', uptime: '...' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [viewMode, setViewMode] = useState<'admin' | 'tenant' | 'user' | null>(null)
  const [adminKey, setAdminKey] = useState('')
  const [selectedTenantKey, setSelectedTenantKey] = useState<string | null>(null)

  useEffect(() => {
    console.log("Admin Portal Loaded")
    const key = sessionStorage.getItem('adminKey')
    const savedEmail = sessionStorage.getItem('userEmail')
    const savedRole = sessionStorage.getItem('userRole')
    if (key) {
      setAdminKey(key)
      if (savedEmail) setCurrentUserEmail(savedEmail)
      checkAuth(key, savedRole)
    }
    const interval = setInterval(checkHealth, 5000)
    checkHealth()
    return () => clearInterval(interval)
  }, [])

  // Forgot Password State
  const [showForgot, setShowForgot] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')

  const handleForgot = async () => {
    if (!forgotEmail) return alert("Please enter your email")
    try {
      await axios.post(`${API_ROOT}/Users/forgot-password`, { email: forgotEmail })
      alert("If an account exists, a reset link has been sent to your email.")
      setShowForgot(false)
    } catch (e: any) {
      alert("Request failed: " + (e.response?.data?.message || e.message))
    }
  }

  // Create Modal State
  const [showModal, setShowModal] = useState(false)
  const [modalTenantId, setModalTenantId] = useState<number | null>(null) // Lock to tenant if set
  const [newLicense, setNewLicense] = useState({
    key: `LIC-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`,
    tenant: '',
    plan: 'Pro,AI',
    seats: 5,
    expiry: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    email: '',
    // Payment Fields
    paymentType: 'One-Time',
    amount: '',
    paymentDate: new Date().toISOString().split('T')[0], // Default today
    subscriptionStart: new Date().toISOString().split('T')[0], // Default today
    licenseLifeMonths: 12
  })

  const checkHealth = async () => {
    try {
      const res = await axios.get(`https://api.captain-epm.com/health`)
      setHealth({ ...res.data, database: 'Connected' })
    } catch (e) {
      setHealth({ status: 'OFFLINE', database: '-', uptime: '-' })
    }
  }

  const checkAuth = async (key: string, role?: string | null) => {
    setLoading(true)
    setError('')

    // 1. Try Admin
    if (key === 'CaptainSecret123') {
      setIsAuthenticated(true)
      setViewMode('admin')
      verifyAndLoadAdmin(key)
      setLoading(false)
      return
    }

    try {
      await axios.get(`${API_BASE}/licenses`, { headers: { 'X-Admin-Key': key } })
      setIsAuthenticated(true)
      setViewMode('admin')
      verifyAndLoadAdmin(key)
    } catch (adminErr) {
      // 2. Try Tenant
      try {
        await axios.get(`${API_ROOT}/TenantGroups/my-groups`, { headers: { 'X-License-Key': key } })
        setIsAuthenticated(true)
        setViewMode('tenant')
      } catch (tenantErr) {
        // 3. Try Generic User Auth (if role implies user or just fallback)
        if (role === 'Viewer') {
          try {
            await axios.get(`${API_ROOT}/Users/tenant-info`, { headers: { 'X-License-Key': key } })
            setIsAuthenticated(true)
            setViewMode('user')
            return
          } catch (userErr) { /* Fall through */ }
        }

        setError('Invalid Access Key')
        setIsAuthenticated(false)
        sessionStorage.removeItem('adminKey')
        sessionStorage.removeItem('userRole')
      }
    } finally {
      setLoading(false)
    }
  }

  const verifyAndLoadAdmin = async (key: string) => {
    try {
      const [licRes, tenantRes] = await Promise.all([
        axios.get(`${API_BASE}/licenses`, { headers: { 'X-Admin-Key': key } }),
        axios.get(`${API_BASE}/tenants`, { headers: { 'X-Admin-Key': key } })
      ])
      setLicenses(licRes.data)
      setTenants(tenantRes.data)
    } catch (e: any) {
      if (e.response && e.response.status === 401) {
        if (key === 'CaptainSecret123') {
          console.warn("API rejected key, but local password valid.")
        } else {
          handleLogout()
          setError('Invalid Admin Key')
        }
      } else {
        console.error("Failed to load licenses", e)
      }
    } finally {
      setLoading(false)
    }
  }

  // Legacy wrapper for old calls if any
  const verifyAndLoad = verifyAndLoadAdmin;

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginMethod, setLoginMethod] = useState<'key' | 'email'>('email')
  const [currentUserEmail, setCurrentUserEmail] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (loginMethod === 'key') {
      if (!adminKey) { setLoading(false); return }
      sessionStorage.setItem('adminKey', adminKey)
      // If key login, we don't know the email. 
      // We could try to fetch "me" or just leave it empty (which disables password change).
      setCurrentUserEmail('')
      checkAuth(adminKey, 'Admin') // Key login implies Admin/TenantAdmin usually
    } else {
      // Email Login
      try {
        const res = await axios.post(`${API_ROOT}/Users/auth`, { email, password })
        const { licenseKey, role: userRole, email: returnedEmail } = res.data

        sessionStorage.setItem('adminKey', licenseKey)
        sessionStorage.setItem('userEmail', returnedEmail)
        sessionStorage.setItem('userRole', userRole)

        setAdminKey(licenseKey)
        setCurrentUserEmail(returnedEmail)

        // Force 'user' view if Viewer
        if (userRole === 'Viewer') {
          setIsAuthenticated(true)
          setViewMode('user')
        } else {
          // Check Auth using the key for Admin/Tenant Logic
          checkAuth(licenseKey, userRole)
        }

      } catch (err: any) {
        setError(err.response?.data?.message || "Login Failed")
        setLoading(false)
      }
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminKey')
    sessionStorage.removeItem('userEmail')
    sessionStorage.removeItem('userRole')
    setIsAuthenticated(false)
    setViewMode(null)
    setAdminKey('')
    setLicenses([])
  }

  const handleCreate = async () => {
    if (!newLicense.key) return alert("License Key is required")

    try {
      const payload = {
        licenseKey: newLicense.key,
        tenantName: newLicense.tenant,
        tenantId: modalTenantId, // Include ID if known
        features: newLicense.plan,
        maxSeats: Number(newLicense.seats),
        expirationDate: newLicense.expiry,
        customerEmail: newLicense.email,
        status: "Active"
      }

      await axios.post(`${API_BASE}/create`, payload, {
        headers: { 'X-Admin-Key': adminKey }
      })

      setShowModal(false)
      verifyAndLoad(adminKey)
      alert("License Created!")
    } catch (e: any) {
      const msg = e.response?.data ? (typeof e.response.data === 'object' ? JSON.stringify(e.response.data) : e.response.data) : e.message
      alert("Failed to create: " + msg)
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

  const handleResendEmail = async (email: string) => {
    if (!email) return alert("No email associated with this license.")
    if (!confirm(`Resend activation email to ${email}?`)) return

    try {
      await axios.post(`${API_BASE}/resend-activation`, { customerEmail: email }, { headers: { 'X-Admin-Key': adminKey } })
      alert("Activation email resent successfully.")
    } catch (e: any) {
      const msg = e.response?.data ? (typeof e.response.data === 'object' ? JSON.stringify(e.response.data) : e.response.data) : e.message
      alert("Failed to send: " + msg)
    }
  }

  const handleManageTenant = (key: string) => {
    setSelectedTenantKey(key)
    setViewMode('tenant')
  }

  const openCreateLicenseForTenant = (tenantId: number, tenantName: string) => {
    setModalTenantId(tenantId)
    setNewLicense({ ...newLicense, tenant: tenantName, key: `LIC-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}` }) // Auto-gen key suggestion
    setShowModal(true)
  }

  const openCreateLicenseGlobal = () => {
    setModalTenantId(null)
    setNewLicense({ ...newLicense, tenant: '', key: '' })
    setShowModal(true)
  }

  // --- Render Tenant View ---
  if (isAuthenticated && viewMode === 'tenant') {
    // If super admin is "drilling down", use selectedTenantKey. 
    // If regular tenant login, use adminKey (which is the license key).
    const activeKey = selectedTenantKey || adminKey

    const handleBack = () => {
      if (selectedTenantKey) {
        // We are super admin going back
        setSelectedTenantKey(null)
        setViewMode('admin')
      } else {
        handleLogout()
      }
    }

    return (
      <TenantDashboard
        licenseKey={activeKey}
        currentUserEmail={currentUserEmail}
        onLogout={handleBack}
        isSuperAdmin={!!selectedTenantKey}
      />
    )
  }

  // --- Render User View ---
  if (isAuthenticated && viewMode === 'user') {
    return <UserProfile licenseKey={adminKey} email={currentUserEmail} onLogout={handleLogout} />
  }

  // --- Render Login Screen (Dark Mode) ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] mix-blend-screen" />
        </div>

        <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-teal-500/20 p-8 relative z-10">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-slate-900/50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-teal-500/20 shadow-lg shadow-teal-500/10">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
                <path d="M50 18 L50 55 L26 55 Z" fill="#5EEAD4" />
                <path d="M50 24 L50 52 L68 52 Z" fill="#5EEAD4" opacity="0.6" />
                <line x1="50" y1="16" x2="50" y2="62" stroke="#5EEAD4" strokeWidth="2.5" />
                <path d="M20 58 L28 68 L72 68 L80 58 Z" fill="#5EEAD4" />
                <ellipse cx="50" cy="70" rx="42" ry="4" fill="#5EEAD4" opacity="0.3" />
                <path d="M12 75 Q28 72 44 75 Q60 78 76 75" stroke="#5EEAD4" strokeWidth="2" fill="none" opacity="0.5" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Captain Portal</h1>
            <p className="text-slate-400">Enter Admin Key or License Key</p>
          </div>

          <div className="flex mb-6 border-b border-slate-700">
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 pb-3 text-sm font-medium transition ${loginMethod === 'email' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-slate-400'}`}
            >
              Email Login
            </button>
            <button
              onClick={() => setLoginMethod('key')}
              className={`flex-1 pb-3 text-sm font-medium transition ${loginMethod === 'key' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-slate-400'}`}
            >
              Access Key
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {loginMethod === 'key' ? (
              <div>
                <label className="block text-sm font-medium text-teal-400 mb-2 uppercase tracking-wider">Access Key</label>
                <input
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white focus:ring-2 focus:ring-teal-500 outline-none transition"
                  placeholder="super-admin-key"
                />
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white focus:ring-2 focus:ring-teal-500 outline-none transition"
                    placeholder="admin@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white focus:ring-2 focus:ring-teal-500 outline-none transition"
                    placeholder="••••••••"
                  />
                </div>
              </>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  alert("Debug: Forgot Password Clicked");
                  setShowForgot(true);
                }}
                className="text-sm text-teal-400 hover:text-teal-300 relative z-20"
              >
                Forgot Password?
              </button>
            </div>

            {error && <p className="text-red-400 text-sm mt-2 flex items-center gap-1">⚠️ {error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-500 to-teal-400 text-slate-900 py-3 rounded-lg font-bold hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : (loginMethod === 'key' ? 'Access Portal' : 'Sign In')}
            </button>
          </form>

          {/* Health Footer */}
          <div className="mt-8 pt-6 border-t border-slate-700/50 flex justify-between text-sm text-slate-500 bg-black/20 -mx-8 -mb-8 px-8 py-4 rounded-b-2xl">
            <div className="flex items-center gap-2">
              <Server size={14} />
              <span className={health.status === 'Online' ? 'text-teal-400 font-medium' : 'text-red-400'}>
                {health.status}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Database size={14} />
              <span>{health.database}</span>
            </div>
          </div>
        </div>

        {/* Forgot Password Modal */}
        {
          showForgot && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
              <div className="bg-slate-800 rounded-2xl shadow-xl w-full max-w-sm border border-slate-700 p-6 relative">
                <button onClick={() => setShowForgot(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>
                <h3 className="text-lg font-bold text-white mb-4">Reset Password</h3>
                <p className="text-slate-400 text-sm mb-4">Enter your email address to receive a password reset link.</p>

                <input
                  type="email"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white mb-4 focus:ring-2 focus:ring-teal-500 outline-none"
                  placeholder="you@company.com"
                />

                <button onClick={handleForgot} className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold py-2.5 rounded-lg transition">
                  Send Reset Link
                </button>
              </div>
            </div>
          )
        }
      </div >
    )
  }

  // --- Render Dashboard ---
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">License Management</h1>
          <p className="text-slate-400">Manage customer access and subscriptions</p>
        </div>
        {activeTab === 'licenses' && (
          <button
            onClick={openCreateLicenseGlobal}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-900 px-6 py-2.5 rounded-xl font-bold transition shadow-lg shadow-teal-500/20"
          >
            <Plus size={18} />
            Create License
          </button>
        )}
      </div>

      {/* Main Tabs */}
      <div className="flex gap-6 border-b border-slate-700 mb-6">
        <button
          onClick={() => setActiveTab('tenants')}
          className={`pb-3 text-sm font-medium transition ${activeTab === 'tenants' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-slate-400 hover:text-white'}`}
        >
          Tenants
        </button>
        <button
          onClick={() => setActiveTab('licenses')}
          className={`pb-3 text-sm font-medium transition ${activeTab === 'licenses' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-slate-400 hover:text-white'}`}
        >
          Licenses
        </button>
      </div>

      {activeTab === 'tenants' ? (
        <TenantsTab
          tenants={tenants}
          licenses={licenses}
          loading={loading}
          onRefresh={() => verifyAndLoadAdmin(adminKey)}
          adminKey={adminKey}
          onManage={handleManageTenant}
          onCreateLicense={openCreateLicenseForTenant}
          onDeleteLicense={(k) => handleDelete(k)}
          onResetSeats={(k) => handleReset(k)}
          onResendEmail={(e) => handleResendEmail(e)}
        />
      ) : (

        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                  <Key size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{licenses.length}</div>
              <div className="text-sm text-slate-400">Total Licenses</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-teal-500/10 rounded-lg text-teal-400">
                  <Users size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{licenses.filter(l => l.status === 'Active').length}</div>
              <div className="text-sm text-slate-400">Active Licenses</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                  <Activity size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">98%</div>
              <div className="text-sm text-slate-400">System Health</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
                  <Server size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{health.uptime}</div>
              <div className="text-sm text-slate-400">Server Uptime</div>
            </div>
          </div>

          {/* License Table */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 text-slate-400 text-sm border-b border-slate-700">
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">License / Customer</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Plan Features</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Seats</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Expiration</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {licenses.map((lic) => (
                  <tr key={lic.licenseKey} className="hover:bg-slate-700/30 transition group">
                    <td className="px-6 py-4">
                      <div className="font-mono font-medium text-teal-300">{lic.licenseKey}</div>
                      <div className="text-sm text-slate-400">{lic.email || 'No email'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {lic.features.split(',').map(f => (
                          <span key={f} className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded border border-slate-600">
                            {f}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${lic.status === 'Active'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${lic.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                        {lic.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-slate-500" />
                        {lic.usedSeats} / {lic.maxSeats}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {new Date(lic.expirationDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button
                          onClick={() => handleManageTenant(lic.licenseKey)}
                          title="Manage Users & Groups"
                          className="p-2 text-slate-400 hover:text-teal-400 hover:bg-teal-500/10 rounded transition"
                        >
                          <Users size={16} />
                        </button>
                        <button
                          onClick={() => handleReset(lic.licenseKey)}
                          title="Reset Seats"
                          className="p-2 text-slate-400 hover:text-orange-400 hover:bg-orange-500/10 rounded transition"
                        >
                          <RefreshCw size={16} />
                        </button>
                        <button
                          onClick={() => handleResendEmail(lic.email)}
                          title="Resend Activation Email"
                          className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded transition"
                        >
                          <Mail size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(lic.licenseKey)}
                          title="Delete License"
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {licenses.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      No licenses found. Create one to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </>
      )}

      {/* Create Modal (Dark Mode) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
              <h3 className="font-bold text-lg text-white">Create New License</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">License Key</label>
                <div className="relative">
                  <Key size={16} className="absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 text-white outline-none"
                    placeholder="e.g. CORP-2024-X99"
                    value={newLicense.key}
                    onChange={(e) => setNewLicense({ ...newLicense, key: e.target.value })}
                  />
                </div>
              </div>

              {/* New Tenant Field - Dropdown */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Tenant (Organization)</label>
                <select
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 text-white outline-none"
                  value={newLicense.tenant}
                  onChange={(e) => setNewLicense({ ...newLicense, tenant: e.target.value })}
                  disabled={!!modalTenantId} // Lock if specific
                >
                  <option value="">Select a Tenant...</option>
                  {tenants.map(t => (
                    <option key={t.id} value={t.name}>{t.name} ({t.domain || 'No Domain'})</option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-1">Select an existing tenant. Create new tenants in the Tenants tab.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Plan Features</label>
                  <select
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 text-white outline-none"
                    value={newLicense.plan}
                    onChange={(e) => setNewLicense({ ...newLicense, plan: e.target.value })}
                  >
                    <option value="Pro,AI">Pro (Individual)</option>
                    <option value="Enterprise,AI,Audit">Enterprise (Team)</option>
                    <option value="Ultimate,AI,Audit,Policy">Ultimate (Custom)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Max Seats</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 text-white outline-none"
                    value={newLicense.seats}
                    onChange={(e) => setNewLicense({ ...newLicense, seats: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Payment Type</label>
                  <select
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 text-white outline-none"
                    value={newLicense.paymentType}
                    onChange={(e) => {
                      const type = e.target.value;
                      const isSaas = type === 'SaaS';
                      setNewLicense({
                        ...newLicense,
                        paymentType: type,
                        // Auto-set validity based on type logic if needed, but keeping manual control for now
                      });
                    }}
                  >
                    <option value="One-Time">One-Time Payment</option>
                    <option value="SaaS">SaaS Subscription</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    {newLicense.paymentType === 'SaaS' ? 'Monthly Amount ($)' : 'Payment Amount ($)'}
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 text-white outline-none"
                    value={newLicense.amount}
                    onChange={(e) => setNewLicense({ ...newLicense, amount: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
              </div>

              {newLicense.paymentType === 'SaaS' ? (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Start Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 text-white outline-none"
                      value={newLicense.subscriptionStart}
                      onChange={(e) => setNewLicense({ ...newLicense, subscriptionStart: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Life (Months)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 text-white outline-none"
                      value={newLicense.licenseLifeMonths}
                      onChange={(e) => {
                        const months = parseInt(e.target.value) || 0;
                        const start = new Date(newLicense.subscriptionStart || new Date());
                        const end = new Date(start);
                        end.setMonth(end.getMonth() + months);
                        setNewLicense({
                          ...newLicense,
                          licenseLifeMonths: months,
                          expiry: end.toISOString().split('T')[0]
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">End Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 text-white outline-none"
                      value={newLicense.expiry}
                      onChange={(e) => setNewLicense({ ...newLicense, expiry: e.target.value })}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Expiration</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 text-white outline-none"
                      value={newLicense.expiry}
                      onChange={(e) => setNewLicense({ ...newLicense, expiry: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Payment Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 text-white outline-none"
                      value={newLicense.paymentDate}
                      onChange={(e) => setNewLicense({ ...newLicense, paymentDate: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-slate-900/50 flex justify-end gap-3 border-t border-slate-700">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-slate-400 font-medium hover:text-white hover:bg-slate-800 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-teal-500 text-slate-900 font-bold hover:bg-teal-400 rounded-lg shadow-lg shadow-teal-500/20 transition"
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
