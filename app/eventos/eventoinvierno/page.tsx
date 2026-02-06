"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Snowflake, Calendar, Coins, ExternalLink, Timer } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const WinterEndCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    dias: 35,
    horas: 15,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    const targetDate = new Date().getTime() + (35 * 24 * 60 * 60 * 1000) + (15 * 60 * 60 * 1000);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
          horas: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutos: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          segundos: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 flex flex-col items-center md:items-start animate-fade-in">
      <div className="flex items-center gap-2 mb-3 text-blue-600 dark:text-blue-400 font-black uppercase text-xs tracking-widest">
        <Timer className="h-4 w-4 animate-pulse" />
        El evento termina en:
      </div>
      <div className="flex gap-3">
        {[
          { label: "Días", value: timeLeft.dias },
          { label: "Hrs", value: timeLeft.horas },
          { label: "Min", value: timeLeft.minutos },
          { label: "Seg", value: timeLeft.segundos },
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-white/80 dark:bg-blue-900/40 backdrop-blur-md border border-blue-200 dark:border-blue-700 rounded-xl w-14 h-14 flex items-center justify-center shadow-md">
              <span className="text-xl font-black text-blue-700 dark:text-blue-100">
                {String(item.value).padStart(2, '0')}
              </span>
            </div>
            <span className="text-[10px] font-bold mt-1 text-blue-500/80 uppercase tracking-tighter">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const FESTIVAL_IMAGES = [
  { src: "/eventos/invierno/tienda1.jpg", title: "Colección de Abrigos y Chaquetas", desc: "Temporada de Invierno 2026" },
  { src: "/eventos/invierno/tienda2.jpg", title: "Accesorios, Gorros y Gafas", desc: "Estilo Pingüino y Copos" },
  { src: "/eventos/invierno/tienda3.jpg", title: "Bolsos y Accesorios para mascotas", desc: "¡Exclusivos del Festival!" },
  { src: "/eventos/invierno/tienda4.jpg", title: "Puzzles, muebles y decoracion para el hogar", desc: "¡Perfecto para tu iglú!" },
  { src: "/eventos/invierno/tienda5.jpg", title: "Decoracion, vehiculos y emotes", desc: "¡Dale un toque invernal a tu pingüino!" },
];

export default function FestivalInvierno() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="relative rounded-[3rem] overflow-hidden bg-[#e0f2fe] dark:bg-blue-950/30 p-8 md:p-16 mb-12 border-2 border-blue-100 dark:border-blue-900 shadow-inner">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-center md:text-left">
              <Badge className="bg-blue-500 text-white mb-4 hover:bg-blue-600 px-4 py-1 border-2 border-white/20">
                ¡Evento ya disponible!
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black text-foreground mb-4 tracking-tight">
                Festival de <span className="text-blue-500">Invierno</span>
              </h1>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-2">
                <div className="flex items-center gap-2 bg-white/50 dark:bg-zinc-900/50 px-4 py-2 rounded-2xl backdrop-blur-md border border-blue-200/50">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <span className="font-bold text-sm text-blue-800 dark:text-blue-200">Finaliza en Marzo</span>
                </div>
                <div className="flex items-center gap-2 bg-white/50 dark:bg-zinc-900/50 px-4 py-2 rounded-2xl backdrop-blur-md border border-blue-200/50">
                  <Coins className="h-5 w-5 text-yellow-500" />
                  <span className="font-bold text-sm">Moneda: Fichas de Moda</span>
                </div>
              </div>

              <WinterEndCountdown />

            </div>
            <div className="hidden lg:block relative w-48 h-48 animate-bounce-slow">
               <Snowflake className="w-full h-full text-blue-400 opacity-20" />
            </div>
          </div>
          
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px]" />
        </div>

        <div className="space-y-20">
          <div className="text-center">
            <h2 className="text-3xl font-black mb-2 flex items-center justify-center gap-3">
               <Snowflake className="text-blue-400 h-8 w-8" />
               Catálogo Oficial
               <Snowflake className="text-blue-400 h-8 w-8" />
            </h2>
            <p className="text-muted-foreground">Haz clic en las imágenes para ver los precios y detalles originales.</p>
          </div>

          <div className="grid gap-16">
            {FESTIVAL_IMAGES.map((img, index) => (
              <div key={index} className="group relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-black shadow-lg">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-black text-2xl tracking-tight">{img.title}</h3>
                    <p className="text-sm text-muted-foreground">{img.desc}</p>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-white dark:border-zinc-800 shadow-2xl transition-all duration-500 group-hover:border-blue-400 group-hover:shadow-blue-200/50 dark:group-hover:shadow-blue-900/20">
                  <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
                  
                  <Image
                    src={img.src}
                    alt={img.title}
                    width={1200}
                    height={1600}
                    className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                    priority={index === 0}
                  />

                  <div className="absolute bottom-6 right-6 z-20">
                    <a 
                      href={img.src} 
                      target="_blank" 
                      className="flex items-center gap-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-foreground px-6 py-3 rounded-2xl font-bold shadow-xl hover:bg-blue-600 hover:text-white transition-all active:scale-95"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Ver en detalle
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 p-10 rounded-[3rem] bg-blue-50 dark:bg-zinc-900/50 border-2 border-dashed border-blue-200 dark:border-zinc-800 text-center">
          <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
            <Snowflake className="h-5 w-5 text-blue-400" />
            ¿Ves algo en japonés?
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Estamos trabajando en traducir todos los nombres de los objetos a su versión oficial en español. Si conoces el nombre de alguno, ¡avísanos en Discord!
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}