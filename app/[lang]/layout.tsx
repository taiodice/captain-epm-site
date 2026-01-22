import type { Metadata } from 'next'
import { ReactNode } from 'react'
import '../globals.css'
import { i18n } from '../../i18n-config'

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }))
}

export const metadata: Metadata = {
    title: 'Captain EPM - Your Oracle EPM Command Center',
    description: 'Unify Oracle EPM administration, analytics, and AI-powered automation—all within Excel. The ultimate tool for EPM administrators and FP&A analysts.',
    keywords: 'Oracle EPM, Excel Add-in, EPM Administration, Financial Planning, FP&A, AI Analytics',
}

export default function RootLayout({
    children,
    params,
}: {
    children: ReactNode
    params: { lang: string }
}) {
    return (
        <html lang={params.lang}>
            <body>
                {children}
            </body>
        </html>
    )
}
