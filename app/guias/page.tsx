"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WikiBreadcrumbs } from "@/components/wiki-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Flower2, 
  ChefHat, 
  Fish, 
  Hammer, 
  BookOpen, 
  ArrowRight, 
  Sparkles,
  Search
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const GUIAS_CATEGORIES = [
  {
    id: "flores",
    title: "Hibridación de Flores",
    description: "Domina el arte de los cruces, niveles de estrellas y colores raros.",
    icon: Flower2,
    color: "from-green-500/20 to-emerald-500/5",
    borderColor: "hover:border-green-500/50",
    iconColor: "text-green-600",    
    image: "/guias/flores/portada.webp"
  },
];

export default function CentroGuias() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main className="pt-24 pb-32">
        <div className="mx-auto max-w-7xl px-4">
          <WikiBreadcrumbs items={[{ label: "Guias" }]} />
        </div>
        <section className="mx-auto max-w-7xl px-4 mb-16 text-center">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1 mb-6 rounded-full">
            <BookOpen className="mr-2 h-4 w-4" /> Academia Heartopia
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            Centro de <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Guías</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Todo lo que necesitas saber para progresar en tu aventura. Selecciona una categoría para ver los tutoriales detallados.
          </p>
        </section>
        <section className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-6">
            {GUIAS_CATEGORIES.map((guia) => (
              <Link key={guia.id} href={`/guias/${guia.id}`}>
                <div className={`group relative flex flex-col md:flex-row items-center w-full h-auto md:h-44 p-2 rounded-[2.5rem] bg-gradient-to-r ${guia.color} border border-border transition-all duration-500 ${guia.borderColor} hover:shadow-2xl hover:shadow-primary/5 overflow-hidden`}>
                  <div className="relative h-40 md:h-full w-full md:w-80 shrink-0 overflow-hidden rounded-[2.2rem] border-2 border-background shadow-lg">
                    <Image 
                      src={guia.image} 
                      alt={guia.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  </div>
                  <div className="flex flex-col flex-grow p-6 md:pl-10">
                    <div className="flex items-center gap-3 mb-2">
                      <guia.icon className={`h-5 w-5 ${guia.iconColor}`} />
                      <span className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground">Categoría Oficial</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight group-hover:text-primary transition-colors">
                      {guia.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base mt-1 max-w-md">
                      {guia.description}
                    </p>
                  </div>
                  <div className="hidden md:flex items-center pr-10">
                    <div className="h-12 w-12 rounded-full bg-background border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-md">
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <guia.icon className="h-32 w-32" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="flex justify-center mt-20 px-4">
          <div className="flex items-center gap-6 px-10 py-6 rounded-full bg-secondary/20 border border-dashed border-primary/20">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5 animate-spin-slow" />
            </div>
            <p className="text-sm md:text-base font-medium text-muted-foreground">
              Estamos redactando nuevas guías de <span className="text-foreground font-bold">Eventos Estacionales</span> y <span className="text-foreground font-bold">Decoración de Iglús</span>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
