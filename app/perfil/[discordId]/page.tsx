import { getDb, getTableCounts } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, Sparkles, Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const revalidate = 60;

interface PageProps {
    params: Promise<{ discordId: string }>;
}

const CATEGORIAS_ICONS: Record<string, string> = {
    peces: "Fish", insectos: "Bug", aves: "Bird", animales: "PawPrint",
    cultivos: "Sprout", recolectables: "TreeDeciduous", recetas: "ChefHat", logros: "Trophy"
};

const CATEGORIAS_COLORS: Record<string, string> = {
    peces: "text-blue-600 dark:text-blue-400 bg-blue-500/10",
    insectos: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
    aves: "text-sky-600 dark:text-sky-400 bg-sky-500/10",
    animales: "text-orange-600 dark:text-orange-400 bg-orange-500/10",
    cultivos: "text-green-600 dark:text-green-400 bg-green-500/10",
    recolectables: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
    recetas: "text-rose-600 dark:text-rose-400 bg-rose-500/10",
    logros: "text-purple-600 dark:text-purple-400 bg-purple-500/10",
};

export default async function PerfilPublicoPage({ params }: PageProps) {
    const { discordId } = await params;
    const db = getDb();

    const resUser = await db.execute({
        sql: "SELECT * FROM usuarios WHERE id = ?",
        args: [discordId]
    });

    if (resUser.rows.length === 0) {
        return notFound();
    }

    const user = resUser.rows[0];
    const xp = Number(user.xp);
    const nivel = Number(user.nivel);
    const monedas = Number(user.monedas);
    const tema = String(user.tema_perfil || 'default');
    const mascotaId = user.mascota_activa;
    const username = user.username ? String(user.username) : null;
    const avatarData = user.avatar ? String(user.avatar) : null;

    const MASCOTAS_INFO: Record<string, { nombre: string }> = {
        mascota_kiltro: { nombre: "Kiltro" },
        mascota_gatito: { nombre: "Gatito" },
        mascota_pudu: { nombre: "Pudu" }
    };
    const mascotaData = mascotaId ? MASCOTAS_INFO[mascotaId as string] : null;

    const totals = await getTableCounts();

    const resCol = await db.execute({
        sql: "SELECT categoria, COUNT(*) as total FROM colecciones WHERE user_id = ? GROUP BY categoria",
        args: [discordId]
    });
    const collectionsCount = resCol.rows as unknown as { categoria: string; total: number }[];

    const resDestacados = await db.execute({
        sql: "SELECT slot, categoria, item_id FROM destacados WHERE user_id = ? ORDER BY slot ASC",
        args: [discordId]
    });
    const destacados = resDestacados.rows as unknown as { slot: number; categoria: string; item_id: string }[];

    const colCount: Record<string, number> = {};
    for (const row of collectionsCount) {
        colCount[String(row.categoria)] = Number(row.total);
    }

    const categorias = ["peces", "insectos", "aves", "animales", "cultivos", "recolectables", "recetas", "logros"];

    const xpBaseNivelDesc = Math.pow((nivel - 1) * 10, 2);
    const xpSigNivel = Math.pow(nivel * 10, 2);
    const progress = Math.min(100, Math.max(0, ((xp - xpBaseNivelDesc) / (xpSigNivel - xpBaseNivelDesc)) * 100));

    // Theme-aware accent color mapping
    const TEMA_ACCENT: Record<string, { progress: string; badge: string }> = {
        default: { progress: "from-primary to-accent", badge: "bg-primary/10 text-primary" },
        tema_bosque: { progress: "from-emerald-500 to-green-400", badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
        tema_playa: { progress: "from-cyan-400 to-blue-400", badge: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400" },
        tema_noche: { progress: "from-indigo-500 to-purple-500", badge: "bg-indigo-500/10 text-indigo-400" },
    };

    const accent = TEMA_ACCENT[tema] || TEMA_ACCENT.default;

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-background font-sans">
            {/* Navigation */}
            <div className="w-full max-w-3xl px-4 pt-6 mb-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors rounded-xl px-4 py-2 bg-card border border-border shadow-sm hover:shadow-md"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Volver a la wiki
                </Link>
            </div>

            <div className="w-full max-w-3xl px-4 pb-20 space-y-6">
                {/* Header Card */}
                <div className="bg-card rounded-3xl shadow-xl border border-border p-8 sm:p-10 flex flex-col items-center relative overflow-hidden">
                    {/* Decorative gradient */}
                    <div className={`absolute top-0 left-0 right-0 h-28 bg-gradient-to-br ${accent.progress} opacity-10`} />

                    {/* Pet companion */}
                    {mascotaData && (
                        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                            <Badge variant="outline" className="text-xs font-bold">
                                Mascota: {mascotaData.nombre}
                            </Badge>
                        </div>
                    )}

                    {/* Avatar */}
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-background shadow-lg bg-secondary mb-5 shrink-0 z-10 flex items-center justify-center ring-4 ring-primary/10">
                        {avatarData ? (
                            <img
                                src={avatarData}
                                alt="Avatar de Discord"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Image
                                src={`https://api.dicebear.com/7.x/identicon/svg?seed=${username || discordId}&backgroundColor=fce4ec&rowColor=ec407a`}
                                alt="Vecino Avatar Placeholder"
                                fill
                                sizes="112px"
                                className="object-cover"
                            />
                        )}
                    </div>

                    <div className="text-center relative z-10">
                        <Badge variant="secondary" className={`${accent.badge} text-xs font-bold mb-2`}>
                            Vecinito del Pueblito
                        </Badge>
                        <h1 className="text-3xl sm:text-4xl font-black text-foreground text-balance">
                            {username ? username : `Invitado #${discordId.slice(-4)}`}
                        </h1>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-4 sm:gap-6 mt-8 w-full justify-center flex-wrap">
                        <div className="rounded-2xl p-4 sm:p-5 w-28 sm:w-32 border border-border bg-secondary/30 text-center">
                            <Star className="h-6 w-6 mx-auto mb-1.5 text-amber-500" />
                            <span className="block text-2xl font-black text-foreground">{nivel}</span>
                            <span className="block text-xs font-bold text-muted-foreground uppercase">Nivel</span>
                        </div>
                        <div className="rounded-2xl p-4 sm:p-5 w-28 sm:w-32 border border-border bg-secondary/30 text-center">
                            <Sparkles className="h-6 w-6 mx-auto mb-1.5 text-primary" />
                            <span className="block text-2xl font-black text-foreground">{xp}</span>
                            <span className="block text-xs font-bold text-muted-foreground uppercase">XP Total</span>
                        </div>
                        <div className="rounded-2xl p-4 sm:p-5 w-28 sm:w-32 border border-border bg-secondary/30 text-center">
                            <Coins className="h-6 w-6 mx-auto mb-1.5 text-yellow-500" />
                            <span className="block text-2xl font-black text-foreground">{monedas}</span>
                            <span className="block text-xs font-bold text-muted-foreground uppercase">Moneditas</span>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full max-w-lg mt-8 relative z-10">
                        <div className="flex justify-between text-xs font-bold mb-2 text-muted-foreground">
                            <span>Progreso Nivel {nivel}</span>
                            <span>{Math.floor(progress)}% hacia {nivel + 1}</span>
                        </div>
                        <div className="w-full h-3 rounded-full overflow-hidden shrink-0 border border-border bg-secondary">
                            <div
                                className={`h-full transition-all duration-1000 ease-out rounded-full bg-gradient-to-r ${accent.progress}`}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Showcase / Vitrina */}
                {destacados.length > 0 && (
                    <div className="bg-card rounded-3xl shadow-xl border border-border p-6 sm:p-8 flex flex-col items-center">
                        <h3 className="text-xl font-black text-foreground mb-6 flex items-center gap-2">
                            <Star className="h-5 w-5 text-amber-500" />
                            Mis Descubrimientos Favoritos
                        </h3>
                        <div className="flex gap-4 sm:gap-6 justify-center flex-wrap">
                            {[1, 2, 3].map(slotNum => {
                                const dest = destacados.find(d => d.slot === slotNum);
                                return (
                                    <div key={slotNum} className={`w-28 h-32 sm:w-32 sm:h-36 rounded-2xl flex flex-col items-center justify-center p-3 text-center border-2 border-dashed transition-colors ${dest ? 'border-amber-300 dark:border-amber-700 bg-amber-500/5' : 'border-border bg-secondary/20 opacity-50'}`}>
                                        {dest ? (
                                            <>
                                                <div className={`text-2xl sm:text-3xl mb-2 p-2 rounded-xl ${CATEGORIAS_COLORS[dest.categoria.toLowerCase()] || 'bg-secondary'}`}>
                                                    {CATEGORIAS_ICONS[dest.categoria.toLowerCase()] ? dest.categoria.charAt(0).toUpperCase() : "?"}
                                                </div>
                                                <div className="text-xs font-bold leading-tight line-clamp-2 text-foreground">
                                                    {dest.item_id}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-sm font-bold text-muted-foreground">
                                                Vacio
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Collections */}
                <div className="bg-card rounded-3xl shadow-xl border border-border p-6 sm:p-10">
                    <h2 className="text-2xl font-black text-foreground mb-2 flex items-center gap-2">
                        Libretita de Colecciones
                    </h2>
                    <p className="text-sm text-muted-foreground mb-8 max-w-lg">
                        Todo lo que este dulce habitante ha registrado explorando el pueblito.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {categorias.map(cat => {
                            const count = colCount[cat] || 0;
                            const total = totals[cat] || 1;
                            const percent = Math.min(100, (count / total) * 100);
                            const colorClass = CATEGORIAS_COLORS[cat] || "text-muted-foreground bg-secondary/50";

                            return (
                                <div key={cat} className="flex flex-col p-4 rounded-2xl border border-border bg-secondary/20 transition duration-300 hover:border-primary/30 hover:bg-secondary/40">
                                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-sm font-black mb-2 ${colorClass}`}>
                                        {cat.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="font-bold capitalize text-sm text-foreground">{cat}</span>
                                    <span className="font-black text-xl my-1 text-foreground">{count} <span className="text-sm font-normal text-muted-foreground">/ {totals[cat] || 0}</span></span>
                                    <div className="w-full h-1.5 mt-2 rounded-full overflow-hidden shrink-0 bg-secondary">
                                        <div className={`h-full rounded-full bg-gradient-to-r ${accent.progress}`} style={{ width: `${percent}%` }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function generateMetadata({ params }: { params: Promise<{ discordId: string }> }) {
    const { discordId } = await params;
    return {
        title: `Perfil ${discordId} | Heartopia`,
        description: "Revisa la libretita de este vecinito del pueblito de Heartopia.",
    };
}
