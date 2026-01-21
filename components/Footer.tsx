'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Logo } from './logo'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

const navigation = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'AI & Automation', href: '/ai-automation' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Changelog', href: '#' },
  ],
  support: [
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'Help Center', href: '#' },
    { name: 'Status', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
  social: [
    {
      name: 'GitHub',
      href: '#',
      icon: Github,
    },
    {
      name: 'Twitter',
      href: '#',
      icon: Twitter,
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: Linkedin,
    },
    {
      name: 'Email',
      href: '#',
      icon: Mail,
    },
  ],
}

export function Footer() {
  const pathname = usePathname()

  // Do not render footer on Admin pages or Login page
  if (pathname?.startsWith('/admin') || pathname === '/login') return null

  return (
    <footer className="bg-navy border-t border-seafoam/10 relative overflow-hidden" aria-labelledby="footer-heading">
      
      {/* Background glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-seafoam/20 to-transparent" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-seafoam/5 rounded-full blur-3xl pointer-events-none" />

      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <Logo className="h-8 w-8 text-seafoam transition-transform group-hover:rotate-45 duration-700" />
              <span className="font-bold text-xl tracking-tight text-white group-hover:text-seafoam transition-colors">
                Captain
              </span>
            </Link>
            <p className="text-sm leading-6 text-slate-400 max-w-sm">
              The all-in-one Excel Add-in for Oracle EPM Cloud. Manage users, build dashboards, and automate workflows significantly faster.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-slate-400 hover:text-seafoam transition-colors">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/features" className="hover:text-white transition">Features</Link></li>
              <li><Link href="/ai-automation" className="hover:text-white transition">AI & Automation</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
              <li><Link href="#download" className="hover:text-white transition">Download</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white transition">Documentation</Link></li>
              <li><Link href="#" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Captain EPM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
