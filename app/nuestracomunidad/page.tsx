"use client";

import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare,
  Crown,
  Star,
  Music,
  Palette,
  Fish,
  Camera
} from "lucide-react";

export default function NuestraComunidad() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/30">
      <Header />

      <main className="pt-16 pb-20 md:pt-20">
        <section className="relative px-4 sm:px-6 pt-12 pb-16 text-center overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          
          <div className="mx-auto max-w-4xl space-y-4">
            <Badge variant="outline" className="px-4 py-1 rounded-full border-primary/20 bg-primary/5 text-primary font-bold uppercase text-[10px] tracking-widest">
              Comunidad Heartopia Chile
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic">
              NUESTRO <span className="text-primary">ÁLBUM</span>
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            
            <div className="relative group col-span-1 sm:col-span-2 lg:col-span-3 overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl h-[300px] lg:h-[400px]">
              <Image 
                src="/comunidad/ultimacena.png" 
                alt="Recreación de la Última Cena" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6">
                <Badge className="bg-black/70 backdrop-blur-md border-white/20 text-white font-bold px-4 py-1">
                  La Última Cena
                </Badge>
              </div>
            </div>

            <div className="relative group col-span-1 row-span-1 lg:row-span-2 overflow-hidden rounded-[2.5rem] shadow-xl h-[400px] lg:h-full">
              <Image 
                src="/comunidad/deiama.png" 
                alt="Dei y Ama" 
                fill 
                className="object-cover transition-all duration-500"
              />
            </div>

            <div className="relative group col-span-1 sm:col-span-2 overflow-hidden rounded-[2.5rem] border border-primary/10 shadow-lg h-[300px]">
              <Image 
                src="/comunidad/mods.png" 
                alt="Staff Heartopia" 
                fill 
                className="object-cover transition-transform group-hover:scale-110 duration-700"
              />
              <div className="absolute top-6 left-6">
                <div className="flex items-center gap-2 bg-yellow-500 text-black px-4 py-1 rounded-full font-black text-[10px] uppercase">
                  <Crown className="h-3 w-3 fill-current" /> Team Staff
                </div>
              </div>
            </div>

            <div className="relative group col-span-1 overflow-hidden rounded-[2.5rem] border border-white/10 h-[300px]">
              <Image src="/comunidad/perreo.png" alt="Momento Perreo" fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Music className="text-white h-10 w-10 animate-bounce" />
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex flex-col items-center gap-4">
              <div className="relative w-full overflow-hidden rounded-[3rem] border border-white/10 shadow-xl">
                <img 
                  src="/comunidad/todos.png" 
                  alt="Toda la comunidad" 
                  className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-[1.02]"
                />
                <div className="absolute bottom-6 right-6">
                  <Badge className="bg-primary text-primary-foreground font-black px-6 py-2 rounded-2xl text-lg shadow-2xl">
                    <Camera className="mr-2 h-5 w-5 inline" /> JUNTA COMUNIDAD
                  </Badge>
                </div>
              </div>
            </div>

            <div className="relative group col-span-1 overflow-hidden rounded-[2.5rem] border border-white/10 h-[300px]">
              <Image src="/comunidad/dibujo.png" alt="Fan Art" fill className="object-cover" />
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-900 p-2 rounded-full">
                <Palette className="h-5 w-5 text-primary" />
              </div>
            </div>

            <div className="relative group col-span-1 sm:col-span-2 overflow-hidden rounded-[2.5rem] border border-white/10 h-[300px]">
              <Image src="/comunidad/juntaisla.png" alt="Junta en la Isla" fill className="object-cover" />
            </div>

            <div className="relative group col-span-1 overflow-hidden rounded-[2.5rem] border border-white/10 h-[300px]">
              <Image src="/comunidad/pescadestacada.jpg" alt="Pesca" fill className="object-cover" />
              <div className="absolute bottom-4 left-4">
                <Fish className="text-blue-400 h-6 w-6" />
              </div>
            </div>

            <div className="relative group col-span-1 sm:col-span-2 overflow-hidden rounded-[2.5rem] border border-white/10 h-[300px]">
              <Image src="/comunidad/lluviaestrellas.png" alt="Lluvia de estrellas" fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                <Star className="text-yellow-400 h-12 w-12 fill-current animate-pulse" />
              </div>
            </div>

            <div className="relative group col-span-1 overflow-hidden rounded-[2.5rem] border border-white/10 h-[300px]">
              <Image src="/comunidad/pescanocturna.jpg" alt="Pesca Nocturna" fill className="object-cover" />
            </div>

            <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex justify-center">
              <div className="relative w-full overflow-hidden rounded-[2.5rem] border border-white/10">
                <img 
                  src="/comunidad/pescanose.jpg" 
                  alt="Pesca mas" 
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}