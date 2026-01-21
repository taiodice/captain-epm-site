'use client'

import { Card } from "@/components/ui/card"

export default function FinancePage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Finance</h2>
        <p className="text-slate-400 mt-2">Financial overview and revenue tracking.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 bg-surface border-seafoam/10">
          <h3 className="text-lg font-semibold text-white mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-seafoam">$124,500</p>
        </Card>
        <Card className="p-6 bg-surface border-seafoam/10">
          <h3 className="text-lg font-semibold text-white mb-2">MRR</h3>
          <p className="text-3xl font-bold text-seafoam">$12,400</p>
        </Card>
        <Card className="p-6 bg-surface border-seafoam/10">
          <h3 className="text-lg font-semibold text-white mb-2">Expenses</h3>
          <p className="text-3xl font-bold text-orange-400">$4,200</p>
        </Card>
        <Card className="p-6 bg-surface border-seafoam/10">
          <h3 className="text-lg font-semibold text-white mb-2">Net Profit</h3>
          <p className="text-3xl font-bold text-emerald-400">$8,200</p>
        </Card>
      </div>

      <div className="min-h-[400px] rounded-xl border border-seafoam/10 bg-surface/50 flex items-center justify-center text-slate-500">
        Finance Module Content Placeholder
      </div>
    </div>
  )
}
