import React from "react"
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CATEGORIES } from "@/lib/data";
import { Fish, Bug, Bird, PawPrint, Sprout, TreeDeciduous, Trophy, ArrowRight, Sparkles, MapPin, Clock, Users, ChefHat, Calculator } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  peces: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  insectos: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  aves: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  animales: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  cultivos: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  recolectables: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  habitantes: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  recetas: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  logros: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/10 via-primary/5 to-background">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="text-center lg:text-left">
                <Badge variant="secondary" className="mb-6 gap-1.5 px-4 py-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Wiki Completa del Juego
                </Badge>
                <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  Bienvenido a la Wiki de{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Heartopia
                  </span>
                </h1>
                <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl lg:mx-0">
                  Tu guia completa para explorar el pueblito. Encuentra informacion detallada sobre peces, 
                  insectos, aves, animales, cultivos, recolectables, habitantes y recetas.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                  <Link href="/buscar">
                    <Button size="lg" className="gap-2">
                      Explorar Wiki
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/wiki/peces">
                    <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                      <Fish className="h-4 w-4" />
                      Ver Peces
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-transparent blur-2xl" />
                  <Image 
                    src="https://i.imgur.com/vnHksI5.jpeg" 
                    alt="Annie - Cartera de Heartopia"
                    width={400}
                    height={400}
                    className="relative rounded-3xl shadow-2xl border-4 border-card"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b border-border bg-secondary/20 py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-3 gap-4 md:grid-cols-5 lg:grid-cols-9">
              {CATEGORIES.map((cat) => {
                const Icon = iconMap[cat.icon];
                return (
                  <Link
                    key={cat.id}
                    href={`/wiki/${cat.id}`}
                    className="group flex flex-col items-center gap-2 rounded-xl bg-card p-4 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className={`rounded-xl p-3 ${categoryColors[cat.id]}`}>
                      {Icon && <Icon className="h-6 w-6" />}
                    </div>
                    <span className="text-2xl font-bold text-foreground">{cat.count}</span>
                    <span className="text-sm text-muted-foreground">{cat.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Explora las Categorias
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Toda la informacion del juego organizada por categorias para que encuentres lo que buscas rapidamente.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((cat) => {
                const Icon = iconMap[cat.icon];
                return (
                  <Link key={cat.id} href={`/wiki/${cat.id}`}>
                    <Card className="group h-full transition-all hover:shadow-lg hover:-translate-y-1">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className={`rounded-xl p-3 ${categoryColors[cat.id]}`}>
                            {Icon && <Icon className="h-7 w-7" />}
                          </div>
                          <Badge variant="secondary">{cat.count} items</Badge>
                        </div>
                        <CardTitle className="mt-4 text-xl">{cat.name}</CardTitle>
                        <CardDescription>{cat.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm text-primary group-hover:text-primary/80">
                          Ver todos
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-border bg-secondary/20 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Informacion Detallada
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Cada criatura y recurso tiene informacion completa sobre donde encontrarla, 
                cuando aparece y que condiciones necesitas.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">Ubicaciones</h3>
                <p className="text-muted-foreground">
                  Encuentra exactamente donde aparece cada pez, insecto, ave o animal en el mapa del pueblito.
                </p>
              </div>

              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">Horarios y Clima</h3>
                <p className="text-muted-foreground">
                  Conoce el horario exacto y las condiciones climaticas necesarias para encontrar cada criatura.
                </p>
              </div>

              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
                  <Trophy className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">Logros y Titulos</h3>
                <p className="text-muted-foreground">
                  Descubre todos los logros disponibles, sus requisitos y los titulos que desbloquean.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
