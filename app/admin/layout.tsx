'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    Users,
    DollarSign,
    Settings,
    Search,
    Bell,
    Menu,
    X,
    ShieldCheck,
    Briefcase
} from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'CRM', href: '/admin/crm', icon: Users },
        { name: 'Finance', href: '/admin/finance', icon: DollarSign },
    ]

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:shadow-none border-r border-gray-100 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="h-20 flex items-center px-8 border-b border-gray-50">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center mr-3 shadow-lg shadow-purple-200">
                            <ShieldCheck className="text-white w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                            Captain
                        </span>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        <div className="text-xs font-semibold text-gray-400 uppercase px-4 mb-4 tracking-wider">
                            Main Menu
                        </div>
                        {navItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                            ? 'bg-purple-50 text-purple-700 font-semibold shadow-sm'
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <item.icon
                                        className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-600'
                                            }`}
                                    />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* User Profile Snippet */}
                    <div className="p-4 border-t border-gray-50">
                        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-2xl flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-purple-600 font-bold shadow-sm">
                                A
                            </div>
                            <div>
                                <div className="text-sm font-bold text-gray-900">Admin User</div>
                                <div className="text-xs text-gray-500">Super Admin</div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* Top Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between border-b border-gray-100">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden p-2 text-gray-500 hover:text-gray-700"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="flex items-center bg-gray-50 px-4 py-2.5 rounded-2xl w-96 border border-gray-100 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
                        <Search className="text-gray-400 w-5 h-5 mr-3" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none text-sm text-gray-600 w-full placeholder-gray-400"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="w-px h-8 bg-gray-100 mx-2"></div>
                        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-sm font-bold text-purple-700">
                                AU
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-8 relative">
                    {/* Background Decoration */}
                    <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-50/50 to-transparent -z-10" />
                    {children}
                </main>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    )
}
