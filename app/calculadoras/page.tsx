"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Coins, Timer, Sprout, ChefHat, Fish, Bug } from "lucide-react";
import { CULTIVOS, RECETAS } from "@/lib/data";

export default function CalculadorasPage() {
  const [cultivoSeleccionado, setCultivoSeleccionado] = useState<string>("");
  const [cantidadCultivos, setCantidadCultivos] = useState<number>(1);
  const [recetaSeleccionada, setRecetaSeleccionada] = useState<string>("");
  const [cantidadRecetas, setCantidadRecetas] = useState<number>(1);
  const [precioVenta, setPrecioVenta] = useState<number>(0);
  const [cantidadItems, setCantidadItems] = useState<number>(1);

  const cultivoData = cultivoSeleccionado ? CULTIVOS[cultivoSeleccionado as keyof typeof CULTIVOS] : null;
  const recetaData = recetaSeleccionada ? RECETAS[recetaSeleccionada as keyof typeof RECETAS] : null;

  const calcularGananciaCultivo = () => {
    if (!cultivoData) return { inversion: 0, ganancia: 0, beneficio: 0 };
    const inversion = Number(cultivoData.compra_semilla) * cantidadCultivos;
    const venta = Number(cultivoData.venta_semilla) * cantidadCultivos * 4; // Asumiendo 4 cosechas promedio
    return {
      inversion,
      ganancia: venta,
      beneficio: venta - inversion
    };
  };

  const calcularGananciaReceta = () => {
    if (!recetaData || !recetaData.valor) return { total: 0 };
    return {
      total: Number(recetaData.valor) * cantidadRecetas
    };
  };

  const calcularVentaAlbert = () => {
    return {
      total: precioVenta * cantidadItems,
      conBonus: Math.floor(precioVenta * cantidadItems * 1.1) // 10% bonus ejemplo
    };
  };

  const gananciasCultivo = calcularGananciaCultivo();
  const gananciasReceta = calcularGananciaReceta();
  const ventaAlbert = calcularVentaAlbert();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-xl bg-primary/10 p-3">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Calculadoras</h1>
              <p className="text-muted-foreground">Herramientas para calcular ganancias y recursos</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="cultivos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="cultivos" className="gap-2">
              <Sprout className="h-4 w-4" />
              <span className="hidden sm:inline">Cultivos</span>
            </TabsTrigger>
            <TabsTrigger value="recetas" className="gap-2">
              <ChefHat className="h-4 w-4" />
              <span className="hidden sm:inline">Recetas</span>
            </TabsTrigger>
            <TabsTrigger value="venta" className="gap-2">
              <Coins className="h-4 w-4" />
              <span className="hidden sm:inline">Venta</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cultivos" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sprout className="h-5 w-5 text-green-500" />
                    Calculadora de Cultivos
                  </CardTitle>
                  <CardDescription>
                    Calcula la ganancia potencial de tus cultivos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Selecciona un cultivo</Label>
                    <Select value={cultivoSeleccionado} onValueChange={setCultivoSeleccionado}>
                      <SelectTrigger>
                        <SelectValue placeholder="Elige un cultivo..." />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(CULTIVOS).map((cultivo) => (
                          <SelectItem key={cultivo} value={cultivo}>
                            {cultivo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Cantidad de semillas</Label>
                    <Input 
                      type="number" 
                      min={1}
                      value={cantidadCultivos}
                      onChange={(e) => setCantidadCultivos(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                  </div>

                  {cultivoData && (
                    <div className="rounded-lg bg-secondary/50 p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tiempo de crecimiento:</span>
                        <span className="font-medium">{cultivoData.tiempo_crecimiento}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Nivel requerido:</span>
                        <Badge variant="outline">{cultivoData.nivel_jardineria}</Badge>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resultado</CardTitle>
                  <CardDescription>Ganancias estimadas (4 cosechas)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Inversion</p>
                      <p className="text-xl font-bold text-red-600 dark:text-red-400 flex items-center justify-center gap-1">
                        <Coins className="h-4 w-4" />
                        {gananciasCultivo.inversion}
                      </p>
                    </div>
                    <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Venta</p>
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1">
                        <Coins className="h-4 w-4" />
                        {gananciasCultivo.ganancia}
                      </p>
                    </div>
                    <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Beneficio</p>
                      <p className="text-xl font-bold text-green-600 dark:text-green-400 flex items-center justify-center gap-1">
                        <Coins className="h-4 w-4" />
                        {gananciasCultivo.beneficio}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recetas" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChefHat className="h-5 w-5 text-rose-500" />
                    Calculadora de Recetas
                  </CardTitle>
                  <CardDescription>
                    Calcula el valor de venta de tus recetas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Selecciona una receta</Label>
                    <Select value={recetaSeleccionada} onValueChange={setRecetaSeleccionada}>
                      <SelectTrigger>
                        <SelectValue placeholder="Elige una receta..." />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(RECETAS).map((receta) => (
                          <SelectItem key={receta} value={receta}>
                            {receta}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Cantidad a preparar</Label>
                    <Input 
                      type="number" 
                      min={1}
                      value={cantidadRecetas}
                      onChange={(e) => setCantidadRecetas(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                  </div>

                  {recetaData && (
                    <div className="rounded-lg bg-secondary/50 p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Ingredientes:</span>
                        <span className="font-medium text-right max-w-[60%]">{recetaData.ingredientes}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Rareza:</span>
                        <Badge variant="secondary">{recetaData.rareza}</Badge>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resultado</CardTitle>
                  <CardDescription>Valor total de venta</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Ganancia Total</p>
                    <p className="text-4xl font-bold text-amber-600 dark:text-amber-400 flex items-center justify-center gap-2">
                      <Coins className="h-8 w-8" />
                      {gananciasReceta.total || "?"}
                    </p>
                    {recetaData && !recetaData.valor && (
                      <p className="text-xs text-muted-foreground mt-2">Valor desconocido</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="venta" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-amber-500" />
                    Calculadora de Venta (Albert Jr)
                  </CardTitle>
                  <CardDescription>
                    Calcula cuanto obtendras vendiendo a Albert Jr
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Precio unitario del item</Label>
                    <Input 
                      type="number" 
                      min={0}
                      value={precioVenta}
                      onChange={(e) => setPrecioVenta(Math.max(0, parseInt(e.target.value) || 0))}
                      placeholder="Precio de venta del item"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Cantidad de items</Label>
                    <Input 
                      type="number" 
                      min={1}
                      value={cantidadItems}
                      onChange={(e) => setCantidadItems(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resultado</CardTitle>
                  <CardDescription>Oro que recibiras</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 p-4 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Venta Normal</p>
                      <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1">
                        <Coins className="h-5 w-5" />
                        {ventaAlbert.total}
                      </p>
                    </div>
                    <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Con Bonus (+10%)</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400 flex items-center justify-center gap-1">
                        <Coins className="h-5 w-5" />
                        {ventaAlbert.conBonus}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    El bonus puede variar segun eventos especiales
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
