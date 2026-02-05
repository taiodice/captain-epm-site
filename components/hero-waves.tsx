'use client'

import { Button } from './ui/button'
import { FadeIn } from './animations/fade-in'
import { InteractiveWaves } from './interactive-waves'

export function HeroWaves({ dictionary }: { dictionary: any }) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Interactive Wave Background */}
      <InteractiveWaves />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="max-w-4xl">
          <FadeIn delay={0.3}>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              {dictionary.hero.title_prefix}{' '}
              <span className="text-gradient">{dictionary.hero.title_highlight}</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl">
              {dictionary.hero.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg">
                {dictionary.hero.cta_primary}
              </Button>
              <Button variant="secondary" size="lg">
                {dictionary.hero.cta_secondary}
              </Button>
            </div>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.6}>
            <div className="flex gap-12 mt-16">
              <div>
                <div className="text-3xl font-bold text-seafoam">10x</div>
                <div className="text-slate-500 text-sm">{dictionary.hero.stats.faster}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-seafoam">100%</div>
                <div className="text-slate-500 text-sm">{dictionary.hero.stats.excel}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-seafoam">AI</div>
                <div className="text-slate-500 text-sm">{dictionary.hero.stats.ai}</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
