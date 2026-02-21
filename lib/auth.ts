import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getAdminByUsername, initAdmins } from "./db";


export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.AUTH_SECRET,
    session: { strategy: "jwt" },
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
            name: "Credenciales",
            credentials: {
                username: { label: "Usuario", type: "text" },
                password: { label: "Contraseña", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;

                // Asegura que la tabla y el usuario admin default existan
                // antes de cualquier intento de autenticación
                await initAdmins();

                const admin = await getAdminByUsername(credentials.username as string);
                if (!admin) return null;

                const valid = await bcrypt.compare(
                    credentials.password as string,
                    admin.password_hash as string
                );
                if (!valid) return null;

                return { id: String(admin.id), name: admin.username as string };
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },
        session({ session, token }) {
            if (session.user) session.user.id = token.id as string;
            return session;
        },
    },
});
