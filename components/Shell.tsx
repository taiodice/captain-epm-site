'use client'

import { usePathname } from 'next/navigation'
import { Navigation } from './Navigation'
import { Footer } from './Footer'
import { ChatWidget } from './chat-widget'

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Define routes that should have the global marketing layout (Nav + Footer)
  // We exclude /admin and /login routes
  const isMarketingPage = !pathname?.startsWith('/admin') && pathname !== '/login'

  return (
    <>
      {isMarketingPage && <Navigation />}
      <main className="flex-grow min-h-screen">
        {children}
      </main>
      {isMarketingPage && (
        <>
          <Footer />
          <ChatWidget />
        </>
      )}
    </>
  )
}
