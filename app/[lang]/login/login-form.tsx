'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AnimatedLogo } from '@/components/animated-logo'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Loader2, ArrowLeft } from 'lucide-react'
import axios from 'axios'

const API_ROOT = "https://api.captain-epm.com/api"

export default function LoginForm({ dictionary }: { dictionary: any }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showForgot, setShowForgot] = useState(false)
    const [forgotEmail, setForgotEmail] = useState('')

    const handleForgot = async () => {
        if (!forgotEmail) return alert("Please enter your email")
        try {
            await axios.post(`${API_ROOT}/Users/forgot-password`, { email: forgotEmail })
            alert("If an account exists, a reset link has been sent to your email.")
            setShowForgot(false)
        } catch (e: any) {
            alert("Request failed: " + (e.response?.data?.message || e.message))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // In a real app, we would validate credentials here
        // For now, we just redirect to admin
        router.push('/admin')
    }

    return (
        <div className="min-h-screen bg-navy flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-ocean/20 rounded-full blur-[120px]" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-seafoam/10 rounded-full blur-[100px]" />
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
                <Link href="/" className="flex justify-center mb-8">
                    <AnimatedLogo />
                </Link>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                    {dictionary.login.title}
                </h2>
                <p className="mt-2 text-center text-sm text-slate-400">
                    Or{' '}
                    <Link href="/" className="font-medium text-seafoam hover:text-seafoam/80">
                        {dictionary.login.return_home}
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-surface/50 backdrop-blur-xl py-8 px-4 shadow-2xl shadow-black/50 border border-seafoam/10 sm:rounded-xl sm:px-10"
                >
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-300">
                                {dictionary.login.email_label}
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md border-0 bg-navy/50 py-2.5 text-white shadow-sm ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-seafoam sm:text-sm sm:leading-6 placeholder:text-slate-500"
                                    placeholder="admin@captain-epm.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-300">
                                {dictionary.login.password_label}
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 bg-navy/50 py-2.5 text-white shadow-sm ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-seafoam sm:text-sm sm:leading-6 placeholder:text-slate-500"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-slate-700 bg-navy/50 text-seafoam focus:ring-seafoam"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-400">
                                    {dictionary.login.remember_me}
                                </label>
                            </div>

                            <div className="text-sm">
                                <button
                                    type="button"
                                    onClick={() => setShowForgot(true)}
                                    className="font-medium text-seafoam hover:text-seafoam/80"
                                >
                                    {dictionary.login.forgot_password}
                                </button>
                            </div>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                className="w-full flex justify-center py-2.5 shadow-glow-teal"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {dictionary.login.signing_in}
                                    </>
                                ) : (
                                    dictionary.login.sign_in
                                )}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-700" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-surface px-2 text-slate-400 bg-opacity-0">
                                    {dictionary.login.no_account}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link href="/">
                                <Button variant="secondary" className="w-full border-slate-700 hover:bg-slate-800 text-slate-300">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    {dictionary.login.view_features}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Forgot Password Modal */}
            {showForgot && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
                    <div className="bg-surface/90 backdrop-blur-xl rounded-2xl shadow-glow-teal w-full max-w-sm border border-seafoam/20 p-6 relative">
                        <button onClick={() => setShowForgot(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>
                        <h3 className="text-lg font-bold text-white mb-4">Reset Password</h3>
                        <p className="text-slate-400 text-sm mb-4">Enter your email address to receive a password reset link.</p>

                        <input
                            type="email"
                            value={forgotEmail}
                            onChange={e => setForgotEmail(e.target.value)}
                            className="block w-full rounded-md border-0 bg-navy/50 py-2.5 text-white shadow-sm ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-seafoam sm:text-sm sm:leading-6 placeholder:text-slate-500 mb-4"
                            placeholder="you@company.com"
                        />

                        <button onClick={handleForgot} className="w-full bg-seafoam text-navy font-bold py-2.5 rounded-lg shadow-glow-teal hover:bg-seafoam/90 transition">
                            Send Reset Link
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
