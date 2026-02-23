import { getDb, getTableCounts } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowLeft, Star, Sparkles, Coins, Swords, Fish, Bug, Pickaxe, TreePine, PawPrint, Palette, Trophy, BookOpen, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const revalidate = 60;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://heartopiachile.vercel.app";

interface PageProps {
    params: Promise<{ discordId: string }>;
}

type CssVars = CSSProperties & Record<`--${string}`, string>;

const CATEGORIAS_EMOJIS: Record<string, string> = {
    peces: "🐟", insectos: "🦋", aves: "🕊️", animales: "🦊",
    cultivos: "🌱", recolectables: "🌿", recetas: "🍳", logros: "🏆"
};

const CATEGORIAS_COLORS: Record<string, string> = {
    peces: "text-blue-600 bg-blue-500/10",
    insectos: "text-amber-600 bg-amber-500/10",
    aves: "text-sky-600 bg-sky-500/10",
    animales: "text-orange-600 bg-orange-500/10",
    cultivos: "text-green-600 bg-green-500/10",
    recolectables: "text-emerald-600 bg-emerald-500/10",
    recetas: "text-rose-600 bg-rose-500/10",
    logros: "text-purple-600 bg-purple-500/10",
};

const PROFILE_THEME_VARS: Record<string, CssVars> = {
    default: {
        "--background": "oklch(0.97 0.02 350)",
        "--foreground": "oklch(0.25 0.04 350)",
        "--card": "oklch(0.99 0.015 350)",
        "--card-foreground": "oklch(0.25 0.04 350)",
        "--popover": "oklch(0.99 0.015 350)",
        "--popover-foreground": "oklch(0.25 0.04 350)",
        "--primary": "oklch(0.65 0.18 350)",
        "--primary-foreground": "oklch(0.99 0.01 350)",
        "--secondary": "oklch(0.94 0.03 350)",
        "--secondary-foreground": "oklch(0.35 0.04 350)",
        "--muted": "oklch(0.95 0.02 350)",
        "--muted-foreground": "oklch(0.5 0.03 350)",
        "--accent": "oklch(0.75 0.12 30)",
        "--accent-foreground": "oklch(0.25 0.04 350)",
        "--border": "oklch(0.9 0.03 350)",
        "--input": "oklch(0.94 0.02 350)",
        "--ring": "oklch(0.65 0.18 350)",
        colorScheme: "light",
    },
    tema_bosque: {
        "--background": "oklch(0.975 0.02 145)",
        "--foreground": "oklch(0.27 0.03 145)",
        "--card": "oklch(0.99 0.015 145)",
        "--card-foreground": "oklch(0.27 0.03 145)",
        "--popover": "oklch(0.99 0.015 145)",
        "--popover-foreground": "oklch(0.27 0.03 145)",
        "--primary": "oklch(0.63 0.16 145)",
        "--primary-foreground": "oklch(0.99 0.01 145)",
        "--secondary": "oklch(0.945 0.025 145)",
        "--secondary-foreground": "oklch(0.34 0.03 145)",
        "--muted": "oklch(0.955 0.02 145)",
        "--muted-foreground": "oklch(0.48 0.02 145)",
        "--accent": "oklch(0.78 0.12 125)",
        "--accent-foreground": "oklch(0.27 0.03 145)",
        "--border": "oklch(0.9 0.02 145)",
        "--input": "oklch(0.945 0.02 145)",
        "--ring": "oklch(0.63 0.16 145)",
        colorScheme: "light",
    },
    tema_playa: {
        "--background": "oklch(0.98 0.015 220)",
        "--foreground": "oklch(0.28 0.03 235)",
        "--card": "oklch(0.995 0.01 220)",
        "--card-foreground": "oklch(0.28 0.03 235)",
        "--popover": "oklch(0.995 0.01 220)",
        "--popover-foreground": "oklch(0.28 0.03 235)",
        "--primary": "oklch(0.66 0.14 230)",
        "--primary-foreground": "oklch(0.99 0.01 220)",
        "--secondary": "oklch(0.95 0.02 215)",
        "--secondary-foreground": "oklch(0.36 0.03 235)",
        "--muted": "oklch(0.96 0.015 215)",
        "--muted-foreground": "oklch(0.5 0.02 230)",
        "--accent": "oklch(0.78 0.1 185)",
        "--accent-foreground": "oklch(0.28 0.03 235)",
        "--border": "oklch(0.91 0.02 215)",
        "--input": "oklch(0.95 0.02 215)",
        "--ring": "oklch(0.66 0.14 230)",
        colorScheme: "light",
    },
    tema_noche: {
        "--background": "oklch(0.19 0.02 290)",
        "--foreground": "oklch(0.93 0.02 300)",
        "--card": "oklch(0.235 0.02 290)",
        "--card-foreground": "oklch(0.93 0.02 300)",
        "--popover": "oklch(0.235 0.02 290)",
        "--popover-foreground": "oklch(0.93 0.02 300)",
        "--primary": "oklch(0.72 0.13 280)",
        "--primary-foreground": "oklch(0.2 0.02 290)",
        "--secondary": "oklch(0.29 0.02 290)",
        "--secondary-foreground": "oklch(0.89 0.02 300)",
        "--muted": "oklch(0.29 0.02 290)",
        "--muted-foreground": "oklch(0.67 0.02 300)",
        "--accent": "oklch(0.7 0.1 315)",
        "--accent-foreground": "oklch(0.2 0.02 290)",
        "--border": "oklch(0.33 0.03 290)",
        "--input": "oklch(0.29 0.02 290)",
        "--ring": "oklch(0.72 0.13 280)",
        colorScheme: "dark",
    },
};

export default async function PerfilPublicoPage({ params }: PageProps) {
    const { discordId } = await params;
    
    // Validación de seguridad: discordId debe ser numérico (snowflake de Discord)
    if (!/^\d{17,20}$/.test(discordId)) {
        return notFound();
    }
    
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
    const xp = Number(user.xp || 0);
    const nivel = Math.max(1, Number(user.nivel || 1));
    const monedas = Number(user.monedas || 0);
    const tema = String(user.tema_perfil || 'default');
    const banner_url = String(user.banner_url || '');
    const marcoPerfil = String(user.marco_perfil || 'default');
    const mascotaId = user.mascota_activa;
    const username = user.username ? String(user.username) : null;
    const avatarData = user.avatar ? String(user.avatar) : null;
    
    // Helper: formatear números de forma compacta
    const formatCompactNumber = (value: number) =>
        new Intl.NumberFormat('es-CL', {
            notation: 'compact',
            maximumFractionDigits: 1,
        }).format(value);

    const mascotaNombresMap = new Map<string, string>();
    try {
        const resNombresMascota = await db.execute({
            sql: "SELECT mascota_id, nombre FROM mascota_nombres WHERE user_id = ?",
            args: [discordId],
        });
        for (const row of resNombresMascota.rows) {
            const mascotaKey = String(row.mascota_id || "");
            const nombre = String(row.nombre || "").trim();
            if (mascotaKey && nombre) {
                mascotaNombresMap.set(mascotaKey, nombre);
            }
        }
    } catch {
        // Compatibilidad: en entornos antiguos esta tabla puede no existir todavía.
    }

    const MASCOTAS_INFO: Record<string, { emoji: string; nombre: string; isImage?: boolean }> = {
        mascota_kiltro: { emoji: "https://media.tenor.com/RboGj6iwlKYAAAAj/puppy.gif", nombre: "Kiltro", isImage: true },
        mascota_gatito: { emoji: "https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUycDJnNXd6Mnp1Z3B6cnZlbDZ0bG1oMWx6ZHI4ZW9nMWZiZXZycnh6ZiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/W9eUHIDf1PvycL3tMS/200.gif", nombre: "Gatito", isImage: true },
        mascota_pudu: { emoji: "https://fbi.cults3d.com/uploaders/37896446/illustration-file/31cb4cc0-8a39-4f81-b8b8-8fedad27147a/pudu.gif", nombre: "Pudu", isImage: true }
    };
    const mascotaData = mascotaId ? MASCOTAS_INFO[mascotaId as string] : null;
    const mascotaNombreVisible = mascotaId
        ? (mascotaNombresMap.get(String(mascotaId)) || mascotaData?.nombre || String(mascotaId).replace("mascota_", ""))
        : null;

    // 2-8. OPTIMIZACIÓN: Paralelizar todas las queries independientes
    const [
        totals,
        resCol,
        resDestacados,
        resHab,
        resStats,
        resTitulos,
        resInventario,
        resHerramientas,
        resBitacora,
    ] = await Promise.all([
        // Totales de categorías
        getTableCounts(),
        
        // Colecciones del usuario
        db.execute({
            sql: "SELECT categoria, COUNT(*) as total FROM colecciones WHERE user_id = ? GROUP BY categoria",
            args: [discordId]
        }),
        
        // Destacados (Vitrina)
        db.execute({
            sql: "SELECT slot, categoria, item_id FROM destacados WHERE user_id = ? ORDER BY slot ASC",
            args: [discordId]
        }),
        
        // Habilidades
        db.execute({
            sql: "SELECT habilidad, nivel FROM habilidades WHERE user_id = ?",
            args: [discordId]
        }),
        
        // Estadísticas
        db.execute({
            sql: "SELECT accion, cantidad FROM estadisticas WHERE user_id = ?",
            args: [discordId]
        }),
        
        // Títulos
        db.execute({
            sql: "SELECT titulo, equipado FROM titulos WHERE user_id = ?",
            args: [discordId]
        }),
        
        // Un solo query para todo el inventario (mascotas, temas, marcos, consumibles)
        db.execute({
            sql: `SELECT item_id, cantidad FROM inventario_economia 
                  WHERE user_id = ? 
                  AND (item_id LIKE 'mascota_%' 
                       OR item_id LIKE 'tema_%' 
                       OR item_id LIKE 'marco_perfil_%'
                       OR item_id IN ('booster_xp_30m','amuleto_suerte_15m','reset_racha_perdon','etiqueta_mascota'))
                  AND cantidad > 0`,
            args: [discordId]
        }),
        
        // Herramientas con durabilidad (NUEVO)
        db.execute({
            sql: `SELECT item_id, durabilidad, max_durabilidad, equipado 
                  FROM herramientas_durabilidad 
                  WHERE user_id = ? 
                  ORDER BY equipado DESC, durabilidad DESC, item_id ASC`,
            args: [discordId]
        }),
        
        // Bitácora
        db.execute({
            sql: "SELECT accion, fecha FROM bitacora WHERE user_id = ? ORDER BY id DESC LIMIT 5",
            args: [discordId]
        }),
    ]);
    
    // Procesar colecciones
    const collectionsCount = resCol.rows as unknown as { categoria: string; total: number }[];
    
    // Procesar destacados
    const destacados = resDestacados.rows as unknown as { slot: number; categoria: string; item_id: string }[];
    
    // Procesar habilidades
    const habilidades = resHab.rows as unknown as { habilidad: string; nivel: number }[];
    
    // Procesar estadísticas
    const statsMap: Record<string, number> = {};
    for (const r of resStats.rows) statsMap[String(r.accion)] = Number(r.cantidad);
    
    // Procesar títulos
    let tituloEquipado: string | null = null;
    const listaTitulos: string[] = [];
    for (const row of resTitulos.rows) {
        if (row.equipado === 1) tituloEquipado = String(row.titulo);
        listaTitulos.push(String(row.titulo));
    }
    
    // Procesar inventario unificado
    const mascotasSet = new Set<string>();
    const temasSet = new Set<string>();
    const marcosSet = new Set<string>();
    const consumiblesComprados: { item_id: string; cantidad: number }[] = [];
    
    // Nombres amigables para consumibles
    const CONSUMIBLE_NOMBRES: Record<string, string> = {
        booster_xp_30m: "Booster XP 30m",
        amuleto_suerte_15m: "Amuleto Suerte 15m",
        reset_racha_perdon: "Reset Racha Perdón",
        etiqueta_mascota: "Etiqueta Mascota",
    };
    
    for (const row of resInventario.rows) {
        const itemId = String(row.item_id);
        const cantidad = Number(row.cantidad || 0);
        
        if (itemId.startsWith('mascota_')) {
            mascotasSet.add(itemId);
        } else if (itemId.startsWith('tema_')) {
            temasSet.add(itemId.replace('tema_', ''));
        } else if (itemId.startsWith('marco_perfil_')) {
            marcosSet.add(itemId.replace('marco_perfil_', ''));
        } else {
            consumiblesComprados.push({ item_id: itemId, cantidad });
        }
    }
    
    // Agregar items actualmente equipados aunque no estén en inventario
    if (mascotaId && String(mascotaId).startsWith('mascota_')) {
        mascotasSet.add(String(mascotaId));
    }
    if (tema.startsWith('tema_')) {
        temasSet.add(tema.replace('tema_', ''));
    }
    if (marcoPerfil.startsWith('marco_perfil_')) {
        marcosSet.add(marcoPerfil.replace('marco_perfil_', ''));
    }
    
    const mascotasCompradas = Array.from(mascotasSet);
    const temasComprados = Array.from(temasSet);
    const marcosComprados = Array.from(marcosSet);
    
    // Procesar herramientas con durabilidad
    const TOOL_NAMES: Record<string, string> = {
        herr_pico_basico: "Pico Básico",
        herr_pico_hierro: "Pico de Hierro",
        herr_pico_acero: "Pico de Acero",
        herr_hacha_basica: "Hacha Básica",
        herr_hacha_hierro: "Hacha de Hierro",
        herr_hacha_titanio: "Hacha de Titanio",
        herr_cana_basica: "Caña Básica",
        herr_cana_fibra: "Caña de Fibra",
        herr_cana_lunar: "Caña Lunar",
        herr_red_basica: "Red Básica",
        herr_red_fina: "Red Fina",
        herr_red_seda: "Red de Seda",
    };
    
    const TOOL_EMOJIS: Record<string, string> = {
        pico: "⛏️",
        hacha: "🪓",
        cana: "🎣",
        red: "🪰",
    };
    
    type Herramienta = { 
        item_id: string; 
        durabilidad: number; 
        max_durabilidad: number; 
        equipado: number;
        familia: string;
    };
    
    const herramientas: Herramienta[] = resHerramientas.rows.map(r => {
        const itemId = String(r.item_id);
        let familia = "otra";
        if (itemId.includes("pico")) familia = "pico";
        else if (itemId.includes("hacha")) familia = "hacha";
        else if (itemId.includes("cana")) familia = "cana";
        else if (itemId.includes("red")) familia = "red";
        
        return {
            item_id: itemId,
            durabilidad: Number(r.durabilidad),
            max_durabilidad: Number(r.max_durabilidad),
            equipado: Number(r.equipado),
            familia,
        };
    }) as Herramienta[];
    // Procesar bitácora
    const bitacoraReciente = resBitacora.rows.map(r => ({
        accion: String(r.accion),
        fechaStr: new Date(String(r.fecha)).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    }));
    
    // Queries opcionales (pueden fallar si las tablas no existen)
    const [resBoosts, resCasino] = await Promise.allSettled([
        db.execute({
            sql: "SELECT boost_id, fecha_expira FROM boosts_activos WHERE user_id = ?",
            args: [discordId],
        }),
        db.execute({
            sql: "SELECT wins, losses, total_betted, net_winnings FROM casino_stats WHERE user_id = ?",
            args: [discordId],
        }),
    ]);
    
    // Procesar boosts activos
    const boostsActivos: string[] = [];
    if (resBoosts.status === 'fulfilled') {
        const ahora = Date.now();
        for (const row of resBoosts.value.rows) {
            const expira = Number(row.fecha_expira || 0);
            if (expira <= ahora) continue;
            const minutos = Math.max(1, Math.ceil((expira - ahora) / 60000));
            const id = String(row.boost_id || "");
            if (id === "booster_xp_30m") boostsActivos.push(`Booster XP (+25%) · ${minutos}m`);
            else if (id === "amuleto_suerte_15m") boostsActivos.push(`Amuleto de Suerte · ${minutos}m`);
            else boostsActivos.push(`${id} · ${minutos}m`);
        }
    }
    
    // Procesar casino stats
    let casinoStats = {
        wins: 0,
        losses: 0,
        totalBetted: 0,
        netWinnings: 0,
        winRate: 0,
    };
    if (resCasino.status === 'fulfilled' && resCasino.value.rows.length > 0) {
        const wins = Number(resCasino.value.rows[0].wins || 0);
        const losses = Number(resCasino.value.rows[0].losses || 0);
        const totalGames = wins + losses;
        casinoStats = {
            wins,
            losses,
            totalBetted: Number(resCasino.value.rows[0].total_betted || 0),
            netWinnings: Number(resCasino.value.rows[0].net_winnings || 0),
            winRate: totalGames > 0 ? (wins / totalGames) * 100 : 0,
        };
    }

    // 9. Fetch Rankings - Paralelizado
    const totalColeccionUsuario = collectionsCount.reduce((acc, row) => acc + Number(row.total), 0);
    
    const [
        resRanking,
        resTotalUsers,
        resRankingColeccion,
        resTotalColeccionistas
    ] = await Promise.all([
        db.execute({
            sql: "SELECT COUNT(*) as rank FROM usuarios WHERE monedas > ?",
            args: [monedas]
        }),
        db.execute("SELECT COUNT(*) as total FROM usuarios"),
        db.execute({
            sql: "SELECT COUNT(*) as rank FROM (SELECT user_id, COUNT(*) as total_items FROM colecciones GROUP BY user_id) t WHERE t.total_items > ?",
            args: [totalColeccionUsuario],
        }),
        db.execute("SELECT COUNT(DISTINCT user_id) as total FROM colecciones"),
    ]);
    
    const puestoRanking = Number(resRanking.rows[0].rank) + 1;
    const totalUsers = Number(resTotalUsers.rows[0].total);
    const puestoColeccion = Number(resRankingColeccion.rows[0]?.rank || 0) + 1;
    const totalColeccionistas = Math.max(1, Number(resTotalColeccionistas.rows[0]?.total || 1));

    const topEconomicoPercent = Math.min(100, Math.max(1, Math.ceil((puestoRanking / Math.max(1, totalUsers)) * 100)));
    const topColeccionPercent = Math.min(100, Math.max(1, Math.ceil((puestoColeccion / totalColeccionistas) * 100)));

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

    // Calcular xp base y progreso (validando valores)
    const xpBaseNivelDesc = Math.pow(Math.max(0, nivel - 1) * 10, 2);
    const xpSigNivel = Math.pow(nivel * 10, 2);
    const progress = Math.min(100, Math.max(0, ((xp - xpBaseNivelDesc) / Math.max(1, xpSigNivel - xpBaseNivelDesc)) * 100));
    const xpRestante = Math.max(0, xpSigNivel - xp);

    // Objetivo de colección con datos estructurados para JSX
    let objetivoColeccion: { emoji: string; categoria: string; faltan: number; owned: number; total: number } | null = null;
    let menorFaltante = Number.MAX_SAFE_INTEGER;
    for (const cat of categorias) {
        const owned = Number(colCount[cat] || 0);
        const total = Number(totals[cat] || 0);
        if (total <= 0 || owned >= total) continue;
        const faltan = total - owned;
        if (faltan < menorFaltante) {
            menorFaltante = faltan;
            const emoji = CATEGORIAS_EMOJIS[cat] || "📖";
            objetivoColeccion = { emoji, categoria: cat, faltan, owned, total };
        }
    }

    let xpMes = 0;
    let monedasMes = 0;
    let diasActivosMes = 0;
    let rachaActiva = 0;

    try {
        const resActividadMes = await db.execute({
            sql: `SELECT 
                  COALESCE(SUM(xp_ganado), 0) as xp_mes,
                  COALESCE(SUM(monedas_ganadas), 0) as monedas_mes,
                  COUNT(*) as dias_activos_mes
                  FROM actividad_diaria
                  WHERE user_id = ?
                                    AND fecha >= date(
                                        'now',
                                        COALESCE((SELECT valor FROM configuracion WHERE clave = 'CHILE_TZ_OFFSET_SQLITE'), '-3 hours'),
                                        'start of month'
                                    )
                  AND (acciones > 0 OR xp_ganado > 0 OR monedas_ganadas > 0)`,
            args: [discordId],
        });

        xpMes = Number(resActividadMes.rows[0]?.xp_mes || 0);
        monedasMes = Number(resActividadMes.rows[0]?.monedas_mes || 0);
        diasActivosMes = Number(resActividadMes.rows[0]?.dias_activos_mes || 0);

        const resDiasActivos = await db.execute({
            sql: `SELECT fecha FROM actividad_diaria
                  WHERE user_id = ?
                  AND (acciones > 0 OR xp_ganado > 0 OR monedas_ganadas > 0)
                  ORDER BY fecha DESC LIMIT 180`,
            args: [discordId],
        });
        const resHoyChile = await db.execute({
            sql: `SELECT date(
                  'now',
                  COALESCE((SELECT valor FROM configuracion WHERE clave = 'CHILE_TZ_OFFSET_SQLITE'), '-3 hours')
                ) as hoy`,
        });

        const diasActivos = new Set(resDiasActivos.rows.map(r => String(r.fecha || "")).filter(Boolean));
        const prevDateKey = (key: string) => {
            const d = new Date(`${key}T00:00:00Z`);
            d.setUTCDate(d.getUTCDate() - 1);
            return d.toISOString().slice(0, 10);
        };

        let cursorKey = String(resHoyChile.rows[0]?.hoy || new Date().toISOString().slice(0, 10));
        while (true) {
            if (!diasActivos.has(cursorKey)) break;
            rachaActiva += 1;
            cursorKey = prevDateKey(cursorKey);
        }
    } catch {
        const resBitacoraActivity = await db.execute({
            sql: "SELECT accion, fecha FROM bitacora WHERE user_id = ? ORDER BY id DESC LIMIT 120",
            args: [discordId]
        });

        const activityRows = resBitacoraActivity.rows.map(r => ({
            accion: String(r.accion || ""),
            fecha: String(r.fecha || "")
        }));

        const diasActivos = new Set(activityRows.filter(r => r.fecha).map(r => r.fecha.slice(0, 10)));
        const chileDateKey = (date: Date) => {
            const parts = new Intl.DateTimeFormat("en-CA", {
                timeZone: "America/Santiago",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            }).formatToParts(date);
            const year = parts.find(p => p.type === "year")?.value;
            const month = parts.find(p => p.type === "month")?.value;
            const day = parts.find(p => p.type === "day")?.value;
            return `${year}-${month}-${day}`;
        };
        const cursor = new Date();
        while (true) {
            const key = chileDateKey(cursor);
            if (!diasActivos.has(key)) break;
            rachaActiva += 1;
            cursor.setDate(cursor.getDate() - 1);
        }

        const inicioMes = new Date();
        inicioMes.setDate(1);
        inicioMes.setHours(0, 0, 0, 0);
        const diasMesFallback = new Set<string>();
        for (const row of activityRows) {
            if (!row.fecha) continue;
            const fechaAccion = new Date(row.fecha);
            if (Number.isNaN(fechaAccion.getTime()) || fechaAccion < inicioMes) continue;
            diasMesFallback.add(row.fecha.slice(0, 10));
            const xpMatch = row.accion.match(/(\d+)\s*xp/i);
            if (xpMatch) xpMes += Number(xpMatch[1]);
            const monedasMatch = row.accion.match(/(\d+)\s*(monedas|moneditas|💰)/i);
            if (monedasMatch) monedasMes += Number(monedasMatch[1]);
        }
        diasActivosMes = diasMesFallback.size;
    }

    const objetivoXpMensual = Math.max(1000, nivel * 300);
    const progresoXpMensual = Math.min(100, Math.round((xpMes / objetivoXpMensual) * 100));

    const pescaNivel = Number((habilidades.find(h => h.habilidad === "pesca")?.nivel || 0));
    const insignias: string[] = [];
    if (topEconomicoPercent <= 10) insignias.push("💸 Top 10% económico");
    if (monedas >= 10000) insignias.push("💰 Millonario");
    if (pescaNivel >= 10) insignias.push("🎣 Maestro de pesca");
    if (totalColeccionUsuario >= 100) insignias.push("📚 Coleccionista experto");
    if (rachaActiva >= 7) insignias.push("🔥 Constancia 7d");

const TEMA_ACCENT: Record<string, { progress: string; badge: string }> = {
  default: {
    progress: "from-primary to-accent",
    badge: "bg-primary/10 text-primary",
  },

  tema_bosque: {
    progress: "from-emerald-700 via-emerald-500 to-lime-400",
    badge: "bg-emerald-950/40 text-emerald-300 border border-emerald-700/60",
  },

  tema_playa: {
    progress: "from-cyan-400 via-teal-400 to-blue-500",
    badge: "bg-cyan-950/40 text-cyan-300 border border-cyan-700/50",
  },

  tema_noche: {
    progress: "from-indigo-700 via-indigo-600 to-purple-600",
    badge: "bg-purple-950/50 text-purple-300 border border-purple-800/60",
  },
};

    const accent = TEMA_ACCENT[tema] || TEMA_ACCENT.default;
    const profileThemeVars = PROFILE_THEME_VARS[tema] || PROFILE_THEME_VARS.default;

    const marcoClassMap: Record<string, string> = {
        marco_perfil_bronce: "border-amber-600 ring-4 ring-amber-400/40",
        marco_perfil_cristal: "border-cyan-400 ring-4 ring-cyan-300/40",
        marco_perfil_galaxia: "border-violet-500 ring-4 ring-fuchsia-500/40",
    };
    const marcoAvatarClass = marcoClassMap[marcoPerfil] || (monedas >= 10000 ? "border-amber-500" : "border-background");

    return (
        <div style={profileThemeVars} className="min-h-screen w-full flex flex-col items-center bg-background font-sans">
            <Header embedded />

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
                        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex flex-col items-center" title={`Acompañado por su fiel ${mascotaNombreVisible || mascotaData.nombre}`}>
                            {mascotaData.isImage ? (
                                <div className="relative w-16 h-16 sm:w-24 sm:h-24 drop-shadow-xl">
                                    <Image src={mascotaData.emoji} alt={mascotaNombreVisible || mascotaData.nombre} fill className="object-contain" unoptimized />
                                </div>
                            ) : (
                                <span className="text-4xl sm:text-5xl drop-shadow-lg">{mascotaData.emoji}</span>
                            )}
                            <Badge variant="secondary" className="text-[10px] font-black uppercase tracking-widest mt-1">
                                {mascotaNombreVisible || mascotaData.nombre}
                            </Badge>
                        </div>
                    )}

                    {/* Avatar */}
                    <div className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 shadow-lg bg-secondary mb-5 shrink-0 z-10 flex items-center justify-center ring-4 ring-primary/10 ${marcoAvatarClass}`}>
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
                            {username || `Invitado #${discordId.slice(-4)}`}
                        </h1>
                        <div className="mt-3 space-y-2">
                            <div className="rounded-xl border border-primary/20 bg-primary/5 px-3 py-2">
                                <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-primary">
                                    Titulo Economico
                                </p>
                                <p className="text-sm sm:text-base font-extrabold text-foreground leading-tight">
                                    {tituloEconomico}
                                </p>
                            </div>
                            <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-3 py-2">
                                <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-600">
                                    Ranking Global
                                </p>
                                <p className="text-sm sm:text-base font-extrabold text-foreground leading-tight">
                                    Puesto #{puestoRanking.toLocaleString('es-CL')} de {totalUsers.toLocaleString('es-CL')} vecinitos
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="flex gap-3 sm:gap-5 mt-8 w-full justify-center flex-wrap">
                        {[
                            { icon: <Star className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500" />, value: nivel, label: "Nivel" },
                            { icon: <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />, value: xp, label: "XP Total" },
                            { icon: <Coins className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />, value: monedas, label: "Moneditas" },
                        ].map(stat => (
                            <div key={stat.label} className="rounded-2xl p-3 sm:p-5 w-[6.3rem] sm:w-36 border border-border bg-secondary/30 text-center">
                                <div className="flex justify-center mb-1.5">{stat.icon}</div>
                                <span title={stat.value.toLocaleString('es-CL')} className="block text-base sm:text-2xl font-black text-foreground leading-tight">
                                    {formatCompactNumber(stat.value)}
                                </span>
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
                                    <div className="text-emerald-600 mb-1">{hab.icon}</div>
                                    <span className="font-bold text-xs sm:text-sm text-muted-foreground">{hab.name}</span>
                                    <span className="font-black text-lg sm:text-xl text-foreground">Nv. {nivelHab}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ==================== HERRAMIENTAS EQUIPABLES ==================== */}
                {herramientas.length > 0 && (
                    <div className="bg-card rounded-3xl shadow-xl border border-border p-6 sm:p-8">
                        <h3 className="text-xl font-black text-foreground mb-6 flex items-center gap-2">
                            <Pickaxe className="h-5 w-5 text-amber-600" />
                            Herramientas del Pueblito
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {["pico", "hacha", "cana", "red"].map(fam => {
                                const toolsInFamily = herramientas.filter(h => h.familia === fam);
                                if (toolsInFamily.length === 0) return null;
                                
                                return (
                                    <div key={fam} className="rounded-2xl border border-border bg-secondary/20 p-4">
                                        <p className="text-xs font-black uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
                                            <span className="text-lg">{TOOL_EMOJIS[fam]}</span>
                                            {fam === "cana" ? "Cañas" : fam === "pico" ? "Picos" : fam === "hacha" ? "Hachas" : "Redes"}
                                        </p>
                                        <div className="space-y-2">
                                            {toolsInFamily.map(tool => {
                                                const durPercent = (tool.durabilidad / tool.max_durabilidad) * 100;
                                                const isEquipped = tool.equipado === 1;
                                                let durColor = "text-green-600";
                                                if (durPercent < 30) durColor = "text-red-600";
                                                else if (durPercent < 60) durColor = "text-yellow-600";
                                                
                                                return (
                                                    <div key={tool.item_id} className={`text-xs font-semibold p-2 rounded-xl border ${
                                                        isEquipped 
                                                            ? 'border-primary bg-primary/10 text-foreground' 
                                                            : 'border-border bg-card text-muted-foreground'
                                                    }`}>
                                                        <div className="flex items-center justify-between gap-2">
                                                            <span className="font-bold">
                                                                {isEquipped && '✅ '}{TOOL_NAMES[tool.item_id] || tool.item_id}
                                                            </span>
                                                            <span className={`font-black ${durColor}`}>
                                                                {tool.durabilidad}/{tool.max_durabilidad}
                                                            </span>
                                                        </div>
                                                        <div className="w-full h-1.5 mt-1.5 rounded-full overflow-hidden shrink-0 bg-secondary">
                                                            <div 
                                                                className={`h-full rounded-full ${
                                                                    durPercent < 30 ? 'bg-red-500' : durPercent < 60 ? 'bg-yellow-500' : 'bg-green-500'
                                                                }`} 
                                                                style={{ width: `${durPercent}%` }} 
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <p className="text-xs text-muted-foreground mt-4 italic">
                            💡 Usa <strong>/equipar</strong> en el bot para cambiar tu herramienta activa de cada familia
                        </p>
                    </div>
                )}

                {/* ==================== OBJETIVO / ACTIVIDAD / COMPARATIVA ==================== */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-card rounded-3xl shadow-xl border border-border p-6">
                        <h3 className="text-xl font-black text-foreground mb-4">🎯 Objetivo Siguiente</h3>
                        <div className="space-y-3 text-sm text-foreground">
                            <div className="rounded-xl border border-border bg-secondary/20 p-3">
                                Te faltan <strong>{formatCompactNumber(xpRestante)} XP</strong> para subir a nivel <strong>{nivel + 1}</strong>.
                            </div>
                            <div className="rounded-xl border border-border bg-secondary/20 p-3">
                                {objetivoColeccion ? (
                                    <>
                                        {objetivoColeccion.emoji} <strong className="capitalize">{objetivoColeccion.categoria}</strong>: te faltan {objetivoColeccion.faltan} ({objetivoColeccion.owned}/{objetivoColeccion.total})
                                    </>
                                ) : (
                                    "Completa una categoría nueva en tu libretita"
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-card rounded-3xl shadow-xl border border-border p-6">
                        <h3 className="text-xl font-black text-foreground mb-4">🧭 Comparativa Vecinal</h3>
                        <div className="space-y-3 text-sm">
                            <div className="rounded-xl border border-border bg-secondary/20 p-3">
                                <span className="text-foreground">💸 Económico: <strong>Top {topEconomicoPercent}%</strong> (#{puestoRanking}/{totalUsers})</span>
                            </div>
                            <div className="rounded-xl border border-border bg-secondary/20 p-3">
                                <span className="text-foreground">📚 Coleccionista: <strong>Top {topColeccionPercent}%</strong> (#{puestoColeccion}/{totalColeccionistas})</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-card rounded-3xl shadow-xl border border-border p-6 sm:p-8">
                    <h3 className="text-xl font-black text-foreground mb-4">🔥 Rachas y Actividad Reciente</h3>
                    <p className="text-sm font-semibold text-muted-foreground mb-4">Racha activa: {rachaActiva} día(s)</p>
                    <div className="space-y-4">
                        <div className="rounded-xl border border-border bg-secondary/20 p-4 text-sm text-foreground">
                            Días activos este mes: <strong>{diasActivosMes}</strong>
                        </div>
                        <div className="rounded-xl border border-border bg-secondary/20 p-4 text-sm text-foreground space-y-2">
                            <div className="flex items-center justify-between gap-4">
                                <span>XP mensual</span>
                                <strong>{formatCompactNumber(xpMes)} / {formatCompactNumber(objetivoXpMensual)} ({progresoXpMensual}%)</strong>
                            </div>
                            <div className="w-full h-2 rounded-full overflow-hidden bg-secondary">
                                <div className={`h-full rounded-full bg-gradient-to-r ${accent.progress}`} style={{ width: `${progresoXpMensual}%` }} />
                            </div>
                        </div>
                        <div className="rounded-xl border border-border bg-secondary/20 p-4 text-sm text-foreground">
                            Monedas obtenidas este mes: <strong>{formatCompactNumber(monedasMes)}</strong>
                        </div>
                    </div>
                </div>

                {insignias.length > 0 && (
                    <div className="bg-card rounded-3xl shadow-xl border border-border p-6 sm:p-8">
                        <h3 className="text-xl font-black text-foreground mb-6">🏅 Insignias Dinámicas</h3>
                        <div className="flex flex-wrap gap-2">
                            {insignias.map(ins => (
                                <Badge key={ins} variant="secondary" className="text-xs sm:text-sm font-bold px-3 py-1.5">
                                    {ins}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {(marcosComprados.length > 0 || consumiblesComprados.length > 0 || boostsActivos.length > 0) && (
                    <div className="bg-card rounded-3xl shadow-xl border border-border p-6 sm:p-8">
                        <h3 className="text-xl font-black text-foreground mb-6">🧪 Compras Especiales</h3>
                        <div className="space-y-4 text-sm text-foreground">
                            {boostsActivos.length > 0 && (
                                <div className="rounded-xl border border-border bg-secondary/20 p-4">
                                    <p className="text-xs font-black uppercase tracking-wider text-primary mb-2">Efectos activos</p>
                                    <ul className="space-y-1">
                                        {boostsActivos.map((b) => <li key={b}>• {b}</li>)}
                                    </ul>
                                </div>
                            )}

                            {consumiblesComprados.length > 0 && (
                                <div className="rounded-xl border border-border bg-secondary/20 p-4">
                                    <p className="text-xs font-black uppercase tracking-wider text-primary mb-2">Consumibles / servicios comprados</p>
                                    <div className="flex flex-wrap gap-2">
                                        {consumiblesComprados.map((c) => (
                                            <Badge key={c.item_id} variant="secondary" className="text-xs font-bold px-3 py-1">
                                                {CONSUMIBLE_NOMBRES[c.item_id] || c.item_id} x{c.cantidad}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="rounded-xl border border-border bg-secondary/20 p-4">
                                <p className="text-xs font-black uppercase tracking-wider text-primary mb-2">🎰 Casino Stats</p>
                                {casinoStats.totalBetted === 0 ? (
                                    <p className="text-xs text-muted-foreground italic">Aún no has jugado en el casino. ¡Prueba tu suerte! 🍀</p>
                                ) : (
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div>
                                            <span className="font-bold text-muted-foreground">W-L:</span>{' '}
                                            <span className="font-black text-foreground">{casinoStats.wins}W-{casinoStats.losses}L</span>
                                        </div>
                                        <div>
                                            <span className="font-bold text-muted-foreground">Win Rate:</span>{' '}
                                            <span className="font-black text-foreground">{casinoStats.winRate.toFixed(1)}%</span>
                                        </div>
                                        <div>
                                            <span className="font-bold text-muted-foreground">Apostado:</span>{' '}
                                            <span className="font-black text-foreground">{formatCompactNumber(casinoStats.totalBetted)}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold text-muted-foreground">Ganancia neta:</span>{' '}
                                            <span className={`font-black ${casinoStats.netWinnings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {casinoStats.netWinnings >= 0 ? '+' : ''}{formatCompactNumber(casinoStats.netWinnings)}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {marcosComprados.length > 0 && (
                                <div className="rounded-xl border border-border bg-secondary/20 p-4">
                                    <p className="text-xs font-black uppercase tracking-wider text-primary mb-2">Marcos desbloqueados</p>
                                    <div className="flex flex-wrap gap-2">
                                        {marcosComprados.map((m) => {
                                            const isActivo = marcoPerfil.replace('marco_perfil_', '') === m;
                                            return (
                                                <Badge
                                                    key={m}
                                                    variant={isActivo ? "default" : "secondary"}
                                                    className={`text-xs font-bold px-3 py-1 ${isActivo ? 'bg-primary text-primary-foreground hover:bg-primary' : ''}`}
                                                >
                                                    {isActivo ? 'Activo · ' : ''}{m.replace('_', ' ')}
                                                </Badge>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ==================== MIS COMPANEROS ==================== */}
                {mascotasCompradas.length > 0 && (
                    <div className="bg-card rounded-3xl shadow-xl border border-border p-6 sm:p-8">
                        <h3 className="text-xl font-black text-foreground mb-6 flex items-center gap-2">
                            <PawPrint className="h-5 w-5 text-pink-500" />
                            Mis Companeros Fieles
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {mascotasCompradas.map(m => {
                                const mId = String(m);
                                const nombreBase = mId.replace('mascota_', '');
                                const nombreVisible = mascotaNombresMap.get(mId) || nombreBase;
                                const isActiva = Boolean(mascotaId) && String(mascotaId) === mId;
                                return (
                                    <Badge
                                        key={mId}
                                        variant={isActiva ? "default" : "secondary"}
                                        className={`text-sm font-bold px-4 py-2 ${isActiva ? 'bg-pink-500 text-white hover:bg-pink-500' : ''}`}
                                    >
                                        {isActiva && <PawPrint className="h-3 w-3 mr-1" />} {nombreVisible}
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
                                        ? 'border-yellow-500 bg-yellow-500/10 text-foreground'
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
                                    <div key={slotNum} className={`w-24 h-28 sm:w-32 sm:h-36 rounded-2xl flex flex-col items-center justify-center p-3 text-center border-2 border-dashed transition-colors ${dest ? 'border-amber-400 bg-amber-500/5' : 'border-border bg-secondary/20 opacity-50'}`}>
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
                                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
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
            <Footer embedded />
        </div>
    );
}

export async function generateMetadata({ params }: { params: Promise<{ discordId: string }> }) {
    const { discordId } = await params;
    const db = getDb();
    const profileUrl = `${SITE_URL}/perfil/${discordId}`;
    const profileOgImageUrl = `${SITE_URL}/perfil/${discordId}/opengraph-image`;

    let username: string | null = null;
    try {
        const resUser = await db.execute({
            sql: "SELECT username FROM usuarios WHERE id = ? LIMIT 1",
            args: [discordId]
        });
        if (resUser.rows.length > 0 && resUser.rows[0].username) {
            username = String(resUser.rows[0].username);
        }
    } catch {
        username = null;
    }

    return {
        title: username ? `Perfil de ${username}` : "Perfil usuario",
        description: "Revisa la libretita de este vecinito del pueblito de Heartopia.",
        alternates: {
            canonical: profileUrl,
        },
        openGraph: {
            type: "website",
            url: profileUrl,
            title: username ? `Perfil de ${username}` : "Perfil usuario",
            description: "Revisa la libretita de este vecinito del pueblito de Heartopia.",
            images: [
                {
                    url: profileOgImageUrl,
                    width: 1200,
                    height: 630,
                    alt: username ? `Perfil de ${username}` : "Perfil usuario",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: username ? `Perfil de ${username}` : "Perfil usuario",
            description: "Revisa la libretita de este vecinito del pueblito de Heartopia.",
            images: [profileOgImageUrl],
        },
    };
}
