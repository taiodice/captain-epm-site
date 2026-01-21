'use client'

import { Card } from "@/components/ui/card"

export default function CRMPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">CRM</h2>
        <p className="text-slate-400 mt-2">Manage your customer relationships and contacts.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6 bg-surface border-seafoam/10">
          <h3 className="text-lg font-semibold text-white mb-2">Contacts</h3>
          <p className="text-3xl font-bold text-seafoam">1,234</p>
        </Card>
        <Card className="p-6 bg-surface border-seafoam/10">
          <h3 className="text-lg font-semibold text-white mb-2">Companies</h3>
          <p className="text-3xl font-bold text-seafoam">856</p>
        </Card>
        <Card className="p-6 bg-surface border-seafoam/10">
          <h3 className="text-lg font-semibold text-white mb-2">Deals</h3>
          <p className="text-3xl font-bold text-seafoam">42</p>
        </Card>
      </div>

      <div className="min-h-[400px] rounded-xl border border-seafoam/10 bg-surface/50 flex items-center justify-center text-slate-500">
        CRM Module Content Placeholder
      </div>
    </div>
  )
}
