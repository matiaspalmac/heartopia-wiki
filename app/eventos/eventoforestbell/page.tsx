"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Bell, TreePine, Leaf, Map, Compass } from "lucide-react";
import Image from "next/image";

export default function EventoForestbell() {
  return (
    <div className="min-h-screen bg-[#f1f5f1] dark:bg-[#050a05] transition-colors duration-500">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#dcfce7] via-[#f0fdf4] to-[#fefce8] dark:from-[#06200e] dark:via-[#05150a] dark:to-[#1a1a05] p-8 md:p-20 mb-12 border-4 border-[#86efac] dark:border-[#1e3a1e] shadow-[0_0_40px_rgba(34,197,94,0.15)]">
          
          <div className="absolute top-10 right-10 animate-bounce-slow opacity-30 dark:opacity-20">
            <Leaf className="h-10 w-10 text-[#22c55e] fill-current" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            <Badge className="bg-[#15803d] dark:bg-[#22c55e] text-white dark:text-[#050a05] mb-2 px-6 py-1.5 rounded-full border-2 border-white/50 dark:border-green-900/50 shadow-lg text-sm font-bold tracking-widest uppercase">
              Aventura en la Naturaleza
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-black text-[#14532d] dark:text-[#86efac] mb-2 tracking-tight">
              Forest<span className="text-[#ca8a04] dark:text-[#fde047]">bell</span>
            </h1>
            
            <div className="bg-white/70 dark:bg-black/40 backdrop-blur-md px-8 py-4 rounded-[2rem] border-2 border-[#bbf7d0] dark:border-[#1e3a1e] shadow-inner mb-8">
              <p className="text-2xl md:text-3xl font-black text-[#16a34a] dark:text-[#4ade80] flex items-center gap-3">
                <Bell className="h-8 w-8 fill-current animate-ring" />
                PRÓXIMAMENTE
                <Bell className="h-8 w-8 fill-current animate-ring" />
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/50 dark:bg-[#0a1a0a] text-[#15803d] dark:text-[#86efac] px-6 py-3 rounded-full border-2 border-[#bbf7d0] dark:border-[#1e3a1e] font-black shadow-sm">
                <Map className="h-5 w-5" />
                <span>Exploración Libre</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 dark:bg-[#1a1a05] text-[#a16207] dark:text-[#fde047] px-6 py-3 rounded-full border-2 border-[#fef08a] dark:border-[#3a3a1e] font-black shadow-sm">
                <Compass className="h-5 w-5" />
                <span>Nuevos Secretos</span>
              </div>
            </div>
          </div>

          <div className="absolute -left-20 -top-20 w-96 h-96 bg-green-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-yellow-500/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative overflow-hidden rounded-[2.5rem] border-8 border-white dark:border-zinc-900 shadow-2xl transition-all duration-500 group-hover:scale-[1.01] group-hover:border-green-400">
            <Image 
              src="/eventos/forestbell.jpg" 
              alt="Evento Forestbell" 
              width={1200} 
              height={600} 
              className="w-full h-auto object-cover"
              priority 
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}