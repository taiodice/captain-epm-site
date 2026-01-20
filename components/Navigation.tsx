'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-700">Captain EPM</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition">
              Home
            </Link>
            <Link href="/features" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition">
              Features
            </Link>
            <Link href="/ai-automation" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition">
              AI & Automation
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition">
              Pricing
            </Link>
            <Link href="#download" className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition font-medium">
              Download Trial
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md">
              Home
            </Link>
            <Link href="/features" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md">
              Features
            </Link>
            <Link href="/ai-automation" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md">
              AI & Automation
            </Link>
            <Link href="/pricing" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md">
              Pricing
            </Link>
            <Link href="#download" className="block px-3 py-2 text-base font-medium bg-primary-600 text-white rounded-md hover:bg-primary-700 text-center">
              Download Trial
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
