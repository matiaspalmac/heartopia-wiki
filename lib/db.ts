import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";

let _db: ReturnType<typeof createClient> | null = null;

export function getDb() {
    if (!_db) {
        const url = process.env.TURSO_DATABASE_URL;
        const authToken = process.env.TURSO_AUTH_TOKEN;
        if (!url || !authToken)
            throw new Error("[DB] Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN");
        _db = createClient({ url, authToken });
    }
    return _db;
}

export async function query<T = Record<string, unknown>>(
    sql: string,
    args: (string | number | null)[] = []
): Promise<T[]> {
    const db = getDb();
    const result = await db.execute({ sql, args });
    return result.rows as unknown as T[];
}

// ─── Admins ──────────────────────────────────────────────────────────────────

/** Crea la tabla admins y la de logs si no existen. NO siembra usuarios. */
export async function initAdmins() {
    const db = getDb();
    await db.execute(`
        CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TEXT DEFAULT (datetime('now'))
        )
    `);
    await db.execute(`
        CREATE TABLE IF NOT EXISTS admin_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            admin TEXT NOT NULL,
            accion TEXT NOT NULL,
            tabla TEXT,
            item_id TEXT,
            detalle TEXT,
            fecha TEXT DEFAULT (datetime('now'))
        )
    `);
}

export async function getAdminByUsername(username: string) {
    const rows = await query<{
        id: number;
        username: string;
        password_hash: string;
        created_at: string;
    }>("SELECT * FROM admins WHERE username = ?", [username]);
    return rows[0] ?? null;
}

export async function getAllAdmins() {
    return query<{ id: number; username: string; created_at: string }>(
        "SELECT id, username, created_at FROM admins ORDER BY id"
    );
}

export async function updateAdminPassword(id: number, password: string) {
    const hash = await bcrypt.hash(password, 12);
    await query("UPDATE admins SET password_hash = ? WHERE id = ?", [hash, id]);
}

export async function deleteAdmin(id: number) {
    await query("DELETE FROM admins WHERE id = ?", [id]);
}

// ─── Audit Log ───────────────────────────────────────────────────────────────

export async function logAction(
    admin: string,
    accion: string,
    tabla?: string,
    item_id?: string,
    detalle?: string
) {
    try {
        await query(
            "INSERT INTO admin_logs (admin, accion, tabla, item_id, detalle) VALUES (?, ?, ?, ?, ?)",
            [admin, accion, tabla ?? null, item_id ?? null, detalle ?? null]
        );
    } catch {
        // No lanzar error si el log falla
    }
}

export async function getRecentLogs(limit = 200) {
    return query<{
        id: number;
        admin: string;
        accion: string;
        tabla: string | null;
        item_id: string | null;
        detalle: string | null;
        fecha: string;
    }>(
        "SELECT * FROM admin_logs ORDER BY fecha DESC LIMIT ?",
        [limit]
    );
}

// ─── Generic CRUD helpers ────────────────────────────────────────────────────

export async function getTableColumns(table: string): Promise<string[]> {
    const rows = await query<{ name: string }>(`PRAGMA table_info(${table})`);
    return rows.map((r) => r.name);
}

export async function getAllRows(table: string) {
    return query(`SELECT * FROM ${table} LIMIT 500`);
}

export async function upsertRow(
    table: string,
    row: Record<string, unknown>
): Promise<void> {
    const db = getDb();
    const pkField = table === "configuracion" ? "clave" : "id";
    // __originalId viene del cliente cuando se edita un item cuyo pk pudo cambiar
    const originalId = row.__originalId !== undefined ? row.__originalId : undefined;
    const { [pkField]: pkValue, __originalId: _drop, ...fields } = row;
    const keys = Object.keys(fields);
    const values = Object.values(fields) as (string | number | null)[];

    // El id que usamos en WHERE: si hay originalId lo usamos, sino el id actual
    const whereId = originalId ?? pkValue;

    if (whereId !== undefined && whereId !== null && whereId !== "") {
        // UPDATE — incluye el primary key en el SET (para poder renombrarlo)
        const allKeys = pkValue !== undefined ? [pkField, ...keys] : keys;
        const allValues = pkValue !== undefined ? [pkValue as string | number, ...values] : values;
        const setClause = allKeys.map((k) => `${k} = ?`).join(", ");
        await db.execute({
            sql: `UPDATE ${table} SET ${setClause} WHERE ${pkField} = ?`,
            args: [...allValues, whereId as string | number],
        });
    } else {
        // INSERT
        const insertKeys = pkValue !== undefined ? [pkField, ...keys] : keys;
        const insertValues = pkValue !== undefined
            ? [pkValue as string | number, ...values]
            : values;
        const placeholders = insertKeys.map(() => "?").join(", ");
        await db.execute({
            sql: `INSERT INTO ${table} (${insertKeys.join(", ")}) VALUES (${placeholders})`,
            args: insertValues,
        });
    }
}

export async function deleteRow(table: string, id: string | number) {
    const pkField = table === "configuracion" ? "clave" : "id";
    await query(`DELETE FROM ${table} WHERE ${pkField} = ?`, [id as string]);
}

export async function getTableCounts(): Promise<Record<string, number>> {
    const tables = [
        "peces", "insectos", "aves", "animales", "cultivos",
        "recolectables", "habitantes", "recetas", "logros",
        "codigos", "admins", "configuracion", "admin_logs",
        "clima", "tienda_items",
    ];
    const counts: Record<string, number> = {};
    await Promise.all(
        tables.map(async (t) => {
            try {
                const rows = await query<{ c: number }>(
                    `SELECT COUNT(*) as c FROM ${t}`
                );
                counts[t] = Number(rows[0]?.c ?? 0);
            } catch { /* tabla puede no existir aún */ }
        })
    );
    return counts;
}

// ─── Analytics ───────────────────────────────────────────────────────────────

export async function getTopUsers(limit = 10) {
    return query<{ id: string; username: string | null; xp: number; nivel: number; monedas: number }>(
        "SELECT id, username, xp, nivel, monedas FROM usuarios ORDER BY xp DESC LIMIT ?",
        [limit]
    );
}

export async function getTopCollectors(limit = 10) {
    return query<{ user_id: string; username: string | null; total_items: number }>(
        "SELECT c.user_id, u.username, COUNT(*) as total_items FROM colecciones c LEFT JOIN usuarios u ON c.user_id = u.id GROUP BY c.user_id ORDER BY total_items DESC LIMIT ?",
        [limit]
    );
}

export async function getTriviaStats() {
    try {
        const total = await query<{ c: number }>("SELECT COUNT(*) as c FROM trivia_stats");
        const respondidas = await query<{ r: number }>("SELECT SUM(Math.min(fue_respondida, 1)) as r FROM trivia_stats"); // SQLite sum of boolean essentially

        // Actually SQLite 1 is true, 0 is false, so sum(fue_respondida) works
        const respondidasRaw = await query<{ r: number }>("SELECT SUM(fue_respondida) as r FROM trivia_stats");

        const topHabitantes = await query<{ habitante: string; veces: number }>(
            "SELECT habitante, COUNT(*) as veces FROM trivia_stats GROUP BY habitante ORDER BY veces DESC LIMIT 5"
        );

        return {
            total: Number(total[0]?.c ?? 0),
            respondidas: Number(respondidasRaw[0]?.r ?? 0),
            topHabitantes
        };
    } catch {
        return { total: 0, respondidas: 0, topHabitantes: [] };
    }
}

