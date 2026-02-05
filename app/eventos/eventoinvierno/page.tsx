"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Snowflake, Calendar, Coins, ExternalLink } from "lucide-react";
import Image from "next/image";

const FESTIVAL_IMAGES = [
  { src: "/eventos/tienda1.jpg", title: "Colección de Abrigos y Chaquetas", desc: "Temporada de Invierno 2026" },
  { src: "/eventos/tienda2.jpg", title: "Accesorios, Gorros y Gafas", desc: "Estilo Pingüino y Copos" },
  { src: "/eventos/tienda3.jpg", title: "Bolsos y Accesorios para mascotas", desc: "¡Exclusivos del Festival!" },
];

export default function FestivalInvierno() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="relative rounded-[3rem] overflow-hidden bg-[#e0f2fe] dark:bg-blue-950/30 p-8 md:p-16 mb-12 border-2 border-blue-100 dark:border-blue-900">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-center md:text-left">
              <Badge className="bg-blue-500 text-white mb-4 hover:bg-blue-600 px-4 py-1">
                Evento Especial de Temporada
              </Badge>
              <h1 className="text-5xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                Festival de <span className="text-blue-500">Invierno</span>
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 bg-white/50 dark:bg-zinc-900/50 px-4 py-2 rounded-2xl backdrop-blur-md border border-blue-200/50">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <span className="font-bold text-sm">Febrero 2026</span>
                </div>
                <div className="flex items-center gap-2 bg-white/50 dark:bg-zinc-900/50 px-4 py-2 rounded-2xl backdrop-blur-md border border-blue-200/50">
                  <Coins className="h-5 w-5 text-yellow-500" />
                  <span className="font-bold text-sm">Moneda: Fichas de Moda</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative w-48 h-48 animate-bounce-slow">
               <Snowflake className="w-full h-full text-blue-400 opacity-20" />
            </div>
          </div>
          
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px]" />
        </div>

        <div className="space-y-20">
          <div className="text-center">
            <h2 className="text-3xl font-black mb-2">Catálogo Oficial</h2>
            <p className="text-muted-foreground">Haz clic en las imágenes para ver los precios y detalles originales.</p>
          </div>

          <div className="grid gap-12">
            {FESTIVAL_IMAGES.map((img, index) => (
              <div key={index} className="group relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-black">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-black text-xl">{img.title}</h3>
                    <p className="text-sm text-muted-foreground">{img.desc}</p>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-white dark:border-zinc-800 shadow-2xl transition-all group-hover:border-blue-400">
                  <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
                  
                  <Image
                    src={img.src}
                    alt={img.title}
                    width={1200}
                    height={1600}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    priority={index === 0}
                  />

                  <div className="absolute bottom-6 right-6 z-20">
                    <a 
                      href={img.src} 
                      target="_blank" 
                      className="flex items-center gap-2 bg-white dark:bg-zinc-900 text-foreground px-6 py-3 rounded-2xl font-bold shadow-xl hover:bg-blue-500 hover:text-white transition-all active:scale-95"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Ver en alta resolución
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 p-10 rounded-[3rem] bg-zinc-100 dark:bg-zinc-900/50 border-2 border-dashed border-zinc-300 dark:border-zinc-800 text-center">
          <h3 className="text-xl font-bold mb-2">¿Ves algo en japonés?</h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Estamos trabajando en traducir todos los nombres de los objetos a su versión oficial en español. Si conoces el nombre de alguno, ¡avísanos en Discord!
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}