import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { ChatWidget } from '@/components/chat-widget'

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navigation />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
            <ChatWidget />
        </>
    )
}
