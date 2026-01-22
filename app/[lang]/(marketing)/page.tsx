import { Hero } from '@/components/hero'
import { BentoFeatures } from '@/components/bento-features'
import { FadeIn } from '@/components/animations/fade-in'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { WaveDivider } from '@/components/wave-divider'
import { CheckCircle } from 'lucide-react'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'

export default async function HomePage({ params }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(params.lang)

  return (
    <>
      {/* Hero Section */}
      <Hero dictionary={dictionary} />

      {/* Problem/Solution Section */}
      <section className="py-24 px-6 bg-surface relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn delay={0.1}>
              <Card className="p-8 h-full" glow={false}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-coral/20 flex items-center justify-center">
                    <span className="text-2xl">😤</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100">The Problem</h3>
                </div>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Tired of switching between 10 browser tabs and slow web interfaces?
                  Managing Oracle EPM shouldn't feel like navigating a maze.
                  Disjointed tools, sluggish performance, and manual processes drain your productivity.
                </p>
              </Card>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card className="p-8 h-full" glow>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ocean to-seafoam flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100">The Solution</h3>
                </div>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Manage everything from Excel—faster, smarter, and AI-powered.
                  Captain EPM transforms Excel into your unified command center,
                  giving you direct control over administration, analytics, and automation.
                </p>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Bento Features */}
      <BentoFeatures />

      {/* Social Proof Section */}
      <section className="py-24 px-6 bg-surface-light relative overflow-hidden">
        <WaveDivider flip className="absolute top-0 left-0 right-0" />

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted by <span className="text-gradient">Finance Teams</span> Worldwide
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Oracle EPM administrators and FP&A analysts rely on Captain EPM
              to streamline their workflows and unlock powerful insights.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { stat: '10x', label: 'Faster administration tasks' },
              { stat: '100%', label: 'Excel-based workflow' },
              { stat: 'AI', label: 'Intelligent automation' },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.1}>
                <Card className="p-8 text-center">
                  <div className="text-5xl font-bold text-gradient mb-2">{item.stat}</div>
                  <div className="text-slate-400">{item.label}</div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-surface to-ocean/30" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Take <span className="text-gradient">Command</span>?
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Start your free trial today and transform how you manage Oracle EPM.
              No credit card required.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button variant="primary" size="lg">
                Download Free Trial
              </Button>
              <Button variant="secondary" size="lg">
                Schedule Demo
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-slate-500 text-sm">
              {['No credit card required', '14-day free trial', 'Cancel anytime'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-seafoam" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
