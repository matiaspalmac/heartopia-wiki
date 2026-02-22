import { ImageResponse } from "next/og";
import { query } from "@/lib/db";

export const runtime = "nodejs";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://heartopiachile.vercel.app";

export default async function Image() {
  const resEvento = await query<{
    titulo: string;
    descripcion: string;
    meta_monedas: number;
    progreso_monedas: number;
  }>(
    "SELECT titulo, descripcion, meta_monedas, progreso_monedas FROM eventos_globales WHERE activo = 1 LIMIT 1"
  );

  const evento = resEvento[0] ?? null;
  const progreso = evento
    ? Math.min(100, Math.floor((Number(evento.progreso_monedas) / Math.max(1, Number(evento.meta_monedas))) * 100))
    : 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #1e1b4b 0%, #5b21b6 55%, #0f766e 100%)",
          fontFamily: "Nunito, sans-serif",
          color: "white",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.12), transparent 35%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "52px 60px",
            gap: 24,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 760, gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img
                src={`${SITE_URL}/annie.jpg`}
                alt="Annie"
                width={48}
                height={48}
                style={{ borderRadius: 9999, border: "2px solid rgba(255,255,255,0.55)" }}
              />
              <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: 0.2 }}>Heartopia Chile Wiki</div>
            </div>

            <div style={{ fontSize: 66, fontWeight: 900, lineHeight: 1.04 }}>
              La guía comunitaria más completa de Heartopia
            </div>

            {evento ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 6,
                  background: "rgba(255,255,255,0.14)",
                  border: "1px solid rgba(255,255,255,0.24)",
                  borderRadius: 18,
                  padding: "14px 16px",
                  gap: 8,
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 800 }}>📢 {evento.titulo}</div>
                <div style={{ fontSize: 16, opacity: 0.9, maxWidth: 680 }}>
                  {String(evento.descripcion).slice(0, 140)}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 360,
                      height: 14,
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.25)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${progreso}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #fde047, #f59e0b)",
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 800 }}>{progreso}%</div>
                </div>
              </div>
            ) : (
              <div style={{ fontSize: 24, fontWeight: 700, opacity: 0.95 }}>
                Peces · Insectos · Aves · Animales · Cultivos · Logros
              </div>
            )}
          </div>

          <div
            style={{
              width: 230,
              minWidth: 230,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 14,
            }}
          >
            <img
              src={`${SITE_URL}/annie.jpg`}
              alt="Annie"
              width={190}
              height={190}
              style={{
                borderRadius: 28,
                objectFit: "cover",
                border: "4px solid rgba(255,255,255,0.8)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
              }}
            />
            <div style={{ fontSize: 18, fontWeight: 800, textAlign: "center", opacity: 0.95 }}>
              heartopiachile.vercel.app
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
