"use client";

import React from "react"

import { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PECES, INSECTOS, AVES, ANIMALES, CULTIVOS, RECOLECTABLES, HABITANTES, RECETAS, LOGROS, CATEGORIES } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Fish, Bug, Bird, PawPrint, Sprout, TreeDeciduous, Trophy, ArrowRight, Users, ChefHat } from "lucide-react";

const allData = [
  { category: "peces", categoryName: "Peces", icon: Fish, data: PECES },
  { category: "insectos", categoryName: "Insectos", icon: Bug, data: INSECTOS },
  { category: "aves", categoryName: "Aves", icon: Bird, data: AVES },
  { category: "animales", categoryName: "Animales", icon: PawPrint, data: ANIMALES },
  { category: "cultivos", categoryName: "Cultivos", icon: Sprout, data: CULTIVOS },
  { category: "recolectables", categoryName: "Recolectables", icon: TreeDeciduous, data: RECOLECTABLES },
  { category: "logros", categoryName: "Logros", icon: Trophy, data: LOGROS },
];

const categoryColors: Record<string, string> = {
  peces: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  insectos: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  aves: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  animales: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  cultivos: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  recolectables: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
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

  const results = useMemo(() => {
    if (!search.trim()) return [];

    const searchLower = search.toLowerCase();
    const allResults: SearchResult[] = [];

    allData.forEach(({ category, categoryName, icon, data }) => {
      Object.entries(data).forEach(([name, itemData]) => {
        const nameMatch = name.toLowerCase().includes(searchLower);
        const locationMatch = (itemData as Record<string, unknown>).ubicacion && 
          String((itemData as Record<string, unknown>).ubicacion).toLowerCase().includes(searchLower);
        const typeMatch = (itemData as Record<string, unknown>).tipo && 
          String((itemData as Record<string, unknown>).tipo).toLowerCase().includes(searchLower);

        if (nameMatch || locationMatch || typeMatch) {
          allResults.push({
            name,
            category,
            categoryName,
            icon,
            data: itemData as Record<string, unknown>,
          });
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Search Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Buscar en la Wiki
          </h1>
          <p className="mb-6 text-muted-foreground">
            Busca cualquier item, criatura, cultivo o logro del juego
          </p>
          
          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Escribe para buscar... (ej: trucha, mariposa, tomate)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-14 pl-12 text-lg"
                autoFocus
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {search.trim() ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {results.length} resultado{results.length !== 1 ? "s" : ""} encontrado{results.length !== 1 ? "s" : ""}
              </p>
            </div>

            {results.length > 0 && (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6 flex-wrap h-auto gap-2">
                  <TabsTrigger value="all" className="gap-1.5">
                    Todos
                    <Badge variant="secondary" className="ml-1">{results.length}</Badge>
                  </TabsTrigger>
                  {allData.map(({ category, categoryName, icon: Icon }) => {
                    const count = resultsByCategory[category] || 0;
                    if (count === 0) return null;
                    return (
                      <TabsTrigger key={category} value={category} className="gap-1.5">
                        <Icon className="h-4 w-4" />
                        {categoryName}
                        <Badge variant="secondary" className="ml-1">{count}</Badge>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                <TabsContent value={activeTab} className="mt-0">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredResults.map((result) => {
                      const Icon = result.icon;
                      return (
                        <Link key={`${result.category}-${result.name}`} href={`/wiki/${result.category}`}>
                          <Card className="h-full transition-all hover:shadow-md group">
                            <CardHeader className="pb-2">
                              <div className="flex items-start justify-between gap-2">
                                <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors">
                                  {result.name}
                                </CardTitle>
                                <div className={`rounded-lg p-1.5 ${categoryColors[result.category]}`}>
                                  <Icon className="h-4 w-4" />
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <Badge variant="outline" className="text-xs">
                                {result.categoryName}
                              </Badge>
                              {result.data.ubicacion && (
                                <div className="flex items-start gap-2 text-sm">
                                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                                  <span className="text-muted-foreground line-clamp-2">
                                    {String(result.data.ubicacion)}
                                  </span>
                                </div>
                              )}
                              {result.data.requisito && (
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {String(result.data.requisito)}
                                </p>
                              )}
                              <div className="flex items-center text-xs text-primary pt-1 group-hover:text-primary/80">
                                Ver en {result.categoryName.toLowerCase()}
                                <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            )}

            {results.length === 0 && (
              <div className="rounded-xl border border-dashed border-border bg-card/50 py-16 text-center">
                <p className="text-lg font-medium text-muted-foreground">No se encontraron resultados</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Intenta con otros terminos de busqueda
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Quick Links when no search */
          <div className="space-y-8">
            <div className="text-center">
              <p className="text-muted-foreground">
                O explora las categorias directamente:
              </p>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {allData.map(({ category, categoryName, icon: Icon, data }) => (
                <Link key={category} href={`/wiki/${category}`}>
                  <Card className="h-full transition-all hover:shadow-md hover:-translate-y-0.5 group">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className={`rounded-xl p-3 ${categoryColors[category]}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {categoryName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {Object.keys(data).length} items
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
