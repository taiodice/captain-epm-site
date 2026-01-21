'use client'

import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Shield, 
  BarChart3, 
  Workflow, 
  Users, 
  Zap 
} from 'lucide-react'
import { Card } from './ui/card'
import { FadeIn, StaggerChildren, StaggerItem } from './animations/fade-in'

const features = [
  {
    title: 'AI-Powered Intelligence',
    description: 'Ask questions in plain English, detect anomalies automatically, and get AI-generated insights on your data.',
    icon: Sparkles,
    size: 'large',
    gradient: 'from-ocean to-seafoam'
  },
  {
    title: 'Unified Administration',
    description: 'Control users, variables, and audit logs—all from Excel.',
    icon: Shield,
    size: 'small',
    gradient: 'from-seafoam to-ocean'
  },
  {
    title: 'Dynamic Dashboards',
    description: 'Create and publish web dashboards directly from Excel.',
    icon: BarChart3,
    size: 'small',
    gradient: 'from-ocean to-seafoam'
  },
  {
    title: 'Security & Governance',
    description: 'Monitor permission changes and track system health.',
    icon: Users,
    size: 'small',
    gradient: 'from-coral to-orange-400'
  },
  {
    title: 'Workflow Automation',
    description: 'Submit approvals, manage snapshots, and execute jobs.',
    icon: Workflow,
    size: 'medium',
    gradient: 'from-seafoam to-ocean'
  },
  {
    title: 'Intelligent Forecasting',
    description: 'Linear or exponential forecasting models, predict trends with one click.',
    icon: Zap,
    size: 'large',
    gradient: 'from-seafoam to-ocean'
  },
]

export function BentoFeatures() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need,{' '}
            <span className="text-gradient">One Place</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Captain EPM brings together administration, analytics, and AI automation 
            into a seamless Excel experience.
          </p>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {features.map((feature, index) => {
            const Icon = feature.icon
            const sizeClasses = {
              small: 'md:col-span-1',
              medium: 'md:col-span-1',
              large: 'md:col-span-2'
            }
            
            return (
              <StaggerItem key={feature.title} className={sizeClasses[feature.size as keyof typeof sizeClasses]}>
                <Card className="h-full p-8 group">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-glow-teal group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-navy" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-100">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400">
                    {feature.description}
                  </p>
                </Card>
              </StaggerItem>
            )
          })}
        </StaggerChildren>
      </div>
    </section>
  )
}
