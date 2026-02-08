"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WikiBreadcrumbs } from "@/components/wiki-breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  ArrowRight, 
  Clock, 
  History, 
  PlayCircle,
  Timer
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const EventCounter = ({ targetDate, type }: { targetDate: string, type: 'active' | 'upcoming' }) => {
  const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

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
  }, [targetDate]);

  const colorClass = type === 'active' ? 'text-red-500' : 'text-primary';

  return (
    <div className="flex gap-2 items-center mt-2">
      <Timer className={`h-4 w-4 ${type === 'active' ? 'animate-pulse' : ''} ${colorClass}`} />
      <div className="flex gap-1.5 font-black text-xs md:text-sm">
        <span className={colorClass}>{timeLeft.dias}d</span>
        <span className={colorClass}>{timeLeft.horas}h</span>
        <span className={colorClass}>{timeLeft.minutos}m</span>
        <span className={colorClass}>{timeLeft.segundos}s</span>
        <span className="text-zinc-400 font-medium lowercase">
          {type === 'active' ? 'para terminar' : 'para iniciar'}
        </span>
      </div>
    </div>
  );
};

const EVENTOS = [
  {
    id: "festival-invierno",
    title: "Festival de Invierno 2026",
    status: "En Curso",
    targetDate: "March 13, 2026 15:00:00", 
    image: "/eventos/invierno/invierno.jpg", 
    color: "bg-blue-500",
    description: "¡La nieve cubrió Heartopia! Aprovecha las últimas semanas para coleccionar tickets de nieve y canjear la colección completa de pingüinos.",
    href: "/eventos/eventoinvierno",
    type: "active"
  },
  {
    id: "gilded-acorn-forestbell",
    title: "Bellota Dorada: Hechizo Forestbell",
    status: "Próximamente",
    targetDate: "February 7, 2026 00:00:00",
    image: "/eventos/forestbell/forestbell.jpg",
    color: "bg-amber-600",
    description: "Susurra el encantamiento en tu corazón y viaja a nuestra tierra de ensueño prometida. No te pierdas la nueva Exhibición de la Bellota Dorada.",
    href: "/eventos/eventoforestbell",
    type: "upcoming"
  },
  {
    id: "mlp-collab",
    title: "Colaboración: My Little Pony",
    status: "Próximamente",
    targetDate: "February 14, 2026 00:00:00",
    image: "/eventos/mlp/mlp.jpg",
    color: "bg-pink-400",
    description: "¡La magia de la amistad llega a Heartopia! Empuña los Elementos de la Armonía y despierta el Árbol de la Armonía en este evento limitado.",
    href: "/eventos/eventomlp",
    type: "upcoming"
  }
];

export default function EventosPage() {
  const renderEventSection = (title: string, icon: any, type: string) => {
    const filteredEvents = EVENTOS.filter(e => e.type === type);
    
    return (
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-xl bg-secondary dark:bg-zinc-800 text-foreground">
            {icon}
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight">{title}</h2>
          <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800 ml-4" />
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid gap-6">
            {filteredEvents.map((evento) => (
              <Link href={evento.href} key={evento.id}>
                <Card className="group overflow-hidden border-2 border-primary/10 hover:border-primary transition-all rounded-[2.5rem] shadow-lg hover:shadow-primary/5">
                  <CardContent className="p-0 flex flex-col md:flex-row h-full">
                    
                    <div className="relative w-full md:w-[420px] aspect-video md:aspect-auto overflow-hidden bg-zinc-100">
                      <Image
                        src={evento.image}
                        alt={evento.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={`${evento.color} text-white border-none px-4 py-1 font-bold shadow-lg`}>
                          {evento.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-between bg-white dark:bg-zinc-900/50">
                      <div>
                        <div className="flex flex-col mb-4">
                           <div className="flex items-center gap-2 text-zinc-500 mb-1">
                             <Calendar className="h-4 w-4" />
                             <span className="text-xs font-bold uppercase tracking-widest">
                               {evento.type === 'active' ? 'Evento Activo' : 'Fecha de Inicio'}
                             </span>
                           </div>
                           <EventCounter targetDate={evento.targetDate} type={evento.type as any} />
                        </div>

                        <h3 className="text-2xl md:text-3xl font-black mb-3 group-hover:text-primary transition-colors">
                          {evento.title}
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground line-clamp-3 italic leading-relaxed">
                          "{evento.description}"
                        </p>
                      </div>

                      <div className="mt-6 flex items-center gap-2 font-bold text-sm text-primary group-hover:gap-4 transition-all">
                        Ver detalles completos
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-12 px-6 rounded-[2.5rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-center">
            <p className="text-muted-foreground font-medium italic">No hay eventos en esta categoría por ahora...</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-16">
        <WikiBreadcrumbs items={[{ label: "Eventos" }]} />
        <section className="mb-16">
          <Badge variant="outline" className="mb-4 border-primary-500 text-primary bg-primary/5 px-4 py-1">
            Centro de Actividades
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
            Calendario de Eventos
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Sigue de cerca las festividades de Heartopia. No te pierdas las recompensas temporales.
          </p>
        </section>

        {renderEventSection("En Curso", <PlayCircle className="h-5 w-5 text-primary" />, "active")}
        {renderEventSection("Próximos Anuncios", <Clock className="h-5 w-5 text-primary" />, "upcoming")}
        {renderEventSection("Historial", <History className="h-5 w-5 text-primary" />, "past")}
      </main>

      <Footer />
    </div>
  );
}
