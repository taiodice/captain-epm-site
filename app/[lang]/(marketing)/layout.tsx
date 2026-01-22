import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { ChatWidget } from '@/components/chat-widget'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'

export default async function MarketingLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: { lang: Locale }
}) {
    const dictionary = await getDictionary(params.lang)

    return (
        <>
            <Navigation dictionary={dictionary} lang={params.lang} />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer dictionary={dictionary} />
            <ChatWidget />
        </>
    )
}
