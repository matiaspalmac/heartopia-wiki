"use client";

import { useState, useEffect, useCallback } from "react";

interface LogEntry {
    id: number;
    admin: string;
    accion: string;
    tabla: string | null;
    item_id: string | null;
    detalle: string | null;
    fecha: string;
}

const ACCION_COLORS: Record<string, string> = {
    agregar: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    editar: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    eliminar: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    eliminar_admin: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    cambiar_contraseña: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
};

const ACCION_ICONS: Record<string, string> = {
    agregar: "✅",
    editar: "✏️",
    eliminar: "🗑️",
    eliminar_admin: "🗑️",
    cambiar_contraseña: "🔑",
};

export default function ActividadPage() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("");

    const fetchLogs = useCallback(async () => {
        setLoading(true);
        const res = await fetch("/api/admin/actividad");
        const data = await res.json();
        setLogs(data.logs ?? []);
        setLoading(false);
    }, []);

    useEffect(() => { fetchLogs(); }, [fetchLogs]);

    const filtered = logs.filter((l) =>
        [l.admin, l.accion, l.tabla, l.item_id, l.detalle]
            .some((v) => v && String(v).toLowerCase().includes(filter.toLowerCase()))
    );

    return (
        <div>
            <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-pink-500 mb-0.5">
                    Auditoría
                </p>
                <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
                    Actividad
                </h2>
                <p className="text-sm text-neutral-400 mt-1">
                    Registro completo de todas las acciones realizadas por los admins.
                </p>
            </div>

            {/* Toolbar */}
            <div className="flex gap-3 mb-4">
                <input
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Filtrar por admin, acción, tabla..."
                    className="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <button
                    onClick={fetchLogs}
                    className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm font-semibold px-4 py-2.5 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
                >
                    ↻ Actualizar
                </button>
            </div>

            <p className="text-xs text-neutral-400 mb-3">{filtered.length} registros</p>

            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-neutral-400">Fecha</th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-neutral-400">Admin</th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-neutral-400">Acción</th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-neutral-400">Tabla</th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-neutral-400">Item</th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-neutral-400">Detalle</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-12 text-center text-neutral-400">
                                        <div className="flex justify-center">
                                            <div className="animate-spin h-6 w-6 border-2 border-pink-400 border-t-transparent rounded-full" />
                                        </div>
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-12 text-center text-neutral-400 text-sm">
                                        Sin registros todavía
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((log) => (
                                    <tr key={log.id} className="hover:bg-pink-50/20 dark:hover:bg-pink-950/10 transition-colors">
                                        <td className="px-4 py-3 text-xs text-neutral-400 font-mono whitespace-nowrap">
                                            {new Date(log.fecha).toLocaleString("es-CL")}
                                        </td>
                                        <td className="px-4 py-3 font-bold text-neutral-700 dark:text-neutral-300">
                                            {log.admin}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${ACCION_COLORS[log.accion] ?? "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"}`}>
                                                {ACCION_ICONS[log.accion] ?? "•"} {log.accion}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-neutral-500">
                                            {log.tabla ?? "—"}
                                        </td>
                                        <td className="px-4 py-3 text-xs font-mono text-neutral-500 max-w-[100px] truncate">
                                            {log.item_id ?? "—"}
                                        </td>
                                        <td className="px-4 py-3 text-xs text-neutral-400 max-w-[200px] truncate">
                                            {log.detalle ?? "—"}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
