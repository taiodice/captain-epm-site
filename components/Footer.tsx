'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { AnimatedLogo } from '@/components/animated-logo'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

const navigation = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'AI & Automation', href: '/ai-automation' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Changelog', href: '#' },
  ],
  support: [
    { name: 'Documentation', href: '/docs' },
    { name: 'API Reference', href: '/docs' },
    { name: 'Help Center', href: '/support' },
    { name: 'Status', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
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
      href: 'mailto:support@captain-epm.com',
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
            <Link href="/" className="block">
              <AnimatedLogo className="justify-start" />
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

          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Product</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.product.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-slate-400 hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-slate-400 hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-slate-400 hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Captain EPM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
