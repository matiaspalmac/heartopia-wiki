"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Sparkles,
  MessageSquare,
  Heart
} from "lucide-react";

export default function NuestraComunidad() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/30">
      <Header />

      <main className="pt-16 pb-20 md:pt-20">
        <section className="relative px-4 sm:px-6 pt-12 pb-16 md:pt-16 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
          
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <Badge 
              variant="outline" 
              className="px-5 py-1.5 rounded-full border-primary/30 bg-primary/5 text-primary font-bold tracking-wider uppercase text-xs"
            >
              Álbum de Recuerdos
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
              Nuestra <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">Comunidad</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Esta página está dedicada a todos los vecinos que hacen de <strong>Heartopia Chile</strong> un lugar especial. 
              Aquí celebramos nuestras juntas, eventos y el cariño de nuestra gente.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(220px,auto)] sm:auto-rows-[minmax(260px,auto)] lg:auto-rows-[minmax(280px,auto)]">
            <div className="relative group col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2 overflow-hidden rounded-3xl border border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-500">
              <Image 
                src="/comunidad/lluviaestrellas.png" 
                alt="Primera Lluvia de Estrellas 2026" 
                fill 
                className="object-cover object-top brightness-105 transition-transform duration-1000 group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                priority
              />
            </div>

            <div className="relative group col-span-1 sm:col-span-2 lg:col-span-2 overflow-hidden rounded-3xl border border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-500">
              <Image 
                src="/comunidad/pescanocturna.jpg" 
                alt="Pesca Nocturna" 
                fill 
                className="object-cover object-center brightness-110 transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 pointer-events-none" />
            </div>

            <div className="relative group col-span-1 overflow-hidden rounded-3xl bg-gradient-to-br from-secondary/60 to-background/80 border border-primary/20 flex flex-col justify-center items-center text-center p-6 sm:p-8 hover:border-primary/50 transition-all duration-500 shadow-xl hover:shadow-2xl">
              <Users className="h-10 w-10 sm:h-12 sm:w-12 text-primary mb-4" />
              <h4 className="text-xl sm:text-2xl font-black leading-tight mb-3">
                Muestra tu orgullo
              </h4>
              <p className="text-sm text-muted-foreground">
                ¿Tienes fotos de tu vecino o de una junta?<br className="hidden sm:block" />
                ¡Compártelas en Discord!
              </p>
            </div>

            <div className="relative group col-span-1 overflow-hidden rounded-3xl border-4 border-pink-400/40 shadow-2xl hover:shadow-pink-500/40 hover:border-pink-400/70 transition-all duration-500 bg-gradient-to-b from-pink-500/5 to-transparent">
              <Image 
                src="/comunidad/mimi.jpg" 
                alt="Vecino destacado - Mimi" 
                fill 
                className="object-cover object-center brightness-110 contrast-105 transition-all duration-700 group-hover:scale-110 group-hover:rotate-[0.5deg]"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent/20 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col items-center pointer-events-auto">
                <div className="mb-3 relative">
                  <Heart className="h-10 w-10 text-red-500 animate-pulse" />
                  <Heart className="h-10 w-10 text-pink-300 absolute inset-0 blur-sm opacity-70 animate-pulse" />
                </div>
                <Badge 
                  className="bg-pink-600/85 text-white border-none px-4 py-1.5 text-base sm:text-lg font-bold mb-2 shadow-md"
                >
                  Vecino Destacado
                </Badge>
              </div>
            </div>

            <div className="relative group col-span-1 sm:col-span-2 lg:col-span-2 overflow-hidden rounded-3xl border border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-500">
              <Image 
                src="/comunidad/dibujo.png" 
                alt="Dibujo pixel art comunitario" 
                fill 
                className="object-cover object-center brightness-105 transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500 pointer-events-none" />
            </div>

            <div className="relative group col-span-1 sm:col-span-2 lg:col-span-2 overflow-hidden rounded-3xl border border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-500">
              <Image 
                src="/comunidad/pescanose.jpg" 
                alt="Pesca" 
                fill 
                className="object-cover object-center brightness-105 transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500 pointer-events-none" />
            </div>

            <div className="relative group col-span-1 sm:col-span-2 lg:col-span-4 overflow-hidden rounded-3xl border border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-500">
              <Image 
                src="/comunidad/pescadestacada.jpg" 
                alt="Pesca destacada" 
                fill 
                className="object-cover object-center brightness-105 transition-transform duration-1000 group-hover:scale-105"
                sizes="100vw"
              />
            </div>
          </div>
        </section>

        <section className="mt-16 sm:mt-20 px-4 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="group relative flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 w-full p-4 sm:p-2 rounded-[2.5rem] bg-gradient-to-r from-secondary/50 via-secondary/20 to-transparent backdrop-blur-lg border border-primary/15 hover:border-primary/40 transition-all duration-500 shadow-2xl">
              
              <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 w-full sm:w-auto">
                <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-2xl border-2 border-background/60 shadow-xl">
                  <Image 
                    src="/dei.jpg" 
                    alt="Dei" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent/0 pointer-events-none" />
                </div>

                <div className="text-center sm:text-left space-y-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-xs uppercase tracking-wider font-bold text-primary/80">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Comunidad Activa</span>
                  </div>
                  <p className="text-muted-foreground text-base sm:text-lg">
                    Esta wiki crece gracias a <span className="font-black text-transparent bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text">ustedes</span>
                  </p>
                </div>
              </div>
              <Button 
                className="rounded-full gap-2 px-6 sm:px-7 py-5 sm:py-6 bg-[#5865F2] hover:bg-[#4752c4] text-white font-medium shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <a href="https://discord.gg/wnkBUBbaRW" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="h-4 w-4" /> Compartir fotos
                </a>
              </Button>
              <div className="absolute inset-0 -z-10 bg-primary/5 blur-3xl rounded-[2.5rem] opacity-0 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}