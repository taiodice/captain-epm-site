import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">Captain EPM</h3>
            <p className="text-gray-400 mb-4">
              Your Oracle EPM Command Center. Unify administration, analytics, and AI-powered automation—all within Excel.
            </p>
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
