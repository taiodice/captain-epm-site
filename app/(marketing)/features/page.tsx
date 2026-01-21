'use client'

import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations/fade-in'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WaveDivider } from '@/components/wave-divider'
import { GradientOrb } from '@/components/animations/floating'
import { 
  Users, 
  Variable, 
  FileSearch, 
  Activity, 
  HeartPulse, 
  Timer,
  Dice5,
  TrendingUp,
  LayoutDashboard,
  Camera,
  FolderKanban,
  Users2,
  RefreshCw,
  Shield,
  BarChart3,
  Workflow,
  Zap
} from 'lucide-react'

const featureSections = [
  {
    title: 'Unified Administration',
    description: 'Complete control over your Oracle EPM environment without leaving Excel.',
    icon: Shield,
    gradient: 'from-ocean to-seafoam',
    features: [
      { icon: Users, title: 'User Management', description: 'Manage users, roles, and permissions directly from Excel.' },
      { icon: Variable, title: 'Substitution Variables', description: 'View and update substitution variables across applications.' },
      { icon: FileSearch, title: 'Audit Logs', description: 'Track changes with comprehensive audit trails.' },
      { icon: Activity, title: 'Activity Reports', description: 'Monitor user activity and system usage patterns.' },
      { icon: HeartPulse, title: 'System Health', description: 'Real-time monitoring of application health.' },
      { icon: Timer, title: 'Job Console', description: 'Schedule, run, and monitor automation jobs.' },
    ]
  },
  {
    title: 'Intelligent Forecasting & Analytics',
    description: 'AI-powered predictions and analysis at your fingertips.',
    icon: TrendingUp,
    gradient: 'from-seafoam to-ocean',
    features: [
      { icon: Dice5, title: 'Roll the Dice', description: 'Generate forecasts with linear or exponential models.' },
      { icon: TrendingUp, title: 'Analyze Selection', description: 'Get instant insights on selected data ranges.' },
    ]
  },
  {
    title: 'Dashboarding & Sharing',
    description: 'Create, publish, and share interactive dashboards.',
    icon: LayoutDashboard,
    gradient: 'from-ocean to-seafoam',
    features: [
      { icon: BarChart3, title: 'Create EPM Data Sets', description: 'Build reusable data sets from EPM sources.' },
      { icon: LayoutDashboard, title: 'Design Dashboard', description: 'Drag-and-drop dashboard builder.' },
      { icon: FolderKanban, title: 'My Dashboards', description: 'Organize and manage your dashboard library.' },
      { icon: Camera, title: 'Snapshot Manager', description: 'Version control for your data snapshots.' },
      { icon: Users2, title: 'Team Collaboration', description: 'Share dashboards with secure links.' },
      { icon: RefreshCw, title: 'Live Updates', description: 'Real-time data refresh capabilities.' },
    ]
  },
  {
    title: 'Agents & Automation',
    description: 'Intelligent agents that work while you sleep.',
    icon: Zap,
    gradient: 'from-coral to-orange-400',
    features: [
      { icon: Shield, title: 'Security Drift Agent', description: 'Detect unauthorized permission changes automatically.' },
      { icon: Activity, title: 'Activity Analysis', description: 'AI-powered analysis of user behavior patterns.' },
      { icon: Timer, title: 'Job Console Automation', description: 'Automate recurring jobs and workflows.' },
      { icon: Workflow, title: 'Workflow Integration', description: 'Connect with external automation tools.' },
    ]
  }
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-surface to-surface" />
        <GradientOrb size={500} color="ocean" className="-top-20 -right-20" />
        <GradientOrb size={400} color="seafoam" className="bottom-0 -left-20" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ocean/20 text-seafoam text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              The Complete Feature Tour
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Every Tool You Need,{' '}
              <span className="text-gradient">One Add-in</span>
            </h1>
            <p className="text-xl text-slate-400">
              From administration to AI analytics, Captain EPM packs enterprise-grade 
              features into a familiar Excel interface.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Feature Sections */}
      {featureSections.map((section, sectionIndex) => {
        const SectionIcon = section.icon
        return (
          <section 
            key={section.title} 
            className={`py-24 px-6 ${sectionIndex % 2 === 0 ? 'bg-surface' : 'bg-navy'}`}
          >
            <div className="max-w-7xl mx-auto">
              <FadeIn className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shadow-glow-teal`}>
                    <SectionIcon className="w-7 h-7 text-navy" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
                      {section.title}
                    </h2>
                    <p className="text-slate-400">{section.description}</p>
                  </div>
                </div>
              </FadeIn>

              <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
                {section.features.map((feature) => {
                  const FeatureIcon = feature.icon
                  return (
                    <StaggerItem key={feature.title}>
                      <Card className="p-6 h-full group">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.gradient} bg-opacity-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <FeatureIcon className="w-5 h-5 text-seafoam" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-100 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-slate-400 text-sm">
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
      })}

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <WaveDivider flip className="absolute top-0 left-0 right-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-surface to-ocean/20" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Experience All Features <span className="text-gradient">Risk-Free</span>
            </h2>
            <p className="text-xl text-slate-400 mb-10">
              Try Captain EPM free for 14 days. No credit card required.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="primary" size="lg">
                Download Free Trial
              </Button>
              <Button variant="secondary" size="lg">
                View Documentation
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
