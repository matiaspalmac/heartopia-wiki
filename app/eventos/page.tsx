"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  ArrowRight, 
  Clock, 
  History, 
  PlayCircle,
  Hourglass
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const EVENTOS = [
  {
    id: "festival-invierno",
    title: "Festival de Invierno 2026",
    status: "En Curso",
    date: "Quedan 36 días",
    image: "/eventos/invierno.jpg", 
    color: "bg-blue-500",
    description: "¡La nieve cubrió Heartopia! Aprovecha las últimas semanas para coleccionar tickets de nieve y canjear la colección completa de pingüinos.",
    href: "/eventos/eventoinvierno",
    type: "active"
  },
  {
    id: "mlp-collab",
    title: "Colaboración: My Little Pony",
    status: "Próximamente",
    date: "Inicia el 14 de Febrero",
    image: "/eventos/mlp.jpg",
    color: "bg-pink-400",
    description: "¡La magia de la amistad llega a Heartopia! Empuña los Elementos de la Armonía y despierta el Árbol de la Armonía en este evento limitado con exhibiciones y objetos exclusivos.",
    href: "/eventos/eventomlp",
    type: "upcoming"
  },
  {
    id: "gilded-acorn-forestbell",
    title: "Exhibición Bellota Dorada: Hechizo Forestbell",
    status: "Próximamente",
    date: "Lanzamiento: 7 de Febrero",
    image: "/eventos/forestbell.jpg",
    color: "bg-amber-600",
    description: "Susurra el encantamiento en tu corazón y viaja a nuestra tierra de ensueño prometida. No te pierdas la nueva Exhibición de la Bellota Dorada.",
    href: "/eventos/eventoforestbell",
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
                        <div className="flex items-center gap-2 text-primary mb-2">
                          <Hourglass className="h-4 w-4 animate-spin-slow" />
                          <span className="text-sm font-bold uppercase tracking-tighter">{evento.date}</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black mb-3 group-hover:text-primary transition-colors">
                          {evento.title}
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground line-clamp-3 italic leading-relaxed">
                          "{evento.description}"
                        </p>
                      </div>

                      <div className="mt-6 flex items-center gap-2 font-bold text-sm text-primary group-hover:gap-4 transition-all">
                        {evento.type === 'upcoming' ? 'Más información próximamente' : 'Explorar detalles del evento'} 
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
        <section className="mb-16">
          <Badge variant="outline" className="mb-4 border-primary-500 text-primary bg-primary/5 px-4 py-1">
            Centro de Actividades
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
            Calendario de Eventos
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Sigue de cerca las festividades de Heartopia Chile. No te pierdas las recompensas temporales.
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