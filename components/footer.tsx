"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Fish,
  Bug,
  Bird,
  PawPrint,
  Sprout,
  TreeDeciduous,
  Trophy,
  Heart,
  Users,
  ExternalLink,
  Gift,
  Users2,
  MessageSquare,
} from "lucide-react";

const DiscordLink = "https://discord.gg/wnkBUBbaRW";

const categories = [
  { href: "/wiki/peces", label: "Peces", icon: Fish },
  { href: "/wiki/insectos", label: "Insectos", icon: Bug },
  { href: "/wiki/aves", label: "Aves", icon: Bird },
  { href: "/wiki/animales", label: "Animales", icon: PawPrint },
  { href: "/wiki/cultivos", label: "Cultivos", icon: Sprout },
  { href: "/wiki/recolectables", label: "Recolectables", icon: TreeDeciduous },
  { href: "/wiki/logros", label: "Logros", icon: Trophy },
  { href: "/wiki/codigos", label: "Códigos", icon: Gift },
  { href: "/wiki/habitantes", label: "Habitantes", icon: Users },
  { href: "/wiki/recetas", label: "Recetas", icon: Sprout },
  { href: "/staff", label: "Nuestro Equipo", icon: Users },
  { href: "/eventos", label: "Eventos", icon: Heart },
  { href: "/nuestracomunidad", label: "Nuestra Comunidad", icon: Users2 },
];

interface FooterProps {
  embedded?: boolean;
}

export function Footer({ embedded = false }: FooterProps) {
  return (
    <footer className={`border-t border-border/50 ${embedded ? "bg-transparent" : "bg-gradient-to-b from-secondary/20 to-background"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-3 lg:gap-12">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-12 w-12 overflow-hidden rounded-xl border-2 border-primary/30 shadow-md transition-all duration-300 group-hover:scale-105 group-hover:border-primary group-hover:shadow-primary/30">
                <Image
                  src="/annie.jpg"
                  alt="Heartopia Logo"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="text-left leading-tight">
                <h1 className="text-xl font-black tracking-tight text-foreground">
                  Heartopia Wiki
                </h1>
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  Chile
                </p>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-muted-foreground">
              La guía más completa y hecha con cariño para explorar todos los secretos del mundo de{" "}
              <span className="font-medium text-primary">Heartopia</span>. Peces, insectos, aves, animales, cultivos, eventos y más.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Explorar</h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary hover:shadow-sm"
                >
                  <cat.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                  <span>{cat.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Comunidad</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Esta wiki nació del amor y esfuerzo de la comunidad{" "}
                <span className="font-medium text-primary">Heartopia Chile</span>. 
                Toda la información está recopilada con mucho cariño para que ningún vecino se pierda de nada.
              </p>
            </div>

            <a
              href={DiscordLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#5865F2] to-[#7289DA] px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-[#5865F2]/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#5865F2]/30 active:scale-95"
            >
              <MessageSquare className="h-5 w-5" />
              ¡Únete al Discord!
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-border/50 pt-8">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div className="max-w-xl space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                Aviso Legal
              </h4>
              <p className="text-xs leading-relaxed text-muted-foreground/80 italic">
                Este sitio es una iniciativa independiente creada por fans y{" "}
                <span className="font-medium">no estamos afiliados</span>, asociados ni respaldados por XD Interactive Entertainment Co., Ltd. 
                Heartopia es una marca registrada de XD Interactive. Todos los recursos, nombres y datos del juego pertenecen a sus respectivos dueños.
              </p>
              <a
                href="https://heartopia.xd.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
              >
                Visitar sitio oficial de Heartopia
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 text-sm text-muted-foreground">
              <Link href="/sobrenosotros" className="hover:text-primary transition-colors">
                Sobre Nosotros
              </Link>
              <Link href="/privacidad" className="hover:text-primary transition-colors">
                Privacidad
              </Link>
            </div>

            <div className="text-sm text-muted-foreground text-center md:text-right">
              Hecho con{" "}
              <Heart className="inline h-4 w-4 text-rose-500 fill-rose-500 animate-pulse" />{" "}
              por <span className="font-medium text-foreground">Dei</span> • © {new Date().getFullYear()} Heartopia Chile Wiki
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}