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
    X
} from 'lucide-react'
import { LogoMark } from '@/components/logo'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'CRM', href: '/admin/crm', icon: Users },
        { name: 'Finance', href: '/admin/finance', icon: DollarSign },
    ]

    return (
        <div className="min-h-screen bg-navy flex font-sans text-slate-100">

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface shadow-xl transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:shadow-none border-r border-seafoam/10 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="h-20 flex items-center px-6 border-b border-seafoam/10">
                        <LogoMark size={36} />
                        <span className="text-xl font-bold ml-3 text-slate-100">
                            Captain
                        </span>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        <div className="text-xs font-semibold text-slate-500 uppercase px-4 mb-4 tracking-wider">
                            Main Menu
                        </div>
                        {navItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                            ? 'bg-seafoam/10 text-seafoam font-semibold'
                                            : 'text-slate-400 hover:bg-surface-light hover:text-slate-100'
                                        }`}
                                >
                                    <item.icon
                                        className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-seafoam' : 'text-slate-500 group-hover:text-slate-300'
                                            }`}
                                    />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* User Profile Snippet */}
                    <div className="p-4 border-t border-seafoam/10">
                        <div className="bg-ocean/30 p-4 rounded-2xl flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ocean to-seafoam flex items-center justify-center text-navy font-bold">
                                A
                            </div>
                            <div>
                                <div className="text-sm font-bold text-slate-100">Admin User</div>
                                <div className="text-xs text-slate-500">Super Admin</div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* Top Header */}
                <header className="h-20 bg-surface/80 backdrop-blur-xl sticky top-0 z-40 px-6 flex items-center justify-between border-b border-seafoam/10">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden p-2 text-slate-400 hover:text-slate-100"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="flex items-center bg-surface-light px-4 py-2.5 rounded-xl w-80 border border-seafoam/10 focus-within:ring-2 focus-within:ring-seafoam/30 transition-all">
                        <Search className="text-slate-500 w-5 h-5 mr-3" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none text-sm text-slate-300 w-full placeholder-slate-500"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-seafoam hover:bg-seafoam/10 rounded-xl transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-coral rounded-full border-2 border-surface"></span>
                        </button>
                        <div className="w-px h-8 bg-seafoam/10 mx-2"></div>
                        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ocean to-seafoam flex items-center justify-center text-sm font-bold text-navy">
                                AU
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 relative">
                    {/* Background Decoration */}
                    <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-ocean/5 to-transparent -z-10" />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
