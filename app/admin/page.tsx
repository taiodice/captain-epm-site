'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations/fade-in'
import { 
  Plus, 
  RefreshCw, 
  Trash2, 
  Key,
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react'

interface License {
  licenseKey: string
  email: string
  tenantName: string
  features: string
  status: string
  usedSeats: number
  maxSeats: number
  expirationDate: string
}

export default function AdminDashboard() {
  const [licenses, setLicenses] = useState<License[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulated data for demo
    setTimeout(() => {
      setLicenses([
        {
          licenseKey: 'ENT-KEY-CORP1',
          email: 'admin@corp.com',
          tenantName: 'Acme Corporation',
          features: 'Enterprise,AI,Audit,Policy',
          status: 'Active',
          usedSeats: 1,
          maxSeats: 10,
          expirationDate: '2030-01-01'
        },
        {
          licenseKey: 'PRO-KEY-SOLO1',
          email: 'user@startup.io',
          tenantName: 'StartupIO',
          features: 'Pro,AI',
          status: 'Active',
          usedSeats: 1,
          maxSeats: 1,
          expirationDate: '2025-06-15'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">License Management</h1>
          <p className="text-slate-500">Manage customer access and subscriptions</p>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Create License
        </Button>
      </div>

      {/* Stats Cards */}
      <StaggerChildren className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Licenses', value: '12', icon: Key, color: 'bg-ocean' },
          { label: 'Active Users', value: '47', icon: Users, color: 'bg-seafoam' },
          { label: 'Expiring Soon', value: '3', icon: Calendar, color: 'bg-coral' },
          { label: 'Revenue (MRR)', value: '$4,200', icon: CheckCircle, color: 'bg-green-500' },
        ].map((stat) => (
          <StaggerItem key={stat.label}>
            <Card className="p-5">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${stat.color} bg-opacity-20 flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color === 'bg-ocean' ? 'text-ocean' : stat.color === 'bg-seafoam' ? 'text-seafoam' : stat.color === 'bg-coral' ? 'text-coral' : 'text-green-500'}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-100">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>

      {/* License Table */}
      <FadeIn>
        <Card className="overflow-hidden">
          <div className="p-5 border-b border-seafoam/10 flex items-center justify-between">
            <h2 className="font-semibold text-slate-100">All Licenses</h2>
            <button className="text-slate-500 hover:text-seafoam transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          
          {loading ? (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 text-seafoam animate-spin mx-auto mb-4" />
              <p className="text-slate-500">Loading licenses...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-seafoam/10">
                    <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">License / Customer</th>
                    <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Plan Features</th>
                    <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Seats</th>
                    <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Expiration</th>
                    <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {licenses.map((license) => (
                    <tr key={license.licenseKey} className="border-b border-seafoam/5 hover:bg-seafoam/5 transition-colors">
                      <td className="px-5 py-4">
                        <div>
                          <code className="text-seafoam text-sm bg-seafoam/10 px-2 py-1 rounded">{license.licenseKey}</code>
                          <div className="text-sm text-slate-500 mt-1">{license.email}</div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1">
                          {license.features.split(',').map((feature) => (
                            <span key={feature} className="px-2 py-0.5 text-xs rounded-full bg-ocean/30 text-ocean">
                              {feature.trim()}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          license.status === 'Active' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {license.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {license.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-slate-400">
                          <Users className="w-4 h-4 inline mr-1" />
                          {license.usedSeats} / {license.maxSeats}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-400">
                        {new Date(license.expirationDate).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button className="px-3 py-1.5 text-xs rounded-lg border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 transition-colors">
                            Reset
                          </button>
                          <button className="px-3 py-1.5 text-xs rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </FadeIn>
    </div>
  )
}
