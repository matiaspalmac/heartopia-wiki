"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calendar, Heart, Star } from "lucide-react";
import Image from "next/image";

export default function EventoMLP() {
  return (
    <div className="min-h-screen bg-[#fff5ff] dark:bg-[#0a020a] transition-colors duration-500">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-16 md:py-24">
<div className="relative rounded-[4rem] overflow-hidden bg-gradient-to-br from-[#fdf4ff] via-[#fae8ff] to-[#f5d0fe] dark:from-[#2e102e] dark:via-[#1a051a] dark:to-[#0a020a] p-8 md:p-20 mb-12 border-4 border-[#f0abfc] dark:border-[#4a044e] shadow-[0_0_40px_rgba(240,171,252,0.2)] dark:shadow-[0_0_40px_rgba(217,70,239,0.1)]">          
          <div className="absolute top-10 left-10 animate-pulse">
            <Star className="h-12 w-12 text-[#f0abfc] opacity-40 fill-current" />
          </div>
          <div className="absolute bottom-20 right-20 animate-bounce-slow">
            <Heart className="h-16 w-16 text-[#fda4af] opacity-30 fill-current" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            <Badge className="bg-[#d946ef] text-white mb-2 hover:bg-[#c026d3] px-6 py-1.5 rounded-full border-2 border-white/50 shadow-lg text-sm font-bold tracking-widest uppercase">
              ¡Magia en camino!
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-black text-[#701a75] dark:text-[#f5d0fe] mb-2 tracking-tighter italic">
      Evento <span className="text-[#db2777] dark:text-[#f472b6]">MLP</span>
    </h1>
            
<div className="bg-white/60 dark:bg-white/5 backdrop-blur-md px-8 py-4 rounded-[2rem] border-2 border-[#f5d0fe] dark:border-[#4a044e] shadow-inner mb-8">              <p className="text-2xl md:text-3xl font-black text-[#a21caf] flex items-center gap-3">
                <Sparkles className="h-8 w-8 fill-current" />
                PRÓXIMAMENTE
                <Sparkles className="h-8 w-8 fill-current" />
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-[#fdf2f8] text-[#be185d] px-6 py-3 rounded-full border-2 border-[#fbcfe8] font-black shadow-sm">
                <Calendar className="h-5 w-5" />
                <span>Fecha por confirmar</span>
              </div>
              <div className="flex items-center gap-2 bg-[#f5f3ff] text-[#6d28d9] px-6 py-3 rounded-full border-2 border-[#ddd6fe] font-black shadow-sm">
                <Star className="h-5 w-5 fill-current" />
                <span>Nuevas Recompensas</span>
              </div>
            </div>

            <p className="max-w-2xl text-[#86198f] font-medium text-lg leading-relaxed mt-4">
              Prepárate para una aventura llena de amistad y colores. Estamos preparando algo especial que te hará decir <span className="font-bold italic">"¡Es un 20% más genial!"</span>.
            </p>
          </div>

          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-purple-400/20 rounded-full blur-[120px]" />
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-pink-400/20 rounded-full blur-[120px]" />
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-pink-200 to-purple-200 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />
          
          <div className="relative overflow-hidden rounded-[2.5rem] border-8 border-white dark:border-zinc-900 shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
            <Image 
              src="/eventos/mlp.jpg" 
              alt="Imagen del evento MLP" 
              width={1200} 
              height={600} 
              className="w-full h-auto object-cover"
              priority 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />
          </div>
        </div>

        <div className="mt-16 text-center">
           <p className="text-[#d946ef] font-bold flex items-center justify-center gap-2 italic">
             <Heart className="h-4 w-4 fill-current" /> La magia de la amistad llegará pronto <Heart className="h-4 w-4 fill-current" />
           </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}