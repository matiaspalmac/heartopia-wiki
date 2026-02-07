"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Crown,
  ExternalLink,
  Users,
  Star,
  MessageSquare,
  Sparkles,
  Heart
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const STAFF = [
  {
    name: "Dei",
    image: "/staff/dei.png",
    role: "Founder & Owner",
    color: "text-rose-500",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-100",
    icon: <Crown className="h-4 w-4" />,
    description:
      "Fundador original y dueño de la comunidad. Desarrollador principal de la Wiki y el sistema del Bot de Discord.",
  },
  {
    name: "Frop0n",
    image: "/staff/frop0n.png",
    role: "Co-Founder",
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-100",
    icon: <Star className="h-4 w-4" />,
    description:
      "Cofundador de Heartopia Chile. Formó parte esencial del inicio del proyecto y el desarrollo temprano de la guía.",
  },
  {
    name: "Mimi",
    image: "/staff/mimi.png",
    role: "Moderadora Senior",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-100",
    icon: <ShieldCheck className="h-4 w-4" />,
    description:
      "Encargada de mantener la armonía en la comunidad. Gestiona el servidor de Discord y vela por el bienestar de todos los vecinos.",
  },
  {
    name: "Amastiasta",
    image: "/staff/amastiasta.png",
    role: "Moderadora Senior",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    icon: <ShieldCheck className="h-4 w-4" />,
    description:
      "Pieza clave en la gestión comunitaria. Apoya en la organización de datos y supervisa la convivencia en la comunidad.",
  },
  {
    name: "Fenice",
    image: "/staff/fenice.png",
    role: "Helper & Guide Creator",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
    icon: <Sparkles className="h-4 w-4" />,
    description:
      "Nuestra experta en contenido. Crea guías detalladas para el juego y está siempre dispuesta a resolver las dudas de los nuevos ciudadanos.",
  },
];

export default function StaffPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-12 md:py-20">
        <div className="text-center mb-16 space-y-4">
          <Badge
            variant="outline"
            className="px-4 py-1 border-primary/20 text-primary bg-primary/5 dark:bg-primary/10 font-bold tracking-widest uppercase text-[10px]"
          >
            Heartopia Chile Staff
          </Badge>
          <h1 className="text-4xl font-black text-foreground md:text-6xl mb-4 tracking-tight italic">
            NUESTRO <span className="text-primary text-stroke">EQUIPO</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
            Las mentes y corazones detrás de la comunidad más grande de Heartopia en Chile.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-24">
          {STAFF.map((member) => (
            <Card
              key={member.name}
              className={`overflow-hidden border-none shadow-sm dark:bg-zinc-900/40 transition-all hover:shadow-xl hover:-translate-y-1 group relative`}
            >
              <CardContent className="p-0">
                <div className={`p-8 relative overflow-hidden ${member.bgColor} dark:bg-zinc-950/50`}>
                  
                  <div className={`absolute -right-8 -top-8 h-32 w-32 ${member.color} opacity-5 transition-transform group-hover:scale-125 group-hover:rotate-12`}>
                    {member.icon}
                  </div>

                  <div className="flex items-center gap-6 relative z-10">
                    <div className="relative">
                      <div className={`absolute inset-0 rounded-3xl blur-2xl opacity-30 ${member.color.replace("text", "bg")}`} />
                      <div className="relative h-24 w-24 rounded-3xl border-4 border-white dark:border-zinc-800 shadow-2xl overflow-hidden rotate-3 group-hover:rotate-0 transition-transform duration-500">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className={`absolute -bottom-2 -right-2 p-2 rounded-xl bg-white dark:bg-zinc-900 shadow-lg border border-zinc-100 dark:border-zinc-700 ${member.color}`}>
                        {member.icon}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-black text-zinc-900 dark:text-white text-3xl tracking-tighter">
                        {member.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className={`text-[9px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full ${member.color} bg-white dark:bg-zinc-800 shadow-sm border-current/5`}
                      >
                        {member.role}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-white dark:bg-zinc-900/20">
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                    {member.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="relative overflow-hidden rounded-[3.5rem] bg-gradient-to-br from-[#5865F2] to-[#4752C4] p-10 md:p-16 text-white shadow-2xl">
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20">
                <Heart className="h-4 w-4 text-pink-300 fill-pink-300" />
                <span className="font-bold uppercase tracking-[0.2em] text-[10px] text-white">
                  Únete a la familia
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter">
                NUESTRO <br /> DISCORD
              </h2>
              <p className="text-blue-50 text-lg font-medium opacity-90 max-w-sm">
                ¿Dudas con un código o una misión? Ven a compartir con +140 ciudadanos activos.
              </p>
              
              <Button
                asChild
                size="lg"
                className="bg-white text-[#5865F2] hover:bg-zinc-100 font-black text-xl px-12 py-8 rounded-[2rem] shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                <Link href="https://discord.gg/wnkBUBbaRW" target="_blank">
                  <MessageSquare className="mr-3 h-6 w-6 fill-current" />
                  ¡QUIERO ENTRAR!
                </Link>
              </Button>
            </div>

            <div className="hidden md:flex flex-col items-center justify-center gap-6">
               <div className="grid grid-cols-3 gap-4">
                  {STAFF.slice(0, 5).map((m, i) => (
                    <div key={i} className="h-20 w-20 rounded-2xl border-2 border-white/20 overflow-hidden bg-white/10 p-1">
                       <Image src={m.image} alt={m.name} width={80} height={80} className="rounded-xl object-cover h-full w-full" />
                    </div>
                  ))}
                  <div className="h-20 w-20 rounded-2xl border-2 border-dashed border-white/40 flex items-center justify-center font-black text-xl bg-white/5">
                    +
                  </div>
               </div>
               <p className="font-black tracking-widest uppercase text-xs opacity-60">Staff & Comunidad</p>
            </div>
          </div>

          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-black/20 rounded-full blur-[100px]" />
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/20 rounded-full blur-[100px]" />
        </section>
      </main>

      <Footer />
    </div>
  );
}