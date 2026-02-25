"use client";

import { motion } from "framer-motion";
import { SearchComponent } from "@/components/search";
import { EndpointCard } from "@/components/endpoint-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plane, Zap, Shield, Globe, Lock, CreditCard, Ticket, FileText } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Múltiples Proveedores",
    description: "GDS, NO-GDS y NDC en una sola integración",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Autenticación JWT",
    description: "Seguridad con tokens Bearer y API Key",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Cobertura Amplia",
    description: "Sabre, Amadeus, Travelport, NDC y más",
  },
];

const quickEndpoints = [
  {
    method: "POST",
    path: "/auth/credentials",
    title: "Autenticación",
    description: "Obtén tu token JWT para acceder a los servicios del API",
    href: "/ideas-fractal/auth",
  },
  {
    method: "POST",
    path: "/flights/availability/made",
    title: "Disponibilidad",
    description: "Consulta disponibilidad de vuelos por precio, horario o familia tarifaria",
    href: "/ideas-fractal/availability",
  },
  {
    method: "POST",
    path: "/flights/pricing",
    title: "Tarifación",
    description: "Confirma tarifas de los segmentos seleccionados",
  },
  {
    method: "POST",
    path: "/flights/booking",
    title: "Reserva",
    description: "Crea reservas ante el proveedor de vuelos",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-background border px-4 sm:px-8 py-12 sm:py-16">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-black/10 dark:[mask-image:linear-gradient(0deg,black,rgba(0,0,0,0.6))]" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-3xl mx-auto text-center space-y-6"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
              <Plane className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Ideas Fractal API
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            API de vuelos para agencias de viajes. Consulta disponibilidad, 
            tarifas, reservas y emisión de tiquetes con múltiples proveedores 
            en una sola integración.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <SearchComponent />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <Link href="/ideas-fractal/auth">
                Comenzar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/ideas-fractal/availability">
                Ver API Reference
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex flex-col items-center text-center p-6 rounded-xl border bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600/20 to-indigo-600/20 text-blue-600 mb-4">
              {feature.icon}
            </div>
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Flujo de Trabajo */}
      <section className="rounded-xl border bg-muted/30 p-4 sm:p-8">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold">Flujo de Trabajo</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Sigue estos pasos para completar una emisión aérea
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {[
            { icon: <Lock className="h-4 w-4 sm:h-5 sm:w-5" />, title: "1. Autenticación", desc: "Obtén token JWT" },
            { icon: <Plane className="h-4 w-4 sm:h-5 sm:w-5" />, title: "2. Disponibilidad", desc: "Busca vuelos" },
            { icon: <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />, title: "3. Tarifación", desc: "Confirma precios" },
            { icon: <FileText className="h-4 w-4 sm:h-5 sm:w-5" />, title: "4. Reserva", desc: "Crea reserva" },
            { icon: <Ticket className="h-4 w-4 sm:h-5 sm:w-5" />, title: "5. Emisión", desc: "Genera tiquete" },
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center p-3 sm:p-4 rounded-lg bg-card">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-blue-600/10 text-blue-600 mb-2 sm:mb-3">{step.icon}</div>
              <h4 className="font-medium text-xs sm:text-sm">{step.title}</h4>
              <p className="text-xs text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Start Endpoints */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Endpoints Principales</h2>
            <p className="text-muted-foreground">
              Endpoints más utilizados para comenzar tu integración
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {quickEndpoints.map((endpoint, index) => (
            <motion.div
              key={endpoint.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <EndpointCard {...endpoint} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* SDKs */}
      <section className="rounded-xl border bg-muted/30 p-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Lenguajes Soportados</h2>
          <p className="text-muted-foreground">
            Ejemplos de código disponibles en múltiples lenguajes
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            {["cURL", "JavaScript", "Python", "C#", "Java", "PHP"].map((lang) => (
              <Button key={lang} variant="outline" size="sm">
                {lang}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
