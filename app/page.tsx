import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CATEGORIES } from "@/lib/data";
import { query } from "@/lib/db";
import {
  Fish,
  Bug,
  Bird,
  PawPrint,
  Sprout,
  TreeDeciduous,
  Trophy,
  ArrowRight,
  Sparkles,
  Users,
  ChefHat,
  Calculator,
  Gift,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Fish,
  Bug,
  Bird,
  Paw: PawPrint,
  Leaf: Sprout,
  TreeDeciduous,
  Trophy,
  Users,
  ChefHat,
  Calculator,
  Gift,
};

const categoryColors: Record<string, string> = {
  peces: "bg-blue-500/10 text-blue-600 border-blue-200",
  insectos: "bg-amber-500/10 text-amber-600 border-amber-200",
  aves: "bg-sky-500/10 text-sky-600 border-sky-200",
  animales: "bg-orange-500/10 text-orange-600 border-orange-200",
  cultivos: "bg-green-500/10 text-green-600 border-green-200",
  habitantes: "bg-pink-500/10 text-pink-600 border-pink-200",
  recetas: "bg-rose-500/10 text-rose-600 border-rose-200",
  logros: "bg-purple-500/10 text-purple-600 border-purple-200",
};

export const revalidate = 60;

export default async function HomePage() {
  // Fetch F13 Active Event and Top Donators
  const resEvento = await query<{
    id: number;
    titulo: string;
    descripcion: string;
    meta_monedas: number;
    progreso_monedas: number;
  }>("SELECT id, titulo, descripcion, meta_monedas, progreso_monedas FROM eventos_globales WHERE activo = 1 LIMIT 1");

  const eventoActivo = resEvento.length > 0 ? resEvento[0] : null;

  let topDonadores: { user_id: string; cantidad: number; username: string | null; avatar: string | null }[] = [];
  if (eventoActivo) {
    topDonadores = await query<{ user_id: string; cantidad: number; username: string | null; avatar: string | null }>(
      "SELECT c.user_id, c.cantidad, u.username, u.avatar FROM evento_donaciones c LEFT JOIN usuarios u ON c.user_id = u.id WHERE c.evento_id = ? ORDER BY c.cantidad DESC LIMIT 5",
      [eventoActivo.id]
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main>
        <section className="relative overflow-hidden pt-8 pb-24 md:pt-16 md:pb-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
          <div className="absolute -top-24 right-0 -z-10 h-[500px] w-[500px] bg-accent/10 blur-[120px] rounded-full" />

          <div className="mx-auto max-w-7xl px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="text-center lg:text-left space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="space-y-4">
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Proyecto de la Comunidad Heartopia Chile
                  </Badge>

                  <div className="flex items-center justify-center lg:justify-start gap-2 text-[10px] uppercase tracking-widest font-black text-muted-foreground/60">
                    <ShieldCheck className="h-3 w-3" />
                    Sitio no oficial hecho por fans
                  </div>
                </div>

                <h1 className="text-5xl font-black tracking-tight text-foreground md:text-7xl lg:leading-[1.1]">
                  El corazón de <br />
                  <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
                    Heartopia Chile
                  </span>
                </h1>

                <p className="mx-auto lg:mx-0 max-w-xl text-lg text-muted-foreground leading-relaxed">
                  Bienvenido a la Wiki independiente creada por{" "}
                  <strong>nuestra comunidad</strong>. Centralizamos la
                  información para que ningún vecino se pierda de nada.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Button
                    size="lg"
                    className="h-14 px-8 rounded-2xl gap-2 text-base font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105"
                    asChild
                  >
                    <Link href="/buscar">
                      Explorar la Wiki <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 rounded-2xl gap-2 text-base font-bold border-2 bg-background/50 backdrop-blur-sm"
                    asChild
                  >
                    <a
                      href="https://discord.gg/wnkBUBbaRW"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Unirse al Discord
                    </a>
                  </Button>
                </div>

                <div className="flex items-center justify-center lg:justify-start pt-6">
                  <div className="group relative flex flex-col sm:flex-row items-center gap-4 p-2 pr-6 rounded-[2rem] bg-background/40 backdrop-blur-md border border-primary/20 shadow-lg hover:shadow-primary/10 transition-all duration-300">
                    <div className="relative h-20 w-32 sm:h-16 sm:w-28 shrink-0 overflow-hidden rounded-2xl border-2 border-primary/30 shadow-inner">
                      <Image
                        src="/dei.jpg"
                        alt="Dei"
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <div className="flex flex-col items-center sm:items-start">
                      <p className="text-sm md:text-base text-muted-foreground">
                        Hecho con ❤️ por{" "}
                        <span className="text-foreground font-black text-lg bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                          Dei
                        </span>
                      </p>
                    </div>
                    <div className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-primary h-4 w-4 rounded-full blur-lg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative group w-full max-w-[600px]">
                  <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-tr from-primary to-accent opacity-30 blur-2xl group-hover:opacity-50 transition-opacity" />
                  <div className="relative overflow-hidden rounded-[2rem] border-4 md:border-8 border-background shadow-2xl transition-all duration-500 group-hover:rotate-1 aspect-video">
                    <Image
                      src="/hero.png"
                      alt="Comunidad Heartopia Chile"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* F13 - Widget Evento Global / Junta de Vecinos */}
        {eventoActivo && (
          <section className="py-8 bg-amber-500/10 border-y border-amber-500/20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay" />
            <div className="mx-auto max-w-4xl px-4 relative z-10 flex flex-col items-center">
              <Badge variant="outline" className="bg-amber-500 text-white border-none mb-3 px-3 py-1 text-xs uppercase tracking-widest font-black shadow-lg">
                📢 Proyecto de la Junta de Vecinos
              </Badge>
              <h2 className="text-3xl md:text-5xl font-black text-amber-600 dark:text-amber-500 text-center mb-2 drop-shadow-sm">
                {eventoActivo.titulo}
              </h2>
              <p className="text-muted-foreground text-center mb-8 max-w-2xl text-lg">
                {eventoActivo.descripcion}
              </p>

              <div className="w-full bg-background/80 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-amber-200 dark:border-amber-900/50">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Progreso Actual</p>
                    <p className="text-4xl font-black text-foreground">
                      {eventoActivo.progreso_monedas.toLocaleString()}{" "}
                      <span className="text-xl text-amber-500">/ {eventoActivo.meta_monedas.toLocaleString()} 💰</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-amber-500">
                      {Math.min(100, Math.floor((eventoActivo.progreso_monedas / eventoActivo.meta_monedas) * 100))}%
                    </p>
                  </div>
                </div>

                <div className="h-6 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden border border-neutral-300 dark:border-neutral-700 shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-1000 relative"
                    style={{ width: `${Math.min(100, (eventoActivo.progreso_monedas / eventoActivo.meta_monedas) * 100)}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 w-full animate-pulse" />
                  </div>
                </div>

                {topDonadores.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-border/50">
                    <p className="text-center text-sm font-black uppercase tracking-widest text-muted-foreground mb-4">
                      🏆 Salón de la Fama (Mayores Aportes)
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {topDonadores.map((donador, idx) => (
                        <Link href={`/perfil/${donador.user_id}`} key={donador.user_id} className="bg-background border shadow-sm rounded-xl px-4 py-2 flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer group hover:border-amber-300">
                          <span className="text-xl -mt-1">{idx === 0 ? '👑' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '⭐'}</span>
                          <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-amber-100 group-hover:border-amber-300 transition-colors bg-neutral-100 shrink-0">
                            {donador.avatar ? (
                              <img src={donador.avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                              <Image
                                src={`https://api.dicebear.com/7.x/identicon/svg?seed=${donador.username || donador.user_id}&backgroundColor=fce4ec&rowColor=ec407a`}
                                alt="Vecino Avatar Placeholder"
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold truncate max-w-[120px] transition-all group-hover:text-amber-600">
                              {donador.username ? `@${donador.username}` : `#${donador.user_id.slice(-4)}`}
                            </span>
                            <span className="text-[10px] text-amber-600 font-bold tracking-tight">{donador.cantidad.toLocaleString()} 💰</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-6 text-center">
                  <p className="text-xs text-muted-foreground font-medium">Usa <code className="bg-muted px-1 py-0.5 rounded text-amber-600">/aportar</code> en Discord para sumar tu granito de arena.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="py-8 bg-secondary/10 border-y border-border/50 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm font-black uppercase tracking-tighter text-primary">
                Nuestra Base de Datos
              </p>
              <p className="text-xs text-muted-foreground">
                Documentando cada secreto del pueblito
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORIES.map((cat) => {
                const Icon = iconMap[cat.icon];
                return (
                  <Link
                    key={cat.id}
                    href={`/wiki/${cat.id}`}
                    className="flex items-center gap-3 px-4 py-2 rounded-full bg-background border border-border shadow-sm transition-all hover:border-primary hover:-translate-y-1"
                  >
                    <div
                      className={`p-1.5 rounded-full ${categoryColors[cat.id]?.split(" ")[0]}`}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                    </div>
                    <span className="text-sm font-bold">{cat.count}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-16 space-y-4 text-center">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                Biblioteca Comunitaria
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Toda la información ha sido recolectada y verificada por los
                jugadores de <strong>Heartopia Chile</strong>.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((cat) => {
                const Icon = iconMap[cat.icon];
                return (
                  <Link key={cat.id} href={`/wiki/${cat.id}`}>
                    <Card className="group h-full border-2 border-transparent bg-card/50 transition-all hover:border-primary/20 hover:bg-card hover:shadow-2xl overflow-hidden">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div
                            className={`rounded-2xl p-4 border shadow-inner ${categoryColors[cat.id]}`}
                          >
                            {Icon && <Icon className="h-8 w-8" />}
                          </div>
                          <Badge
                            variant="outline"
                            className="font-mono bg-background/50"
                          >
                            {cat.count} ITEMS
                          </Badge>
                        </div>
                        <CardTitle className="mt-6 text-2xl font-black group-hover:text-primary transition-colors">
                          {cat.name}
                        </CardTitle>
                        <CardDescription className="text-base line-clamp-2">
                          {cat.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm font-bold text-primary group-hover:translate-x-2 transition-transform">
                          Ver guía completa
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="rounded-[3rem] bg-primary p-8 md:p-16 text-primary-foreground text-center relative overflow-hidden shadow-2xl shadow-primary/20">
              <div className="absolute top-0 right-0 p-8 opacity-20 rotate-12">
                <Users className="h-40 w-40" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10">
                ¿Falta información?
              </h2>
              <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto relative z-10">
                Esta wiki crece gracias a ti. Si encontraste un pez nuevo o un
                horario diferente, únete a nuestro Discord y ayúdanos a
                completar la guía más grande de Chile.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="h-14 px-10 rounded-2xl font-black text-lg hover:scale-110 transition-transform shadow-xl"
                asChild
              >
                <a
                  href="https://discord.gg/wnkBUBbaRW"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ¡Quiero Colaborar!
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-col items-center p-8 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-center">
              <ShieldCheck className="h-8 w-8 text-muted-foreground mb-4" />
              <h3 className="text-sm font-black uppercase tracking-widest mb-2">
                Información Legal y Afiliación
              </h3>
              <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
                Heartopia Chile Wiki es un sitio web independiente operado por
                fans. <br className="hidden md:block" />
                No estamos afiliados, asociados, autorizados ni respaldados por{" "}
                <strong>XD Interactive Entertainment Co., Ltd.</strong> o sus
                socios. Heartopia es una marca registrada de XD Interactive.
              </p>
              <div className="mt-4 flex gap-4">
                <a
                  href="https://heartopia.xd.com"
                  target="_blank"
                  className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
                >
                  Visitar sitio oficial de Heartopia{" "}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
