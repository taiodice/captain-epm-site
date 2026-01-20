import Link from 'next/link'
import { Brain, MessageSquare, AlertTriangle, FileText, Sparkles, TrendingUp, Zap, Target } from 'lucide-react'

export default function AIAutomation() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-6">
              <Brain size={40} />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">The AI Assistant That Speaks EPM</h1>
            <p className="text-xl md:text-2xl text-purple-100">
              Captain EPM doesn't just automate tasks—it understands your data, predicts trends, detects anomalies, and explains insights in plain English.
            </p>
          </div>
        </div>
      </section>

      {/* Main Value Proposition */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              AI That Actually Understands Your EPM Data
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Most tools just move data around. Captain EPM uses advanced AI to analyze, predict, and explain—turning raw numbers into actionable intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-purple-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Context-Aware</h3>
              <p className="text-gray-600">
                Understands your dimensional structure, business rules, and data relationships
              </p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="text-indigo-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Instant analysis on millions of cells—no waiting for slow cloud processing
              </p>
            </div>
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-pink-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Plain English</h3>
              <p className="text-gray-600">
                No complex queries or code—just ask questions like you would a colleague
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Capabilities Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            AI-Powered Capabilities
          </h2>

          <div className="space-y-16">
            {/* Chat with AI */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                  <MessageSquare className="text-purple-600" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Chat with AI</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Ask questions about your data or system health in plain English. Captain EPM's AI understands EPM terminology, dimensional hierarchies, and your specific data context to provide accurate, relevant answers instantly.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 text-xl">✓</span>
                    <span className="text-gray-700">"What drove the variance in Q4 marketing expenses?"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 text-xl">✓</span>
                    <span className="text-gray-700">"Which departments are over budget this month?"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 text-xl">✓</span>
                    <span className="text-gray-700">"Show me the top 10 expense accounts by growth rate"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 text-xl">✓</span>
                    <span className="text-gray-700">"Are there any security permissions that changed recently?"</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-start mb-3">
                    <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                      You
                    </div>
                    <p className="text-gray-800 pt-1">What's driving the increase in our EMEA region revenue?</p>
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                      AI
                    </div>
                    <div className="text-gray-800 pt-1">
                      <p className="mb-2">Analyzing EMEA revenue data...</p>
                      <p className="mb-2 font-semibold">Key drivers identified:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Germany: +32% YoY (+$2.1M)</li>
                        <li>• UK: +18% YoY (+$1.3M)</li>
                        <li>• Product Line "Software": +45%</li>
                      </ul>
                      <p className="mt-2 text-sm">The growth is primarily driven by new enterprise software subscriptions in Germany and expanded services revenue in UK.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Anomaly Detection */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-red-50 border-l-4 border-red-500 rounded">
                    <div className="flex items-center">
                      <AlertTriangle className="text-red-600 mr-3" size={20} />
                      <div>
                        <p className="font-semibold text-gray-900">Marketing Expenses</p>
                        <p className="text-sm text-gray-600">3.2σ above normal (+$45K)</p>
                      </div>
                    </div>
                    <span className="text-red-600 font-bold">HIGH</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                    <div className="flex items-center">
                      <AlertTriangle className="text-yellow-600 mr-3" size={20} />
                      <div>
                        <p className="font-semibold text-gray-900">Headcount - IT</p>
                        <p className="text-sm text-gray-600">2.1σ below forecast (-5 FTEs)</p>
                      </div>
                    </div>
                    <span className="text-yellow-600 font-bold">MEDIUM</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 border-l-4 border-green-500 rounded">
                    <div className="flex items-center">
                      <Sparkles className="text-green-600 mr-3" size={20} />
                      <div>
                        <p className="font-semibold text-gray-900">Sales - East Region</p>
                        <p className="text-sm text-gray-600">2.8σ above target (+$120K)</p>
                      </div>
                    </div>
                    <span className="text-green-600 font-bold">POSITIVE</span>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mb-4">
                  <AlertTriangle className="text-red-600" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Anomaly Detection</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Automatically identify outliers in your financial data using advanced Z-Score analysis. Captain EPM continuously monitors your data and flags unusual patterns before they become problems—saving hours of manual review.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 text-xl">✓</span>
                    <span className="text-gray-700">Statistical outlier detection across all accounts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 text-xl">✓</span>
                    <span className="text-gray-700">Severity scoring (High/Medium/Low risk)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 text-xl">✓</span>
                    <span className="text-gray-700">Historical context and trend analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 text-xl">✓</span>
                    <span className="text-gray-700">Configurable thresholds and alert rules</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Automated Insights */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
                  <FileText className="text-indigo-600" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Automated Insights</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Generate natural language explanations for variances in your spreadsheets automatically. Select any data range and Captain EPM analyzes the patterns, calculates key metrics, and writes the commentary for you—perfect for management reports.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-3 text-xl">✓</span>
                    <span className="text-gray-700">Automated variance commentary generation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-3 text-xl">✓</span>
                    <span className="text-gray-700">Trend identification and pattern recognition</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-3 text-xl">✓</span>
                    <span className="text-gray-700">Executive summary generation for reports</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-3 text-xl">✓</span>
                    <span className="text-gray-700">Customizable tone and detail level</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <FileText className="text-indigo-600 mr-2" size={20} />
                    <h4 className="font-bold text-gray-900">Generated Insight</h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    <span className="font-semibold">Q4 2024 Performance Summary:</span> Total revenue increased 18% YoY to $12.3M, driven primarily by strong performance in the Software division (+$1.8M, +45%). The EMEA region showed exceptional growth (+32%), while APAC remained flat. Operating expenses increased 12% due to strategic investments in R&D and sales headcount expansion. Net margin improved from 22% to 24% as revenue growth outpaced expense increases.
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 italic">Generated by Captain EPM AI in 2 seconds</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional AI Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            More AI-Powered Features
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <TrendingUp className="text-purple-600 mb-4" size={28} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Predictive Forecasting</h3>
              <p className="text-gray-600">
                AI-powered forecasting models analyze historical patterns and generate projections with confidence intervals. Understand likely outcomes and plan accordingly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <Brain className="text-indigo-600 mb-4" size={28} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Suggestions</h3>
              <p className="text-gray-600">
                Get context-aware suggestions as you work. Captain EPM learns your patterns and recommends next steps, shortcuts, and optimizations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <Sparkles className="text-pink-600 mb-4" size={28} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Natural Language Queries</h3>
              <p className="text-gray-600">
                Write queries in plain English instead of complex MDX. "Show me top 10 products by revenue growth" becomes a simple conversation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <Target className="text-green-600 mb-4" size={28} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Goal Tracking</h3>
              <p className="text-gray-600">
                AI monitors your progress toward targets and alerts you when you're off track. Proactive insights help you course-correct before deadlines.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <AlertTriangle className="text-orange-600 mb-4" size={28} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Risk Detection</h3>
              <p className="text-gray-600">
                Identify potential data quality issues, calculation errors, and process bottlenecks before they impact your business decisions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <Zap className="text-yellow-600 mb-4" size={28} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Answers</h3>
              <p className="text-gray-600">
                No more digging through reports. Ask Captain EPM anything about your data and get immediate, accurate answers with supporting details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your Data Stays Private
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Captain EPM's AI runs locally on your machine or your private VPS. Your sensitive financial data never leaves your control. We use enterprise-grade security and comply with all major data protection regulations.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="font-semibold text-gray-900 mb-2">Local Processing</p>
              <p className="text-sm text-gray-600">AI computations happen on your infrastructure</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="font-semibold text-gray-900 mb-2">Zero Data Leakage</p>
              <p className="text-sm text-gray-600">No data sent to external AI services</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="font-semibold text-gray-900 mb-2">Full Compliance</p>
              <p className="text-sm text-gray-600">GDPR, SOC 2, and industry standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Experience AI-Powered EPM Management
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            See how Captain EPM's AI transforms your workflow. Start your free trial today—no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#" 
              className="bg-white text-purple-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg inline-block"
            >
              Try AI Features Free
            </a>
            <Link 
              href="/features" 
              className="bg-purple-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-600 transition border-2 border-white inline-block"
            >
              See All Features
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
