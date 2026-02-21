"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { loginAction } from "./actions";

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        const formData = new FormData(e.currentTarget);
        startTransition(async () => {
            const result = await loginAction(formData);
            if (result?.error) setError(result.error);
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 p-4">
            <div className="w-full max-w-sm">
                {/* Card */}
                <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl shadow-pink-200/40 dark:shadow-neutral-950 border border-pink-100 dark:border-neutral-800 p-8">
                    {/* Logo */}
                    <div className="flex flex-col items-center gap-3 mb-8">
                        <div className="relative h-20 w-20 rounded-full overflow-hidden border-4 border-pink-200 dark:border-pink-900 shadow-lg">
                            <Image src="/annie.jpg" alt="Annie" fill priority className="object-cover" />
                        </div>
                        <div className="text-center">
                            <h1 className="text-2xl font-extrabold text-neutral-900 dark:text-white">
                                Heartopia Admin
                            </h1>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                                Panel de administración
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                                Usuario
                            </label>
                            <input
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-3 text-sm font-medium text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-600 transition"
                                placeholder="admin"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                                Contraseña
                            </label>
                            <input
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-3 text-sm font-medium text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-600 transition"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                                ❌ {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 text-sm shadow-lg shadow-pink-200 dark:shadow-pink-950 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                        >
                            {isPending ? "Iniciando sesión..." : "Entrar al panel"}
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs text-neutral-400 dark:text-neutral-600 mt-6">
                    Heartopia Chile Wiki · Panel Privado
                </p>
            </div>
        </div>
    );
}
