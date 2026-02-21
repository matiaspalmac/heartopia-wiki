import { auth } from "@/lib/auth";
import { getRecentLogs } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    const logs = await getRecentLogs(300);
    return NextResponse.json({ logs });
}
