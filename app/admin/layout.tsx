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
import { Plus_Jakarta_Sans } from 'next/font/google'
import {
    LayoutDashboard,
    Users,
    DollarSign,
    Search,
    Bell,
    Menu,
    X,
    Briefcase
} from 'lucide-react'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [sidebarOpen, setSidebarOpen] = useState(false)

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

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
                        <div className="flex items-center gap-3">
                            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
                                <path d="M50 18 L50 55 L26 55 Z" fill="#5EEAD4" />
                                <path d="M50 24 L50 52 L68 52 Z" fill="#5EEAD4" opacity="0.6" />
                                <line x1="50" y1="16" x2="50" y2="62" stroke="#5EEAD4" stroke-width="2.5" />
                                <path d="M20 58 L28 68 L72 68 L80 58 Z" fill="#5EEAD4" />
                                <ellipse cx="50" cy="70" rx="42" ry="4" fill="#5EEAD4" opacity="0.3" />
                                <path d="M12 75 Q28 72 44 75 Q60 78 76 75" stroke="#5EEAD4" stroke-width="2" fill="none" opacity="0.5" />
                            </svg>
                            <span className="text-xl font-bold tracking-tight text-slate-100">
                                Captain<span className="text-teal-400">EPM</span>
                            </span>
                        </div>
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

                    {/* User Profile Snippet */}
                    <div className="p-4 border-t border-teal-500/10">
                        <div className="bg-slate-800/40 p-4 rounded-2xl flex items-center gap-3 border border-slate-700/30">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold shadow-lg shadow-teal-500/20">
                                A
                            </div>
                            <div>
                                <div className="text-sm font-bold text-slate-200">Admin User</div>
                                <div className="text-xs text-slate-500">Super Admin</div>
                            </div>
                        </div>
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
