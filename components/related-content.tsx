"use client";

import Link from "next/link";
import {
  Fish, Bug, Bird, PawPrint, Sprout, TreeDeciduous,
  Trophy, Users, ChefHat, Gift, ArrowRight, Sparkles,
} from "lucide-react";
import type { CategoryId } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  peces: Fish,
  insectos: Bug,
  aves: Bird,
  animales: PawPrint,
  cultivos: Sprout,
  recolectables: TreeDeciduous,
  logros: Trophy,
  habitantes: Users,
  recetas: ChefHat,
  codigos: Gift,
};

const categoryColors: Record<string, string> = {
  peces: "bg-blue-500/10 text-blue-600 border-blue-200 hover:bg-blue-500/20",
  insectos: "bg-amber-500/10 text-amber-600 border-amber-200 hover:bg-amber-500/20",
  aves: "bg-sky-500/10 text-sky-600 border-sky-200 hover:bg-sky-500/20",
  animales: "bg-orange-500/10 text-orange-600 border-orange-200 hover:bg-orange-500/20",
  cultivos: "bg-green-500/10 text-green-600 border-green-200 hover:bg-green-500/20",
  recolectables: "bg-emerald-500/10 text-emerald-600 border-emerald-200 hover:bg-emerald-500/20",
  habitantes: "bg-pink-500/10 text-pink-600 border-pink-200 hover:bg-pink-500/20",
  recetas: "bg-rose-500/10 text-rose-600 border-rose-200 hover:bg-rose-500/20",
  logros: "bg-indigo-500/10 text-indigo-600 border-indigo-200 hover:bg-indigo-500/20",
  codigos: "bg-cyan-500/10 text-cyan-600 border-cyan-200 hover:bg-cyan-500/20",
};

const relatedCategories: Record<CategoryId, { id: CategoryId; reason: string }[]> = {
  peces: [
    { id: "recetas", reason: "Usa tus peces en recetas de cocina" },
    { id: "logros", reason: "Desbloquea logros de pesca" },
    { id: "habitantes", reason: "Conoce a los NPCs pescadores" },
  ],
  insectos: [
    { id: "logros", reason: "Desbloquea logros de captura" },
    { id: "aves", reason: "Explora la fauna del pueblo" },
    { id: "recolectables", reason: "Recursos que encontraras al cazar" },
  ],
  aves: [
    { id: "insectos", reason: "Mas fauna para coleccionar" },
    { id: "logros", reason: "Logros de observacion de aves" },
    { id: "animales", reason: "Otros animales del pueblo" },
  ],
  animales: [
    { id: "aves", reason: "Mas fauna del pueblo" },
    { id: "habitantes", reason: "NPCs que cuidan animales" },
    { id: "cultivos", reason: "Alimentos para tus animales" },
  ],
  cultivos: [
    { id: "recetas", reason: "Cocina con tus cultivos" },
    { id: "recolectables", reason: "Recursos del mundo" },
    { id: "logros", reason: "Logros de jardineria" },
  ],
  recolectables: [
    { id: "cultivos", reason: "Semillas y mas para tu huerto" },
    { id: "recetas", reason: "Ingredientes para cocinar" },
    { id: "logros", reason: "Logros de recoleccion" },
  ],
  habitantes: [
    { id: "recetas", reason: "Recetas de los vecinos" },
    { id: "animales", reason: "Animales de compania" },
    { id: "logros", reason: "Logros sociales" },
  ],
  recetas: [
    { id: "peces", reason: "Ingredientes del mar" },
    { id: "cultivos", reason: "Ingredientes del huerto" },
    { id: "recolectables", reason: "Ingredientes recolectados" },
  ],
  logros: [
    { id: "peces", reason: "Pesca para completar logros" },
    { id: "insectos", reason: "Captura insectos para logros" },
    { id: "recetas", reason: "Cocina para logros culinarios" },
  ],
  codigos: [
    { id: "logros", reason: "Logros desbloqueables" },
    { id: "recetas", reason: "Materiales para cocinar" },
    { id: "cultivos", reason: "Semillas de regalo" },
  ],
};

const categoryNames: Record<CategoryId, string> = {
  peces: "Peces",
  insectos: "Insectos",
  aves: "Aves",
  animales: "Animales",
  cultivos: "Cultivos",
  recolectables: "Recolectables",
  habitantes: "Habitantes",
  recetas: "Recetas",
  logros: "Logros",
  codigos: "Codigos",
};

interface RelatedContentProps {
  currentCategory: CategoryId;
}

export function RelatedContent({ currentCategory }: RelatedContentProps) {
  const related = relatedCategories[currentCategory] || [];
  if (related.length === 0) return null;

  return (
    <section className="mt-16 mb-8">
      <div className="rounded-3xl border-2 border-dashed border-primary/15 bg-card/50 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-xl bg-primary/10 p-2.5">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-black text-foreground">
              Contenido Relacionado
            </h3>
            <p className="text-sm text-muted-foreground">
              Sigue explorando Heartopia
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map(({ id, reason }) => {
            const Icon = iconMap[id];
            return (
              <Link key={id} href={`/wiki/${id}`}>
                <div
                  className={`group flex items-center gap-4 rounded-2xl border p-4 transition-all hover:-translate-y-1 hover:shadow-lg ${categoryColors[id]}`}
                >
                  <div className="rounded-xl border bg-background/80 p-3 shadow-sm">
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-foreground">
                        {categoryNames[id]}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {reason}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/eventos"
            className="flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2.5 text-sm font-bold text-primary border border-primary/20 transition-all hover:bg-primary/20 hover:shadow-md"
          >
            <Sparkles className="h-4 w-4" />
            Ver tambien: Eventos Activos
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/guias"
            className="flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-bold text-foreground border border-border transition-all hover:bg-accent hover:shadow-md"
          >
            Guias y Tutoriales
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
