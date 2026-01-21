import Link from 'next/link'
import { ShieldCheck, Brain, BarChart3, Clock, Zap, Users, TrendingUp, Sparkles, Database } from 'lucide-react'

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Oracle EPM Command Center
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Unify administration, analytics, and AI-powered automation—all within Excel. Control your Oracle EPM environment faster, smarter, and with unprecedented insight.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#download" 
                className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
              >
                Download Free Trial
              </Link>
              <Link 
                href="/features" 
                className="bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-600 transition border-2 border-white"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-red-500">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Problem</h3>
              <p className="text-lg text-gray-700">
                Tired of switching between 10 browser tabs and slow web interfaces? Managing Oracle EPM shouldn't feel like navigating a maze. Disjointed tools, sluggish performance, and manual processes drain your productivity.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-green-500">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Solution</h3>
              <p className="text-lg text-gray-700">
                Manage everything from Excel—faster, smarter, and AI-powered. Captain EPM transforms Excel into your unified command center, giving you direct control over administration, analytics, and automation without leaving your workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need in One Place
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Captain EPM brings together administration, analytics, and AI automation into a seamless Excel experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Unified Admin */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 border-primary-600">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="text-primary-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Unified Administration</h3>
              <p className="text-gray-600 mb-4">
                Control users, substitution variables, audit logs, and system health—all from Excel, no web console required.
              </p>
              <Link href="/features#admin" className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center">
                Learn more →
              </Link>
            </div>

            {/* AI Chat */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 border-purple-600">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Brain className="text-purple-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Intelligence</h3>
              <p className="text-gray-600 mb-4">
                Ask questions in plain English, detect anomalies automatically, and get AI-generated insights on your data.
              </p>
              <Link href="/ai-automation" className="text-purple-600 font-semibold hover:text-purple-700 inline-flex items-center">
                Discover AI →
              </Link>
            </div>

            {/* Dashboarding */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 border-green-600">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <BarChart3 className="text-green-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Dynamic Dashboards</h3>
              <p className="text-gray-600 mb-4">
                Create and publish web dashboards directly from Excel ranges, share secure links with stakeholders instantly.
              </p>
              <Link href="/features#dashboards" className="text-green-600 font-semibold hover:text-green-700 inline-flex items-center">
                See dashboards →
              </Link>
            </div>

            {/* Intelligent Forecasting */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 border-orange-600">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Zap className="text-orange-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Intelligent Forecasting</h3>
              <p className="text-gray-600 mb-4">
                Roll the dice with linear or exponential forecasting models, predict trends with one click.
              </p>
              <Link href="/features#forecasting" className="text-orange-600 font-semibold hover:text-orange-700 inline-flex items-center">
                Predict trends →
              </Link>
            </div>

            {/* Security Agents */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 border-red-600">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Users className="text-red-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Security & Governance</h3>
              <p className="text-gray-600 mb-4">
                Monitor permission changes with Security Drift Agent, analyze user activity, track system health automatically.
              </p>
              <Link href="/features#security" className="text-red-600 font-semibold hover:text-red-700 inline-flex items-center">
                Secure your system →
              </Link>
            </div>

            {/* Automation */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 border-indigo-600">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Workflow Automation</h3>
              <p className="text-gray-600 mb-4">
                Submit approvals, manage snapshots, track cell history, and execute jobs—all automated within your workflow.
              </p>
              <Link href="/features#workflow" className="text-indigo-600 font-semibold hover:text-indigo-700 inline-flex items-center">
                Automate tasks →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Finance Teams Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
              Oracle EPM administrators and FP&A analysts rely on Captain EPM to streamline their workflows and unlock powerful insights.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary-700 mb-2">10x</div>
                <p className="text-gray-600">Faster administration tasks</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-700 mb-2">100%</div>
                <p className="text-gray-600">Excel-based workflow</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-700 mb-2">AI-First</div>
                <p className="text-gray-600">Intelligent automation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="download" className="py-20 bg-gradient-to-br from-primary-600 to-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Take Command?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Start your free trial today and transform how you manage Oracle EPM. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#" 
              className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg inline-block"
            >
              Download Free Trial
            </a>
            <Link 
              href="/pricing" 
              className="bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-600 transition border-2 border-white inline-block"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
