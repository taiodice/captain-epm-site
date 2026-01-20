import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ReactNode } from 'react' // Import ReactNode

export const metadata: Metadata = {
  title: 'Captain EPM - Your Oracle EPM Command Center',
  description: 'Unify Oracle EPM administration, analytics, and AI-powered automation—all within Excel. The ultimate tool for EPM administrators and FP&A analysts.',
  keywords: 'Oracle EPM, Excel Add-in, EPM Administration, Financial Planning, FP&A, AI Analytics',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
