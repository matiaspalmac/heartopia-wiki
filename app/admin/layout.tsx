import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import { initAdmins } from "@/lib/db";
import Link from "next/link";
import { DarkModeToggle } from "@/components/admin/dark-mode-toggle";

const NAV_ITEMS = [
    { href: "/admin", label: "🏠 Inicio" },
    { href: "/admin/peces", label: "🎣 Peces" },
    { href: "/admin/insectos", label: "🦋 Insectos" },
    { href: "/admin/aves", label: "🐦 Aves" },
    { href: "/admin/animales", label: "🦊 Animales" },
    { href: "/admin/cultivos", label: "🌱 Cultivos" },
    { href: "/admin/recolectables", label: "🌿 Recolectables" },
    { href: "/admin/habitantes", label: "👥 Habitantes" },
    { href: "/admin/recetas", label: "🍳 Recetas" },
    { href: "/admin/logros", label: "🏆 Logros" },
    { href: "/admin/codigos", label: "🎁 Códigos" },
    { href: "/admin/configuracion", label: "⚙️ Configuración" },
    { href: "/admin/actividad", label: "📋 Actividad" },
];

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    if (!session) redirect("/login");

    await initAdmins();

    return (
        <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 flex">
            {/* Sidebar */}
            <aside className="w-60 shrink-0 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 flex flex-col h-screen sticky top-0">
                {/* Header */}
                <div className="px-5 py-5 border-b border-neutral-200 dark:border-neutral-800">
                    <p className="text-xs font-bold uppercase tracking-widest text-pink-500 mb-0.5">
                        Heartopia
                    </p>
                    <h1 className="text-lg font-extrabold text-neutral-900 dark:text-white">
                        Admin Panel
                    </h1>
                    <p className="text-xs text-neutral-400 mt-0.5">
                        {session.user?.name}
                    </p>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-pink-50 dark:hover:bg-pink-950/30 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Footer actions */}
                <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 space-y-1">
                    {/* Dark mode toggle */}
                    <DarkModeToggle />

                    {/* Back to wiki */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                        ← Ver wiki
                    </Link>

                    {/* Logout */}
                    <form
                        action={async () => {
                            "use server";
                            await signOut({ redirectTo: "/login" });
                        }}
                    >
                        <button
                            type="submit"
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-neutral-500 dark:text-neutral-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                        >
                            × Cerrar sesión
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 min-w-0 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
