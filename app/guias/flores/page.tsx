"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WikiBreadcrumbs } from "@/components/wiki-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Flower2, 
  ArrowLeft, 
  Sparkles, 
  ExternalLink, 
  Droplets,
  Star,
  Twitter,
  Info
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const FLOWER_STEPS = [
  {
    title: "1. Conceptos Básicos",
    description: "Entiende la importancia de las estrellas y los patrones iniciales.",
    image: "/guias/flores/2.jpg"
  },
  {
    title: "2. Método de Cruce",
    description: "Aprende sobre la plantación alterna y los niveles de riego.",
    image: "/guias/flores/3.jpg"
  },
  {
    title: "3. Combinaciones Parte I",
    description: "Cruces para Daisy, Pansy, Laceleaf, CornPoppy y Calla Lily.",
    image: "/guias/flores/1.jpg"
  },
  {
    title: "4. Combinaciones Parte II",
    description: "Cruces para Morning Glory, Carnation, Tulip y Daisy.",
    image: "/guias/flores/1-1.jpg"
  },
  {
    title: "5. Flores de Nivel Superior",
    description: "Rosas, Hyacinth, Geranium, Phalaenopsis y Geranium.",
    image: "/guias/flores/1-2.jpg"
  }
];

export default function GuiaFloresPage() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-green-500/20">
      <Header />

      <main className="pt-24 pb-32">
        <div className="mx-auto max-w-4xl px-4 mb-12">
          <WikiBreadcrumbs items={[{ label: "Guias", href: "/guias" }, { label: "Hibridacion de Flores" }]} />

          <div className="space-y-4">
            <Badge className="bg-green-500/10 text-green-600 border-green-200 px-4 py-1">
              <Flower2 className="mr-2 h-4 w-4" /> Guía de Jardinería
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
              Hibridación de <span className="text-green-600">Flores</span>
            </h1>
            
            <div className="relative group mt-8 p-6 rounded-[2.5rem] bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/10 border border-green-200 dark:border-green-800 shadow-sm transition-all hover:shadow-md">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative h-20 w-20 shrink-0 rounded-full overflow-hidden border-4 border-white dark:border-zinc-900 shadow-xl">
                  <Image 
                    src="https://unavatar.io/x/hiimaa_44" 
                    alt="hiimaa_44"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center sm:text-left space-y-2">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-[10px] bg-green-600 text-white px-3 py-0.5 rounded-full font-black uppercase tracking-widest">Créditos Totales</span>
                  </div>
                  <h4 className="text-xl font-black">Guía creada por @hiimaa_44</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    "Toda la información visual e investigación de esta guía pertenece a @hiimaa_44. 
                    Compartimos su increíble trabajo para ayudar a los vecinos de la comunidad chilena."
                  </p>
                  <a 
                    href="https://x.com/hiimaa_44" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-green-600 hover:underline"
                  >
                    <Twitter className="h-4 w-4 fill-current" /> Ver perfil original en X
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
            <div className="flex items-start gap-4 p-6 rounded-[2rem] bg-secondary/30 border border-border">
              <Droplets className="h-6 w-6 text-blue-500 shrink-0" />
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider">Riego Crítico</h4>
                <p className="text-xs text-muted-foreground mt-1">Nivel 5 de agua = Máxima probabilidad.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-[2rem] bg-secondary/30 border border-border">
              <Star className="h-6 w-6 text-amber-500 shrink-0" />
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider">Estrellas</h4>
                <p className="text-xs text-muted-foreground mt-1">Las estrellas del padre influyen en el hijo.</p>
              </div>
            </div>
          </div>
        </div>

        <section className="mx-auto max-w-5xl px-4 space-y-24">
          {FLOWER_STEPS.map((step, index) => (
            <div key={index} className="group space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-green-600 text-white flex items-center justify-center text-xl font-black shadow-lg">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-black tracking-tight group-hover:text-green-600 transition-colors">
                  {step.title}
                </h3>
              </div>

              <div className="relative overflow-hidden rounded-[3rem] border-4 border-white dark:border-zinc-900 shadow-2xl transition-all group-hover:border-green-500/30">
                <Image 
                  src={step.image} 
                  alt={step.title} 
                  width={1200} 
                  height={1600} 
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                />
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all">
                  <Button variant="secondary" className="rounded-2xl font-bold shadow-2xl gap-2 backdrop-blur-md bg-white/90" asChild>
                    <a href={step.image} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" /> Expandir Imagen
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="mx-auto max-w-4xl px-4 mt-24">
          <div className="p-12 rounded-[3rem] bg-green-600 text-white text-center relative overflow-hidden shadow-2xl shadow-green-600/20">
            <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
              <Sparkles className="h-40 w-40" />
            </div>
            <h2 className="text-3xl font-black mb-4 relative z-10">¿Te sirvió esta guía?</h2>
            <p className="text-green-50 mb-8 max-w-xl mx-auto opacity-90 relative z-10 font-medium">
              Estamos constantemente actualizando los datos. Si descubres un cruce nuevo, 
              avísanos en el canal de jardinería de nuestro Discord.
            </p>
            <Button size="lg" variant="secondary" className="rounded-2xl font-black px-10 h-14 hover:scale-105 transition-transform" asChild>
              <a href="https://discord.gg/wnkBUBbaRW" target="_blank">¡Unirse a la Comunidad!</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
