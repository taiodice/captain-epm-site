import Link from 'next/link'
import { ShieldCheck, TrendingUp, BarChart3, Zap, Users, Activity, FileText, Settings, Eye, Clock, Database, GitBranch } from 'lucide-react'

export default function Features() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">The Complete Feature Tour</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Discover how Captain EPM unifies administration, analytics, and automation into one powerful Excel experience.
          </p>
        </div>
      </section>

      {/* Section 1: Unified Administration */}
      <section id="admin" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <ShieldCheck className="text-primary-600" size={32} />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Unified Administration</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take complete control of your Oracle EPM environment without ever logging into the web console. Manage users, variables, and system health—all from Excel.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <Users className="text-primary-600 mb-4" size={28} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">User Management</h3>
              <p className="text-gray-600">
                Create, modify, and deactivate users directly from Excel. Assign roles, manage groups, and control access without switching interfaces.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <Settings className="text-primary-600 mb-4" size={28} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Substitution Variables</h3>
              <p className="text-gray-600">
                View, edit, and update substitution variables instantly. No more navigating through multiple screens—control your system parameters efficiently.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <FileText className="text-primary-600 mb-4" size={28} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Audit Logs</h3>
              <p className="text-gray-600">
                Access comprehensive audit trails for compliance and troubleshooting. Track every change, login, and action across your EPM environment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <Activity className="text-primary-600 mb-4" size={28} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Activity Reports</h3>
              <p className="text-gray-600">
                Generate detailed activity reports to understand system usage patterns, identify power users, and optimize performance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <Eye className="text-primary-600 mb-4" size={28} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">System Health</h3>
              <p className="text-gray-600">
                Monitor system performance metrics, storage usage, and application status at a glance. Stay ahead of potential issues.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <Clock className="text-primary-600 mb-4" size={28} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Job Console</h3>
              <p className="text-gray-600">
                Execute and monitor EPM jobs directly from Excel. Track progress, view logs, and manage scheduled tasks effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Intelligent Forecasting & Analytics */}
      <section id="forecasting" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <TrendingUp className="text-orange-600" size={32} />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Intelligent Forecasting & Analytics</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your data into actionable insights with AI-powered forecasting and analysis tools that work seamlessly within Excel.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start mb-4">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <Zap className="text-orange-600" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Roll the Dice</h3>
                  <p className="text-gray-600">
                    Generate instant forecasts with linear or exponential models. Select your historical data, choose your method, and Captain EPM projects future values automatically—perfect for quick "what-if" scenarios.
                  </p>
                </div>
              </div>
              <ul className="space-y-2 ml-16">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">✓</span>
                  <span className="text-gray-600">Linear regression for steady growth patterns</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">✓</span>
                  <span className="text-gray-600">Exponential models for accelerating trends</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">✓</span>
                  <span className="text-gray-600">One-click prediction for any data range</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start mb-4">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Eye className="text-purple-600" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Analyze Selection</h3>
                  <p className="text-gray-600">
                    Highlight any data range and get instant AI-powered insights. Captain EPM analyzes patterns, identifies outliers, calculates variances, and explains what's happening in plain English.
                  </p>
                </div>
              </div>
              <ul className="space-y-2 ml-16">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span className="text-gray-600">Automated variance analysis with explanations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span className="text-gray-600">Anomaly detection using Z-Score analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span className="text-gray-600">Natural language summaries of key findings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Dashboarding & Sharing */}
      <section id="dashboards" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <BarChart3 className="text-green-600" size={32} />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Dashboarding & Sharing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform Excel ranges into interactive web dashboards. Share insights with stakeholders through secure, beautiful visualizations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <Database className="text-green-600 mb-4" size={28} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Create EPM Data Sets</h3>
              <p className="text-gray-600">
                Build reusable data sets from your EPM queries. Store frequently used reports and share them across your team for consistent analysis.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <BarChart3 className="text-green-600 mb-4" size={28} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Design Dashboard</h3>
              <p className="text-gray-600">
                Select any Excel range and publish it as a web dashboard. Add charts, tables, and KPIs—Captain EPM handles the rest automatically.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <Eye className="text-green-600 mb-4" size={28} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">My Dashboards</h3>
              <p className="text-gray-600">
                Access all your published dashboards in one place. Share secure links with stakeholders who don't need Excel—they view live data in their browser.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <GitBranch className="text-green-600 mb-4" size={28} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Snapshot Manager</h3>
              <p className="text-gray-600">
                Capture point-in-time snapshots of your data for version control, auditing, and historical comparisons. Never lose track of changes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <Users className="text-green-600 mb-4" size={28} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Team Collaboration</h3>
              <p className="text-gray-600">
                Share data sets and dashboards with team members. Enable collaborative planning with controlled access to shared resources.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <Clock className="text-green-600 mb-4" size={28} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Live Updates</h3>
              <p className="text-gray-600">
                Dashboards refresh automatically from your EPM data. Stakeholders always see the latest numbers without manual updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Agents & Automation */}
      <section id="security" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <ShieldCheck className="text-red-600" size={32} />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Agents & Automation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deploy intelligent agents that monitor your EPM environment 24/7, automatically detect issues, and keep you informed of critical changes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-red-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Security Drift Agent</h3>
              <p className="text-gray-600 mb-6">
                Continuously monitors permission changes across your EPM environment. Get instant alerts when security roles are modified, users gain unexpected access, or sensitive data becomes exposed.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-bold">•</span>
                  <span className="text-gray-600">Real-time permission change tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-bold">•</span>
                  <span className="text-gray-600">Automated security compliance reports</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-bold">•</span>
                  <span className="text-gray-600">Alerts for unauthorized access attempts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-bold">•</span>
                  <span className="text-gray-600">Historical audit trail for investigations</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Activity Analysis</h3>
              <p className="text-gray-600 mb-6">
                Understand how your EPM system is being used. Identify bottlenecks, optimize workflows, and discover opportunities for process improvement through comprehensive usage analytics.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-bold">•</span>
                  <span className="text-gray-600">User activity patterns and trends</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-bold">•</span>
                  <span className="text-gray-600">Performance bottleneck identification</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-bold">•</span>
                  <span className="text-gray-600">System utilization metrics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-bold">•</span>
                  <span className="text-gray-600">Actionable optimization recommendations</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-green-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Job Console Automation</h3>
              <p className="text-gray-600 mb-6">
                Execute, schedule, and monitor EPM jobs without logging into the web console. Set up automated workflows that run calculations, data loads, and maintenance tasks on your schedule.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">•</span>
                  <span className="text-gray-600">One-click job execution from Excel</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">•</span>
                  <span className="text-gray-600">Real-time job status monitoring</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">•</span>
                  <span className="text-gray-600">Detailed execution logs and error reporting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">•</span>
                  <span className="text-gray-600">Scheduled job management</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-purple-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Workflow Integration</h3>
              <p className="text-gray-600 mb-6">
                Streamline approvals, cell history tracking, and data submissions. Captain EPM integrates seamlessly with your existing EPM workflows to eliminate manual steps and reduce errors.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2 font-bold">•</span>
                  <span className="text-gray-600">Submit for approval directly from Excel</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2 font-bold">•</span>
                  <span className="text-gray-600">Approve/reject data sets with one click</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2 font-bold">•</span>
                  <span className="text-gray-600">Track cell history and audit changes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2 font-bold">•</span>
                  <span className="text-gray-600">Automated notification workflows</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Experience All Features Risk-Free
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Try Captain EPM free for 30 days. No credit card required. See why EPM professionals choose us to transform their workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#" 
              className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg inline-block"
            >
              Start Free Trial
            </a>
            <Link 
              href="/pricing" 
              className="bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-600 transition border-2 border-white inline-block"
            >
              View Pricing Options
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
