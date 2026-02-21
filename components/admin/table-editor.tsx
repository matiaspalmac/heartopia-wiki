"use client";

import { useState, useEffect, useCallback } from "react";

interface TableEditorProps {
    table: string;
}

export function TableEditor({ table }: TableEditorProps) {
    const [rows, setRows] = useState<Record<string, unknown>[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [editingRow, setEditingRow] = useState<Record<string, unknown> | null>(null);
    const [originalId, setOriginalId] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<string | number | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/admin/${table}`);
            if (!res.ok) throw new Error(await res.text());
            const data = await res.json();
            setRows(data.rows ?? []);
            setColumns(data.columns ?? []);
        } catch (e) {
            setError(String(e));
        } finally {
            setLoading(false);
        }
    }, [table]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const filtered = rows.filter((row) =>
        Object.values(row).some((v) =>
            String(v ?? "").toLowerCase().includes(search.toLowerCase())
        )
    );

    function openNew() {
        const empty: Record<string, unknown> = {};
        columns.forEach((c) => { empty[c] = ""; });
        delete empty["id"];
        setEditingRow(empty);
        setShowModal(true);
    }

    function openEdit(row: Record<string, unknown>) {
        setOriginalId(row.id !== undefined ? String(row.id) : null);
        setEditingRow({ ...row });
        setShowModal(true);
    }

    async function handleSave() {
        if (!editingRow) return;
        setSaving(true);
        try {
            const payload = originalId !== null
                ? { ...editingRow, __originalId: originalId }
                : editingRow;
            const res = await fetch(`/api/admin/${table}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error(await res.text());
            setShowModal(false);
            setEditingRow(null);
            await fetchData();
        } catch (e) {
            alert("Error guardando: " + String(e));
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id: string | number) {
        try {
            const res = await fetch(`/api/admin/${table}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            if (!res.ok) throw new Error(await res.text());
            setDeleteConfirm(null);
            await fetchData();
        } catch (e) {
            alert("Error eliminando: " + String(e));
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin h-8 w-8 border-2 border-pink-400 border-t-transparent rounded-full" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-2xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-6 text-red-700 dark:text-red-300">
                <strong>Error:</strong> {error}
                <br />
                <button onClick={fetchData} className="mt-2 text-sm underline">
                    Reintentar
                </button>
            </div>
        );
    }

    const displayCols = columns.filter((c) => c !== "id").slice(0, 5);

    return (
        <div>
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar en la tabla..."
                    className="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-600"
                />
                <button
                    onClick={openNew}
                    className="rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-bold px-5 py-2.5 hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg shadow-pink-200 dark:shadow-pink-950 whitespace-nowrap"
                >
                    + Agregar
                </button>
                <button
                    onClick={fetchData}
                    className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm font-semibold px-4 py-2.5 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
                >
                    ↻ Actualizar
                </button>
            </div>

            <p className="text-xs text-neutral-400 mb-3">
                {filtered.length} de {rows.length} items
            </p>

            {/* Table */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                                {columns.includes("id") && (
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-neutral-400 w-16">
                                        ID
                                    </th>
                                )}
                                {displayCols.map((col) => (
                                    <th
                                        key={col}
                                        className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-neutral-400"
                                    >
                                        {col.replace(/_/g, " ")}
                                    </th>
                                ))}
                                {columns.length > displayCols.length + 1 && (
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-neutral-400">
                                        +{columns.length - displayCols.length - 1} más
                                    </th>
                                )}
                                <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-widest text-neutral-400">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={displayCols.length + 3}
                                        className="px-4 py-12 text-center text-neutral-400 text-sm"
                                    >
                                        No hay resultados
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((row, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-pink-50/30 dark:hover:bg-pink-950/10 transition-colors"
                                    >
                                        {columns.includes("id") && (
                                            <td className="px-4 py-3 text-neutral-400 text-xs font-mono">
                                                {String(row.id ?? "—")}
                                            </td>
                                        )}
                                        {displayCols.map((col) => (
                                            <td key={col} className="px-4 py-3 max-w-[200px]">
                                                <span
                                                    className="block truncate text-neutral-700 dark:text-neutral-300"
                                                    title={String(row[col] ?? "")}
                                                >
                                                    {Array.isArray(row[col])
                                                        ? (row[col] as unknown[]).join(", ")
                                                        : typeof row[col] === "object" && row[col] !== null
                                                            ? JSON.stringify(row[col]).slice(0, 50)
                                                            : String(row[col] ?? "—")}
                                                </span>
                                            </td>
                                        ))}
                                        {columns.length > displayCols.length + 1 && (
                                            <td className="px-4 py-3 text-neutral-400 text-xs">…</td>
                                        )}
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEdit(row)}
                                                    className="rounded-lg border border-neutral-200 dark:border-neutral-700 text-xs font-bold px-3 py-1.5 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                                                >
                                                    ✏️ Editar
                                                </button>
                                                {deleteConfirm === row.id ? (
                                                    <span className="flex gap-1">
                                                        <button
                                                            onClick={() => handleDelete(row.id as string)}
                                                            className="rounded-lg bg-red-500 text-white text-xs font-bold px-3 py-1.5"
                                                        >
                                                            Confirmar
                                                        </button>
                                                        <button
                                                            onClick={() => setDeleteConfirm(null)}
                                                            className="rounded-lg border text-xs font-bold px-2 py-1.5"
                                                        >
                                                            No
                                                        </button>
                                                    </span>
                                                ) : (
                                                    <button
                                                        onClick={() => setDeleteConfirm(row.id as string)}
                                                        className="rounded-lg border border-red-200 dark:border-red-900 text-xs font-bold px-3 py-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                                                    >
                                                        🗑️
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            {showModal && editingRow && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="px-6 py-5 border-b border-neutral-200 dark:border-neutral-800">
                            <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white">
                                {editingRow.id ? "Editar item" : "Agregar item"}
                            </h3>
                            <p className="text-sm text-neutral-400 mt-0.5">Tabla: {table}</p>
                        </div>

                        <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Object.entries(editingRow).map(([key, val]) => (
                                <div key={key} className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                                        {key.replace(/_/g, " ")}
                                        {key === "id" && originalId !== null && (
                                            <span className="ml-1 normal-case font-normal text-neutral-400">(renombrable)</span>
                                        )}
                                    </label>
                                    <textarea
                                        rows={String(val ?? "").length > 80 ? 4 : 2}
                                        value={
                                            typeof val === "object" && val !== null
                                                ? JSON.stringify(val, null, 2)
                                                : String(val ?? "")
                                        }
                                        onChange={(e) =>
                                            setEditingRow({ ...editingRow, [key]: e.target.value })
                                        }
                                        className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-sm font-mono text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end gap-3">
                            <button
                                onClick={() => { setShowModal(false); setEditingRow(null); }}
                                className="rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm font-bold px-5 py-2.5 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-bold px-6 py-2.5 hover:from-pink-600 hover:to-rose-600 transition disabled:opacity-60"
                            >
                                {saving ? "Guardando..." : "Guardar cambios"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
