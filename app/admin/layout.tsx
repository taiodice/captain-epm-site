import type { Metadata } from 'next'
import AdminLayoutClient from './admin-layout-client'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Captain EPM - Admin',
  description: 'Admin Portal',
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-navy text-slate-100">
        <AdminLayoutClient>
          {children}
        </AdminLayoutClient>
      </body>
    </html>
  )
}
