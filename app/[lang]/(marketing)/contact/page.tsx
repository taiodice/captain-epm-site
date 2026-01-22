import { FadeIn } from '@/components/animations/fade-in'
import { Button } from '@/components/ui/button'
import { Mail, MapPin, Phone } from 'lucide-react'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'

export default async function ContactPage({ params }: { params: { lang: Locale } }) {
    const dictionary = await getDictionary(params.lang)

    return (
        <div className="min-h-screen bg-navy pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                            {dictionary.contact.title}
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            {dictionary.contact.subtitle}
                        </p>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <FadeIn delay={0.2}>
                        <div className="space-y-8">
                            <div className="bg-surface p-8 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-6">{dictionary.contact.info_title}</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-seafoam/10 rounded-lg text-seafoam">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">{dictionary.contact.email}</h4>
                                            <p className="text-slate-400">support@captain-epm.com</p>
                                            <p className="text-slate-400">sales@captain-epm.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-ocean/10 rounded-lg text-ocean">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">{dictionary.contact.call}</h4>
                                            <p className="text-slate-400">+1 (555) 123-4567</p>
                                            <p className="text-slate-500 text-sm">Mon-Fri, 9am-6pm EST</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-coral/10 rounded-lg text-coral">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">{dictionary.contact.hq}</h4>
                                            <p className="text-slate-400">
                                                123 Innovation Drive<br />
                                                Tech District, NY 10001
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Contact Form */}
                    <FadeIn delay={0.3}>
                        <div className="bg-surface p-8 rounded-2xl border border-white/5">
                            <h3 className="text-xl font-bold text-white mb-6">{dictionary.contact.form_title}</h3>
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">{dictionary.contact.first_name}</label>
                                        <input type="text" className="w-full bg-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-seafoam outline-none" placeholder="John" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">{dictionary.contact.last_name}</label>
                                        <input type="text" className="w-full bg-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-seafoam outline-none" placeholder="Doe" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">{dictionary.contact.email_address}</label>
                                    <input type="email" className="w-full bg-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-seafoam outline-none" placeholder="john@company.com" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">{dictionary.contact.message}</label>
                                    <textarea rows={4} className="w-full bg-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-seafoam outline-none" placeholder="How can we help you?"></textarea>
                                </div>

                                <Button variant="primary" className="w-full">
                                    {dictionary.contact.send_btn}
                                </Button>
                            </form>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
