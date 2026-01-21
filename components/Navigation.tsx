'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './logo'
import { Button } from './ui/button'

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Do not render navigation on Admin pages or Login page
  if (pathname?.startsWith('/admin') || pathname === '/login') return null

  const navLinks = [
    { name: 'Features', href: '/features' },
    { name: 'AI & Automation', href: '/ai-automation' },
    { name: 'Pricing', href: '#pricing' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen ? 'bg-navy/80 backdrop-blur-md border-b border-seafoam/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Logo className="h-8 w-8 text-seafoam transition-transform group-hover:rotate-45 duration-700" />
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-seafoam transition-colors">
              Captain
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-300 hover:text-seafoam transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-seafoam transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-4 pl-8 border-l border-white/10">
              <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Log In
              </Link>
              <Link href="/">
                <Button variant="primary" size="sm" className="shadow-glow-teal">
                  Download Trial
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy border-b border-seafoam/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-base font-medium text-slate-300 hover:text-seafoam pl-2 border-l-2 border-transparent hover:border-seafoam transition-all"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
                >
                  Log In
                </Link>
                <Link href="/" onClick={() => setIsOpen(false)} className="block">
                  <Button className="w-full justify-center shadow-glow-teal">
                    Download Trial
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
