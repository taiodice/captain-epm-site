import { FadeIn } from '@/components/animations/fade-in'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'

export default async function PrivacyPage({ params }: { params: { lang: Locale } }) {
    const dictionary = await getDictionary(params.lang)

    return (
        <div className="min-h-screen bg-navy pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-6">
                <FadeIn>
                    <h1 className="text-4xl font-bold text-white mb-8">{dictionary.legal.privacy_title}</h1>
                    <div className="prose prose-invert max-w-none text-slate-400">
                        <p className="lead text-lg">
                            At Captain EPM, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.
                        </p>

                        <h3 className="text-white mt-8 mb-4 text-xl font-bold">1. Information We Collect</h3>
                        <p>
                            We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support. This may include your name, email address, and company information.
                        </p>

                        <h3 className="text-white mt-8 mb-4 text-xl font-bold">2. How We Use Your Information</h3>
                        <p>
                            We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to personalize your experience.
                        </p>

                        <h3 className="text-white mt-8 mb-4 text-xl font-bold">3. Data Security</h3>
                        <p>
                            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
                        </p>

                        <h3 className="text-white mt-8 mb-4 text-xl font-bold">4. Contact Us</h3>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at privacy@captain-epm.com.
                        </p>

                        <p className="mt-8 text-sm opacity-60">{dictionary.legal.last_updated}: January 21, 2026</p>
                    </div>
                </FadeIn>
            </div>
        </div>
    )
}
