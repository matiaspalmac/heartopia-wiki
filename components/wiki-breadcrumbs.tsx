"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface WikiBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function WikiBreadcrumbs({ items }: WikiBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-1.5 text-sm">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-bold text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Inicio</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
            {item.href ? (
              <Link
                href={item.href}
                className="rounded-lg px-2.5 py-1.5 font-bold text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
              >
                {item.label}
              </Link>
            ) : (
              <span className="rounded-lg bg-primary/10 px-2.5 py-1.5 font-black text-primary">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
