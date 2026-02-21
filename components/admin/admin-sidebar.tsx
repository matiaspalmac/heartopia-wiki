"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
    Menu,
    X,
    Home,
    Fish,
    Bug,
    Bird,
    PawPrint,
    Sprout,
    TreeDeciduous,
    Globe,
    Users,
    ChefHat,
    Trophy,
    Gift,
    Cloud,
    Settings,
    BarChart3,
    ClipboardList,
    ShoppingCart,
    LogOut,
    ArrowLeft,
    Sun,
    Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const NAV_ITEMS = [
    { href: "/admin", label: "Dashboard", icon: Home },
    { href: "/admin/peces", label: "Peces", icon: Fish },
    { href: "/admin/insectos", label: "Insectos", icon: Bug },
    { href: "/admin/aves", label: "Aves", icon: Bird },
    { href: "/admin/animales", label: "Animales", icon: PawPrint },
    { href: "/admin/cultivos", label: "Cultivos", icon: Sprout },
    { href: "/admin/recolectables", label: "Recolectables", icon: TreeDeciduous },
    { href: "/admin/eventos_globales", label: "Eventos Globales", icon: Globe },
    { href: "/admin/usuarios", label: "Vecinos", icon: Users },
    { href: "/admin/habitantes", label: "Habitantes", icon: Users },
    { href: "/admin/recetas", label: "Recetas", icon: ChefHat },
    { href: "/admin/logros", label: "Logros", icon: Trophy },
    { href: "/admin/codigos", label: "Codigos", icon: Gift },
    { href: "/admin/tienda_items", label: "Tienda", icon: ShoppingCart },
    { href: "/admin/clima", label: "Clima", icon: Cloud },
    { href: "/admin/configuracion", label: "Config", icon: Settings },
    { href: "/admin/estadisticas", label: "Estadisticas", icon: BarChart3 },
    { href: "/admin/actividad", label: "Actividad", icon: ClipboardList },
];

interface AdminSidebarProps {
    userName: string;
    signOutAction: () => Promise<void>;
}

export function AdminSidebar({ userName, signOutAction }: AdminSidebarProps) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dark, setDark] = useState(false);
    const router = useRouter();

    function toggleTheme() {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
    }

    // Check if a nav item is active
    function isActive(href: string) {
        if (href === "/admin") return pathname === "/admin";
        return pathname.startsWith(href);
    }

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-5 py-5 border-b border-border">
                <p className="text-xs font-black uppercase tracking-widest text-primary mb-0.5">
                    Heartopia
                </p>
                <h1 className="text-lg font-black text-foreground">
                    Admin Panel
                </h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                    {userName}
                </p>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
                {NAV_ITEMS.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                                active
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent"
                            }`}
                        >
                            <item.icon className="h-4 w-4 shrink-0" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer actions */}
            <div className="p-3 border-t border-border space-y-1">
                <button
                    onClick={toggleTheme}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                    {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    {dark ? "Modo claro" : "Modo oscuro"}
                </button>

                <Link
                    href="/"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Ver wiki
                </Link>

                <form action={signOutAction}>
                    <button
                        type="submit"
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                        <LogOut className="h-4 w-4" />
                        Cerrar sesion
                    </button>
                </form>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop sidebar - fixed */}
            <aside className="hidden lg:flex w-64 shrink-0 bg-card border-r border-border flex-col h-screen fixed top-0 left-0 z-40">
                <SidebarContent />
            </aside>

            {/* Mobile header bar + sheet */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-card/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
                <div>
                    <p className="text-xs font-black uppercase tracking-widest text-primary">Heartopia</p>
                    <p className="text-sm font-black text-foreground">Admin</p>
                </div>
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-xl">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-72 p-0" aria-describedby={undefined}>
                        <SheetHeader className="sr-only">
                            <SheetTitle>Menu de administracion</SheetTitle>
                        </SheetHeader>
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Spacer for mobile fixed header */}
            <div className="lg:hidden h-16 shrink-0" />
        </>
    );
}
