import React from "react"
import type { Metadata } from 'next'
import { Nunito, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AnnieTooltip } from '@/components/annie-tooltip'
import './globals.css'

const nunito = Nunito({ 
  subsets: ["latin"], 
  variable: '--font-nunito',
  weight: ["400", "500", "600", "700", "800"] 
});

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://heartopiachile.vercel.app'),
  title: {
    default: 'Heartopia Chile Wiki',
    template: '%s | Heartopia Chile Wiki',
  },
  description: 'Wiki completa de Heartopia hecha por la comunidad chilena: peces, insectos, aves, animales, cultivos, recetas, recolectables, logros y eventos.',
  applicationName: 'Heartopia Chile Wiki',
  keywords: [
    'Heartopia',
    'Heartopia Chile',
    'Heartopia Wiki',
    'guía Heartopia',
    'peces Heartopia',
    'insectos Heartopia',
    'logros Heartopia',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Heartopia Chile Wiki',
    title: 'Heartopia Chile Wiki',
    description: 'Guía comunitaria de Heartopia con datos, colecciones, eventos y perfiles de vecinos.',
    images: [
      {
        url: '/annie.jpg',
        width: 1200,
        height: 1200,
        alt: 'Annie - Heartopia Chile Wiki',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heartopia Chile Wiki',
    description: 'Guía comunitaria de Heartopia con datos, colecciones, eventos y perfiles de vecinos.',
    images: ['/annie.jpg'],
  },
  icons: {
    icon: '/annie.jpg',
    shortcut: '/annie.jpg',
    apple: '/annie.jpg',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${nunito.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-background m-0 p-0 min-h-screen">
        {children}
        <AnnieTooltip />
        <Analytics />
      </body>
    </html>
  )
}
