'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import {
    ShieldCheck,
    DollarSign,
    TrendingUp,
    CreditCard,
    PieChart,
    Download,
    Plus
} from 'lucide-react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
)

const API_BASE = "https://api.captain-epm.com/api/Admin"

// Mock Data Interfaces
interface Expense {
    id: string
    date: string
    description: string
    amount: number
    category: 'Server' | 'API' | 'Marketing' | 'Other'
}

interface FinancialSummary {
    mrr: number
    totalRevenue: number
    expenses: number
    profit: number
}

export default function FinancePage() {
    const [adminKey, setAdminKey] = useState('')
    const [loading, setLoading] = useState(true)

    // Data State
    const [summary, setSummary] = useState<FinancialSummary>({ mrr: 0, totalRevenue: 0, expenses: 0, profit: 0 })
    const [expenses, setExpenses] = useState<Expense[]>([])

    // Chart Data
    const [revenueData, setRevenueData] = useState<any>(null)

    useEffect(() => {
        const key = sessionStorage.getItem('adminKey')
        if (!key) {
            window.location.href = '/admin'
            return
        }
        setAdminKey(key)
        loadData(key)
    }, [])

    const loadData = async (key: string) => {
        setLoading(true)
        try {
            // 1. Fetch Licenses to calculate Revenue
            const res = await axios.get(`${API_BASE}/licenses`, { headers: { 'X-Admin-Key': key } })
            const licenses: any[] = res.data

            // Calculate MRR (simplistic: Pro=$50, Enterprise=$500)
            let mrr = 0
            licenses.forEach(l => {
                if (l.status !== 'Active') return
                if (l.features.includes('Enterprise')) mrr += 500
                else mrr += 50
            })

            // Load Expenses (Local/Mocked)
            const storedExpenses = JSON.parse(localStorage.getItem('finance_expenses') || '[]')
            const totalExpenses = storedExpenses.reduce((sum: number, e: Expense) => sum + e.amount, 0)

            setSummary({
                mrr,
                totalRevenue: mrr * 12, // Projected Annual
                expenses: totalExpenses,
                profit: (mrr * 12) - totalExpenses
            })
            setExpenses(storedExpenses)

            // Mock Chart Data for last 6 months
            setRevenueData({
                labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
                datasets: [
                    {
                        label: 'Revenue',
                        data: [mrr * 0.5, mrr * 0.6, mrr * 0.8, mrr * 0.9, mrr, mrr], // Simulation
                        borderColor: 'rgb(16, 185, 129)',
                        backgroundColor: 'rgba(16, 185, 129, 0.5)',
                        tension: 0.3
                    },
                    {
                        label: 'Expenses',
                        data: [200, 210, 190, 250, 220, totalExpenses > 200 ? totalExpenses : 230],
                        borderColor: 'rgb(239, 68, 68)',
                        backgroundColor: 'rgba(239, 68, 68, 0.5)',
                        tension: 0.3
                    }
                ]
            })

        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    const handleAddExpense = () => {
        const desc = prompt("Expense Description:")
        if (!desc) return
        const amount = Number(prompt("Amount ($):"))
        if (!amount) return

        const newExpense: Expense = {
            id: Date.now().toString(),
            date: new Date().toISOString().split('T')[0],
            description: desc,
            amount,
            category: 'Other'
        }

        const updated = [newExpense, ...expenses]
        setExpenses(updated)
        localStorage.setItem('finance_expenses', JSON.stringify(updated))
        loadData(adminKey) // Recalc
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Product Finance</h1>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-500">MRR</span>
                            <TrendingUp className="text-green-500" size={20} />
                        </div>
                        <div className="text-3xl font-bold text-gray-900">${summary.mrr.toLocaleString()}</div>
                        <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                            +12% from last month
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-500">Projected Annual</span>
                            <DollarSign className="text-blue-500" size={20} />
                        </div>
                        <div className="text-3xl font-bold text-gray-900">${summary.totalRevenue.toLocaleString()}</div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-500">Expenses (YTD)</span>
                            <CreditCard className="text-red-500" size={20} />
                        </div>
                        <div className="text-3xl font-bold text-gray-900">${summary.expenses.toLocaleString()}</div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-500">Net Profit</span>
                            <PieChart className="text-purple-500" size={20} />
                        </div>
                        <div className={`text-3xl font-bold ${summary.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ${summary.profit.toLocaleString()}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border lg:col-span-2">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Performance</h3>
                        <div className="h-[300px]">
                            {revenueData && <Line data={revenueData} options={{ responsive: true, maintainAspectRatio: false }} />}
                        </div>
                    </div>

                    {/* Expenses List */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Recent Expenses</h3>
                            <button onClick={handleAddExpense} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600">
                                <Plus size={18} />
                            </button>
                        </div>
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                            {expenses.map((exp) => (
                                <div key={exp.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <div className="font-medium text-gray-900">{exp.description}</div>
                                        <div className="text-xs text-gray-500">{exp.date}</div>
                                    </div>
                                    <div className="font-bold text-red-600">-${exp.amount}</div>
                                </div>
                            ))}
                            {expenses.length === 0 && <p className="text-gray-500 text-center py-4">No expenses recorded.</p>}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
