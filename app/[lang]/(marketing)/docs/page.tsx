import { FadeIn } from '@/components/animations/fade-in'
import { Card } from '@/components/ui/card'
import { Search, Book, Code, Zap, Settings } from 'lucide-react'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'

export default async function DocsPage({ params }: { params: { lang: Locale } }) {
    const dictionary = await getDictionary(params.lang)

    const categories = [
        {
            title: dictionary.docs.getting_started,
            icon: <Zap className="w-6 h-6 text-yellow-400" />,
            description: 'Installation, configuration, and your first steps with Captain EPM.',
            links: ['Quick Start Guide', 'Installation', 'Architecture Overview']
        },
        {
            title: dictionary.docs.core_concepts,
            icon: <Book className="w-6 h-6 text-blue-400" />,
            description: 'Understanding the fundamental concepts of managing Oracle EPM.',
            links: ['Data Flows', 'User Management', 'Task Automation']
        },
        {
            title: dictionary.docs.api_reference,
            icon: <Code className="w-6 h-6 text-purple-400" />,
            description: 'Detailed API documentation for developers and integrators.',
            links: ['Authentication', 'Endpoints', 'Rate Limits']
        },
        {
            title: dictionary.docs.administration,
            icon: <Settings className="w-6 h-6 text-slate-400" />,
            description: 'Managing your Captain EPM instance and users.',
            links: ['Security Settings', 'Audit Logs', 'Billing']
        }
    ]

    return (
        <div className="min-h-screen bg-navy pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                <FadeIn>
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">{dictionary.docs.title}</h1>
                        <p className="text-slate-400 text-lg mb-8">
                            {dictionary.docs.subtitle}
                        </p>

                        <div className="relative">
                            <Search className="absolute left-4 top-3.5 text-slate-500 w-5 h-5" />
                            <input
                                type="text"
                                placeholder={dictionary.docs.search_placeholder}
                                className="w-full bg-surface border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-seafoam outline-none"
                            />
                        </div>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {categories.map((cat, i) => (
                        <FadeIn key={cat.title} delay={i * 0.1}>
                            <Card className="p-8 h-full hover:border-seafoam/30 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                        {cat.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-2">{cat.title}</h3>
                                        <p className="text-slate-400 mb-6 text-sm">{cat.description}</p>
                                        <ul className="space-y-2">
                                            {cat.links.map(link => (
                                                <li key={link}>
                                                    <a href="#" className="text-seafoam hover:text-white transition-colors text-sm flex items-center gap-2">
                                                        → {link}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Card>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </div>
    )
}
