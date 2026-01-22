'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { AnimatedLogo } from '@/components/animated-logo'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

export function Footer({ dictionary }: { dictionary: any }) {
  const pathname = usePathname()

  // Do not render footer on Admin pages or Login page
  if (pathname?.includes('/admin') || pathname?.includes('/login')) return null

  const navigation = {
    product: [
      { name: dictionary.navigation.features, href: '#' }, // Using # to avoid broken links during refactor
      { name: dictionary.navigation.ai_automation, href: '#' },
      { name: dictionary.navigation.pricing, href: '#' },
    ],
    support: [
      { name: dictionary.footer.docs, href: '/docs' },
      { name: dictionary.footer.api, href: '/docs' },
    ],
    company: [
      { name: dictionary.footer.about, href: '#' },
      { name: dictionary.footer.contact, href: '/contact' },
      { name: dictionary.footer.privacy, href: '/privacy' },
      { name: dictionary.footer.terms, href: '/terms' },
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
              {dictionary.hero.description}
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
                <h3 className="text-sm font-semibold leading-6 text-white">{dictionary.footer.product}</h3>
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
                <h3 className="text-sm font-semibold leading-6 text-white">{dictionary.footer.support}</h3>
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
                <h3 className="text-sm font-semibold leading-6 text-white">{dictionary.footer.company}</h3>
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
          <p>&copy; {new Date().getFullYear()} Captain EPM. {dictionary.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}
