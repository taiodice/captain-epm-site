'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Plus_Jakarta_Sans } from 'next/font/google'
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Search,
  Bell,
  Menu,
  LogOut
} from 'lucide-react'
import { AnimatedLogo } from '@/components/animated-logo'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'CRM', href: '/admin/crm', icon: Users },
  { name: 'Finance', href: '/admin/finance', icon: CreditCard },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    // Poll for session storage changes or just load once
    const loadUser = () => {
      const email = sessionStorage.getItem('userEmail')
      const role = sessionStorage.getItem('userRole')
      setUserEmail(email || '')
      setUserRole(role || '')
    }
    loadUser()

    // Listen for custom login/logout events from page.tsx (via window)
    const handleAuthUpdate = () => loadUser()
    window.addEventListener('captain-auth-update', handleAuthUpdate)

    // Also poll as backup
    const interval = setInterval(loadUser, 1000)

    return () => {
      window.removeEventListener('captain-auth-update', handleAuthUpdate)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0F172A] to-[#1E293B] flex font-sans text-slate-50 ${jakarta.className}`}>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0A1628]/90 backdrop-blur-xl border-r border-teal-500/10 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:shadow-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-24 flex items-center px-8 border-b border-teal-500/10">
            <AnimatedLogo />
          </div>

          {/* Nav */}
          <nav className="flex-1 px-4 py-8 space-y-2">
            <div className="text-xs font-bold text-teal-400/80 uppercase px-4 mb-4 tracking-widest">
              Main Menu
            </div>
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 group ${isActive
                    ? 'bg-teal-500/10 text-teal-400 font-semibold border border-teal-500/20 shadow-[0_0_15px_rgba(94,234,212,0.1)]'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                    }`}
                >
                  <item.icon
                    className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-teal-400' : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Footer Nav */}
          <div className="p-4 space-y-2">
            <a
              href="/"
              className="flex items-center px-4 py-3 text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Back to Website
            </a>
          </div>

          {/* User Profile Snippet */}
          <div className="p-4 border-t border-teal-500/10">
            {userEmail ? (
              <div className="bg-slate-800/40 p-4 rounded-2xl flex items-center gap-3 border border-slate-700/30">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold shadow-lg shadow-teal-500/20">
                  {userEmail.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <div className="text-sm font-bold text-slate-200 truncate" title={userEmail}>{userEmail}</div>
                  <div className="text-xs text-slate-500">{userRole === 'SuperAdmin' ? 'Super Admin' : 'Tenant User'}</div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800/40 p-4 rounded-2xl flex items-center gap-3 border border-slate-700/30 opacity-50">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-400 font-bold">
                  ?
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-400">Not Logged In</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

        {/* Top Header */}
        <header className="h-20 sticky top-0 z-40 px-8 flex items-center justify-between border-b border-teal-500/10 bg-[#0A1628]/80 backdrop-blur-md">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-slate-200"
          >
            <Menu size={24} />
          </button>

          <div className="hidden md:flex items-center bg-slate-800/50 px-4 py-2.5 rounded-2xl w-96 border border-slate-700/50 focus-within:ring-2 focus-within:ring-teal-500/50 transition-all">
            <Search className="text-slate-500 w-5 h-5 mr-3" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm text-slate-300 w-full placeholder-slate-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-teal-400 hover:bg-teal-500/10 rounded-xl transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0A1628]"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 relative scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {/* Diffused Glow Background */}
          <div className="absolute top-0 left-0 w-full h-[500px] bg-teal-500/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
