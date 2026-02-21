import { getDb, getTableCounts } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60; // Revalidate every minute

interface PageProps {
    params: Promise<{ discordId: string }>;
}

const CATEGORIAS_EMOJIS: Record<string, string> = {
    peces: "🐟", insectos: "🦋", aves: "🕊️", animales: "🦊",
    cultivos: "🌱", recolectables: "🌿", recetas: "🍳", logros: "🏆"
};

export default async function PerfilPublicoPage({ params }: PageProps) {
    const { discordId } = await params;
    const db = getDb();

    // 1. Fetch user data
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

    const MASCOTAS_INFO: Record<string, { emoji: string, nombre: string }> = {
        mascota_kiltro: { emoji: "🐕", nombre: "Kiltro" },
        mascota_gatito: { emoji: "🐈", nombre: "Gatito" },
        mascota_pudu: { emoji: "🦌", nombre: "Pudú" }
    };
    const mascotaData = mascotaId ? MASCOTAS_INFO[mascotaId as string] : null;

    // 2. Fetch total items counts (to show progress max limits)
    const totals = await getTableCounts();

    // 3. Fetch user collections
    const resCol = await db.execute({
        sql: "SELECT categoria, COUNT(*) as total FROM colecciones WHERE user_id = ? GROUP BY categoria",
        args: [discordId]
    });
    const collectionsCount = resCol.rows as unknown as { categoria: string; total: number }[];

    // 4. Fetch user destacados (Vitrina) F9
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

    // Calcular xp base de este nivel y del proximo
    const xpBaseNivelDesc = Math.pow((nivel - 1) * 10, 2);
    const xpSigNivel = Math.pow(nivel * 10, 2);
    const progress = Math.min(100, Math.max(0, ((xp - xpBaseNivelDesc) / (xpSigNivel - xpBaseNivelDesc)) * 100));

    // Determinar mapeos de colores Tailwind según el Tema del usuario (F8)
    const TEMA_COLORS = {
        default: {
            bg: "bg-pink-50/30",
            headerBg: "bg-white border-pink-100",
            headerGradient: "from-pink-300 to-amber-200 opacity-20",
            buttonLink: "text-pink-600 bg-white hover:bg-pink-100",
            progress: "from-pink-400 to-amber-300",
            textLight: "text-pink-500",
        },
        tema_bosque: {
            bg: "bg-green-50/40",
            headerBg: "bg-green-50/80 border-green-200",
            headerGradient: "from-emerald-400 to-lime-300 opacity-20",
            buttonLink: "text-green-700 bg-white hover:bg-green-100",
            progress: "from-emerald-500 to-green-400",
            textLight: "text-emerald-600",
        },
        tema_playa: {
            bg: "bg-cyan-50/50",
            headerBg: "bg-white border-cyan-100",
            headerGradient: "from-cyan-300 to-blue-200 opacity-20",
            buttonLink: "text-cyan-700 bg-white hover:bg-cyan-100",
            progress: "from-cyan-400 to-blue-400",
            textLight: "text-cyan-600",
        },
        tema_noche: {
            bg: "bg-indigo-950",
            headerBg: "bg-slate-900 border-indigo-900",
            headerGradient: "from-indigo-600 to-purple-800 opacity-30",
            buttonLink: "text-indigo-200 bg-slate-800 hover:bg-slate-700",
            progress: "from-indigo-500 to-purple-500",
            textLight: "text-indigo-300",
        }
    };

    // Fallback asegurado
    const theme = TEMA_COLORS[tema as keyof typeof TEMA_COLORS] || TEMA_COLORS.default;
    const isDarkTheme = tema === 'tema_noche';

    return (
        <div className={`min-h-screen w-full flex flex-col pt-16 pb-24 items-center px-4 font-sans ${theme.bg}`}>
            <Link href="/" className={`fixed top-6 left-6 shadow py-2 px-4 rounded-full font-bold transition z-10 ${theme.buttonLink}`}>
                ← Volver a la wiki
            </Link>

            <div className="w-full max-w-3xl space-y-8">
                {/* Header Card */}
                <div className={`rounded-3xl shadow-xl shadow-neutral-900/5 p-8 sm:p-12 border flex flex-col items-center relative overflow-hidden ${theme.headerBg}`}>
                    <div className={`absolute top-0 w-full h-32 bg-gradient-to-br ${theme.headerGradient}`} />

                    {/* Mascota Activa F15 */}
                    {mascotaData && (
                        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 flex flex-col items-center -rotate-6 hover:rotate-12 transition-transform cursor-help" title={`Acompañado por su fiel ${mascotaData.nombre}`}>
                            <span className="text-4xl sm:text-5xl drop-shadow-lg filter hover:brightness-110">{mascotaData.emoji}</span>
                            <span className={`text-[10px] font-black uppercase tracking-widest mt-1 bg-white/50 backdrop-blur-sm px-2 rounded-full ${theme.textLight}`}>
                                {mascotaData.nombre}
                            </span>
                        </div>
                    )}

                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-neutral-100 mb-6 shrink-0 z-10 flex items-center justify-center">
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
                                className="object-cover"
                            />
                        )}
                    </div>

                    <div className="text-center relative">
                        <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${theme.textLight}`}>
                            Vecinito del Pueblito
                        </p>
                        <h1 className={`text-4xl font-extrabold mb-2 ${isDarkTheme ? 'text-white' : 'text-neutral-800'}`}>
                            {username ? username : `Invitado de Discord #${discordId.slice(-4)}`}
                        </h1>
                    </div>

                    <div className="flex gap-4 sm:gap-8 mt-8 mb-8 w-full justify-center">
                        <div className={`rounded-2xl p-4 sm:p-6 w-32 border text-center ${isDarkTheme ? 'bg-amber-900/30 border-amber-800/50' : 'bg-amber-100/50 border-amber-200/50'}`}>
                            <span className="block text-3xl mb-1">⭐</span>
                            <span className="block text-2xl font-black text-amber-700">{nivel}</span>
                            <span className="block text-xs font-bold text-amber-600/70 uppercase">Nivel</span>
                        </div>
                        <div className="bg-blue-100/50 rounded-2xl p-4 sm:p-6 w-32 border border-blue-200/50 text-center">
                            <span className="block text-3xl mb-1">✨</span>
                            <span className="block text-2xl font-black text-blue-700">{xp}</span>
                            <span className="block text-xs font-bold text-blue-600/70 uppercase">XP Total</span>
                        </div>
                        <div className="bg-yellow-100/50 rounded-2xl p-4 sm:p-6 w-32 border border-yellow-200/50 text-center">
                            <span className="block text-3xl mb-1">💰</span>
                            <span className="block text-2xl font-black text-yellow-700">{monedas}</span>
                            <span className="block text-xs font-bold text-yellow-600/70 uppercase">Moneditas</span>
                        </div>
                    </div>

                    <div className="w-full max-w-lg mt-2 relative">
                        <div className={`flex justify-between text-xs font-bold mb-2 ${isDarkTheme ? 'text-neutral-400' : 'text-neutral-500'}`}>
                            <span>Progreso Nivel {nivel}</span>
                            <span>{Math.floor(progress)}% hacia {nivel + 1}</span>
                        </div>
                        <div className={`w-full h-4 rounded-full overflow-hidden shrink-0 border ${isDarkTheme ? 'bg-slate-800 border-slate-700' : 'bg-neutral-100 border-neutral-200/50'}`}>
                            <div
                                className={`h-full transition-all duration-1000 ease-out rounded-full bg-gradient-to-r ${theme.progress}`}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Vitrina de Destacados (F9) */}
                {destacados.length > 0 && (
                    <div className={`rounded-3xl shadow-xl shadow-neutral-900/5 p-6 sm:p-8 border ${theme.headerBg} flex flex-col items-center`}>
                        <h3 className={`text-xl font-black mb-6 ${isDarkTheme ? 'text-amber-400' : 'text-amber-500'} flex items-center gap-2`}>
                            ⭐ Mis Descubrimientos Favoritos
                        </h3>
                        <div className="flex gap-4 sm:gap-6 justify-center flex-wrap">
                            {[1, 2, 3].map(slotNum => {
                                const dest = destacados.find(d => d.slot === slotNum);
                                return (
                                    <div key={slotNum} className={`w-28 h-32 sm:w-32 sm:h-36 rounded-2xl flex flex-col items-center justify-center p-3 text-center border-2 border-dashed ${dest ? (isDarkTheme ? 'border-amber-700/50 bg-amber-900/20' : 'border-amber-300/50 bg-amber-50/50') : (isDarkTheme ? 'border-neutral-700 bg-neutral-800/50 opacity-50' : 'border-neutral-200 bg-neutral-50 opacity-50')}`}>
                                        {dest ? (
                                            <>
                                                <div className="text-4xl sm:text-5xl mb-2 drop-shadow-md">
                                                    {CATEGORIAS_EMOJIS[dest.categoria.toLowerCase()] || "✨"}
                                                </div>
                                                <div className={`text-xs font-bold leading-tight line-clamp-2 ${isDarkTheme ? 'text-amber-100' : 'text-amber-900'}`}>
                                                    {dest.item_id}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-sm font-bold text-neutral-400">
                                                Vacío
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Colecciones Libretita */}
                <div className={`rounded-3xl shadow-xl shadow-neutral-900/5 p-8 sm:p-12 border ${theme.headerBg}`}>
                    <h2 className={`text-2xl font-extrabold mb-2 flex items-center gap-2 ${isDarkTheme ? 'text-white' : 'text-neutral-800'}`}>
                        <span>📔</span> Libretita de Colecciones
                    </h2>
                    <p className={`mb-8 max-w-lg text-sm ${isDarkTheme ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        Todo lo que este dulce habitante ha registrado explorando el pueblito.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {categorias.map(cat => {
                            const count = colCount[cat] || 0;
                            const total = totals[cat] || 1;
                            const percent = Math.min(100, (count / total) * 100);

                            return (
                                <div key={cat} className={`flex flex-col p-4 rounded-2xl border transition duration-300 ${isDarkTheme ? 'bg-slate-800/50 border-slate-700 hover:border-indigo-500 hover:bg-slate-800' : 'bg-neutral-50/60 border-neutral-100 hover:border-pink-200 hover:bg-pink-50/50'}`}>
                                    <div className="text-3xl mb-2">{CATEGORIAS_EMOJIS[cat] || "📌"}</div>
                                    <span className={`font-bold capitalize text-sm ${isDarkTheme ? 'text-neutral-300' : 'text-neutral-700'}`}>{cat}</span>
                                    <span className={`font-black text-xl my-1 ${isDarkTheme ? 'text-white' : 'text-neutral-900'}`}>{count} <span className={`text-sm font-normal ${isDarkTheme ? 'text-neutral-500' : 'text-neutral-400'}`}>/ {totals[cat] || 0}</span></span>
                                    <div className={`w-full h-1.5 mt-2 rounded-full overflow-hidden shrink-0 ${isDarkTheme ? 'bg-slate-700' : 'bg-neutral-200'}`}>
                                        <div className={`h-full rounded-full bg-gradient-to-r ${theme.progress}`} style={{ width: `${percent}%` }} />
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
