'use client'

import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations/fade-in'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WaveDivider } from '@/components/wave-divider'
import { GradientOrb, FloatingElement } from '@/components/animations/floating'
import { 
  Sparkles, 
  Brain, 
  Zap, 
  MessageSquare,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Wand2,
  HelpCircle,
  Target,
  ShieldAlert,
  Clock,
  Lock,
  Server
} from 'lucide-react'

const aiCapabilities = [
  {
    icon: MessageSquare,
    title: 'Chat with AI',
    description: 'Ask questions in plain English. Get instant answers about your EPM data, trends, and anomalies.',
    gradient: 'from-ocean to-seafoam'
  },
  {
    icon: AlertTriangle,
    title: 'Anomaly Detection',
    description: 'AI automatically identifies unusual patterns, outliers, and potential data issues.',
    gradient: 'from-coral to-orange-400'
  },
  {
    icon: Lightbulb,
    title: 'Automated Insights',
    description: 'Receive proactive suggestions and actionable insights without asking.',
    gradient: 'from-seafoam to-ocean'
  },
]

const moreFeatures = [
  { icon: TrendingUp, title: 'Predictive Forecasting', description: 'AI-powered projections based on historical patterns.' },
  { icon: Wand2, title: 'Smart Suggestions', description: 'Contextual recommendations as you work.' },
  { icon: HelpCircle, title: 'Natural Language Queries', description: 'Ask complex questions in plain English.' },
  { icon: Target, title: 'Goal Tracking', description: 'AI monitors progress toward your targets.' },
  { icon: ShieldAlert, title: 'Risk Detection', description: 'Early warning for potential issues.' },
  { icon: Clock, title: 'Instant Answers', description: 'Sub-second response times on queries.' },
]

export default function AIAutomationPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-surface to-surface" />
        <GradientOrb size={600} color="ocean" className="-top-40 -right-40" />
        <GradientOrb size={400} color="seafoam" className="bottom-0 -left-40" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ocean/20 text-seafoam text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered EPM
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                The AI Assistant That{' '}
                <span className="text-gradient">Speaks EPM</span>
              </h1>
              <p className="text-xl text-slate-400 mb-8">
                Ask questions in plain English. Get instant insights, detect anomalies, 
                and automate repetitive tasks—all powered by AI that truly understands 
                Oracle EPM.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg">
                  Try AI Features Free
                </Button>
                <Button variant="secondary" size="lg">
                  Watch Demo
                </Button>
              </div>
            </FadeIn>

            {/* AI Chat Preview */}
            <FadeIn delay={0.3}>
              <FloatingElement delay={0.5}>
                <Card className="p-6" glow>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean to-seafoam flex items-center justify-center">
                      <Brain className="w-5 h-5 text-navy" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-100">Captain AI</div>
                      <div className="text-xs text-slate-500">Always ready to help</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* User Message */}
                    <div className="flex justify-end">
                      <div className="bg-ocean/30 rounded-2xl rounded-br-md px-4 py-3 max-w-xs">
                        <p className="text-sm text-slate-200">
                          Why is Q3 revenue down compared to forecast?
                        </p>
                      </div>
                    </div>
                    
                    {/* AI Response */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ocean to-seafoam flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-navy" />
                      </div>
                      <div className="bg-surface-light rounded-2xl rounded-tl-md px-4 py-3">
                        <p className="text-sm text-slate-300">
                          Q3 revenue is <span className="text-coral font-medium">12.3% below forecast</span>. 
                          The primary driver is the APAC region, specifically Japan (-18%) 
                          and Korea (-15%). 
                          <span className="text-seafoam"> Would you like me to drill into the product breakdown?</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center gap-2 bg-surface rounded-xl px-4 py-3 border border-seafoam/10">
                    <input 
                      type="text" 
                      placeholder="Ask anything about your data..." 
                      className="flex-1 bg-transparent text-sm text-slate-300 outline-none placeholder-slate-500"
                      disabled
                    />
                    <Zap className="w-5 h-5 text-seafoam" />
                  </div>
                </Card>
              </FloatingElement>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Context-Aware Section */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              AI That Actually{' '}
              <span className="text-gradient">Understands</span> Your EPM Data
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Unlike generic AI tools, Captain AI is trained on Oracle EPM concepts, 
              dimensions, and financial terminology.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: 'Context-Aware', description: 'Understands your specific dimension hierarchies and data structures.' },
              { icon: Zap, title: 'Lightning Fast', description: 'Sub-second responses on complex analytical queries.' },
              { icon: MessageSquare, title: 'Plain English', description: 'No EPM jargon required. Just ask naturally.' },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <Card className="p-8 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ocean to-seafoam flex items-center justify-center mx-auto mb-6 shadow-glow-teal">
                    <item.icon className="w-7 h-7 text-navy" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-3">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* AI Capabilities */}
      <section className="py-24 px-6 bg-navy">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              AI-Powered Capabilities
            </h2>
            <p className="text-slate-400">Core features that transform how you work with EPM.</p>
          </FadeIn>

          <StaggerChildren className="grid md:grid-cols-3 gap-8">
            {aiCapabilities.map((cap) => {
              const Icon = cap.icon
              return (
                <StaggerItem key={cap.title}>
                  <Card className="p-8 h-full">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cap.gradient} flex items-center justify-center mb-6 shadow-glow-teal`}>
                      <Icon className="w-6 h-6 text-navy" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-100 mb-3">{cap.title}</h3>
                    <p className="text-slate-400">{cap.description}</p>
                  </Card>
                </StaggerItem>
              )
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* More AI Features Grid */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
              More AI-Powered Features
            </h2>
          </FadeIn>

          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moreFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <StaggerItem key={feature.title}>
                  <Card className="p-6 group">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-ocean/20 flex items-center justify-center group-hover:bg-ocean/40 transition-colors">
                        <Icon className="w-5 h-5 text-seafoam" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-100 mb-1">{feature.title}</h3>
                        <p className="text-slate-400 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                </StaggerItem>
              )
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-24 px-6 bg-navy relative overflow-hidden">
        <WaveDivider flip className="absolute top-0 left-0 right-0" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ocean to-seafoam flex items-center justify-center mx-auto mb-8 shadow-glow-ocean">
              <Lock className="w-8 h-8 text-navy" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your Data Stays <span className="text-gradient">Private</span>
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              All AI processing happens within your environment. Your sensitive EPM data 
              never leaves your network. Enterprise-grade security built in.
            </p>
            <div className="flex items-center justify-center gap-8 text-slate-500">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-seafoam" />
                <span>On-Premise Option</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-seafoam" />
                <span>SOC 2 Compliant</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-navy to-ocean/30" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Experience AI-Powered{' '}
              <span className="text-gradient">EPM Management</span>
            </h2>
            <p className="text-xl text-slate-400 mb-10">
              Start your free trial and discover how AI can transform your Oracle EPM workflow.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="primary" size="lg">
                Start Free Trial
              </Button>
              <Button variant="secondary" size="lg">
                Schedule Demo
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
