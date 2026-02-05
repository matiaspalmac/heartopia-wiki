"use client";

import React, { useState, useMemo, useEffect, useTransition } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { 
  PECES, INSECTOS, AVES, ANIMALES, CULTIVOS, 
  RECOLECTABLES, HABITANTES, RECETAS, LOGROS, CODIGOS
} from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Search, MapPin, Fish, Bug, Bird, PawPrint, 
  Sprout, TreeDeciduous, Trophy, ArrowRight, 
  Users, ChefHat, X, Loader2 
} from "lucide-react";

const allData = [
  { category: "peces", categoryName: "Peces", icon: Fish, data: PECES },
  { category: "insectos", categoryName: "Insectos", icon: Bug, data: INSECTOS },
  { category: "aves", categoryName: "Aves", icon: Bird, data: AVES },
  { category: "animales", categoryName: "Animales", icon: PawPrint, data: ANIMALES },
  { category: "cultivos", categoryName: "Cultivos", icon: Sprout, data: CULTIVOS },
  { category: "recolectables", categoryName: "Recolectables", icon: TreeDeciduous, data: RECOLECTABLES },
  { category: "habitantes", categoryName: "Habitantes", icon: Users, data: HABITANTES },
  { category: "recetas", categoryName: "Recetas", icon: ChefHat, data: RECETAS },
  { category: "logros", categoryName: "Logros", icon: Trophy, data: LOGROS },
  { category: "codigos", categoryName: "Códigos", icon: Trophy, data: CODIGOS },
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
};

interface SearchResult {
  name: string;
  category: string;
  categoryName: string;
  icon: React.ComponentType<{ className?: string }>;
  data: Record<string, unknown>;
}

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isPending, startTransition] = useTransition();
  const [isTyping, setIsTyping] = useState(false);

  const results = useMemo(() => {
    if (!search.trim()) return [];
    const searchLower = search.toLowerCase();
    const allResults: SearchResult[] = [];

    allData.forEach(({ category, categoryName, icon, data }) => {
      Object.entries(data).forEach(([name, itemData]) => {
        const item = itemData as Record<string, unknown>;
        const matches = 
          name.toLowerCase().includes(searchLower) ||
          (item.ubicacion && String(item.ubicacion).toLowerCase().includes(searchLower)) ||
          (item.tipo && String(item.tipo).toLowerCase().includes(searchLower));

        if (matches) {
          allResults.push({ name, category, categoryName, icon, data: item });
        }
      });
    });
    return allResults;
  }, [search]);

  const filteredResults = useMemo(() => {
    if (activeTab === "all") return results;
    return results.filter(r => r.category === activeTab);
  }, [results, activeTab]);

  const resultsByCategory = useMemo(() => {
    const grouped: Record<string, number> = {};
    results.forEach(r => {
      grouped[r.category] = (grouped[r.category] || 0) + 1;
    });
    return grouped;
  }, [results]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsTyping(true);
    startTransition(() => {
      setSearch(value);
      setActiveTab("all");
      setTimeout(() => setIsTyping(false), 300);
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Explorar Heartopia
          </h1>
          
          <div className="mx-auto mt-8 max-w-2xl relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
              {isPending || isTyping ? (
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </div>
            <Input
              placeholder="Busca peces, habitantes, recetas..."
              value={search}
              onChange={handleSearch}
              className="h-14 pl-12 pr-12 text-lg shadow-lg focus-visible:ring-primary rounded-2xl border-primary/10 transition-all"
              autoFocus
            />
            {search && (
              <button 
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {search.trim() ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            {isPending || isTyping ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : results.length > 0 ? (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-8 flex h-auto flex-wrap justify-center gap-2 bg-transparent p-0">
                  <TabsTrigger 
                    value="all" 
                    className="rounded-full border bg-card shadow-sm px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                  >
                    Todos <Badge variant="secondary" className="ml-2 bg-muted/50">{results.length}</Badge>
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
                        <Badge variant="secondary" className="ml-2 bg-muted/50">{count}</Badge>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                <TabsContent value={activeTab} className="mt-0 outline-none">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredResults.map((result) => (
                      <SearchResultCard key={`${result.category}-${result.name}`} result={result} />
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
            <div className={`rounded-xl p-2 shrink-0 ${categoryColors[result.category]}`}>
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
              <span className="line-clamp-2">{String(result.data.ubicacion)}</span>
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
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
        <div className="relative flex justify-center text-xs uppercase text-muted-foreground">
          <span className="bg-background px-4 tracking-widest font-semibold">Explora las colecciones</span>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {allData.map(({ category, categoryName, icon: Icon, data }) => (
          <Link key={category} href={`/wiki/${category}`}>
            <Card className="transition-all hover:bg-accent hover:shadow-md hover:-translate-y-1 group border-none bg-card/50">
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`rounded-2xl p-3 shadow-sm ${categoryColors[category]}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {categoryName}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium">
                    {Object.keys(data).length} ítems
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

function NoResults() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-muted bg-card/30 py-24 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        <Search className="h-10 w-10 text-muted-foreground/30" />
      </div>
      <h3 className="text-2xl font-bold text-foreground">Sin coincidencias</h3>
      <p className="mt-2 text-muted-foreground max-w-xs mx-auto">
        Prueba con palabras clave como "océano", "raro" o "nocturno".
      </p>
    </div>
  );
}