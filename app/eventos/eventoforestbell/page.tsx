"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WikiBreadcrumbs } from "@/components/wiki-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Bell, TreePine, Leaf, Map, Compass, Sparkles, Timer } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const ActiveCounter = () => {
  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    const targetDate = new Date("April 03, 2026 00:00:00").getTime();

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
    <div className="flex gap-2 md:gap-3 justify-center mt-4">
      {[
        { label: "d", value: timeLeft.dias },
        { label: "h", value: timeLeft.horas },
        { label: "m", value: timeLeft.minutos },
        { label: "s", value: timeLeft.segundos },
      ].map((item, index) => (
        <div key={index} className="flex items-baseline gap-1">
          <span className="text-3xl md:text-4xl font-black text-[#ca8a04] dark:text-[#fde047] drop-shadow-sm">
            {String(item.value).padStart(2, '0')}
          </span>
          <span className="text-xs font-black uppercase text-[#15803d] dark:text-[#4ade80] opacity-70">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function EventoForestbell() {
  return (
    <div className="min-h-screen bg-[#f1f5f1] dark:bg-[#050a05] transition-colors duration-500">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <WikiBreadcrumbs items={[{ label: "Eventos", href: "/eventos" }, { label: "Bellota Dorada: Forestbell" }]} />
        
        <div className="relative rounded-[4rem] overflow-hidden bg-gradient-to-br from-[#dcfce7] via-[#f0fdf4] to-[#fefce8] dark:from-[#06200e] dark:via-[#05150a] dark:to-[#1a1a05] p-8 md:p-20 mb-12 border-4 border-[#86efac] dark:border-[#1e3a1e] shadow-[0_0_50px_rgba(34,197,94,0.2)]">
          
          <div className="absolute top-10 right-10 animate-bounce-slow opacity-30">
            <Leaf className="h-12 w-12 text-[#22c55e] fill-current rotate-12" />
          </div>
          <div className="absolute bottom-10 left-10 animate-pulse opacity-20">
            <Sparkles className="h-16 w-16 text-[#ca8a04]" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            <div className="flex items-center gap-2 bg-[#15803d] text-white px-6 py-2 rounded-full font-black text-xs tracking-[0.2em] uppercase shadow-xl animate-pulse">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              Evento en Curso
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black text-[#14532d] dark:text-[#86efac] mb-2 tracking-tighter italic uppercase leading-none">
              Forest<span className="text-[#ca8a04] dark:text-[#fde047]">bell</span>
            </h1>
            
            <div className="bg-white/80 dark:bg-black/60 backdrop-blur-xl px-12 py-8 rounded-[3.5rem] border-2 border-[#bbf7d0] dark:border-[#1e3a1e] shadow-2xl mb-4 relative overflow-hidden group">
              <div className="relative z-10 flex flex-col items-center">
                <p className="text-sm font-black text-[#15803d] dark:text-[#4ade80] tracking-widest uppercase mb-1 flex items-center gap-2">
                  <Timer className="h-4 w-4" /> Tiempo restante de exhibición
                </p>
                <ActiveCounter />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>

            <p className="max-w-2xl text-[#14532d]/80 dark:text-[#86efac]/80 text-lg md:text-xl font-medium italic leading-relaxed">
              "Susurra el encantamiento en tu corazón y viaja a nuestra tierra de ensueño prometida. La Bellota Dorada ha despertado los secretos del bosque."
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <div className="flex items-center gap-3 bg-white dark:bg-[#0a1a0a] text-[#15803d] dark:text-[#86efac] px-8 py-4 rounded-2xl border-2 border-[#bbf7d0] dark:border-[#1e3a1e] font-black shadow-lg transition-transform hover:scale-105">
                <Map className="h-6 w-6 text-[#22c55e]" />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] uppercase opacity-50">Explora el</span>
                  <span className="text-lg">Nuevo Mapa</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white dark:bg-[#1a1a05] text-[#a16207] dark:text-[#fde047] px-8 py-4 rounded-2xl border-2 border-[#fef08a] dark:border-[#3a3a1e] font-black shadow-lg transition-transform hover:scale-105">
                <Compass className="h-6 w-6 text-[#ca8a04]" />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] uppercase opacity-50">Descubre</span>
                  <span className="text-lg">Secretos</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -left-20 -top-20 w-96 h-96 bg-green-500/20 rounded-full blur-[120px]" />
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative group max-w-5xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-yellow-400 rounded-[3.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative overflow-hidden rounded-[3rem] border-8 border-white dark:border-zinc-900 shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
            <Image 
              src="/eventos/forestbell/forestbell.jpg" 
              alt="Evento Forestbell" 
              width={1200} 
              height={600} 
              className="w-full h-auto object-cover transform transition duration-700 group-hover:scale-105"
              priority 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-12">
               <div className="text-white">
                  <h3 className="text-3xl font-black italic uppercase">Hechizo Forestbell</h3>
                  <p className="text-white/80 font-medium">Ya disponible en la Exhibición de la Bellota Dorada</p>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-zinc-100 dark:bg-white/5 rounded-full border border-zinc-200 dark:border-white/10">
            <TreePine className="h-5 w-5 text-[#15803d] animate-bounce" />
            <p className="text-[#15803d] dark:text-[#86efac] font-black uppercase italic tracking-widest text-sm">
              La aventura ha comenzado. ¡Nos vemos en Heartopia!
            </p>
            <TreePine className="h-5 w-5 text-[#15803d] animate-bounce" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}