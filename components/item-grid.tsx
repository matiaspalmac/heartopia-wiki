"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CategoryId } from "@/lib/data";
import { 
  MapPin, Clock, Sun, CloudRain, Rainbow, Moon, Sunrise, Sunset, 
  Star, Timer, Coins, Zap, Heart, Award, Search, X, Users, ChefHat,
  Briefcase
} from "lucide-react";

type BaseData = {
  ubicacion?: string;
  nivel?: number;
  tipo?: string;
  clima?: string[];
  horario?: string[];
  clima_preferido?: string[];
  comida_favorita?: string[];
  tiempo_crecimiento?: string;
  nivel_jardineria?: number | string;
  compra_semilla?: number | string;
  venta_semilla?: number | string;
  precio_venta?: number | string;
  ganancia_energia?: number | null;
  rol?: string;
  descripcion?: string;
  rareza?: string;
  ingredientes?: string;
  valor?: number | null;
  requisito?: string;
  titulo?: string;
  nota?: string;
  actividad?: string;
  imagen?: string;
  nombre?: string;
};

type ItemData = BaseData;

interface ItemGridProps {
  items: [string, ItemData][];
  categoryId: CategoryId;
}

const weatherIcons: Record<string, React.ReactNode> = {
  "Soleado": <Sun className="h-4 w-4 text-amber-500" />,
  "Lluvioso": <CloudRain className="h-4 w-4 text-blue-500" />,
  "Arcoiris": <Rainbow className="h-4 w-4 text-purple-500" />,
  "Arcoíris": <Rainbow className="h-4 w-4 text-purple-500" />,
};

const timeIcons: Record<string, React.ReactNode> = {
  "Noche": <Moon className="h-4 w-4 text-indigo-400" />,
  "Amanecer": <Sunrise className="h-4 w-4 text-orange-400" />,
  "Dia": <Sun className="h-4 w-4 text-yellow-500" />,
  "Día": <Sun className="h-4 w-4 text-yellow-500" />,
  "Atardecer": <Sunset className="h-4 w-4 text-rose-400" />,
};

function renderStars(level: number | undefined) {
  if (typeof level !== 'number') return null;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: Math.min(level, 10) }).map((_, i) => (
        <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function ItemCard({ name, data, categoryId }: { name: string; data: ItemData; categoryId: CategoryId }) {
  const safeStr = (v: unknown): string => {
    if (typeof v === 'string' || typeof v === 'number') return String(v);
    return '—';
  };
  const safeNum = (v: unknown): number | undefined => typeof v === 'number' ? v : undefined;
  const safeArr = <T = string>(v: unknown): T[] => Array.isArray(v) ? v as T[] : [];

  const renderContent = () => {
    switch (categoryId) {
      case "peces":
      case "insectos":
      case "aves":
        return (
          <>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{safeStr(data.ubicacion)}</span>
            </div>
            {data.nivel != null && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Nivel {safeStr(data.nivel)}</span>
                {renderStars(safeNum(data.nivel))}
              </div>
            )}
            {data.tipo && (
              <Badge variant="outline" className="w-fit text-xs">
                {safeStr(data.tipo)}
              </Badge>
            )}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {safeArr(data.clima).map((c) => (
                <div key={c} className="flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs">
                  {weatherIcons[c] || null}
                  <span>{c}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {safeArr(data.horario).map((h) => (
                <div key={h} className="flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs">
                  {timeIcons[h] || <Clock className="h-3 w-3" />}
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </>
        );
      
      case "animales":
        return (
          <>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{safeStr(data.ubicacion)}</span>
            </div>
            {data.comida_favorita && (
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Heart className="h-4 w-4 text-rose-400" />
                  <span>Comida favorita:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {safeArr(data.comida_favorita).map((food) => (
                    <Badge key={food} variant="secondary" className="text-xs">
                      {food}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {data.clima_preferido && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {safeArr(data.clima_preferido).map((c) => (
                  <div key={c} className="flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs">
                    {weatherIcons[c] || null}
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        );
      
      case "cultivos":
        return (
          <>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{safeStr(data.tiempo_crecimiento)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-400" />
                <span className="text-muted-foreground">Nivel {safeStr(data.nivel_jardineria)}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm pt-2">
              <div className="rounded-lg bg-secondary/50 p-2">
                <p className="text-xs text-muted-foreground">Compra semilla</p>
                <p className="font-semibold text-foreground flex items-center gap-1">
                  <Coins className="h-3.5 w-3.5 text-amber-500" />
                  {safeStr(data.compra_semilla)}
                </p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-2">
                <p className="text-xs text-muted-foreground">Venta semilla</p>
                <p className="font-semibold text-foreground flex items-center gap-1">
                  <Coins className="h-3.5 w-3.5 text-amber-500" />
                  {safeStr(data.venta_semilla)}
                </p>
              </div>
            </div>
          </>
        );
      
      case "recolectables":
        return (
          <>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{safeStr(data.ubicacion)}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm pt-2">
              <div className="rounded-lg bg-secondary/50 p-2">
                <p className="text-xs text-muted-foreground">Precio venta</p>
                <p className="font-semibold text-foreground flex items-center gap-1">
                  <Coins className="h-3.5 w-3.5 text-amber-500" />
                  {safeStr(data.precio_venta)}
                </p>
              </div>
              {data.ganancia_energia != null && (
                <div className="rounded-lg bg-secondary/50 p-2">
                  <p className="text-xs text-muted-foreground">Energia</p>
                  <p className="font-semibold text-foreground flex items-center gap-1">
                    <Zap className="h-3.5 w-3.5 text-yellow-500" />
                    +{safeStr(data.ganancia_energia)}
                  </p>
                </div>
              )}
            </div>
          </>
        );

case "habitantes":
        return (
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              {data.imagen && (
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-primary/20 bg-[#f8f0f0] shadow-sm">
                  <img 
                    src={data.imagen} 
                    alt={name} 
                    /* Explicación del cambio:
                       - object-cover: Llena el círculo completamente.
                       - scale-150: Hace zoom para que el personaje no se vea pequeño.
                       - object-top: Asegura que veamos la cabeza y no los pies.
                    */
                    className="h-full w-full object-cover object-top scale-[1.35] transition-transform duration-300 hover:scale-[1.5]"
                    onError={(e) => { 
                      (e.target as HTMLImageElement).style.display = 'none'; 
                    }}
                  />
                </div>
              )}
              <div className="flex flex-col gap-2 flex-1">
                <Badge className="w-fit bg-rose-100 text-rose-600 border-rose-200 hover:bg-rose-200 shadow-none capitalize">
                  <Briefcase className="h-3 w-3 mr-1" />
                  {safeStr(data.rol)}
                </Badge>
                
                <div className="flex items-start gap-2 text-[13px] leading-relaxed">
                  <Users className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-muted-foreground italic">
                    "{safeStr(data.descripcion)}"
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs pt-3 border-t border-dashed border-rose-200">
              <MapPin className="h-3.5 w-3.5 text-rose-400 shrink-0" />
              <span className="font-medium text-muted-foreground">{safeStr(data.ubicacion)}</span>
            </div>
          </div>
        );

      case "recetas":
        return (
          <>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {safeStr(data.rareza) || "Comun"}
              </Badge>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <ChefHat className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{safeStr(data.ingredientes)}</span>
            </div>
            {data.valor != null && (
              <div className="rounded-lg bg-secondary/50 p-2 mt-2">
                <p className="text-xs text-muted-foreground">Valor de venta</p>
                <p className="font-semibold text-foreground flex items-center gap-1">
                  <Coins className="h-3.5 w-3.5 text-amber-500" />
                  {safeStr(data.valor)}
                </p>
              </div>
            )}
          </>
        );

      case "logros":
        return (
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-4">
              {data.imagen && (
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-purple-100 bg-purple-50/50 p-2 shadow-sm">
                  <img 
                    src={data.imagen} 
                    alt={name} 
                    className="h-full w-full object-contain drop-shadow-md"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              )}
              <div className="flex-1 space-y-1.5">
                <div className="flex items-start gap-2 text-sm leading-snug">
                  <Award className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground font-medium">{safeStr(data.requisito)}</span>
                </div>
                
                {data.titulo && (
                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-bold">Título Ganado</p>
                    <Badge className="w-fit bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-none shadow-sm text-xs py-0.5">
                      {safeStr(data.titulo)}
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            {data.nota && (
              <div className="mt-1 rounded-lg bg-secondary/30 px-2 py-1.5">
                <p className="text-[11px] text-muted-foreground/80 italic text-center">
                  Original: {safeStr(data.nota)}
                </p>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {renderContent()}
      </CardContent>
    </Card>
  );
}

export function ItemGrid({ items, categoryId }: ItemGridProps) {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const types = useMemo(() => {
    const typeSet = new Set<string>();
    items.forEach(([_, data]) => {
      if (data.tipo) typeSet.add(String(data.tipo));
    });
    return Array.from(typeSet).sort();
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter(([name, data]) => {
      const searchLower = search.toLowerCase();
      const matchesSearch = name.toLowerCase().includes(searchLower) ||
        (data.ubicacion && String(data.ubicacion).toLowerCase().includes(searchLower)) ||
        (data.tipo && String(data.tipo).toLowerCase().includes(searchLower));
      
      if (!matchesSearch) return false;
      if (levelFilter !== "all" && data.nivel != null) {
        const level = Number(data.nivel);
        if (levelFilter === "low" && level > 3) return false;
        if (levelFilter === "mid" && (level < 4 || level > 6)) return false;
        if (levelFilter === "high" && level < 7) return false;
      }

      if (typeFilter !== "all" && data.tipo && String(data.tipo) !== typeFilter) {
        return false;
      }

      return true;
    });
  }, [items, search, levelFilter, typeFilter]);

  const hasFilters = search || levelFilter !== "all" || typeFilter !== "all";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-xl bg-card p-4 shadow-sm sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o ubicacion..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            aria-label="Buscar ítems"
          />
        </div>
        
        {(categoryId === "peces" || categoryId === "insectos" || categoryId === "aves") && (
          <>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full sm:w-40" aria-label="Filtro de nivel">
                <SelectValue placeholder="Nivel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los niveles</SelectItem>
                <SelectItem value="low">Nivel 1-3</SelectItem>
                <SelectItem value="mid">Nivel 4-6</SelectItem>
                <SelectItem value="high">Nivel 7-10</SelectItem>
              </SelectContent>
            </Select>

            {types.length > 0 && (
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-40" aria-label="Filtro de tipo">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSearch("");
            setLevelFilter("all");
            setTypeFilter("all");
          }}
          className="gap-1.5"
          disabled={!hasFilters}
        >
          <X className="h-4 w-4" />
          Limpiar
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Mostrando {filteredItems.length} de {items.length} items
        </p>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map(([name, data]) => (
            <ItemCard 
              key={name}
              name={name} 
              data={data} 
              categoryId={categoryId} 
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-card/50 py-16 text-center">
          <p className="text-lg font-medium text-muted-foreground">No se encontraron resultados</p>
          <p className="mt-1 text-sm text-muted-foreground">Intenta con otros terminos de busqueda</p>
        </div>
      )}
    </div>
  );
}