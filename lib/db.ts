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
    // __originalId viene del cliente cuando se edita un item cuyo id pudo cambiar
    const originalId = row.__originalId !== undefined ? row.__originalId : undefined;
    const { id, __originalId: _drop, ...fields } = row;
    const keys = Object.keys(fields);
    const values = Object.values(fields) as (string | number | null)[];

    // El id que usamos en WHERE: si hay originalId lo usamos, sino el id actual
    const whereId = originalId ?? id;

    if (whereId !== undefined && whereId !== null && whereId !== "") {
        // UPDATE — incluye `id` en el SET (para poder renombrarlo)
        const allKeys = id !== undefined ? ["id", ...keys] : keys;
        const allValues = id !== undefined ? [id as string | number, ...values] : values;
        const setClause = allKeys.map((k) => `${k} = ?`).join(", ");
        await db.execute({
            sql: `UPDATE ${table} SET ${setClause} WHERE id = ?`,
            args: [...allValues, whereId as string | number],
        });
    } else {
        // INSERT
        const insertKeys = id !== undefined ? ["id", ...keys] : keys;
        const insertValues = id !== undefined
            ? [id as string | number, ...values]
            : values;
        const placeholders = insertKeys.map(() => "?").join(", ");
        await db.execute({
            sql: `INSERT INTO ${table} (${insertKeys.join(", ")}) VALUES (${placeholders})`,
            args: insertValues,
        });
    }
}

export async function deleteRow(table: string, id: string | number) {
    await query(`DELETE FROM ${table} WHERE id = ?`, [id as string]);
}

export async function getTableCounts(): Promise<Record<string, number>> {
    const tables = [
        "peces", "insectos", "aves", "animales", "cultivos",
        "recolectables", "habitantes", "recetas", "logros",
        "codigos", "admins", "configuracion", "admin_logs",
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
