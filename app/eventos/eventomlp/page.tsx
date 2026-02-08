"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WikiBreadcrumbs } from "@/components/wiki-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calendar, Heart, Star, Car, Shirt, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    const targetDate = new Date("February 14, 2026 00:00:00").getTime();

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
    <div className="flex gap-4 justify-center mt-6">
      {[
        { label: "Días", value: timeLeft.dias },
        { label: "Hrs", value: timeLeft.horas },
        { label: "Min", value: timeLeft.minutos },
        { label: "Seg", value: timeLeft.segundos },
      ].map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="bg-white/40 dark:bg-white/10 backdrop-blur-sm border-2 border-[#f0abfc] rounded-2xl w-16 h-16 flex items-center justify-center shadow-lg">
            <span className="text-2xl font-black text-[#701a75] dark:text-[#f5d0fe]">
              {String(item.value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[10px] font-black uppercase mt-1 text-[#db2777] dark:text-[#f472b6] tracking-tighter">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const MLP_SETS = [
  {
    pony: "Twilight Sparkle",
    color: "bg-[#f3e8ff]",
    accent: "text-[#7e22ce]",
    border: "hover:border-[#a855f7]",
    image: "/eventos/mlp/ropa5.webp",
    items: ["Vestido de Gala Real", "Peinado 'Princesa'", "Botas Estrelladas", "Superdeportivo Mágico"]
  },
  {
    pony: "Rainbow Dash",
    color: "bg-[#e0f2fe]",
    accent: "text-[#0369a1]",
    border: "hover:border-[#0ea5e9]",
    image: "/eventos/mlp/ropa2.webp",
    items: ["Chaqueta Deportiva", "Falda Street", "Guitarra Eléctrica", "Superdeportivo Veloz"]
  },
  {
    pony: "Pinkie Pie",
    color: "bg-[#fce7f3]",
    accent: "text-[#be185d]",
    border: "hover:border-[#db2777]",
    image: "/eventos/mlp/ropa4.webp",
    items: ["Set de Fiesta Total", "Gorra Heart-Eyes", "Zapatos de Algodón", "Superdeportivo de Globos"]
  },
  {
    pony: "Rarity",
    color: "bg-[#f8fafc]",
    accent: "text-[#475569]",
    border: "hover:border-[#94a3b8]",
    image: "/eventos/mlp/ropa1.webp",
    items: ["Vestido de Alta Costura", "Tocado de Perlas", "Tacones de Cristal", "Superdeportivo de Lujo"]
  },
  {
    pony: "Fluttershy",
    color: "bg-[#fefce8]",
    accent: "text-[#a16207]",
    border: "hover:border-[#eab308]",
    image: "/eventos/mlp/ropa3.webp",
    items: ["Blusa de Mariposa", "Falda Primavera", "Peinado Natural", "Superdeportivo Natural"]
  },
  {
    pony: "Applejack",
    color: "bg-[#fff7ed]",
    accent: "text-[#c2410c]",
    border: "hover:border-[#f97316]",
    image: "/eventos/mlp/ropa6.webp",
    items: ["Camisa de Campo", "Pantalones Vaqueros", "Sombrero de Manzana", "Superdeportivo de Granja"]
  }
];

export default function EventoMLP() {
  return (
    <div className="min-h-screen bg-[#fffaff] dark:bg-[#0a020a]">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-12">
        <WikiBreadcrumbs items={[{ label: "Eventos", href: "/eventos" }, { label: "My Little Pony" }]} />
        <section className="relative rounded-[3rem] overflow-hidden bg-gradient-to-r from-[#fdf4ff] to-[#fae8ff] dark:from-[#2e102e] dark:to-[#0a020a] p-12 mb-8 border-2 border-[#f0abfc] shadow-xl text-center">
          <Badge className="bg-[#d946ef] text-white mb-6 px-6 py-1 rounded-full uppercase font-black tracking-widest border-2 border-white/30 shadow-md">
            Especial de San Valentín
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black text-[#701a75] dark:text-[#f5d0fe] mb-4 italic">
            Friendship is <span className="text-[#db2777]">Magic</span>
          </h1>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-4 text-2xl font-black text-[#be185d]">
              <Calendar className="h-7 w-7" />
              <span>14 de Febrero</span>
            </div>
            
            <CountdownTimer />
          </div>
        </section>

        <div className="relative mb-20 group">
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-300 to-purple-400 rounded-[2.5rem] blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
          <Image 
            src="/eventos/mlp/mlp.jpg" 
            alt="Colaboración My Little Pony x Heartopia" 
            width={1200} 
            height={600}
            className="relative rounded-[2.5rem] border-4 border-white dark:border-zinc-800 shadow-2xl w-full object-cover"
            priority
          />
        </div>

        <div className="space-y-12">
          <div className="flex flex-col items-center gap-2 mb-10">
            <h2 className="text-4xl font-black text-[#701a75] dark:text-white uppercase tracking-tighter">
              Catálogo de Colaboración
            </h2>
            <div className="h-1.5 w-24 bg-[#d946ef] rounded-full" />
          </div>

          <div className="grid gap-10">
            {MLP_SETS.map((set) => (
              <div 
                key={set.pony} 
                className={`group flex flex-col md:flex-row overflow-hidden rounded-[3rem] border-2 border-transparent ${set.color} dark:bg-zinc-900 transition-all duration-300 ${set.border} hover:shadow-2xl`}
              >
                <div className="relative w-full md:w-[45%] h-[400px] md:h-auto bg-white/50 dark:bg-black/10 backdrop-blur-sm">
                  <Image 
                    src={set.image} 
                    alt={`Set de ${set.pony}`} 
                    fill 
                    className="object-contain p-6 md:p-10 transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex-1 p-10 md:p-16 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6">
                    <Star className={`h-6 w-6 fill-current ${set.accent}`} />
                    <span className={`text-sm font-black uppercase tracking-widest ${set.accent}`}>
                      Set {set.pony}
                    </span>
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-8">
                    Colección <span className={set.accent}>{set.pony}</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {set.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 bg-white/80 dark:bg-white/5 p-4 rounded-2xl shadow-sm">
                        {i === 3 ? (
                          <Car className={`h-6 w-6 ${set.accent}`} />
                        ) : (
                          <Shirt className={`h-6 w-6 ${set.accent}`} />
                        )}
                        <span className="text-base font-bold text-zinc-800 dark:text-zinc-200">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 p-4 border-2 border-dashed border-white/50 dark:border-white/10 rounded-2xl flex items-center gap-3 text-zinc-500 font-bold italic text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    Este set incluye accesorios y peinado temático.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="mt-24 text-center">
          <p className="text-[#d946ef] font-black text-xl flex items-center justify-center gap-3 italic">
            <Heart className="h-6 w-6 fill-current" />
            La magia de la amistad llegará pronto a Heartopia
            <Heart className="h-6 w-6 fill-current" />
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
