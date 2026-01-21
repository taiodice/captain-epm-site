'use client'

import { FadeIn } from '@/components/animations/fade-in'
import { Button } from '@/components/ui/button'
import { Mail, MapPin, Phone } from 'lucide-react'

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-navy pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                            Get in <span className="text-gradient">Touch</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Have questions about Captain EPM? Our team is here to help you transform your Oracle EPM experience.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <FadeIn delay={0.2}>
                        <div className="space-y-8">
                            <div className="bg-surface p-8 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-seafoam/10 rounded-lg text-seafoam">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">Email Us</h4>
                                            <p className="text-slate-400">support@captain-epm.com</p>
                                            <p className="text-slate-400">sales@captain-epm.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-ocean/10 rounded-lg text-ocean">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">Call Us</h4>
                                            <p className="text-slate-400">+1 (555) 123-4567</p>
                                            <p className="text-slate-500 text-sm">Mon-Fri, 9am-6pm EST</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-coral/10 rounded-lg text-coral">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">Headquarters</h4>
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
                            <h3 className="text-xl font-bold text-white mb-6">Send us a Message</h3>
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
                                        <input type="text" className="w-full bg-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-seafoam outline-none" placeholder="John" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                                        <input type="text" className="w-full bg-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-seafoam outline-none" placeholder="Doe" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                                    <input type="email" className="w-full bg-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-seafoam outline-none" placeholder="john@company.com" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                                    <textarea rows={4} className="w-full bg-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-seafoam outline-none" placeholder="How can we help you?"></textarea>
                                </div>

                                <Button variant="primary" className="w-full">
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
