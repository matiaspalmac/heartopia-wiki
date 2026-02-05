import Link from "next/link";
import Image from "next/image";
import {
  Fish,
  Bug,
  Bird,
  PawPrint,
  Sprout,
  TreeDeciduous,
  Trophy,
  Heart,
  Users,
} from "lucide-react";

const DiscordLink = "https://discord.gg/wnkBUBbaRW";
const DiscordSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
  </svg>
);

const categories = [
  { href: "/wiki/peces", label: "Peces", icon: Fish },
  { href: "/wiki/insectos", label: "Insectos", icon: Bug },
  { href: "/wiki/aves", label: "Aves", icon: Bird },
  { href: "/wiki/animales", label: "Animales", icon: PawPrint },
  { href: "/wiki/cultivos", label: "Cultivos", icon: Sprout },
  { href: "/wiki/recolectables", label: "Recolectables", icon: TreeDeciduous },
  { href: "/wiki/logros", label: "Logros", icon: Trophy },
  { href: "/wiki/codigos", label: "Códigos", icon: Trophy },
  { href: "/wiki/habitantes", label: "Habitantes", icon: PawPrint },
  { href: "/wiki/recetas", label: "Recetas", icon: Sprout },
  { href: "/staff", label: "Nuestro Equipo", icon: Users },
  { href: "/eventos", label: "Eventos", icon: Heart },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative h-10 w-10 overflow-hidden rounded-xl border-2 border-primary/20 shadow-sm transition-transform group-hover:scale-105 group-hover:border-primary">
                  <Image
                    src="https://cdn-www.bluestacks.com/bs-images/8506cfa0f03c4102fbe47e1853889c4a.png"
                    alt="Heartopia Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="hidden sm:block text-left leading-tight">
                  <h1 className="text-base font-black tracking-tight text-foreground">
                    Heartopia Wiki
                  </h1>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    Chile
                  </p>
                </div>
              </Link>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              La guía más completa para explorar todos los secretos del mundo de
              Heartopia. Encuentra información sobre peces, insectos, aves,
              animales, cultivos y más.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Categorías</h3>
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

          <div className="space-y-5">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Acerca de</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Esta wiki fue creada utilizando los datos del bot de la
                comunidad de <span className="font-bold">Heartopia Chile</span>.
                Toda la información ha sido recopilada y esta página ha sido
                hecha con mucho cariño para ayudarte en tu aventura.
              </p>
            </div>

            <a
              href={DiscordLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-lg bg-[#5865F2] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#4752C4] hover:shadow-md active:scale-95"
            >
              {DiscordSVG}
              ¡Únete a nuestro Discord!
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>
            Hecho con{" "}
            <Heart className="inline h-4 w-4 text-destructive fill-destructive" />{" "}
            para la comunidad de Heartopia Chile por{" "}
            <span className="font-medium text-foreground">Dei</span>
          </p>
          <p className="text-xs opacity-60">
            © {new Date().getFullYear()} Heartopia Chile Wiki
          </p>
        </div>
      </div>
    </footer>
  );
}
