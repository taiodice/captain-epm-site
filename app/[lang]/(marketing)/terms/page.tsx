import { FadeIn } from '@/components/animations/fade-in'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'

export default async function TermsPage({ params }: { params: { lang: Locale } }) {
    const dictionary = await getDictionary(params.lang)

    return (
        <div className="min-h-screen bg-navy pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-6">
                <FadeIn>
                    <h1 className="text-4xl font-bold text-white mb-8">{dictionary.legal.terms_title}</h1>
                    <div className="prose prose-invert max-w-none text-slate-400">
                        <p className="lead text-lg">
                            Please read these Terms of Service carefully before using the Captain EPM platform.
                        </p>

                        <h3 className="text-white mt-8 mb-4 text-xl font-bold">1. Acceptance of Terms</h3>
                        <p>
                            By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.
                        </p>

                        <h3 className="text-white mt-8 mb-4 text-xl font-bold">2. Use License</h3>
                        <p>
                            Permission is granted to temporarily download one copy of the materials (information or software) on Captain EPM's website for personal, non-commercial transitory viewing only.
                        </p>

                        <h3 className="text-white mt-8 mb-4 text-xl font-bold">3. Disclaimer</h3>
                        <p>
                            The materials on Captain EPM's website are provided on an 'as is' basis. Captain EPM makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>

                        <h3 className="text-white mt-8 mb-4 text-xl font-bold">4. Limitations</h3>
                        <p>
                            In no event shall Captain EPM or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Captain EPM's website.
                        </p>

                        <p className="mt-8 text-sm opacity-60">{dictionary.legal.last_updated}: January 21, 2026</p>
                    </div>
                </FadeIn>
            </div>
        </div>
    )
}
