"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, Home, Fish, Bug, Bird, Sprout, TreeDeciduous, Trophy, PawPrint, Users, ChefHat, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/wiki/peces", label: "Peces", icon: Fish },
  { href: "/wiki/insectos", label: "Insectos", icon: Bug },
  { href: "/wiki/aves", label: "Aves", icon: Bird },
  { href: "/wiki/animales", label: "Animales", icon: PawPrint },
  { href: "/wiki/cultivos", label: "Cultivos", icon: Sprout },
  { href: "/wiki/habitantes", label: "Habitantes", icon: Users },
  { href: "/wiki/recetas", label: "Recetas", icon: ChefHat },
  { href: "/calculadoras", label: "Calculadoras", icon: Calculator },
  { href: "/wiki/logros", label: "Logros", icon: Trophy },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <span className="text-lg font-bold">H</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-foreground">Heartopia</h1>
            <p className="text-xs text-muted-foreground">Wiki del Pueblito</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Search + Mobile Menu */}
        <div className="flex items-center gap-2">
          <Link href="/buscar" className="hidden sm:block">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Search className="h-4 w-4" />
              <span className="hidden md:inline">Buscar...</span>
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-4 pt-4">
                <Link href="/buscar" className="w-full">
                  <Button variant="outline" className="w-full gap-2 bg-transparent">
                    <Search className="h-4 w-4" />
                    Buscar
                  </Button>
                </Link>
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
