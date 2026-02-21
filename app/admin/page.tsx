import { getTableCounts } from "@/lib/db";
import Link from "next/link";
import {
    Fish, Bug, Bird, PawPrint, Sprout, TreeDeciduous,
    Users, ChefHat, Trophy, Gift, ShoppingCart, Cloud,
    Settings, Shield, Info,
} from "lucide-react";

const TABLE_META: Record<string, { label: string; icon: React.ComponentType<{ className?: string }>; href: string }> = {
    usuarios: { label: "Vecinos (Usuarios)", icon: Users, href: "/admin/usuarios" },
    peces: { label: "Peces", icon: Fish, href: "/admin/peces" },
    insectos: { label: "Insectos", icon: Bug, href: "/admin/insectos" },
    aves: { label: "Aves", icon: Bird, href: "/admin/aves" },
    animales: { label: "Animales", icon: PawPrint, href: "/admin/animales" },
    cultivos: { label: "Cultivos", icon: Sprout, href: "/admin/cultivos" },
    recolectables: { label: "Recolectables", icon: TreeDeciduous, href: "/admin/recolectables" },
    habitantes: { label: "Habitantes", icon: Users, href: "/admin/habitantes" },
    recetas: { label: "Recetas", icon: ChefHat, href: "/admin/recetas" },
    logros: { label: "Logros", icon: Trophy, href: "/admin/logros" },
    codigos: { label: "Codigos", icon: Gift, href: "/admin/codigos" },
    tienda_items: { label: "Tienda", icon: ShoppingCart, href: "/admin/tienda_items" },
    clima: { label: "Clima", icon: Cloud, href: "/admin/clima" },
    configuracion: { label: "Configuracion", icon: Settings, href: "/admin/configuracion" },
    admins: { label: "Admins", icon: Shield, href: "/admin/usuarios" },
};

export default async function AdminHomePage() {
    const counts = await getTableCounts();

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-black text-foreground">
                    Panel de Control
                </h2>
                <p className="text-muted-foreground mt-1">
                    Gestiona toda la base de datos de Heartopia Wiki
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {Object.entries(TABLE_META).map(([table, meta]) => {
                    const Icon = meta.icon;
                    return (
                        <Link key={table} href={meta.href}>
                            <div className="group bg-card rounded-2xl border border-border p-5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                                    <Icon className="h-5 w-5 text-primary" />
                                </div>
                                <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                                    {meta.label}
                                </p>
                                <p className="text-2xl font-black text-muted-foreground/40 mt-1">
                                    {counts[table] ?? 0}
                                </p>
                                <p className="text-xs text-muted-foreground -mt-0.5">items</p>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="mt-10 bg-primary/5 border border-primary/20 rounded-2xl p-5 flex items-start gap-3">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-bold text-foreground mb-1">
                        Tip rapido
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Haz clic en cualquier categoria para ver, agregar, editar o eliminar items. Los cambios se reflejan en la wiki inmediatamente.
                    </p>
                </div>
            </div>
        </div>
    );
}
