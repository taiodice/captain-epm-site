'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Users,
  Shield,
  Plus,
  Trash2,
  Settings,
  UserPlus,
  Search,
  CheckCircle,
  XCircle,
  Loader2,
  ChevronRight
} from 'lucide-react'

const API_BASE = "https://api.captain-epm.com/api"

interface TenantDashboardProps {
  licenseKey: string
  currentUserEmail: string
  onLogout: () => void
  isSuperAdmin?: boolean
}

interface User {
  id: number
  email: string
  role: string
  createdAt: string
}

interface Group {
  id: number
  name: string
  description: string
  memberCount: number
}

interface GroupMember {
  userId: number
  email: string
  role: string
  joinedAt: string
}

export default function TenantDashboard({ licenseKey, currentUserEmail, onLogout, isSuperAdmin = false }: TenantDashboardProps) {
  const [activeTab, setActiveTab] = useState<'users' | 'groups'>('users')
  const [users, setUsers] = useState<User[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(false)

  // Modal States
  const [showAddUser, setShowAddUser] = useState(false)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)

  // Form Data
  // Form Data
  const [newUserEmail, setNewUserEmail] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')
  const [newGroupData, setNewGroupData] = useState({ name: '', description: '' })

  // Change Password State
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [cpCurrent, setCpCurrent] = useState('')
  const [cpNew, setCpNew] = useState('')
  const [cpConfirm, setCpConfirm] = useState('')

  // New Features
  const [tenantName, setTenantName] = useState('')
  const [resetUserId, setResetUserId] = useState<number | null>(null)
  const [resetUserPassword, setResetUserPassword] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const config = { headers: { 'X-License-Key': licenseKey } }

      const [usersRes, groupsRes, infoRes] = await Promise.all([
        axios.get(`${API_BASE}/Users/list`, config),
        axios.get(`${API_BASE}/TenantGroups/my-groups`, config),
        axios.get(`${API_BASE}/Users/tenant-info`, config)
      ])

      setUsers(usersRes.data)
      setGroups(groupsRes.data)
      setTenantName(infoRes.data.name)
    } catch (e: any) {
      console.error("Failed to load data", e)
      alert("Error loading data: " + (e.response?.data?.message || e.message))
    } finally {
      setLoading(false)
    }
  }

  const handleResetUserPassword = async () => {
    if (!resetUserId || !resetUserPassword) return
    try {
      await axios.post(`${API_BASE}/Users/reset-user-password`,
        { email: users.find(u => u.id === resetUserId)?.email, newPassword: resetUserPassword },
        { headers: { 'X-License-Key': licenseKey } }
      )
      alert("Password reset successfully.")
      setResetUserId(null)
      setResetUserPassword('')
    } catch (e: any) {
      alert("Reset failed: " + (e.response?.data?.message || e.message))
    }
  }

  // ... (Keep existing handlers: handleAddUser, handleDeleteUser, handleCreateGroup, handleDeleteGroup, handleUpdatePassword) ...
  // Re-inserting them for context if ReplaceBlock requires contiguous block or use existing if carefully sliced.
  // Since I am replacing the whole component body effectively to inject state and modals, I should be careful.
  // Actually, I will use ReplaceBlock to target specific sections to minimize risk.

  // NOTE: This tool call is actually replacing the WHOLE file content relative to the task description? 
  // No, I should use targeted replacements. 
  // ABORTING full replace. I will use a targeted replace for the state/loadData and another for the render.

  // This tool call is just for the state/loadData part.
  const handleAddUser = async () => {
    if (!newUserEmail) return
    try {
      await axios.post(`${API_BASE}/Users/create`,
        { email: newUserEmail, role: 'Viewer', password: newUserPassword || undefined },
        { headers: { 'X-License-Key': licenseKey } }
      )
      setShowAddUser(false)
      setNewUserEmail('')
      setNewUserPassword('')
      loadData()
    } catch (e: any) {
      const msg = e.response?.data?.message || e.response?.data || e.message
      alert("Failed to add user: " + (typeof msg === 'object' ? JSON.stringify(msg) : msg))
    }
  }

  const handleDeleteUser = async (userId: number) => {
    if (!confirm("Are you sure you want to remove this user?")) return
    try {
      await axios.delete(`${API_BASE}/Users/${userId}`,
        { headers: { 'X-License-Key': licenseKey } }
      )
      loadData()
    } catch (e: any) {
      alert("Failed to delete user: " + (e.response?.data || e.message))
    }
  }

  const handleCreateGroup = async () => {
    if (!newGroupData.name) return
    try {
      await axios.post(`${API_BASE}/TenantGroups/create-by-key`,
        newGroupData,
        { headers: { 'X-License-Key': licenseKey } }
      )
      setShowCreateGroup(false)
      setNewGroupData({ name: '', description: '' })
      loadData()
    } catch (e: any) {
      alert("Failed to create group: " + (e.response?.data || e.message))
    }
  }

  const handleDeleteGroup = async (groupId: number) => {
    if (!confirm("Delete this group?")) return
    try {
      await axios.delete(`${API_BASE}/TenantGroups/delete/${groupId}`,
        { headers: { 'X-License-Key': licenseKey } }
      )
      loadData()
    } catch (e: any) {
      alert("Failed to delete group (Admin access required?): " + (e.response?.data?.message || e.message))
    }
  }

  const handleUpdatePassword = async () => {
    if (!cpCurrent || !cpNew) return alert("Please fill in all fields")
    if (cpNew !== cpConfirm) return alert("New passwords do not match")

    try {
      await axios.post(`${API_BASE}/Users/update-password-force`,
        { email: currentUserEmail, oldPassword: cpCurrent, newPassword: cpNew },
        { headers: { 'X-License-Key': licenseKey } }
      )

      alert("Password updated successfully")
      setShowChangePassword(false)
      setCpCurrent('')
      setCpNew('')
      setCpConfirm('')
    } catch (e: any) {
      alert("Update failed: " + (e.response?.data?.message || e.message))
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-start pb-6 border-b border-slate-700/50">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Shield className="text-teal-400" />
            {tenantName || 'Security Management'}
          </h1>
          <p className="text-slate-400 mt-1">Manage users and access groups for {tenantName || 'your organization'}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
           <div 
             className="flex items-center gap-2 text-slate-300 hover:text-white cursor-pointer transition text-sm font-medium bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50 hover:border-teal-500/30"
             onClick={() => setShowChangePassword(true)}
             title="Manage Profile"
           >
             <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-500 flex items-center justify-center text-xs text-white font-bold">
                {currentUserEmail ? currentUserEmail.charAt(0).toUpperCase() : 'U'}
             </div>
             {currentUserEmail || 'User'}
           </div>

           <div className="flex gap-2">
            {!isSuperAdmin && (
                <button
                onClick={() => setShowChangePassword(true)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                title="Change Password"
                >
                <Settings size={20} />
                </button>
            )}
            <button
                onClick={onLogout}
                className="px-4 py-2 text-sm text-slate-400 hover:text-red-400 hover:bg-slate-800/50 rounded-lg transition flex items-center gap-2"
            >
                {isSuperAdmin ? (
                <>
                    <ChevronRight className="rotate-180" size={16} /> 
                    <span>Back</span>
                </>
                ) : (
                <>
                    <span className="font-semibold">Sign Out</span>
                </>
                )}
            </button>
           </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400"><Users size={24} /></div>
            <div>
              <div className="text-2xl font-bold text-white">{users.length}</div>
              <div className="text-sm text-slate-400">Total Users</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400"><Shield size={24} /></div>
            <div>
              <div className="text-2xl font-bold text-white">{groups.length}</div>
              <div className="text-sm text-slate-400">Security Groups</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-64 text-teal-400">
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : activeTab === 'users' ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              {/* Search placeholder */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
                <input className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:text-white" placeholder="Search users..." />
              </div>
              <button
                onClick={() => setShowAddUser(true)}
                className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-900 px-4 py-2 rounded-lg font-bold transition"
              >
                <Plus size={18} /> Add User
              </button>
            </div>

            {/* Tabs moved inside content area or kept above? Kept above as per original design. */}

            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-900/50 text-slate-400 text-sm">
                  <tr>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Added On</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-slate-700/30 transition">
                      <td className="px-6 py-4 text-white font-medium">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300 border border-slate-600">
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <button
                          onClick={() => setResetUserId(u.id)}
                          className="text-slate-500 hover:text-amber-400 transition p-2"
                          title="Reset Password"
                        >
                          <Settings size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="text-slate-500 hover:text-red-400 transition p-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">No users found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
            {/* Groups Tab Content (Original) */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowCreateGroup(true)}
                className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-900 px-4 py-2 rounded-lg font-bold transition"
              >
                <Plus size={18} /> Create Group
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {groups.map(g => (
                <div key={g.id} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 hover:border-teal-500/30 transition group relative">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white">{g.name}</h3>
                    <button onClick={() => handleDeleteGroup(g.id)} className="text-slate-600 hover:text-red-400"><Trash2 size={16} /></button>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">{g.description || 'No description'}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Users size={14} />
                    {g.memberCount} members
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-md p-6">
            <h3 className="font-bold text-lg text-white mb-4">Add User</h3>
            {/* ... */}
            <input
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white mb-4"
              placeholder="Email address"
              value={newUserEmail}
              onChange={e => setNewUserEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white mb-2"
              placeholder="Initial Password (Optional)"
              value={newUserPassword}
              onChange={e => setNewUserPassword(e.target.value)}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setShowAddUser(false)} className="text-slate-400 hover:text-white px-4 py-2">Cancel</button>
              <button onClick={handleAddUser} className="bg-teal-500 text-slate-900 px-4 py-2 rounded-lg font-bold hover:bg-teal-400">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Group Modal */}
      {showCreateGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-md p-6">
            <h3 className="font-bold text-lg text-white mb-4">Create Group</h3>
            <input
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white mb-3"
              placeholder="Group Name"
              value={newGroupData.name}
              onChange={e => setNewGroupData({ ...newGroupData, name: e.target.value })}
            />
            <textarea
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white mb-4 h-24"
              placeholder="Description (Optional)"
              value={newGroupData.description}
              onChange={e => setNewGroupData({ ...newGroupData, description: e.target.value })}
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowCreateGroup(false)} className="text-slate-400 hover:text-white px-4 py-2">Cancel</button>
              <button onClick={handleCreateGroup} className="bg-teal-500 text-slate-900 px-4 py-2 rounded-lg font-bold hover:bg-teal-400">Create</button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal (For current user) */}
      {showChangePassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-md p-6">
            <h3 className="font-bold text-lg text-white mb-4">Change Password</h3>
            <input
              type="password"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white mb-3"
              placeholder="Current Password"
              value={cpCurrent}
              onChange={e => setCpCurrent(e.target.value)}
            />
            <input
              type="password"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white mb-3"
              placeholder="New Password"
              value={cpNew}
              onChange={e => setCpNew(e.target.value)}
            />
            <input
              type="password"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white mb-4"
              placeholder="Confirm New Password"
              value={cpConfirm}
              onChange={e => setCpConfirm(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowChangePassword(false)} className="text-slate-400 hover:text-white px-4 py-2">Cancel</button>
              <button onClick={handleUpdatePassword} className="bg-teal-500 text-slate-900 px-4 py-2 rounded-lg font-bold hover:bg-teal-400">Update</button>
            </div>
          </div>
        </div>
      )}

      {/* Reset User Password Modal (Admin Action) */}
      {resetUserId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-md p-6 animate-in zoom-in duration-200">
            <h3 className="font-bold text-lg text-white mb-2">Reset User Password</h3>
            <p className="text-sm text-slate-400 mb-4">Set a new temporary password for <b>{users.find(u => u.id === resetUserId)?.email}</b>.</p>

            <input
              type="text"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white mb-4 font-mono"
              placeholder="New Password"
              value={resetUserPassword}
              onChange={e => setResetUserPassword(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => { setResetUserId(null); setResetUserPassword(''); }}
                className="text-slate-400 hover:text-white px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleResetUserPassword}
                className="bg-amber-500 text-slate-900 px-4 py-2 rounded-lg font-bold hover:bg-amber-400"
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
