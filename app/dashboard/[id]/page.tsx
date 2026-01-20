'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react'

// Register ChartJS
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const API_BASE = "https://api.captain-epm.com/api/Dashboard"

interface DashboardData {
    id: string
    title: string
    description: string
    status: number // 0:Pending, 1:Approved, 2:Rejected
    gridData: {
        headers: string[]
        rows: (string | number)[][]
    }
}

export default function DashboardViewer({ params }: { params: { id: string } }) {
    const [data, setData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [comment, setComment] = useState('')

    useEffect(() => {
        loadDashboard()
    }, [])

    const loadDashboard = async () => {
        try {
            const res = await axios.get(`${API_BASE}/${params.id}`)
            setData(res.data)
        } catch (e: any) {
            console.error(e)
            setError("Failed to load dashboard. It may not exist or access is denied.")
        } finally {
            setLoading(false)
        }
    }

    const handleStatus = async (statusId: number) => {
        if (!comment && statusId === 2) {
            alert("Please provide a comment for rejection.")
            return
        }

        try {
            await axios.post(`${API_BASE}/${params.id}/status`, {
                status: statusId,
                comment: comment
            })
            alert("Status updated!")
            loadDashboard()
        } catch (e) {
            alert("Failed to update status")
        }
    }

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
    )

    if (error || !data) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h2>
                <p className="text-gray-500 mb-6">{error}</p>
                <a href="/" className="text-primary-600 hover:underline">Return Home</a>
            </div>
        </div>
    )

    // Prepare Chart Data
    // Assuming Col 0 is Label, Col 1+ are Series
    const chartLabels = data.gridData?.rows.map(r => r[0]) || []
    const chartDatasets = data.gridData?.headers.slice(1).map((header, idx) => ({
        label: header,
        data: data.gridData.rows.map(r => r[idx + 1]),
        backgroundColor: idx === 0 ? 'rgba(59, 130, 246, 0.6)' : 'rgba(16, 185, 129, 0.6)',
    })) || []

    const chartData = {
        labels: chartLabels,
        datasets: chartDatasets
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header Section */}
                <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
                        <p className="text-gray-500 mt-1">{data.description || "No description provided."}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        {data.status === 0 && (
                            <span className="px-4 py-2 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200 flex items-center gap-2 font-medium">
                                <Clock size={16} /> Pending Review
                            </span>
                        )}
                        {data.status === 1 && (
                            <span className="px-4 py-2 rounded-full bg-green-50 text-green-700 border border-green-200 flex items-center gap-2 font-medium">
                                <CheckCircle size={16} /> Approved
                            </span>
                        )}
                        {data.status === 2 && (
                            <span className="px-4 py-2 rounded-full bg-red-50 text-red-700 border border-red-200 flex items-center gap-2 font-medium">
                                <XCircle size={16} /> Rejected
                            </span>
                        )}
                    </div>
                </div>

                {/* Chart Section */}
                {data.gridData && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Visual Analysis</h3>
                        <div className="h-[400px] w-full">
                            <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>
                )}

                {/* Data Grid Section */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h3 className="text-lg font-semibold text-gray-900">Data Source</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-700">
                                <tr>
                                    {data.gridData?.headers.map((h, i) => (
                                        <th key={i} className="px-6 py-3 whitespace-nowrap font-medium">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.gridData?.rows.map((row, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        {row.map((cell, j) => (
                                            <td key={j} className={`px-6 py-3 whitespace-nowrap ${j === 0 ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Actions (Only if Pending) */}
                {data.status === 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-primary-500">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Action</h3>
                        <div className="space-y-4 max-w-2xl">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Comments (Optional for approval, required for rejection)</label>
                                <textarea
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                    rows={3}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Add your feedback here..."
                                />
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleStatus(1)}
                                    className="flex-1 bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition"
                                >
                                    Approve Dashboard
                                </button>
                                <button
                                    onClick={() => handleStatus(2)}
                                    className="flex-1 bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition"
                                >
                                    Reject Dashboard
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
