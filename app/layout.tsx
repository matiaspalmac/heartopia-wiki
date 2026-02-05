import React from "react"
import type { Metadata } from 'next'
import { Nunito, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
  title: 'Heartopia Chile Wiki',
  description: 'Wiki completa de Heartopia con información sobre peces, insectos, aves, animales, cultivos, recolectables y logros.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${nunito.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-background m-0 p-0 min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  )
}