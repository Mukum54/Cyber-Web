"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield, Eye, EyeOff, Loader2 } from "lucide-react";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const role = (searchParams.get("role") || "admin") as "admin" | "student";
    const redirect = searchParams.get("redirect") || (role === "admin" ? "/admin" : "/student");

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const roleLabel = role === "admin" ? "Admin" : "Student";
    const roleColor = role === "admin" ? "text-orange-500" : "text-blue-500";
    const roleBg = role === "admin" ? "bg-orange-500" : "bg-blue-500";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password, role }),
            });

            if (res.ok) {
                router.push(redirect);
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || "Invalid password. Please try again.");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className={`w-14 h-14 ${roleBg} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                        <Shield className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold">
                        <span className="text-primary">CYBER</span>
                        <span className="text-foreground">WEB</span>
                    </h1>
                    <p className={`text-sm font-medium mt-1 ${roleColor}`}>
                        {roleLabel} Portal
                    </p>
                </div>

                {/* Card */}
                <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
                    <h2 className="text-lg font-semibold mb-1">Welcome back</h2>
                    <p className="text-sm text-muted-foreground mb-6">
                        Enter your {roleLabel.toLowerCase()} password to continue
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-1.5 block">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={`Enter ${roleLabel.toLowerCase()} password`}
                                    required
                                    autoFocus
                                    className="w-full h-10 px-3 pr-10 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !password}
                            className={`w-full h-10 ${roleBg} text-white rounded-lg font-medium text-sm transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {loading ? "Authenticating..." : `Access ${roleLabel} Panel`}
                        </button>
                    </form>

                    {/* Switch role */}
                    <div className="mt-5 pt-4 border-t border-border text-center">
                        {role === "admin" ? (
                            <a
                                href="/login?role=student"
                                className="text-sm text-muted-foreground hover:text-primary transition"
                            >
                                Student login instead →
                            </a>
                        ) : (
                            <a
                                href="/login?role=admin"
                                className="text-sm text-muted-foreground hover:text-primary transition"
                            >
                                Admin login instead →
                            </a>
                        )}
                    </div>
                </div>

                <p className="text-center text-xs text-muted-foreground mt-6">
                    © {new Date().getFullYear()} CYBER WEB. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense>
            <LoginForm />
        </Suspense>
    );
}
