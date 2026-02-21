/**
 * wiki-data.ts
 * Funciones async que leen datos desde Turso (misma DB que el bot Annie).
 * Reemplazan el uso síncrono de los objetos exportados por data.ts.
 */

import { query } from "./db";
import {
    PECES, INSECTOS, AVES, ANIMALES, CULTIVOS,
    RECOLECTABLES, HABITANTES, RECETAS, LOGROS, CODIGOS,
    type CategoryId,
} from "./data";

// ─── helpers ────────────────────────────────────────────────────────────────

/** Intenta parsear un campo que pudo guardarse como JSON string */
function safeParse(value: unknown): unknown {
    if (typeof value !== "string") return value;
    try { return JSON.parse(value); } catch { return value; }
}

/** Convierte un array de filas DB en un objeto { nombre: { ...campos } } */
function rowsToObject(rows: Record<string, unknown>[]): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const row of rows) {
        const key = (row.id ?? row.nombre ?? row.codigo) as string;
        if (!key) continue;
        const entry: Record<string, unknown> = {};
        for (const [col, val] of Object.entries(row)) {
            if (col === "id" || col === "nombre" || col === "codigo") continue;
            entry[col] = safeParse(val);
        }
        result[key] = entry;
    }
    return result;
}

// ─── fetchers por categoría ─────────────────────────────────────────────────

export async function getPeces() {
    try {
        const rows = await query("SELECT * FROM peces");
        if (rows.length === 0) return PECES;
        return rowsToObject(rows as Record<string, unknown>[]);
    } catch { return PECES; }
}

export async function getInsectos() {
    try {
        const rows = await query("SELECT * FROM insectos");
        if (rows.length === 0) return INSECTOS;
        return rowsToObject(rows as Record<string, unknown>[]);
    } catch { return INSECTOS; }
}

export async function getAves() {
    try {
        const rows = await query("SELECT * FROM aves");
        if (rows.length === 0) return AVES;
        return rowsToObject(rows as Record<string, unknown>[]);
    } catch { return AVES; }
}

export async function getAnimales() {
    try {
        const rows = await query("SELECT * FROM animales");
        if (rows.length === 0) return ANIMALES;
        return rowsToObject(rows as Record<string, unknown>[]);
    } catch { return ANIMALES; }
}

export async function getCultivos() {
    try {
        const rows = await query("SELECT * FROM cultivos");
        if (rows.length === 0) return CULTIVOS;
        return rowsToObject(rows as Record<string, unknown>[]);
    } catch { return CULTIVOS; }
}

export async function getRecolectables() {
    try {
        const rows = await query("SELECT * FROM recolectables");
        if (rows.length === 0) return RECOLECTABLES;
        return rowsToObject(rows as Record<string, unknown>[]);
    } catch { return RECOLECTABLES; }
}

export async function getHabitantes() {
    try {
        const rows = await query("SELECT * FROM habitantes");
        if (rows.length === 0) return HABITANTES;
        return rowsToObject(rows as Record<string, unknown>[]);
    } catch { return HABITANTES; }
}

export async function getRecetas() {
    try {
        const rows = await query("SELECT * FROM recetas");
        if (rows.length === 0) return RECETAS;
        return rowsToObject(rows as Record<string, unknown>[]);
    } catch { return RECETAS; }
}

export async function getLogros() {
    try {
        const rows = await query("SELECT * FROM logros");
        if (rows.length === 0) return LOGROS;
        return rowsToObject(rows as Record<string, unknown>[]);
    } catch { return LOGROS; }
}

export async function getCodigos() {
    try {
        // La tabla codigos tiene columnas: id (código), recompensas (JSON), fecha_expiracion, activo
        const rows = await query<{
            id: string;
            recompensas: string;
            fecha_expiracion: string | null;
            activo: number;
        }>("SELECT * FROM codigos WHERE activo = 1");

        if (rows.length === 0) return CODIGOS;

        const result: Record<string, unknown> = {};
        for (const row of rows) {
            result[row.id] = {
                status: row.activo ? "active" : "inactive",
                rewards: safeParse(row.recompensas) ?? [],
                expirationDate: row.fecha_expiracion ?? null,
            };
        }
        return result;
    } catch { return CODIGOS; }
}

// ─── dispatcher principal (reemplaza getCategoryData) ────────────────────────

export async function getCategoryDataAsync(categoryId: CategoryId) {
    switch (categoryId) {
        case "peces": return getPeces();
        case "insectos": return getInsectos();
        case "aves": return getAves();
        case "animales": return getAnimales();
        case "cultivos": return getCultivos();
        case "recolectables": return getRecolectables();
        case "habitantes": return getHabitantes();
        case "recetas": return getRecetas();
        case "logros": return getLogros();
        case "codigos": return getCodigos();
        default: return {};
    }
}

/** Devuelve los conteos reales por categoría para la página de inicio */
export async function getCategoryCounts(): Promise<Record<CategoryId, number>> {
    const tables: CategoryId[] = [
        "peces", "insectos", "aves", "animales", "cultivos",
        "recolectables", "habitantes", "recetas", "logros", "codigos",
    ];

    const counts = {} as Record<CategoryId, number>;

    await Promise.all(
        tables.map(async (table) => {
            try {
                const rows = await query<{ c: number }>(`SELECT COUNT(*) as c FROM ${table}`);
                counts[table] = Number(rows[0]?.c ?? 0);
            } catch {
                counts[table] = 0;
            }
        })
    );

    return counts;
}
