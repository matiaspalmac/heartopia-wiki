import { getTableCounts } from "@/lib/db";
import Link from "next/link";

const TABLE_META: Record<string, { label: string; icon: string; href: string }> = {
    peces: { label: "Peces", icon: "🎣", href: "/admin/peces" },
    insectos: { label: "Insectos", icon: "🦋", href: "/admin/insectos" },
    aves: { label: "Aves", icon: "🐦", href: "/admin/aves" },
    animales: { label: "Animales", icon: "🦊", href: "/admin/animales" },
    cultivos: { label: "Cultivos", icon: "🌱", href: "/admin/cultivos" },
    recolectables: { label: "Recolectables", icon: "🌿", href: "/admin/recolectables" },
    habitantes: { label: "Habitantes", icon: "👥", href: "/admin/habitantes" },
    recetas: { label: "Recetas", icon: "🍳", href: "/admin/recetas" },
    logros: { label: "Logros", icon: "🏆", href: "/admin/logros" },
    codigos: { label: "Códigos", icon: "🎁", href: "/admin/codigos" },
    configuracion: { label: "Configuración", icon: "⚙️", href: "/admin/configuracion" },
    admins: { label: "Admins", icon: "👤", href: "/admin/usuarios" },
};

export default async function AdminHomePage() {
    const counts = await getTableCounts();

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
                    Panel de Control
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 mt-1">
                    Gestiona toda la base de datos de Heartopia Wiki
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {Object.entries(TABLE_META).map(([table, meta]) => (
                    <Link key={table} href={meta.href}>
                        <div className="group bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 hover:border-pink-300 dark:hover:border-pink-700 hover:shadow-lg hover:shadow-pink-100 dark:hover:shadow-pink-950/20 transition-all cursor-pointer">
                            <div className="text-3xl mb-3">{meta.icon}</div>
                            <p className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                                {meta.label}
                            </p>
                            <p className="text-2xl font-extrabold text-neutral-300 dark:text-neutral-700 mt-1">
                                {counts[table] ?? 0}
                            </p>
                            <p className="text-xs text-neutral-400 -mt-0.5">items</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-10 bg-pink-50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-900 rounded-2xl p-5">
                <p className="text-sm font-bold text-pink-700 dark:text-pink-300 mb-1">
                    💡 Tip rápido
                </p>
                <p className="text-sm text-pink-600 dark:text-pink-400">
                    Haz clic en cualquier categoría para ver, agregar, editar o eliminar items. Los cambios se reflejan en la wiki inmediatamente.
                </p>
            </div>
        </div>
    );
}
