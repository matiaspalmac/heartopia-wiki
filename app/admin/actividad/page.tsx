"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface LogEntry {
    id: number;
    admin: string;
    accion: string;
    tabla: string | null;
    item_id: string | null;
    detalle: string | null;
    fecha: string;
}

const ACCION_VARIANTS: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    agregar: "default",
    editar: "secondary",
    eliminar: "destructive",
    eliminar_admin: "destructive",
    cambiar_contrasena: "outline",
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

    const filtered = useMemo(() => logs.filter((l) =>
        [l.admin, l.accion, l.tabla, l.item_id, l.detalle]
            .some((v) => v && String(v).toLowerCase().includes(filter.toLowerCase()))
    ), [logs, filter]);

    return (
        <div>
            <div className="mb-6">
                <p className="text-xs font-black uppercase tracking-widest text-primary mb-0.5">
                    Auditoria
                </p>
                <h2 className="text-3xl font-black text-foreground">
                    Actividad
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Registro completo de todas las acciones realizadas por los admins.
                </p>
            </div>

            {/* Toolbar */}
            <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Filtrar por admin, accion, tabla..."
                        className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <Button
                    variant="outline"
                    onClick={fetchLogs}
                    className="rounded-xl gap-2"
                >
                    <RefreshCw className="h-4 w-4" />
                    Actualizar
                </Button>
            </div>

            <p className="text-xs text-muted-foreground mb-3">{filtered.length} registros</p>

            <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-secondary/50">
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">Fecha</th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">Admin</th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">Accion</th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">Tabla</th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">Item</th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">Detalle</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                                        <div className="flex justify-center">
                                            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                                        </div>
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground text-sm">
                                        Sin registros todavia
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((log) => (
                                    <tr key={log.id} className="hover:bg-secondary/30 transition-colors">
                                        <td className="px-4 py-3 text-xs text-muted-foreground font-mono whitespace-nowrap">
                                            {new Date(log.fecha).toLocaleString("es-CL")}
                                        </td>
                                        <td className="px-4 py-3 font-bold text-foreground">
                                            {log.admin}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge variant={ACCION_VARIANTS[log.accion] ?? "outline"} className="text-xs">
                                                {log.accion}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-muted-foreground">
                                            {log.tabla ?? "---"}
                                        </td>
                                        <td className="px-4 py-3 text-xs font-mono text-muted-foreground max-w-[100px] truncate">
                                            {log.item_id ?? "---"}
                                        </td>
                                        <td className="px-4 py-3 text-xs text-muted-foreground max-w-[200px] truncate">
                                            {log.detalle ?? "---"}
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
