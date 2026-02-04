import Link from "next/link";
import { Fish, Bug, Bird, PawPrint, Sprout, TreeDeciduous, Trophy, Heart } from "lucide-react";

const categories = [
  { href: "/wiki/peces", label: "Peces", icon: Fish },
  { href: "/wiki/insectos", label: "Insectos", icon: Bug },
  { href: "/wiki/aves", label: "Aves", icon: Bird },
  { href: "/wiki/animales", label: "Animales", icon: PawPrint },
  { href: "/wiki/cultivos", label: "Cultivos", icon: Sprout },
  { href: "/wiki/recolectables", label: "Recolectables", icon: TreeDeciduous },
  { href: "/wiki/logros", label: "Logros", icon: Trophy },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <span className="text-lg font-bold">H</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Heartopia Wiki</h2>
                <p className="text-xs text-muted-foreground">Tu guia del pueblito</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              La guia mas completa para explorar todos los secretos del mundo de Heartopia. 
              Encuentra informacion sobre peces, insectos, aves, animales, cultivos y mas.
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Categorias</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <cat.icon className="h-4 w-4" />
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Acerca de</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Esta wiki fue creada con datos del bot de Discord de la comunidad de Heartopia. 
              Toda la informacion ha sido recopilada con carino para ayudarte en tu aventura.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>Hecho con <Heart className="inline h-4 w-4 text-destructive" /> para la comunidad de Heartopia Chile por Dei</p>
        </div>
      </div>
    </footer>
  );
}
