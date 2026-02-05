"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CATEGORIES } from "@/lib/data";
import {
  Fish,
  Bug,
  Bird,
  PawPrint,
  Sprout,
  TreeDeciduous,
  Trophy,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
  Users,
  ChefHat,
  Calculator,
  Gift,
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

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
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
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Proyecto Oficial - Comunidad Heartopia Chile
                </Badge>

                <h1 className="text-5xl font-black tracking-tight text-foreground md:text-7xl lg:leading-[1.1]">
                  El corazón de <br />
                  <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
                    Heartopia Chile
                  </span>
                </h1>

                <p className="mx-auto lg:mx-0 max-w-xl text-lg text-muted-foreground leading-relaxed">
                  Bienvenido a la Wiki creada por{" "}
                  <strong>nuestra comunidad</strong>. Centralizamos toda la
                  información del pueblito para que ningún vecino se pierda de
                  nada.
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

                <div className="flex items-center justify-center lg:justify-start gap-3 pt-4">
                  <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-secondary/50 border border-border">
                    <div className="h-10 w-10 rounded-full border-2 border-primary overflow-hidden bg-primary/20 flex items-center justify-center shadow-sm">
                      <Image
                        src="https://imgur.com/7fGFJuW.png"
                        alt="Dei Avatar"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Creado con ❤️ por{" "}
                      <span className="text-foreground font-bold">Dei</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative flex justify-center lg:justify-end">
                <div className="relative group w-full max-w-[600px]">
                  <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-tr from-primary to-accent opacity-30 blur-2xl group-hover:opacity-50 transition-opacity" />
                  <div className="relative overflow-hidden rounded-[2rem] border-4 md:border-8 border-background shadow-2xl transition-all duration-500 group-hover:rotate-1 aspect-video">
                    <Image
                      src="https://i.imgur.com/ABOqdM6.jpeg"
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
        <section className="py-24 bg-secondary/30 dark:bg-secondary/10">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
              <div className="space-y-4 text-center md:text-left">
                <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1">
                  Actualizaciones oficiales
                </Badge>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
                  Novedades de <span className="text-primary">Heartopia</span>
                </h2>
              </div>

              <Button
                variant="outline"
                className="rounded-xl gap-2 border-primary/20 hover:bg-primary/5"
                asChild
              >
                <a
                  href="https://x.com/MyHeartopia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Seguir en X.com
                </a>
              </Button>
            </div>

            <div className="relative rounded-[2.5rem] border-4 border-white dark:border-zinc-900 shadow-2xl overflow-hidden bg-white dark:bg-zinc-950 min-h-[600px]">
              <div className="p-4 md:p-8">
                {isLoaded ? (
                  <>
                    <a
                      className="twitter-timeline"
                      data-height="600"
                      data-theme="light"
                      data-chrome="nofooter noborders transparent"
                      href="https://twitter.com/MyHeartopia?ref_src=twsrc%5Etfw"
                    >
                      Cargando noticias mágicas...
                    </a>
                    <Script
                      src="https://platform.twitter.com/widgets.js"
                      strategy="lazyOnload"
                    />
                  </>
                ) : (
                  <div className="h-[600px] flex flex-col items-center justify-center text-muted-foreground gap-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    <p className="italic font-medium">
                      Conectando con Heartopia...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 mb-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="rounded-[3rem] bg-primary p-8 md:p-16 text-primary-foreground text-center relative overflow-hidden">
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
      </main>

      <Footer />
    </div>
  );
}
