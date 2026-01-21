'use client'

import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { WaveDivider } from './wave-divider'
import { FadeIn } from './animations/fade-in'
import { GradientOrb } from './animations/floating'
import { LogoMark } from './logo'

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-surface to-ocean/20" />
      
      {/* Floating Orbs */}
      <GradientOrb size={600} color="ocean" className="-top-40 -right-40" />
      <GradientOrb size={400} color="seafoam" className="bottom-20 -left-20" />
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-overlay" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="max-w-4xl">
          <FadeIn delay={0.2}>
            <div className="flex items-center gap-3 mb-8">
              <LogoMark size={48} />
              <span className="text-seafoam font-semibold tracking-wide">CAPTAIN EPM</span>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Your Oracle EPM{' '}
              <span className="text-gradient">Command Center</span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl">
              Unify administration, analytics, and AI-powered automation—all within Excel. 
              Control your Oracle EPM environment faster, smarter, and with unprecedented insight.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.5}>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg">
                Download Free Trial
              </Button>
              <Button variant="secondary" size="lg">
                Watch Demo
              </Button>
            </div>
          </FadeIn>
          
          {/* Stats */}
          <FadeIn delay={0.6}>
            <div className="flex gap-12 mt-16">
              <div>
                <div className="text-3xl font-bold text-seafoam">10x</div>
                <div className="text-slate-500 text-sm">Faster Admin Tasks</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-seafoam">100%</div>
                <div className="text-slate-500 text-sm">Excel-Based</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-seafoam">AI</div>
                <div className="text-slate-500 text-sm">Powered Insights</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <WaveDivider />
      </div>
    </section>
  )
}
