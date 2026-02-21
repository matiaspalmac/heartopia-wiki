"use server";

import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

export async function loginAction(formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
        await signIn("credentials", {
            username,
            password,
            redirectTo: "/admin",
        });
    } catch (err) {
        if (err instanceof AuthError) {
            return { error: "Usuario o contraseña incorrectos" };
        }
        throw err;
    }
}
