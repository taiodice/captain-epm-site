"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        if (password.length < 6) {
            setMessage("Password must be at least 6 characters");
            return;
        }

        setStatus("loading");
        setMessage("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://captain-epm.com/api"}/Users/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword: password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.Message || data.message || "Failed to reset password");
            }

            setStatus("success");
            setMessage("Password reset successfully! Redirecting to login...");
            setTimeout(() => {
                router.push("/admin");
            }, 3000);
        } catch (err: any) {
            setStatus("error");
            setMessage(err.message);
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                    <h1 className="text-2xl font-bold text-slate-900 mb-4">Invalid Link</h1>
                    <p className="text-slate-600 mb-6">The password reset link is invalid or missing a token.</p>
                    <button
                        onClick={() => router.push("/admin")}
                        className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Reset Password</h1>
                    <p className="text-slate-600 mt-2">Enter your new password below.</p>
                </div>

                {status === "success" ? (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-green-700 font-medium mb-4">{message}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {status === "error" && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                                {message}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className={`w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center ${status === "loading" ? "opacity-75 cursor-not-allowed" : ""
                                }`}
                        >
                            {status === "loading" ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordContent />
        </Suspense>
    );
}
