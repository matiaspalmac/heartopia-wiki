"use client";

import React, { useState, useMemo, useRef, useEffect, useTransition, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WikiBreadcrumbs } from "@/components/wiki-breadcrumbs";
import {
  PECES, INSECTOS, AVES, ANIMALES, CULTIVOS,
  RECOLECTABLES, HABITANTES, RECETAS, LOGROS, CODIGOS,
} from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search, MapPin, Fish, Bug, Bird, PawPrint,
  Sprout, TreeDeciduous, Trophy, ArrowRight,
  Users, ChefHat, X, Loader2, Gift, Sparkles,
} from "lucide-react";
import { useAnnieSearchTracker } from "@/components/annie-tooltip";

const SYNONYMS: Record<string, string[]> = {
  pez: ["peces", "pescado", "pescar", "pesca", "fish"],
  peces: ["pez", "pescado", "pescar", "pesca"],
  pescado: ["pez", "peces", "pescar", "pesca"],
  pesca: ["pez", "peces", "pescado", "pescar"],
  insecto: ["insectos", "bicho", "bichos", "bug"],
  insectos: ["insecto", "bicho", "bichos"],
  bicho: ["insecto", "insectos", "bichos"],
  ave: ["aves", "pajaro", "pajaros", "bird"],
  aves: ["ave", "pajaro", "pajaros"],
  pajaro: ["ave", "aves", "pajaros"],
  animal: ["animales", "mascota", "mascotas"],
  animales: ["animal", "mascota", "mascotas"],
  cultivo: ["cultivos", "planta", "plantas", "semilla", "semillas", "jardin"],
  cultivos: ["cultivo", "planta", "plantas", "semilla", "semillas"],
  planta: ["cultivo", "cultivos", "plantas", "semilla"],
  semilla: ["cultivo", "cultivos", "planta", "semillas"],
  receta: ["recetas", "cocina", "cocinar", "comida"],
  recetas: ["receta", "cocina", "cocinar", "comida"],
  cocina: ["receta", "recetas", "cocinar", "comida"],
  comida: ["receta", "recetas", "cocina"],
  logro: ["logros", "titulo", "titulos", "achievement"],
  logros: ["logro", "titulo", "titulos"],
  codigo: ["codigos", "code", "cupon"],
  codigos: ["codigo", "code", "cupon"],
  habitante: ["habitantes", "npc", "vecino", "vecinos", "personaje"],
  habitantes: ["habitante", "npc", "vecino", "vecinos", "personaje"],
  npc: ["habitante", "habitantes", "vecino", "personaje"],
  vecino: ["habitante", "habitantes", "npc"],
  recolectable: ["recolectables", "recurso", "recursos", "material", "materiales"],
  recolectables: ["recolectable", "recurso", "recursos", "material"],
  recurso: ["recolectable", "recolectables", "recursos", "material"],
  mar: ["oceano", "ocean", "marino", "marina", "playa"],
  oceano: ["mar", "marino", "marina", "playa"],
  rio: ["arroyo", "corriente"],
  lago: ["laguna", "estanque"],
  bosque: ["forestal", "arboleda", "selva"],
  noche: ["nocturno", "nocturna", "luna"],
  nocturno: ["noche", "nocturna", "luna"],
  dia: ["diurno", "diurna", "sol", "soleado"],
  raro: ["rara", "raros", "especial", "unico", "legendario"],
  flor: ["flores", "hibridacion", "hibrida"],
  flores: ["flor", "hibridacion", "hibrida"],
};

function expandSearch(term: string): string[] {
  const lower = term.toLowerCase();
  const synonyms = SYNONYMS[lower] || [];
  return [lower, ...synonyms];
}

const allData = [
  { category: "peces", categoryName: "Peces", icon: Fish, data: PECES, type: "NPC" as const },
  { category: "insectos", categoryName: "Insectos", icon: Bug, data: INSECTOS, type: "Fauna" as const },
  { category: "aves", categoryName: "Aves", icon: Bird, data: AVES, type: "Fauna" as const },
  { category: "animales", categoryName: "Animales", icon: PawPrint, data: ANIMALES, type: "Fauna" as const },
  { category: "cultivos", categoryName: "Cultivos", icon: Sprout, data: CULTIVOS, type: "Recurso" as const },
  { category: "recolectables", categoryName: "Recolectables", icon: TreeDeciduous, data: RECOLECTABLES, type: "Recurso" as const },
  { category: "habitantes", categoryName: "Habitantes", icon: Users, data: HABITANTES, type: "NPC" as const },
  { category: "recetas", categoryName: "Recetas", icon: ChefHat, data: RECETAS, type: "Recurso" as const },
  { category: "logros", categoryName: "Logros", icon: Trophy, data: LOGROS, type: "Logro" as const },
  { category: "codigos", categoryName: "Codigos", icon: Gift, data: CODIGOS, type: "Codigo" as const },
];

const filterTypes = [
  { id: "all", label: "Todos" },
  { id: "NPC", label: "NPC" },
  { id: "Fauna", label: "Fauna" },
  { id: "Recurso", label: "Recurso" },
  { id: "Logro", label: "Logro" },
  { id: "Codigo", label: "Codigo" },
];

const categoryColors: Record<string, string> = {
  peces: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  insectos: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  aves: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  animales: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  cultivos: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  recolectables: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  habitantes: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  recetas: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  logros: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  codigos: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
};

const ANNIE_SEARCH_TIPS = [
  "Busca \"nocturno\" para ver lo que aparece de noche.",
  "Prueba \"arcoiris\" para encontrar cosas raras.",
  "Intenta buscar por ubicacion, como \"Mar Viejo\".",
  "Tambien puedes buscar por tipo, como \"rio\" o \"lago\".",
  "Escribe \"raro\" para encontrar objetos especiales.",
];

interface SearchResult {
  name: string;
  category: string;
  categoryName: string;
  icon: React.ComponentType<{ className?: string }>;
  data: Record<string, unknown>;
  filterType: string;
}

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isPending, startTransition] = useTransition();
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [annieTip, setAnnieTip] = useState<string | null>(null);
  const { recordSearch: notifyAnnieSearch } = useAnnieSearchTracker();
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const allItemNames = useMemo(() => {
    const names: { name: string; category: string; categoryName: string }[] = [];
    allData.forEach(({ category, categoryName, data }) => {
      Object.keys(data).forEach((name) => {
        names.push({ name, category, categoryName });
      });
    });
    return names;
  }, []);

  const suggestions = useMemo(() => {
    if (!search.trim() || search.length < 2) return [];
    const searchLower = search.toLowerCase();
    return allItemNames
      .filter((item) => item.name.toLowerCase().includes(searchLower))
      .slice(0, 6);
  }, [search, allItemNames]);

  const results = useMemo(() => {
    if (!search.trim()) return [];
    const searchTerms = expandSearch(search.trim());
    const allResults: SearchResult[] = [];

    allData.forEach(({ category, categoryName, icon, data, type }) => {
      Object.entries(data).forEach(([name, itemData]) => {
        const item = itemData as Record<string, unknown>;
        const matches = searchTerms.some((term) => {
          return (
            name.toLowerCase().includes(term) ||
            category.toLowerCase().includes(term) ||
            categoryName.toLowerCase().includes(term) ||
            (item.ubicacion && String(item.ubicacion).toLowerCase().includes(term)) ||
            (item.tipo && String(item.tipo).toLowerCase().includes(term)) ||
            (item.rol && String(item.rol).toLowerCase().includes(term)) ||
            (item.descripcion && String(item.descripcion).toLowerCase().includes(term)) ||
            (item.ingredientes && String(item.ingredientes).toLowerCase().includes(term)) ||
            (item.categoria && String(item.categoria).toLowerCase().includes(term))
          );
        });

        if (matches) {
          allResults.push({ name, category, categoryName, icon, data: item, filterType: type });
        }
      });
    });
    return allResults;
  }, [search]);

  const filteredResults = useMemo(() => {
    let filtered = results;
    if (activeTab !== "all") {
      filtered = filtered.filter((r) => r.category === activeTab);
    }
    if (typeFilter !== "all") {
      filtered = filtered.filter((r) => r.filterType === typeFilter);
    }
    return filtered;
  }, [results, activeTab, typeFilter]);

  const resultsByCategory = useMemo(() => {
    const grouped: Record<string, number> = {};
    const base = typeFilter !== "all" ? results.filter((r) => r.filterType === typeFilter) : results;
    base.forEach((r) => {
      grouped[r.category] = (grouped[r.category] || 0) + 1;
    });
    return grouped;
  }, [results, typeFilter]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsTyping(true);
    setShowSuggestions(true);
    startTransition(() => {
      setSearch(value);
      setActiveTab("all");
      setTimeout(() => setIsTyping(false), 300);
    });
    if (value.trim().length >= 3) {
      notifyAnnieSearch();
    }
  }, [notifyAnnieSearch]);

  const applySuggestion = useCallback((name: string) => {
    setSearch(name);
    setShowSuggestions(false);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
  const tip =
    ANNIE_SEARCH_TIPS[
      Math.floor(Math.random() * ANNIE_SEARCH_TIPS.length)
    ];
  setAnnieTip(tip);
}, []);


  const synonymUsed = useMemo(() => {
    if (!search.trim()) return null;
    const lower = search.trim().toLowerCase();
    if (SYNONYMS[lower] && results.length > 0) {
      return lower;
    }
    return null;
  }, [search, results]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-12">
        <WikiBreadcrumbs items={[{ label: "Buscar" }]} />

        <div className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Explorar Heartopia
          </h1>

          <div className="mx-auto mt-4 max-w-lg flex items-center gap-3 rounded-2xl bg-primary/5 border border-primary/10 px-4 py-3">
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-primary/30">
              <Image src="/annie.jpg" alt="Annie" fill className="object-cover" />
            </div>
            <p className="text-sm text-muted-foreground text-left">
              <span className="font-bold text-primary">Annie:</span>{" "}
              {annieTip}
            </p>
          </div>

          <div className="mx-auto mt-6 max-w-2xl relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
              {isPending || isTyping ? (
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </div>
            <Input
              ref={inputRef}
              placeholder="Busca peces, habitantes, recetas, ubicaciones..."
              value={search}
              onChange={handleSearch}
              onFocus={() => setShowSuggestions(true)}
              className="h-14 pl-12 pr-12 text-lg shadow-lg focus-visible:ring-primary rounded-2xl border-primary/10 transition-all"
              autoFocus
              aria-label="Buscar en la wiki"
              autoComplete="off"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setShowSuggestions(false);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 transition-colors"
                aria-label="Limpiar busqueda"
              >
                <X className="h-5 w-5" />
              </button>
            )}

            {showSuggestions && suggestions.length > 0 && search.length >= 2 && (
              <div
                ref={suggestionsRef}
                className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl border bg-card shadow-2xl shadow-primary/5 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <div className="px-4 py-2 border-b bg-muted/30">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Sugerencias
                  </p>
                </div>
                {suggestions.map((item) => (
                  <button
                    key={`${item.category}-${item.name}`}
                    onClick={() => applySuggestion(item.name)}
                    className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-primary/5 transition-colors border-b border-border/30 last:border-0"
                  >
                    <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-bold text-foreground truncate block">
                        {item.name}
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`shrink-0 text-[10px] ${categoryColors[item.category] || ""}`}
                    >
                      {item.categoryName}
                    </Badge>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mx-auto mt-4 max-w-2xl flex flex-wrap items-center justify-center gap-2">
            {filterTypes.map((ft) => (
              <button
                key={ft.id}
                onClick={() => setTypeFilter(ft.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold border transition-all ${
                  typeFilter === ft.id
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {ft.label}
              </button>
            ))}
          </div>
        </div>

        {synonymUsed && (
          <div className="mb-6 flex items-center gap-2 rounded-xl bg-accent/20 border border-accent/30 px-4 py-2.5 mx-auto max-w-2xl animate-in fade-in duration-300">
            <Sparkles className="h-4 w-4 text-primary shrink-0" />
            <p className="text-sm text-muted-foreground">
              Buscando tambien por sinonimos de{" "}
              <span className="font-bold text-foreground">&quot;{synonymUsed}&quot;</span>
            </p>
          </div>
        )}

        {search.trim() ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            {isPending || isTyping ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filteredResults.length > 0 ? (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-8 flex h-auto flex-wrap justify-center gap-2 bg-transparent p-0">
                  <TabsTrigger
                    value="all"
                    className="rounded-full border bg-card shadow-sm px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                  >
                    Todos{" "}
                    <Badge variant="secondary" className="ml-2 bg-muted/50">
                      {typeFilter !== "all"
                        ? results.filter((r) => r.filterType === typeFilter).length
                        : results.length}
                    </Badge>
                  </TabsTrigger>
                  {allData.map(({ category, categoryName, icon: Icon }) => {
                    const count = resultsByCategory[category] || 0;
                    if (count === 0) return null;
                    return (
                      <TabsTrigger
                        key={category}
                        value={category}
                        className="rounded-full border bg-card shadow-sm px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {categoryName}
                        <Badge variant="secondary" className="ml-2 bg-muted/50">
                          {count}
                        </Badge>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                <TabsContent value={activeTab} className="mt-0 outline-none">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredResults.map((result) => (
                      <SearchResultCard
                        key={`${result.category}-${result.name}`}
                        result={result}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <NoResults />
            )}
          </div>
        ) : (
          <QuickLinks />
        )}
      </main>

      <Footer />
    </div>
  );
}

function SearchResultCard({ result }: { result: SearchResult }) {
  const Icon = result.icon;
  return (
    <Link href={`/wiki/${result.category}`} className="block h-full">
      <Card className="group h-full border-primary/5 transition-all duration-300 hover:-translate-y-2 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/10 overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
              {result.name}
            </CardTitle>
            <div
              className={`rounded-xl p-2 shrink-0 ${categoryColors[result.category]}`}
            >
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Badge variant="outline" className="font-medium bg-secondary/30">
            {result.categoryName}
          </Badge>

          {result.data.ubicacion && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary/60" />
              <span className="line-clamp-2">
                {String(result.data.ubicacion)}
              </span>
            </div>
          )}

          <div className="flex items-center text-xs font-bold text-primary pt-2 border-t border-primary/5 mt-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
            DETALLES COMPLETOS
            <ArrowRight className="ml-1 h-3 w-3" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <Card className="h-[180px] border-primary/5 space-y-3 p-4">
      <div className="flex justify-between items-start">
        <Skeleton className="h-6 w-3/4 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-xl" />
      </div>
      <Skeleton className="h-5 w-20 rounded-full" />
      <div className="space-y-2 pt-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </Card>
  );
}

function QuickLinks() {
  return (
    <div className="space-y-10 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase text-muted-foreground">
          <span className="bg-background px-4 tracking-widest font-semibold">
            Explora las colecciones
          </span>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {allData.map(({ category, categoryName, icon: Icon, data }) => (
          <Link key={category} href={`/wiki/${category}`}>
            <Card className="transition-all hover:bg-accent hover:shadow-md hover:-translate-y-1 group border-none bg-card/50">
              <CardContent className="flex items-center gap-4 p-5">
                <div
                  className={`rounded-2xl p-3 shadow-sm ${categoryColors[category]}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {categoryName}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium">
                    {Object.keys(data).length} items
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          href="/eventos"
          className="flex items-center gap-2 rounded-full bg-primary/10 px-6 py-3 text-sm font-bold text-primary border border-primary/20 transition-all hover:bg-primary/20 hover:shadow-md"
        >
          <Sparkles className="h-4 w-4" />
          Ver tambien: Eventos Activos
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/guias"
          className="flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-foreground border border-border transition-all hover:bg-accent hover:shadow-md"
        >
          Guias y Tutoriales
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function NoResults() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-muted bg-card/30 py-24 text-center">
      <div className="relative mx-auto mb-6">
        <div className="rounded-full bg-muted p-6">
          <Search className="h-10 w-10 text-muted-foreground/30" />
        </div>
        <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full border-2 border-card overflow-hidden">
          <Image src="/annie.jpg" alt="Annie" fill className="object-cover" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-foreground">Sin coincidencias</h3>
      <p className="mt-2 text-muted-foreground max-w-xs mx-auto">
        Prueba con palabras clave como &quot;oceano&quot;, &quot;raro&quot; o &quot;nocturno&quot;. Tambien puedo buscar por sinonimos.
      </p>
    </div>
  );
}
