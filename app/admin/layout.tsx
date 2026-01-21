'use client'

import { useState, ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    Users,
    DollarSign,
    Search,
    Bell,
    Menu,
    ShieldCheck
} from 'lucide-react'

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'CRM', href: '/admin/crm', icon: Users },
        { name: 'Finance', href: '/admin/finance', icon: DollarSign },
    ]

    return (
        <div className="min-h-screen bg-ocean-dark flex font-sans text-slate-light">

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-ocean shadow-xl transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:shadow-none border-r border-ocean-light/20 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="h-20 flex items-center px-8 border-b border-ocean-light/20">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center mr-3 shadow-lg shadow-teal/20">
                            <ShieldCheck className="text-ocean-dark w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold text-slate-light">
                            Captain
                        </span>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        <div className="text-xs font-semibold text-slate uppercase px-4 mb-4 tracking-wider">
                            Main Menu
                        </div>
                        {navItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                            ? 'bg-teal/10 text-teal font-semibold shadow-sm'
                                            : 'text-slate hover:bg-ocean-light/30 hover:text-slate-light'
                                        }`}
                                >
                                    <item.icon
                                        className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-teal' : 'text-slate group-hover:text-slate-light'
                                            }`}
                                    />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* User Profile Snippet */}
                    <div className="p-4 border-t border-ocean-light/20">
                        <div className="bg-ocean-light/30 p-4 rounded-2xl flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center text-teal font-bold shadow-sm">
                                A
                            </div>
                            <div>
                                <div className="text-sm font-bold text-slate-light">Admin User</div>
                                <div className="text-xs text-slate">Super Admin</div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* Top Header */}
                <header className="h-20 bg-ocean/80 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between border-b border-ocean-light/20">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden p-2 text-slate hover:text-slate-light"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="flex items-center bg-ocean-light/30 px-4 py-2.5 rounded-2xl w-96 border border-ocean-light/20 focus-within:ring-2 focus-within:ring-teal/30 transition-all">
                        <Search className="text-slate w-5 h-5 mr-3" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none text-sm text-slate-light w-full placeholder-slate"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate hover:text-teal hover:bg-teal/10 rounded-xl transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-ocean"></span>
                        </button>
                        <div className="w-px h-8 bg-ocean-light/20 mx-2"></div>
                        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
                            <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center text-sm font-bold text-teal">
                                AU
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-8 relative">
                    {/* Background Decoration */}
                    <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-ocean-light/20 to-transparent -z-10" />
                    {children}
                </main>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    )
}
