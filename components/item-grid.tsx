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
  Briefcase, TrendingUp, Info
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
  costo?: number | null;
  energia?: number | null;
  valores?: number[];
  nivel_receta?: number | string;
  categoria?: string;
  titulo_recompensa?: string;
  consejos?: string;
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
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-4">
        {data.imagen && (
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-primary/10 bg-muted/50 shadow-sm flex items-center justify-center p-1">
            <img 
              src={data.imagen} 
              alt={name}
              className="h-full w-full object-contain transition-transform hover:scale-110"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        )}
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <span className="text-muted-foreground">{safeStr(data.ubicacion)}</span>
          </div>
          
          {data.comida_favorita && (
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                <Heart className="h-3 w-3 text-rose-400 fill-rose-400" />
                <span>Favoritos</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {safeArr(data.comida_favorita).map((food) => (
                  <Badge key={food} variant="secondary" className="text-[10px] px-2 py-0">
                    {food}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {data.clima_preferido && (
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-dashed">
          {safeArr(data.clima_preferido).map((c) => (
            <div key={c} className="flex items-center gap-1 rounded-full bg-blue-50 text-blue-600 px-2 py-1 text-[10px] font-medium border border-blue-100">
              {weatherIcons[c] || <Sun className="h-3 w-3" />}
              <span>{c}</span>
            </div>
          ))}
        </div>
      )}
    </div>
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
        return (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <Badge variant="outline" className="text-[10px] uppercase border-primary/20 text-primary">
                Lv. {data.nivel || "1"}
              </Badge>
              <Badge className="text-[10px] uppercase bg-primary/10 text-primary border-none">
                {safeStr(data.rareza) || "Comun"}
              </Badge>
            </div>
            <div className="flex items-start gap-2.5 text-sm p-2 rounded-xl bg-muted/30 border border-border/40">
              <ChefHat className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground leading-tight">{safeStr(data.ingredientes)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {data.valor != null && (
                <div className="rounded-xl bg-amber-50/50 border border-amber-100 p-2">
                  <p className="text-[10px] text-amber-600/80 font-bold uppercase tracking-wider">Venta</p>
                  <p className="font-bold text-amber-700 flex items-center gap-1">
                    <Coins className="h-3.5 w-3.5" />
                    {safeStr(data.valor)}
                  </p>
                </div>
              )}
              
              {data.energia != null && (
                <div className="rounded-xl bg-emerald-50/50 border border-emerald-100 p-2">
                  <p className="text-[10px] text-emerald-600/80 font-bold uppercase tracking-wider">Energía</p>
                  <p className="font-bold text-emerald-700 flex items-center gap-1">
                    <Zap className="h-3.5 w-3.5" />
                    +{safeStr(data.energia)}
                  </p>
                </div>
              )}
            </div>
            {data.valor && data.costo && (
              <div className="px-2 py-1.5 rounded-lg border border-dashed border-border flex justify-between items-center">
                <span className="text-[10px] text-muted-foreground uppercase font-medium">Ganancia Est.</span>
                <span className="text-xs font-bold text-green-600">
                  +{(Number(data.valor) - Number(data.costo))}
                </span>
              </div>
            )}
          </div>
        );
        case "recetas":
        return (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Lv. {data.nivel}</span>
              </div>
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 capitalize">
                {safeStr(data.rareza)}
              </Badge>
            </div>

            <div className="bg-muted/30 p-3 rounded-2xl border border-border/50">
              <p className="text-[10px] uppercase font-bold text-muted-foreground/60 mb-1">Ingredientes Necesarios</p>
              <p className="text-sm text-foreground/90 leading-snug">{safeStr(data.ingredientes)}</p>
            </div>

            {data.valores && (
              <div className="space-y-2">
                <p className="text-[10px] uppercase font-bold text-amber-600 tracking-tighter">Precios de Venta por Calidad</p>
                <div className="grid grid-cols-5 gap-1">
                  {data.valores.map((precio, index) => (
                    <div key={index} className="flex flex-col items-center bg-amber-50/50 rounded-lg py-1.5 border border-amber-100">
                      <div className="flex items-center text-[9px] text-amber-500 mb-0.5">
                        {index + 1}<Star className="h-2 w-2 fill-current" />
                      </div>
                      <span className="text-[11px] font-bold text-amber-900">{precio}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data.costo && data.valores && (
              <div className="flex items-center justify-between pt-3 border-t border-dashed border-border">
                <div className="text-[10px] text-muted-foreground">
                  Costo: <span className="font-mono text-foreground">{data.costo}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <TrendingUp className="h-3 w-3" />
                  Ganancia Máx: +{data.valores[4] - data.costo}
                </div>
              </div>
            )}
          </div>
        );

      case "logros":
        const getCategoryStyles = (cat) => {
          if (cat?.includes("Oculto")) return "border-slate-200 bg-slate-50 text-slate-600";
          if (cat?.includes("Pesca")) return "border-blue-100 bg-blue-50 text-blue-600";
          if (cat?.includes("Insectos")) return "border-amber-100 bg-amber-50 text-amber-600";
          if (cat?.includes("Aves")) return "border-sky-100 bg-sky-50 text-sky-600";
          if (cat?.includes("Jardinería")) return "border-emerald-100 bg-emerald-50 text-emerald-600";
          if (cat?.includes("Estacional")) return "border-orange-100 bg-orange-50 text-orange-600";
          return "border-purple-100 bg-purple-50 text-purple-600";
        };
        const categoryStyle = getCategoryStyles(data.categoria);
        return (
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border p-2 shadow-sm flex items-center justify-center ${categoryStyle}`}>
                {data.imagen ? (
                  <img 
                    src={data.imagen} 
                    alt={name} 
                    className="h-full w-full object-contain drop-shadow-md"
                    onError={(e) => { (e.target).style.display = 'none'; }}
                  />
                ) : (
                  <Award className="h-10 w-10 opacity-40" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Badge variant="outline" className={`text-[10px] uppercase font-bold border-none px-0 ${categoryStyle.split(' ')[2]}`}>
                  {safeStr(data.categoria)}
                </Badge>
                <div className="flex items-start gap-2 text-sm leading-snug">
                  <span className="text-foreground font-semibold">{safeStr(data.requisito)}</span>
                </div>
              </div>
            </div>
            {data.titulo_recompensa && (
              <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-100">
                <p className="text-[10px] uppercase tracking-wider text-purple-600/70 font-bold flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" /> Título de Recompensa
                </p>
                <span className="text-sm font-black text-indigo-700">
                  {safeStr(data.titulo_recompensa)}
                </span>
              </div>
            )}
            {data.consejos && (
              <div className="rounded-xl bg-muted/40 p-3 border border-border/50">
                <div className="flex items-center gap-2 mb-1">
                  <Info className="h-3 w-3 text-muted-foreground" />
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-tight">Consejo Pro</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  "{safeStr(data.consejos)}"
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