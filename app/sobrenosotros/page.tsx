"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Heart, Users, Sparkles, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main className="pt-16 pb-20 md:pt-20">
        <section className="relative px-4 sm:px-6 pt-12 pb-16 md:pt-16 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
          
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <span className="inline-block px-5 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm">
              Sobre Nosotros
            </span>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
              Nuestra <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">Comunidad</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Somos un grupo de vecinos apasionados por Heartopia que decidimos unir fuerzas para crear la guía más completa y cariñosa posible.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-6 rounded-3xl bg-secondary/30 p-8 border border-primary/10 hover:border-primary/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-primary/10 p-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Hecho con amor</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Esta wiki no es oficial. Es 100% creada por fans, para fans. Cada dato, foto y guía ha sido compartida con mucho cariño por la comunidad de Heartopia Chile.
              </p>
            </div>

            <div className="space-y-6 rounded-3xl bg-secondary/30 p-8 border border-primary/10 hover:border-primary/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-purple-500/10 p-4">
                  <Users className="h-8 w-8 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold">Crecemos juntos</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Si encuentras un error, un dato nuevo o quieres agregar algo, ¡tu aporte es bienvenido! Todo lo que ves aquí lo construimos entre todos.
              </p>
            </div>

            <div className="space-y-6 rounded-3xl bg-secondary/30 p-8 border border-primary/10 hover:border-primary/30 transition-all md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-accent/10 p-4">
                  <Sparkles className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold">Nuestra misión</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Que ningún vecino se pierda de nada. Queremos que Heartopia sea aún más mágico gracias a la información compartida y organizada con cariño.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16">
          <div className="rounded-3xl bg-gradient-to-br from-primary/5 to-purple-500/5 p-8 md:p-12 text-center border border-primary/20 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              ¿Quieres ser parte?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Esta wiki crece gracias a ti. Si tienes fotos, datos nuevos, correcciones o simplemente quieres charlar sobre Heartopia, ¡ven al Discord!
            </p>
            <Button 
              size="lg" 
              className="gap-2 bg-[#5865F2] hover:bg-[#4752c4] text-white shadow-lg shadow-[#5865F2]/20"
              asChild
            >
              <a href="https://discord.gg/wnkBUBbaRW" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="h-5 w-5" />
                Unirse a la comunidad
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}