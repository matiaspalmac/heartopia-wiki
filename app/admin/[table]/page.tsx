import { redirect } from "next/navigation";
import { TableEditor } from "@/components/admin/table-editor";

const ALLOWED = [
    "peces", "insectos", "aves", "animales", "cultivos", "recolectables", "habitantes", "recetas", "logros", "codigos", "tienda_items", "clima", "configuracion", "usuarios", "eventos_globales"
];

const TABLE_LABELS: Record<string, string> = {
    peces: "🐟 Peces",
    insectos: "🦋 Insectos",
    aves: "🦅 Aves",
    animales: "🦊 Animales",
    cultivos: "🌾 Cultivos",
    recolectables: "🌿 Recolectables",
    habitantes: "👥 Habitantes",
    recetas: "🍳 Recetas",
    logros: "🏆 Logros",
    codigos: "🎁 Códigos",
    tienda_items: "🛒 Tienda",
    clima: "🌦️ Clima",
    configuracion: "⚙️ Configuración",
    usuarios: "👥 Vecinos (Discord)",
    eventos_globales: "🌍 Eventos Globales"
};

interface PageProps {
    params: Promise<{ table: string }>;
}

export default async function TablePage({ params }: PageProps) {
    const { table } = await params;
    if (!ALLOWED.includes(table)) redirect("/admin");

    return (
        <div>
            <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-pink-500 mb-0.5">
                    Base de datos
                </p>
                <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
                    {TABLE_LABELS[table] ?? table}
                </h2>
            </div>
            <TableEditor table={table} />
        </div>
    );
}

export function generateStaticParams() {
    return ALLOWED.map((t) => ({ table: t }));
}
