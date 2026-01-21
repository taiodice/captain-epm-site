import Link from 'next/link'
import { Logo } from './logo'

const footerLinks = {
  product: [
    { label: 'Features', href: '/features' },
    { label: 'AI & Automation', href: '/ai-automation' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Download', href: '/download' },
  ],
  resources: [
    { label: 'Documentation', href: '/docs' },
    { label: 'API Reference', href: '/api' },
    { label: 'Support', href: '/support' },
    { label: 'Changelog', href: '/changelog' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Partners', href: '/partners' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'License', href: '/license' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-seafoam/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Logo className="w-10 h-10" />
              <span className="text-lg font-bold text-slate-100">Captain EPM</span>
            </Link>
            <p className="text-slate-500 text-sm">
              Your Oracle EPM Command Center. Built for finance teams who demand more.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-slate-300 font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-500 hover:text-seafoam transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-300 font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-500 hover:text-seafoam transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-300 font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-500 hover:text-seafoam transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-300 font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-500 hover:text-seafoam transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-seafoam/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Captain EPM. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="https://twitter.com" className="text-slate-500 hover:text-seafoam transition-colors">
              Twitter
            </a>
            <a href="https://linkedin.com" className="text-slate-500 hover:text-seafoam transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com" className="text-slate-500 hover:text-seafoam transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
