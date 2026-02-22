import { ImageResponse } from "next/og";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://heartopiachile.vercel.app";

export default async function Image({ params }: { params: Promise<{ discordId: string }> }) {
  const { discordId } = await params;
  const db = getDb();

  let username = `Vecino #${discordId.slice(-4)}`;
  let avatarUrl: string | null = null;
  let bannerUrl: string | null = null;
  let nivel = 1;
  let monedas = 0;

  try {
    const resUser = await db.execute({
      sql: "SELECT username, avatar, banner_url, nivel, monedas FROM usuarios WHERE id = ? LIMIT 1",
      args: [discordId],
    });

    if (resUser.rows.length > 0) {
      const user = resUser.rows[0];
      username = user.username ? String(user.username) : username;
      avatarUrl = user.avatar ? String(user.avatar) : null;
      bannerUrl = user.banner_url ? String(user.banner_url) : null;
      nivel = Number(user.nivel || 1);
      monedas = Number(user.monedas || 0);
    }
  } catch {
    // fallback values already set
  }

  const safeAvatar = avatarUrl || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(username)}`;
  const safeBanner = bannerUrl || `${SITE_URL}/annie.jpg`;
  const formatCompact = (value: number) =>
    new Intl.NumberFormat("es-CL", { notation: "compact", maximumFractionDigits: 1 }).format(value);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          fontFamily: "Nunito, sans-serif",
          background: "#111827",
          color: "#ffffff",
        }}
      >
        <img
          src={safeBanner}
          alt="Banner de perfil"
          width={1200}
          height={630}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.25,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(15,23,42,0.92), rgba(88,28,135,0.78))",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            padding: "54px 64px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 760 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 30,
                fontWeight: 800,
                opacity: 0.95,
              }}
            >
              <img
                src={`${SITE_URL}/annie.jpg`}
                alt="Annie"
                width={42}
                height={42}
                style={{ borderRadius: 9999, border: "2px solid rgba(255,255,255,0.4)" }}
              />
              Heartopia Chile Wiki
            </div>

            <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1.05 }}>Perfil de {username}</div>

            <div style={{ display: "flex", gap: 16 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "rgba(255,255,255,0.12)",
                  padding: "12px 18px",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              >
                <span style={{ fontSize: 18, opacity: 0.8 }}>Nivel</span>
                <span style={{ fontSize: 34, fontWeight: 900 }}>{formatCompact(nivel)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "rgba(255,255,255,0.12)",
                  padding: "12px 18px",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              >
                <span style={{ fontSize: 18, opacity: 0.8 }}>Moneditas</span>
                <span style={{ fontSize: 34, fontWeight: 900 }}>{formatCompact(monedas)}</span>
              </div>
            </div>
          </div>

          <div
            style={{
              width: 220,
              height: 220,
              borderRadius: "9999px",
              overflow: "hidden",
              border: "6px solid rgba(255,255,255,0.85)",
              boxShadow: "0 18px 50px rgba(0,0,0,0.38)",
              background: "rgba(255,255,255,0.15)",
            }}
          >
            <img
              src={safeAvatar}
              alt="Avatar"
              width={220}
              height={220}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
