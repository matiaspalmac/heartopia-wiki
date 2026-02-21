import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import { initAdmins } from "@/lib/db";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    if (!session) redirect("/login");

    await initAdmins();

    return (
        <div className="min-h-screen bg-background flex">
            <AdminSidebar
                userName={session.user?.name ?? "Admin"}
                signOutAction={async () => {
                    "use server";
                    await signOut({ redirectTo: "/login" });
                }}
            />

            <main className="flex-1 min-w-0 overflow-y-auto p-6 md:p-8 lg:ml-64">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
