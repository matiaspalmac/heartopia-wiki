"use client";
import { useEffect, useState } from "react";

export function DarkModeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        // Leer preferencia guardada o del sistema
        const saved = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const isDark = saved === "dark" || (!saved && prefersDark);
        setDark(isDark);
        document.documentElement.classList.toggle("dark", isDark);
    }, []);

    function toggle() {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
    }

    return (
        <button
            onClick={toggle}
            title={dark ? "Modo claro" : "Modo oscuro"}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-pink-50 dark:hover:bg-pink-950/30 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
        >
            {dark ? "☀️ Modo claro" : "🌙 Modo oscuro"}
        </button>
    );
}
