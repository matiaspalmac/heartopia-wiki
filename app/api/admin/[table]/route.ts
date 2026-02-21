import { auth } from "@/lib/auth";
import { initAdmins, getAllRows, upsertRow, deleteRow, getTableColumns, logAction } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

async function requireSession() {
    const session = await auth();
    if (!session) return { error: NextResponse.json({ error: "No autorizado" }, { status: 401 }), session: null };
    return { error: null, session };
}

const ALLOWED_TABLES = [
    "peces", "insectos", "aves", "animales", "cultivos",
    "recolectables", "habitantes", "recetas", "logros", "codigos", "configuracion",
    "clima", "eventos_globales", "usuarios", "tienda_items", "evento_donaciones"
];

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ table: string }> }
) {
    const { error, session } = await requireSession();
    if (error) return error;

    const { table } = await params;
    if (!ALLOWED_TABLES.includes(table))
        return NextResponse.json({ error: "Tabla no permitida" }, { status: 403 });

    try {
        await initAdmins();
        const rows = await getAllRows(table);
        const columns = await getTableColumns(table);
        return NextResponse.json({ rows, columns });
    } catch (e: unknown) {
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ table: string }> }
) {
    const { error, session } = await requireSession();
    if (error) return error;

    const { table } = await params;
    if (!ALLOWED_TABLES.includes(table))
        return NextResponse.json({ error: "Tabla no permitida" }, { status: 403 });

    try {
        const body = await req.json();
        const pkField = table === "configuracion" ? "clave" : "id";
        const pkValue = body.__originalId !== undefined ? body.__originalId : body[pkField];
        const isEdit = pkValue !== undefined && pkValue !== null && pkValue !== "";

        await upsertRow(table, body);
        await logAction(
            session!.user?.name ?? "desconocido",
            isEdit ? "editar" : "agregar",
            table,
            String(pkValue ?? body.nombre ?? ""),
            isEdit ? `Editó item ${pkValue}` : `Agregó nuevo item`
        );
        return NextResponse.json({ ok: true });
    } catch (e: unknown) {
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ table: string }> }
) {
    const { error, session } = await requireSession();
    if (error) return error;

    const { table } = await params;
    if (!ALLOWED_TABLES.includes(table))
        return NextResponse.json({ error: "Tabla no permitida" }, { status: 403 });

    try {
        const { id } = await req.json();
        await deleteRow(table, id);
        await logAction(
            session!.user?.name ?? "desconocido",
            "eliminar",
            table,
            String(id),
            `Eliminó item ${id}`
        );
        return NextResponse.json({ ok: true });
    } catch (e: unknown) {
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }
}
