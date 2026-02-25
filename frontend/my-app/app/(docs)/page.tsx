"use client";

import { motion } from "framer-motion";
import { SearchComponent } from "@/components/search";
import { EndpointCard } from "@/components/endpoint-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Zap, Shield, MapPin } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Rápida y Confiable",
    description: "Tiempos de respuesta optimizados para el mercado colombiano",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Segura",
    description: "Autenticación con API Key y encriptación de datos sensibles",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Cobertura Nacional",
    description: "Acceso a proveedores turísticos en toda Colombia",
  },
];

const quickEndpoints = [
  {
    method: "GET",
    path: "/v1/availability",
    title: "Consultar Disponibilidad",
    description: "Busca disponibilidad de hoteles, vuelos y actividades turísticas",
    href: "/ideas-fractal/availability",
  },
  {
    method: "POST",
    path: "/v1/bookings",
    title: "Crear Reserva",
    description: "Crea una nueva reserva para cualquier servicio turístico",
  },
  {
    method: "GET",
    path: "/v1/bookings/{id}",
    title: "Obtener Reserva",
    description: "Consulta los detalles de una reserva existente",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-background border px-8 py-16">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-black/10 dark:[mask-image:linear-gradient(0deg,black,rgba(0,0,0,0.6))]" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-3xl mx-auto text-center space-y-6"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Ideas Fractal API
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Documentación completa de la API de Ideas Fractal Colombia.
            Integra servicios turísticos colombianos en tu aplicación.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <SearchComponent />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <Link href="/ideas-fractal/availability">
                Comenzar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/ideas-fractal/availability">
                Ver Referencia API
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
          <h2 className="text-2xl font-bold">SDKs Oficiales</h2>
          <p className="text-muted-foreground">
            Comienza rápidamente con nuestras librerías oficiales
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            {["JavaScript", "Python", "PHP", "C#"].map((lang) => (
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
