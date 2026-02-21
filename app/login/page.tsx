"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { loginAction } from "./actions";
import { ArrowLeft, Lock, User, AlertCircle } from "lucide-react";

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
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative">
            {/* Subtle background decoration */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_40%,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

            {/* Back to home */}
            <Link
                href="/"
                className="absolute top-6 left-6 flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors rounded-xl px-4 py-2 bg-card border border-border shadow-sm hover:shadow-md"
            >
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio
            </Link>

            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-card rounded-3xl shadow-2xl shadow-primary/10 border border-border p-8 md:p-10">
                    {/* Logo */}
                    <div className="flex flex-col items-center gap-4 mb-10">
                        <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg ring-4 ring-primary/5">
                            <Image src="/annie.jpg" alt="Annie - Heartopia" fill priority className="object-cover" sizes="96px" />
                        </div>
                        <div className="text-center">
                            <h1 className="text-2xl font-black text-foreground tracking-tight">
                                Heartopia Admin
                            </h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Panel de administracion
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="username" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                Usuario
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    className="w-full rounded-xl border border-input bg-background pl-11 pr-4 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    placeholder="admin"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                Contrasena
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="w-full rounded-xl border border-input bg-background pl-11 pr-4 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    placeholder="Ingresa tu contrasena"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 text-sm shadow-lg shadow-primary/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1 active:scale-[0.98]"
                        >
                            {isPending ? "Iniciando sesion..." : "Entrar al panel"}
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs text-muted-foreground mt-8">
                    Heartopia Chile Wiki - Panel Privado
                </p>
            </div>
        </div>
    );
}
