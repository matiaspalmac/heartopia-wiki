"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ShieldCheck, ExternalLink } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main className="pt-16 pb-20 md:pt-20">
        <section className="relative px-4 sm:px-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
          
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <span className="inline-block px-5 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm">
              Privacidad y Legal
            </span>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
              Política de <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">Privacidad</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Última actualización: {new Date().toLocaleDateString('es-CL')}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12 prose prose-neutral dark:prose-invert max-w-none">
          <div className="space-y-12">
            <div className="rounded-3xl bg-secondary/30 p-8 border border-primary/10">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <ShieldCheck className="h-7 w-7 text-primary" />
                1. Información que recopilamos
              </h2>
              <p>
                Esta wiki es un proyecto comunitario y no recopila datos personales de forma activa. No usamos cookies de seguimiento, no almacenamos IPs ni requerimos registro para navegar.
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                <li>Solo datos anónimos de uso (visitas a páginas) vía herramientas básicas como Vercel Analytics (sin identificación personal).</li>
                <li>Si envías un mensaje por Discord, solo guardamos lo que compartas voluntariamente (y solo mientras sea necesario).</li>
              </ul>
            </div>

            <div className="rounded-3xl bg-secondary/30 p-8 border border-primary/10">
              <h2 className="text-2xl font-bold mb-6">2. Uso de la información</h2>
              <p>
                Cualquier dato que compartas (fotos, correcciones, sugerencias) se usa exclusivamente para mejorar la wiki y ayudar a la comunidad. No se vende ni se comparte con terceros con fines comerciales.
              </p>
            </div>

            <div className="rounded-3xl bg-secondary/30 p-8 border border-primary/10">
              <h2 className="text-2xl font-bold mb-6">3. Aviso legal – No somos oficiales</h2>
              <p className="text-muted-foreground leading-relaxed">
                Heartopia Chile Wiki es un proyecto independiente creado por fans. No estamos afiliados, asociados, autorizados ni respaldados por XD Interactive Entertainment Co., Ltd. ni ninguna entidad relacionada con Heartopia.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Todos los nombres, imágenes, datos del juego y marcas son propiedad de sus respectivos dueños. Este sitio es solo una guía creada por la comunidad para la comunidad.
              </p>
              <a 
                href="https://heartopia.xd.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-primary hover:underline"
              >
                Visitar sitio oficial de Heartopia <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="rounded-3xl bg-secondary/30 p-8 border border-primary/10">
              <h2 className="text-2xl font-bold mb-6">4. Cambios en esta política</h2>
              <p>
                Podemos actualizar esta página ocasionalmente. Te recomendamos revisarla de vez en cuando. El uso continuado del sitio implica aceptación de los cambios.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}