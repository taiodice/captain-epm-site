'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatedLogo } from './animated-logo'
import { Button } from './ui/button'
import { Locale, i18n } from '@/i18n-config'

export const Navigation = ({ dictionary, lang }: { dictionary: any, lang: Locale }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const changeLanguage = (newLocale: string) => {
    if (!pathname) return
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  // Do not render navigation on Admin pages or Login page
  if (pathname?.startsWith('/admin') || pathname === '/login') return null

  const navLinks = [
    { name: dictionary.navigation.features, href: `/${lang}/features` },
    { name: dictionary.navigation.ai_automation, href: `/${lang}/ai-automation` },
    { name: dictionary.navigation.pricing, href: `/${lang}/pricing` },
  ]

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-navy/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${lang}`} className="block">
            <AnimatedLogo />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-seafoam transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative group">
              <button className="p-2 text-slate-300 hover:text-white transition-colors flex items-center gap-1">
                <Globe size={18} />
                <span className="uppercase text-xs font-bold">{lang}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-32 bg-surface border border-white/10 rounded-xl shadow-xl overflow-hidden hidden group-hover:block">
                {i18n.locales.map((locale) => (
                  <button
                    key={locale}
                    onClick={() => changeLanguage(locale)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors ${lang === locale ? 'text-seafoam' : 'text-slate-400'}`}
                  >
                    {locale === 'en' ? 'English' :
                      locale === 'es' ? 'Español' :
                        locale === 'pt' ? 'Português' :
                          locale === 'fr' ? 'Français' :
                            locale === 'it' ? 'Italiano' :
                              'Deutsch'}
                  </button>
                ))}
              </div>
            </div>

            <Link href={`/${lang}/login`} className="text-sm font-medium text-white hover:text-seafoam transition-colors">
              {dictionary.navigation.log_in}
            </Link>
            <Button variant="primary" size="sm">
              {dictionary.navigation.download_trial}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              {isOpen ? <X /> : <Menu />}
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
            className="md:hidden bg-navy border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-8 space-y-6">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-lg font-medium text-slate-300 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-white/5 space-y-4">
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {i18n.locales.map((locale) => (
                    <button
                      key={locale}
                      onClick={() => changeLanguage(locale)}
                      className={`px-3 py-1 rounded-full text-sm border ${lang === locale ? 'border-seafoam text-seafoam' : 'border-white/10 text-slate-400'}`}
                    >
                      {locale.toUpperCase()}
                    </button>
                  ))}
                </div>
                <Link
                  href={`/${lang}/login`}
                  className="block text-center text-slate-300 hover:text-white py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {dictionary.navigation.log_in}
                </Link>
                <Button className="w-full" variant="primary">
                  {dictionary.navigation.download_trial}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
