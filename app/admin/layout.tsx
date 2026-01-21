'use client'

import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  CreditCard,
  Search,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/logo'

const initialNavigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'CRM', href: '/admin/crm', icon: Users },
  { name: 'Finance', href: '/admin/finance', icon: CreditCard },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Determine active state dynamicallly
  const navigation = initialNavigation.map(item => ({
    ...item,
    current: pathname === item.href
  }))

  return (
    <div className="min-h-screen bg-navy text-slate-100 font-sans selection:bg-seafoam/30">
      {/* Sidebar */}
      <div className="fixed inset-y-0 z-50 flex w-72 flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-surface/50 backdrop-blur-xl border-r border-seafoam/10 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center gap-2 border-b border-seafoam/10">
            <Logo className="h-8 w-8 text-seafoam" />
            <span className="font-bold text-xl tracking-tight text-white">Captain</span>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <div className="text-xs font-semibold leading-6 text-slate-400 uppercase tracking-wider mb-2">
                  Main Menu
                </div>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`
                          group flex gap-x-3 rounded-lg p-2 text-sm leading-6 font-semibold transition-all duration-200
                          ${item.current 
                            ? 'bg-seafoam/10 text-seafoam shadow-glow-teal' 
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                          }
                        `}
                      >
                        <item.icon
                          className={`h-6 w-6 shrink-0 transition-colors ${item.current ? 'text-seafoam' : 'text-slate-500 group-hover:text-white'}`}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              
              <li className="mt-auto">
                <a
                  href="/"
                  className="group -mx-2 flex gap-x-3 rounded-lg p-2 text-sm font-semibold leading-6 text-slate-400 hover:bg-white/5 hover:text-white transition-all"
                >
                  <LogOut
                    className="h-6 w-6 shrink-0 text-slate-500 group-hover:text-white"
                    aria-hidden="true"
                  />
                  Back to Website
                </a>
              </li>
              
              {/* User Profile in Sidebar */}
              <li className="-mx-6 mt-4 border-t border-seafoam/10 pt-4 px-6 pb-2">
                 <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-ocean to-seafoam flex items-center justify-center text-navy font-bold text-sm shadow-lg">
                      A
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white">Admin User</span>
                      <span className="text-xs text-slate-400">Super Admin</span>
                    </div>
                 </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-x-4 border-b border-seafoam/10 bg-navy/80 backdrop-blur-md px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <form className="relative flex flex-1" action="#" method="GET">
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <div className="relative w-full max-w-md flex items-center">
                 <Search
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-slate-500 pl-2"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block h-10 w-full bg-surface-light/50 border border-seafoam/10 rounded-lg pl-10 pr-3 py-0 text-slate-300 placeholder:text-slate-500 focus:ring-2 focus:ring-seafoam focus:bg-surface-light sm:text-sm"
                  placeholder="Search Captain EPM..."
                  type="search"
                  name="search"
                />
              </div>
            </form>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              
              {/* Simplified Header - Removed redundant website links to fix overlap */}
              
              <Link
                href="/" 
                className="hidden lg:block bg-gradient-to-r from-ocean to-seafoam hover:brightness-110 text-navy font-bold py-2 px-4 rounded-lg text-sm shadow-glow-teal transition-all"
              >
                Download Trial
              </Link>
            </div>
          </div>
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
