import { getDb, getTableCounts } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, Sparkles, Coins, Swords, Fish, Bug, Pickaxe, TreePine, PawPrint, Palette, Trophy, BookOpen, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const revalidate = 60;

interface PageProps {
    params: Promise<{ discordId: string }>;
}

const CATEGORIAS_EMOJIS: Record<string, string> = {
    peces: "🐟", insectos: "🦋", aves: "🕊️", animales: "🦊",
    cultivos: "🌱", recolectables: "🌿", recetas: "🍳", logros: "🏆"
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
    const banner_url = String(user.banner_url || '');
    const mascotaId = user.mascota_activa;
    const username = user.username ? String(user.username) : null;
    const avatarData = user.avatar ? String(user.avatar) : null;

    const MASCOTAS_INFO: Record<string, { emoji: string; nombre: string; isImage?: boolean }> = {
        mascota_kiltro: { emoji: "https://media.tenor.com/RboGj6iwlKYAAAAj/puppy.gif", nombre: "Kiltro", isImage: true },
        mascota_gatito: { emoji: "https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUycDJnNXd6Mnp1Z3B6cnZlbDZ0bG1oMWx6ZHI4ZW9nMWZiZXZycnh6ZiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/W9eUHIDf1PvycL3tMS/200.gif", nombre: "Gatito", isImage: true },
        mascota_pudu: { emoji: "https://fbi.cults3d.com/uploaders/37896446/illustration-file/31cb4cc0-8a39-4f81-b8b8-8fedad27147a/pudu.gif", nombre: "Pudu", isImage: true }
    };
    const mascotaData = mascotaId ? MASCOTAS_INFO[mascotaId as string] : null;

    // 2. Fetch total items counts
    const totals = await getTableCounts();

    // 3. Fetch user collections
    const resCol = await db.execute({
        sql: "SELECT categoria, COUNT(*) as total FROM colecciones WHERE user_id = ? GROUP BY categoria",
        args: [discordId]
    });
    const collectionsCount = resCol.rows as unknown as { categoria: string; total: number }[];

    // 4. Fetch user destacados (Vitrina)
    const resDestacados = await db.execute({
        sql: "SELECT slot, categoria, item_id FROM destacados WHERE user_id = ? ORDER BY slot ASC",
        args: [discordId]
    });
    const destacados = resDestacados.rows as unknown as { slot: number; categoria: string; item_id: string }[];

    // 5. Fetch Habilidades y Estadisticas
    const resHab = await db.execute({
        sql: "SELECT habilidad, nivel FROM habilidades WHERE user_id = ?",
        args: [discordId]
    });
    const habilidades = resHab.rows as unknown as { habilidad: string; nivel: number }[];

    const resStats = await db.execute({
        sql: "SELECT accion, cantidad FROM estadisticas WHERE user_id = ?",
        args: [discordId]
    });
    const statsMap: Record<string, number> = {};
    for (const r of resStats.rows) statsMap[String(r.accion)] = Number(r.cantidad);

    // 6. Fetch Titulo Equipado y Todos
    const resTitulos = await db.execute({
        sql: "SELECT titulo, equipado FROM titulos WHERE user_id = ?",
        args: [discordId]
    });
    let tituloEquipado: string | null = null;
    const listaTitulos: string[] = [];
    for (const row of resTitulos.rows) {
        if (row.equipado === 1) tituloEquipado = String(row.titulo);
        listaTitulos.push(String(row.titulo));
    }

    // 7. Fetch Mascotas Compradas
    const resMascotas = await db.execute({
        sql: "SELECT item_id FROM inventario_economia WHERE user_id = ? AND item_id LIKE 'mascota_%'",
        args: [discordId]
    });
    const mascotasCompradas = resMascotas.rows.map(r => String(r.item_id).replace('mascota_', ''));

    // 7.5 Fetch Temas Comprados
    const resTemas = await db.execute({
        sql: "SELECT item_id FROM inventario_economia WHERE user_id = ? AND item_id LIKE 'tema_%'",
        args: [discordId]
    });
    const temasComprados = resTemas.rows.map(r => String(r.item_id).replace('tema_', ''));

    // 8. Fetch Bitacora
    const resBitacora = await db.execute({
        sql: "SELECT accion, fecha FROM bitacora WHERE user_id = ? ORDER BY id DESC LIMIT 5",
        args: [discordId]
    });
    const bitacoraReciente = resBitacora.rows.map(r => ({
        accion: String(r.accion),
        fechaStr: new Date(String(r.fecha)).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    }));

    // 9. Fetch Ranking Global
    const resRanking = await db.execute({
        sql: "SELECT COUNT(*) as rank FROM usuarios WHERE monedas > ?",
        args: [monedas]
    });
    const puestoRanking = Number(resRanking.rows[0].rank) + 1;
    const resTotalUsers = await db.execute("SELECT COUNT(*) as total FROM usuarios");
    const totalUsers = Number(resTotalUsers.rows[0].total);

    const colCount: Record<string, number> = {};
    for (const row of collectionsCount) {
        colCount[String(row.categoria)] = Number(row.total);
    }

    const categorias = ["peces", "insectos", "aves", "animales", "cultivos", "recolectables", "recetas", "logros"];

    // Rango Economico
    let tituloEconomico = "Mendigo del Pueblito";
    if (monedas >= 10000) tituloEconomico = "Mente Maestra de Wall Street";
    else if (monedas >= 5000) tituloEconomico = "Magnate Comercial";
    else if (monedas >= 1000) tituloEconomico = "Comerciante Local";
    else if (monedas >= 200) tituloEconomico = "Ahorrador Acerrimo";

    // Calcular xp base
    const xpBaseNivelDesc = Math.pow((nivel - 1) * 10, 2);
    const xpSigNivel = Math.pow(nivel * 10, 2);
    const progress = Math.min(100, Math.max(0, ((xp - xpBaseNivelDesc) / (xpSigNivel - xpBaseNivelDesc)) * 100));

    // Theme accent mapping -- all text uses semantic tokens (text-foreground, text-muted-foreground)
    // Only progress bar gradients and badges get theme-specific accent colors
    const TEMA_ACCENT: Record<string, { progress: string; badge: string }> = {
        default: { progress: "from-primary to-accent", badge: "bg-primary/10 text-primary" },
        tema_bosque: { progress: "from-emerald-500 to-green-400", badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
        tema_playa: { progress: "from-cyan-400 to-blue-400", badge: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400" },
        tema_noche: { progress: "from-indigo-500 to-purple-500", badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
    };

    const accent = TEMA_ACCENT[tema] || TEMA_ACCENT.default;

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-background font-sans">
            {/* Navigation */}
            <div className="w-full max-w-3xl px-4 pt-6 mb-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors rounded-xl px-4 py-2 bg-card border border-border shadow-sm"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Volver a la wiki
                </Link>
            </div>

            <div className="w-full max-w-3xl px-4 pb-20 space-y-6">
                {/* ==================== HEADER CARD ==================== */}
                <div className="bg-card rounded-3xl shadow-xl border border-border p-6 sm:p-10 flex flex-col items-center relative overflow-hidden">
                    {/* Decorative gradient banner */}
                    <div className={`absolute top-0 left-0 right-0 h-28 bg-gradient-to-br ${accent.progress} opacity-10`} />
                    {banner_url && (
                        <div className="absolute top-0 left-0 right-0 h-28 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${banner_url})` }} />
                    )}

                    {/* Pet companion */}
                    {mascotaData && (
                        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex flex-col items-center" title={`Acompanado por su fiel ${mascotaData.nombre}`}>
                            {mascotaData.isImage ? (
                                <div className="relative w-16 h-16 sm:w-24 sm:h-24 drop-shadow-xl">
                                    <Image src={mascotaData.emoji} alt={mascotaData.nombre} fill className="object-contain" unoptimized />
                                </div>
                            ) : (
                                <span className="text-4xl sm:text-5xl drop-shadow-lg">{mascotaData.emoji}</span>
                            )}
                            <Badge variant="secondary" className="text-[10px] font-black uppercase tracking-widest mt-1">
                                {mascotaData.nombre}
                            </Badge>
                        </div>
                    )}

                    {/* Avatar */}
                    <div className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 shadow-lg bg-secondary mb-5 shrink-0 z-10 flex items-center justify-center ring-4 ring-primary/10 ${monedas >= 10000 ? 'border-amber-400 dark:border-amber-500' : 'border-background'}`}>
                        {avatarData ? (
                            <img src={avatarData} alt="Avatar de Discord" className="w-full h-full object-cover" />
                        ) : (
                            <Image
                                src={`https://api.dicebear.com/7.x/identicon/svg?seed=${username || discordId}&backgroundColor=fce4ec&rowColor=ec407a`}
                                alt="Vecino Avatar Placeholder"
                                fill
                                sizes="128px"
                                className="object-cover"
                            />
                        )}
                    </div>

                    <div className="text-center relative z-10">
                        {tituloEquipado ? (
                            <Badge className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 text-amber-900 text-xs font-black uppercase tracking-widest mb-2 border border-yellow-300 hover:from-amber-200 hover:via-yellow-400 hover:to-amber-200">
                                {tituloEquipado}
                            </Badge>
                        ) : (
                            <Badge variant="secondary" className={`${accent.badge} text-xs font-bold mb-2`}>
                                Vecinito del Pueblito
                            </Badge>
                        )}
                        <h1 className="text-3xl sm:text-4xl font-black text-foreground text-balance">
                            {username ? username : `Invitado #${discordId.slice(-4)}`}
                        </h1>
                        <p className="text-sm font-semibold text-muted-foreground mt-1">
                            {tituloEconomico} <span className="opacity-50 mx-1">{'|'}</span> Puesto #{puestoRanking} de {totalUsers} vecinitos
                        </p>
                    </div>

                    {/* Stats row */}
                    <div className="flex gap-3 sm:gap-5 mt-8 w-full justify-center flex-wrap">
                        {[
                            { icon: <Star className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500" />, value: nivel, label: "Nivel" },
                            { icon: <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />, value: xp, label: "XP Total" },
                            { icon: <Coins className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500 dark:text-yellow-400" />, value: monedas, label: "Moneditas" },
                        ].map(stat => (
                            <div key={stat.label} className="rounded-2xl p-3 sm:p-5 w-[5.5rem] sm:w-32 border border-border bg-secondary/30 text-center">
                                <div className="flex justify-center mb-1.5">{stat.icon}</div>
                                <span className="block text-xl sm:text-2xl font-black text-foreground">{stat.value}</span>
                                <span className="block text-[10px] sm:text-xs font-bold text-muted-foreground uppercase">{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Progress bar */}
                    <div className="w-full max-w-lg mt-8 relative z-10">
                        <div className="flex justify-between text-xs font-bold mb-2 text-muted-foreground">
                            <span>Progreso Nivel {nivel}</span>
                            <span>{Math.floor(progress)}% hacia {nivel + 1}</span>
                        </div>
                        <div className="w-full h-3 rounded-full overflow-hidden shrink-0 border border-border bg-secondary">
                            <div
                                className={`h-full rounded-full bg-gradient-to-r ${accent.progress}`}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* ==================== HOJA DE AVENTURERO ==================== */}
                <div className="bg-card rounded-3xl shadow-xl border border-border p-6 sm:p-8">
                    <h3 className="text-xl font-black text-foreground mb-6 flex items-center gap-2">
                        <Swords className="h-5 w-5 text-emerald-500" />
                        Hoja de Aventurero
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                        {[
                            { id: "pesca", icon: <Fish className="h-6 w-6" />, name: "Pesca" },
                            { id: "caza", icon: <Bug className="h-6 w-6" />, name: "Caza" },
                            { id: "mineria", icon: <Pickaxe className="h-6 w-6" />, name: "Mineria" },
                            { id: "recoleccion", icon: <TreePine className="h-6 w-6" />, name: "Recoleccion" }
                        ].map(hab => {
                            const userHab = habilidades.find(h => h.habilidad === hab.id);
                            const nivelHab = userHab ? userHab.nivel : 1;
                            return (
                                <div key={hab.id} className="flex flex-col items-center p-4 rounded-2xl border border-border bg-emerald-500/5">
                                    <div className="text-emerald-600 dark:text-emerald-400 mb-1">{hab.icon}</div>
                                    <span className="font-bold text-xs sm:text-sm text-muted-foreground">{hab.name}</span>
                                    <span className="font-black text-lg sm:text-xl text-foreground">Nv. {nivelHab}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ==================== MIS COMPANEROS ==================== */}
                {mascotasCompradas.length > 0 && (
                    <div className="bg-card rounded-3xl shadow-xl border border-border p-6 sm:p-8">
                        <h3 className="text-xl font-black text-foreground mb-6 flex items-center gap-2">
                            <PawPrint className="h-5 w-5 text-pink-500" />
                            Mis Companeros Fieles
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {mascotasCompradas.map(m => {
                                const isActiva = mascotaData && mascotaData.nombre.toLowerCase() === m.toLowerCase();
                                return (
                                    <Badge
                                        key={m}
                                        variant={isActiva ? "default" : "secondary"}
                                        className={`text-sm font-bold capitalize px-4 py-2 ${isActiva ? 'bg-pink-500 text-white hover:bg-pink-500' : ''}`}
                                    >
                                        {isActiva && <PawPrint className="h-3 w-3 mr-1" />} {m}
                                    </Badge>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ==================== TEMAS DESBLOQUEADOS ==================== */}
                {temasComprados.length > 0 && (
                    <div className="bg-card rounded-3xl shadow-xl border border-border p-6 sm:p-8">
                        <h3 className="text-xl font-black text-foreground mb-6 flex items-center gap-2">
                            <Palette className="h-5 w-5 text-indigo-500" />
                            Temas de Perfil Desbloqueados
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {temasComprados.map(t => {
                                const isActivo = tema.replace('tema_', '') === t;
                                return (
                                    <Badge
                                        key={t}
                                        variant={isActivo ? "default" : "secondary"}
                                        className={`text-sm font-bold capitalize px-4 py-2 ${isActivo ? 'bg-indigo-500 text-white hover:bg-indigo-500' : ''}`}
                                    >
                                        {isActivo && <Palette className="h-3 w-3 mr-1" />} {t.replace('_', ' ')}
                                    </Badge>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ==================== TITULOS / LOGROS ==================== */}
                {listaTitulos.length > 0 && (
                    <div className="bg-card rounded-3xl shadow-xl border border-border p-6 sm:p-8">
                        <h3 className="text-xl font-black text-foreground mb-6 flex items-center gap-2">
                            <Trophy className="h-5 w-5 text-yellow-500" />
                            Vitrina de Logros / Titulos
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {listaTitulos.map(t => (
                                <div
                                    key={t}
                                    className={`px-4 py-2 rounded-xl border-2 border-dashed font-black text-xs uppercase tracking-wider ${t === tituloEquipado
                                        ? 'border-yellow-400 dark:border-yellow-600 bg-yellow-500/10 text-foreground'
                                        : 'border-border text-muted-foreground'
                                    }`}
                                >
                                    {t === tituloEquipado && <Star className="h-3 w-3 inline mr-1 text-yellow-500" />}
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ==================== VITRINA DE DESTACADOS ==================== */}
                {destacados.length > 0 && (
                    <div className="bg-card rounded-3xl shadow-xl border border-border p-6 sm:p-8 flex flex-col items-center">
                        <h3 className="text-xl font-black text-foreground mb-6 flex items-center gap-2">
                            <Eye className="h-5 w-5 text-amber-500" />
                            Mis Descubrimientos Favoritos
                        </h3>
                        <div className="flex gap-3 sm:gap-6 justify-center flex-wrap">
                            {[1, 2, 3].map(slotNum => {
                                const dest = destacados.find(d => d.slot === slotNum);
                                return (
                                    <div key={slotNum} className={`w-24 h-28 sm:w-32 sm:h-36 rounded-2xl flex flex-col items-center justify-center p-3 text-center border-2 border-dashed transition-colors ${dest ? 'border-amber-300 dark:border-amber-700 bg-amber-500/5' : 'border-border bg-secondary/20 opacity-50'}`}>
                                        {dest ? (
                                            <>
                                                <div className="text-3xl sm:text-4xl mb-2 drop-shadow-md">
                                                    {CATEGORIAS_EMOJIS[dest.categoria.toLowerCase()] || "?"}
                                                </div>
                                                <div className="text-[10px] sm:text-xs font-bold leading-tight line-clamp-2 text-foreground">
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

                {/* ==================== COLECCIONES ==================== */}
                <div className="bg-card rounded-3xl shadow-xl border border-border p-6 sm:p-10">
                    <h2 className="text-2xl font-black text-foreground mb-2 flex items-center gap-2">
                        Libretita de Colecciones
                    </h2>
                    <p className="text-sm text-muted-foreground mb-8 max-w-lg">
                        Todo lo que este dulce habitante ha registrado explorando el pueblito.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                        {categorias.map(cat => {
                            const count = colCount[cat] || 0;
                            const total = totals[cat] || 1;
                            const percent = Math.min(100, (count / total) * 100);
                            const colorClass = CATEGORIAS_COLORS[cat] || "text-muted-foreground bg-secondary/50";

                            return (
                                <div key={cat} className="flex flex-col p-3 sm:p-4 rounded-2xl border border-border bg-secondary/20 transition-colors duration-200 hover:border-primary/30 hover:bg-secondary/40">
                                    <div className={`h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center text-lg mb-2 ${colorClass}`}>
                                        {CATEGORIAS_EMOJIS[cat] || "?"}
                                    </div>
                                    <span className="font-bold capitalize text-xs sm:text-sm text-foreground">{cat}</span>
                                    <span className="font-black text-lg sm:text-xl my-1 text-foreground">
                                        {count} <span className="text-xs sm:text-sm font-normal text-muted-foreground">/ {totals[cat] || 0}</span>
                                    </span>
                                    <div className="w-full h-1.5 mt-2 rounded-full overflow-hidden shrink-0 bg-secondary">
                                        <div className={`h-full rounded-full bg-gradient-to-r ${accent.progress}`} style={{ width: `${percent}%` }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ==================== BITACORA ==================== */}
                {bitacoraReciente.length > 0 && (
                    <div className="bg-card rounded-3xl shadow-xl border border-border p-6 sm:p-8">
                        <h3 className="text-xl font-black text-foreground mb-6 flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-blue-500" />
                            Diario de Aventuras
                        </h3>
                        <div className="space-y-3">
                            {bitacoraReciente.map((b, i) => (
                                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl border border-border bg-blue-500/5 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-400 dark:bg-blue-500" />
                                    <div className="shrink-0 text-[10px] sm:text-xs font-bold px-2 py-1 rounded bg-secondary text-muted-foreground ml-2 sm:ml-3 w-fit">
                                        {b.fechaStr}
                                    </div>
                                    <div className="text-sm font-semibold leading-relaxed text-foreground ml-2 sm:ml-0">
                                        {b.accion}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ==================== SECRETITOS DE VECINO ==================== */}
                {(statsMap["bichos_fallados"] > 0 || statsMap["robar_rico"] > 0 || statsMap["arboles_sacudidos"] > 0) && (
                    <div className="bg-card rounded-3xl shadow-xl border border-border p-6 sm:p-8">
                        <h3 className="text-xl font-black text-foreground mb-4 flex items-center gap-2">
                            <span className="text-purple-500">{'🤫'}</span> Secretitos de Vecino
                        </h3>
                        <ul className="space-y-3 text-sm font-medium text-foreground">
                            {statsMap["arboles_sacudidos"] > 0 && (
                                <li className="flex items-start sm:items-center gap-3 p-3 rounded-xl bg-purple-500/5 border border-border">
                                    <span className="text-xl shrink-0">{'🌳'}</span>
                                    <span>Ha agitado ramas vigorosamente <strong className="text-foreground">{statsMap["arboles_sacudidos"]}</strong> veces.</span>
                                </li>
                            )}
                            {statsMap["bichos_fallados"] > 0 && (
                                <li className="flex items-start sm:items-center gap-3 p-3 rounded-xl bg-purple-500/5 border border-border">
                                    <span className="text-xl shrink-0">{'🍂'}</span>
                                    <span>Ha golpeado al aire intentando cazar <strong className="text-foreground">{statsMap["bichos_fallados"]}</strong> bichos.</span>
                                </li>
                            )}
                            {statsMap["robar_rico"] > 0 && (
                                <li className="flex items-start sm:items-center gap-3 p-3 rounded-xl bg-purple-500/5 border border-border">
                                    <span className="text-xl shrink-0">{'🥷'}</span>
                                    <span>Le ha metido la mano al bolsillo a vecinos con mas de 10k monedas <strong className="text-foreground">{statsMap["robar_rico"]}</strong> veces.</span>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
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
