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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const STAFF = [
  {
    name: "Dei",
    image: "/staff/dei.png",
    role: "Owner & Developer",
    color: "text-rose-500",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-100",
    icon: <Crown className="h-4 w-4" />,
    description:
      "Fundador y desarrollador principal de la Wiki y Bot de Discord.",
  },
  {
    name: "Frop0n",
    image: "/staff/frop0n.png",
    role: "Owner & Developer",
    color: "text-rose-500",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-100",
    icon: <Crown className="h-4 w-4" />,
    description:
      "Fundador y ayudante en el desarrollo de la Wiki y Bot de Discord.",
  },
  {
    name: "Amastiasta",
    image: "/staff/amastiasta.png",
    role: "Moderadora",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    icon: <ShieldCheck className="h-4 w-4" />,
    description:
      "Ayuda con la recopilación de datos y la gestión del servidor de Discord.",
  },
  {
    name: "Mimi",
    image: "/staff/mimi.png",
    role: "Moderadora",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    icon: <ShieldCheck className="h-4 w-4" />,
    description:
      "Ayuda con la recopilación de datos y la gestión del servidor de Discord.",
  },
];

export default function StaffPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1 border-primary/20 text-primary bg-primary/5 dark:bg-primary/10"
          >
            Comunidad Heartopia Chile
          </Badge>
          <h1 className="text-4xl font-black text-foreground md:text-5xl mb-4 tracking-tight">
            Nuestro Equipo
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Conoce a las personas que mantienen esta guía actualizada y
            acompañanos en nuestro servidor de Discord.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 mb-20">
          {STAFF.map((member) => (
            <Card
              key={member.name}
              className={`overflow-hidden border-2 ${member.borderColor} dark:bg-zinc-900/50 transition-all hover:shadow-xl group`}
            >
              <CardContent className="p-0">
                <div
                  className={`p-6 relative overflow-hidden border-b ${member.borderColor} 
    ${member.bgColor} dark:bg-zinc-950`}
                >

                  <Star
                    className={`absolute -right-4 -top-4 h-24 w-24 ${member.color} 
      opacity-10 dark:opacity-20 transition-transform group-hover:scale-110 group-hover:rotate-12`}
                  />

                  <div className="flex items-center gap-5 relative z-10">
                    <div className="relative">
                      <div
                        className={`absolute inset-0 rounded-full blur-xl opacity-20 dark:opacity-50 ${member.color.replace("text", "bg")}`}
                      />
                      <div className="relative h-20 w-20 rounded-full border-4 border-white dark:border-zinc-800 shadow-lg overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 p-1.5 rounded-full bg-white dark:bg-zinc-900 shadow-sm border ${member.borderColor} ${member.color}`}
                      >
                        {member.icon}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-black text-foreground dark:text-white text-2xl tracking-tight leading-tight">
                        {member.name}
                      </h3>

                      <Badge
                        variant="secondary"
                        className={`mt-1 text-[10px] font-bold uppercase tracking-[0.15em] px-2 py-0 
          ${member.color} bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border-current/10`}
                      >
                        {member.role}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white dark:bg-transparent">
                  <p className="text-sm text-muted-foreground dark:text-zinc-400 leading-relaxed italic">
                    "{member.description}"
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="relative overflow-hidden rounded-[2.5rem] bg-[#5865F2] p-8 md:p-14 text-white shadow-2xl shadow-blue-500/20">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <Users className="h-6 w-6 text-blue-200" />
                <span className="font-bold uppercase tracking-[0.2em] text-xs text-blue-100">
                  Comunidad Activa
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Servidor de
                <br />
                Discord
              </h2>
              <p className="text-blue-100 text-lg max-w-md font-medium opacity-90">
                ¿Tienes dudas sobre el juego? ¿Encontraste un nuevo código? ¡Ven
                a compartir con otros ciudadanos de Heartopia!
              </p>
            </div>

            <div className="flex flex-col gap-6 w-full md:w-auto">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#5865F2] hover:bg-blue-50 font-black text-xl px-10 py-9 rounded-3xl shadow-2xl transition-all hover:scale-105 active:scale-95"
              >
                <Link href="https://discord.gg/wnkBUBbaRW" target="_blank">
                  <MessageSquare className="mr-3 h-7 w-7 fill-current" />
                  ENTRAR AHORA
                  <ExternalLink className="ml-3 h-5 w-5 opacity-40" />
                </Link>
              </Button>

              <div className="flex items-center justify-center gap-3">
                <div className="flex -space-x-3">
                  {STAFF.map((member, i) => (
                    <div
                      key={i}
                      className="relative h-10 w-10 rounded-full border-2 border-[#5865F2] overflow-hidden bg-blue-400 ring-2 ring-white/10"
                      style={{ zIndex: STAFF.length - i }}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  <div className="relative h-10 w-10 rounded-full border-2 border-[#5865F2] bg-blue-600 flex items-center justify-center text-[10px] font-bold ring-2 ring-white/10 z-0">
                    +
                  </div>
                </div>
                <p className="text-xs text-blue-100 font-bold tracking-wide uppercase">
                  +114 Usuarios
                </p>
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-black/20 rounded-full blur-[100px]" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
