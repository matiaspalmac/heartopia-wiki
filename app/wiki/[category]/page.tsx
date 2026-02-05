import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getCategoryData, CATEGORIES, type CategoryId } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Map } from "lucide-react";
import { ItemGrid } from "@/components/item-grid";

const categoryTitles: Record<CategoryId, { title: string; subtitle: string }> = {
  peces: { title: "Peces", subtitle: "Guia completa de pesca - Encuentra todos los peces del pueblito" },
  insectos: { title: "Insectos", subtitle: "Captura de insectos - Mariposas, escarabajos, libelulas y mas" },
  aves: { title: "Aves", subtitle: "Avistamiento de aves - Todas las aves del pueblito" },
  animales: { title: "Animales", subtitle: "Animales salvajes - Conoce a los habitantes del bosque" },
  cultivos: { title: "Cultivos", subtitle: "Jardineria - Verduras, frutas y flores para tu huerto" },
  recolectables: { title: "Recolectables", subtitle: "Recursos del mundo - Madera, piedra, frutas y hongos" },
  habitantes: { title: "Habitantes", subtitle: "NPCs del pueblo - Conoce a todos los personajes" },
  recetas: { title: "Recetas", subtitle: "Cocina - Todas las recetas disponibles" },
  logros: { title: "Logros", subtitle: "Titulos y logros - Desbloquea todas las recompensas" },
  codigos: { title: "Códigos", subtitle: "Códigos promocionales - Canjea códigos para obtener recompensas especiales" },
};

interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  
  if (!CATEGORIES.find(c => c.id === category)) {
    notFound();
  }

  const categoryId = category as CategoryId;
  const data = getCategoryData(categoryId);
  const items = Object.entries(data);
  const categoryInfo = categoryTitles[categoryId];
  const categoryMeta = CATEGORIES.find(c => c.id === categoryId);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">
              {categoryInfo.title}
            </h1>
            <Badge variant="secondary" className="text-base">
              {items.length} items
            </Badge>
          </div>
          <p className="text-muted-foreground text-lg">
            {categoryInfo.subtitle}
          </p>
        </div>

        <ItemGrid items={items} categoryId={categoryId} />

        {categoryId === "animales" && (
          <section className="mt-16">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5 text-primary" />
                  Mapa de Ubicaciones de Animales
                </CardTitle>
                <p className="text-muted-foreground">
                  Mapa completo mostrando donde encontrar cada animal en Heartopia
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative aspect-video w-full">
                  <Image
                    src="https://i.imgur.com/0xGT4ZQ.png"
                    alt="Mapa de ubicaciones de animales en Heartopia"
                    fill
                    className="object-contain bg-secondary/20"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                </div>
                <div className="p-4 bg-secondary/30 border-t">
                  <p className="text-sm text-muted-foreground text-center">
                    Haz clic en la imagen para verla en tamano completo. Cada animal esta marcado en su ubicacion correspondiente.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category: category.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const categoryInfo = categoryTitles[category as CategoryId];
  
  if (!categoryInfo) {
    return { title: "No encontrado - Heartopia Wiki" };
  }

  return {
    title: `${categoryInfo.title} - Heartopia Wiki`,
    description: categoryInfo.subtitle,
  };
}
