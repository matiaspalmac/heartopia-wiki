"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Menu,
  Search,
  Fish,
  Bug,
  Bird,
  Sprout,
  Trophy,
  PawPrint,
  Users,
  ChefHat,
  Calculator,
  ChevronDown,
  Sun,
  Moon,
  Users2,
  Heart,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DiscordIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
  </svg>
);

const mainNav = [
  { href: "/wiki/peces", label: "Peces", icon: Fish },
  { href: "/wiki/insectos", label: "Insectos", icon: Bug },
  { href: "/wiki/aves", label: "Aves", icon: Bird },
  { href: "/wiki/animales", label: "Animales", icon: PawPrint },
  { href: "/eventos", label: "Eventos", icon: Sprout },
  { href: "/wiki/codigos", label: "Códigos", icon: Trophy },
  { href: "/guias", label: "Guías", icon: BookOpen },
];

const moreNav = [
  { href: "/wiki/cultivos", label: "Cultivos", icon: Sprout },
  { href: "/wiki/habitantes", label: "Habitantes", icon: Users },
  { href: "/wiki/recetas", label: "Recetas", icon: ChefHat },
  { href: "/wiki/recolectables", label: "Recolectables", icon: Calculator },
  { href: "/wiki/logros", label: "Logros", icon: Trophy },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b bg-background/80 backdrop-blur-md py-2 shadow-sm"
          : "bg-background py-3"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl border-2 border-primary/20 shadow-sm transition-transform group-hover:scale-105 group-hover:border-primary">
            <Image
              src="/annie.jpg"
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
        <nav className="hidden items-center gap-1 lg:flex bg-secondary/30 p-1 rounded-full border border-border/40">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold text-muted-foreground transition-all hover:bg-background hover:text-primary hover:shadow-sm"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 rounded-full text-muted-foreground hover:text-primary font-bold"
              >
                Más <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-52 rounded-2xl p-2 shadow-xl border-primary/10"
            >
              {moreNav.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 cursor-pointer py-2.5 rounded-xl"
                  >
                    <div className="bg-primary/10 p-1.5 rounded-lg text-primary">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-xl hover:bg-secondary transition-colors"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-400" />
            )}
          </Button>

          <Link href="/buscar" className="hidden md:block">
            <Button
              variant="outline"
              size="sm"
              className="h-10 rounded-xl gap-3 border-dashed hover:border-primary/50 transition-colors bg-muted/30"
            >
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground font-normal">
                Buscar...
              </span>
            </Button>
          </Link>

          <Link href="/nuestracomunidad" className="hidden md:flex">
            <Button
              variant="default"
              size="sm"
              className="h-10 px-5 rounded-xl font-bold gap-2 bg-gradient-to-r from-pink-500/80 to-rose-500/80 hover:from-pink-600 hover:to-rose-600 text-white shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 border-none"
            >
              <Heart className="h-4 w-4 fill-white" />
              <span className="hidden lg:inline">Nuestra Comunidad</span>
              <span className="lg:hidden">Comunidad</span>
            </Button>
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-xl bg-secondary/50"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[350px] p-0 border-l-0">
              <div className="flex flex-col gap-8 py-8 px-6 h-full overflow-y-auto bg-background">
                <div className="space-y-1">
                  <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2 mb-4">Explorar Wiki</h3>
                  <nav className="grid grid-cols-2 gap-3">
                    {[...mainNav, ...moreNav].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col gap-2 items-center justify-center rounded-2xl border border-border/50 bg-secondary/10 p-4 transition-all active:scale-95 hover:bg-primary/5 hover:border-primary/20"
                      >
                        <item.icon className="h-6 w-6 text-primary" />
                        <span className="text-xs font-bold">{item.label}</span>
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2 mb-4">Social & Staff</h3>
                  <Link
                    href="/staff"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-gradient-to-r from-primary/80 to-purple-600/80 text-white font-black shadow-lg shadow-primary/20 active:scale-95 transition-all"
                  >
                    <Users2 className="h-5 w-5" />
                    Nuestro Equipo
                  </Link>

                  <Link
                    href="/nuestracomunidad"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500/80 to-rose-500/80 text-white font-black shadow-lg shadow-pink-500/20 active:scale-95 transition-all"
                  >
                    <Heart className="h-5 w-5 fill-white" />
                    Nuestra Comunidad
                  </Link>
                </div>

                <div className="mt-auto pt-6 border-t">
                  <a
                    href="https://discord.gg/wnkBUBbaRW"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#5865F2] text-white font-black shadow-lg shadow-[#5865F2]/20 active:scale-95 transition-all"
                  >
                    <DiscordIcon />
                    ¡Únete al Discord!
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}