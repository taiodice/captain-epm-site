'use client'

import { FadeIn } from '@/components/animations/fade-in'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageCircle, FileText, Users, LifeBuoy } from 'lucide-react'

export default function SupportPage() {
    return (
        <div className="min-h-screen bg-navy pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                <FadeIn>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">How can we help?</h1>
                        <p className="text-slate-400 text-lg">
                            Find answers, troubleshoot issues, or contact our support team directly.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <FadeIn delay={0.1}>
                        <Card className="p-8 text-center h-full">
                            <div className="w-12 h-12 bg-seafoam/10 rounded-xl flex items-center justify-center mx-auto mb-6 text-seafoam">
                                <FileText size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Knowledge Base</h3>
                            <p className="text-slate-400 mb-6">Explore our guides and tutorials to find quick answers.</p>
                            <Button variant="secondary" className="w-full">Browse Articles</Button>
                        </Card>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <Card className="p-8 text-center h-full">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-6 text-purple-400">
                                <Users size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Community Forum</h3>
                            <p className="text-slate-400 mb-6">Connect with other users and share best practices.</p>
                            <Button variant="secondary" className="w-full">Join Community</Button>
                        </Card>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <Card className="p-8 text-center h-full">
                            <div className="w-12 h-12 bg-coral/10 rounded-xl flex items-center justify-center mx-auto mb-6 text-coral">
                                <MessageCircle size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Live Chat</h3>
                            <p className="text-slate-400 mb-6">Chat with our support team during business hours.</p>
                            <Button variant="secondary" className="w-full">Start Chat</Button>
                        </Card>
                    </FadeIn>
                </div>

                <FadeIn delay={0.4}>
                    <div className="bg-gradient-to-r from-surface to-surface-light p-8 md:p-12 rounded-3xl border border-white/5 text-center">
                        <div className="inline-flex p-4 bg-white/5 rounded-full mb-6">
                            <LifeBuoy className="w-8 h-8 text-seafoam" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Still need help?</h2>
                        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                            Our dedicated support team is available 24/5 to assist with complex issues and technical inquiries.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button variant="primary" size="lg">Open a Ticket</Button>
                            <Button variant="secondary" size="lg">Contact Sales</Button>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    )
}
