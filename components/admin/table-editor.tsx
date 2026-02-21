"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Search, Plus, RefreshCw, Pencil, Trash2, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TableEditorProps {
    table: string;
}

const ROWS_PER_PAGE = 50;

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
    const [page, setPage] = useState(0);

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

    const pkField = table === "configuracion" ? "clave" : "id";

    const filtered = useMemo(() =>
        rows.filter((row) =>
            Object.values(row).some((v) =>
                String(v ?? "").toLowerCase().includes(search.toLowerCase())
            )
        ), [rows, search]);

    const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
    const paginatedRows = useMemo(() =>
        filtered.slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE),
        [filtered, page]);

    useEffect(() => { setPage(0); }, [search]);

    function openNew() {
        const empty: Record<string, unknown> = {};
        columns.forEach((c) => { empty[c] = ""; });
        delete empty[pkField];
        setOriginalId(null);
        setEditingRow(empty);
        setShowModal(true);
    }

    function openEdit(row: Record<string, unknown>) {
        setOriginalId(row[pkField] !== undefined ? String(row[pkField]) : null);
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
                <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-2xl bg-destructive/10 border border-destructive/20 p-6 text-destructive">
                <strong>Error:</strong> {error}
                <br />
                <button onClick={fetchData} className="mt-2 text-sm underline">
                    Reintentar
                </button>
            </div>
        );
    }

    const displayCols = columns.filter((c) => c !== pkField).slice(0, 5);

    return (
        <div>
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar en la tabla..."
                        className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <Button onClick={openNew} className="rounded-xl gap-2 shadow-md shadow-primary/20">
                    <Plus className="h-4 w-4" />
                    Agregar
                </Button>
                <Button
                    variant="outline"
                    onClick={fetchData}
                    className="rounded-xl gap-2"
                >
                    <RefreshCw className="h-4 w-4" />
                    Actualizar
                </Button>
            </div>

            <p className="text-xs text-muted-foreground mb-3">
                {filtered.length} de {rows.length} items
                {totalPages > 1 && ` - Pagina ${page + 1} de ${totalPages}`}
            </p>

            {/* Table */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-secondary/50">
                                {columns.includes(pkField) && (
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground w-16">
                                        {pkField.toUpperCase()}
                                    </th>
                                )}
                                {displayCols.map((col) => (
                                    <th
                                        key={col}
                                        className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground"
                                    >
                                        {col.replace(/_/g, " ")}
                                    </th>
                                ))}
                                {columns.length > displayCols.length + 1 && (
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        +{columns.length - displayCols.length - 1} mas
                                    </th>
                                )}
                                <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {paginatedRows.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={displayCols.length + 3}
                                        className="px-4 py-12 text-center text-muted-foreground text-sm"
                                    >
                                        No hay resultados
                                    </td>
                                </tr>
                            ) : (
                                paginatedRows.map((row, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-secondary/30 transition-colors"
                                    >
                                        {columns.includes(pkField) && (
                                            <td className="px-4 py-3 text-muted-foreground text-xs font-mono">
                                                {String(row[pkField] ?? "")}
                                            </td>
                                        )}
                                        {displayCols.map((col) => (
                                            <td key={col} className="px-4 py-3 max-w-[200px]">
                                                <span
                                                    className="block truncate text-foreground"
                                                    title={String(row[col] ?? "")}
                                                >
                                                    {Array.isArray(row[col])
                                                        ? (row[col] as unknown[]).join(", ")
                                                        : typeof row[col] === "object" && row[col] !== null
                                                            ? JSON.stringify(row[col]).slice(0, 50)
                                                            : String(row[col] ?? "")}
                                                </span>
                                            </td>
                                        ))}
                                        {columns.length > displayCols.length + 1 && (
                                            <td className="px-4 py-3 text-muted-foreground text-xs">...</td>
                                        )}
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => openEdit(row)}
                                                    className="rounded-lg gap-1.5 h-8"
                                                >
                                                    <Pencil className="h-3 w-3" />
                                                    Editar
                                                </Button>
                                                {deleteConfirm === row[pkField] ? (
                                                    <span className="flex gap-1">
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() => handleDelete(row[pkField] as string)}
                                                            className="rounded-lg h-8"
                                                        >
                                                            Confirmar
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => setDeleteConfirm(null)}
                                                            className="rounded-lg h-8"
                                                        >
                                                            No
                                                        </Button>
                                                    </span>
                                                ) : (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setDeleteConfirm(row[pkField] as string)}
                                                        className="rounded-lg h-8 text-destructive border-destructive/30 hover:bg-destructive/10"
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
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

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(p => Math.max(0, p - 1))}
                        disabled={page === 0}
                        className="rounded-lg"
                    >
                        Anterior
                    </Button>
                    <span className="text-sm text-muted-foreground px-3">
                        {page + 1} / {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                        disabled={page >= totalPages - 1}
                        className="rounded-lg"
                    >
                        Siguiente
                    </Button>
                </div>
            )}

            {/* Edit Modal */}
            {showModal && editingRow && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-card rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border">
                        <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-black text-foreground">
                                    {editingRow[pkField] ? "Editar item" : "Agregar item"}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-0.5">Tabla: {table}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => { setShowModal(false); setEditingRow(null); }}
                                className="rounded-xl"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Object.entries(editingRow).map(([key, val]) => (
                                <div key={key} className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        {key.replace(/_/g, " ")}
                                        {key === pkField && originalId !== null && (
                                            <span className="ml-1 normal-case font-normal text-muted-foreground/60">(renombrable)</span>
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
                                        className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
                            <Button
                                variant="outline"
                                onClick={() => { setShowModal(false); setEditingRow(null); }}
                                className="rounded-xl"
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleSave}
                                disabled={saving}
                                className="rounded-xl gap-2 shadow-md shadow-primary/20"
                            >
                                <Save className="h-4 w-4" />
                                {saving ? "Guardando..." : "Guardar cambios"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
