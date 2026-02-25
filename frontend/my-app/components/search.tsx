"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Command, ArrowRight } from "lucide-react";

interface SearchResult {
  title: string;
  description: string;
  href: string;
  method?: string;
  category: string;
}

const endpoints: SearchResult[] = [
  {
    title: "Consultar Disponibilidad",
    description: "Busca disponibilidad de hoteles, vuelos y actividades turísticas en Colombia",
    href: "/ideas-fractal/availability",
    method: "GET",
    category: "Disponibilidad",
  },
  {
    title: "Crear Reserva",
    description: "Crea una nueva reserva para servicios turísticos",
    href: "#",
    method: "POST",
    category: "Reservas",
  },
  {
    title: "Obtener Reserva",
    description: "Consulta los detalles de una reserva existente",
    href: "#",
    method: "GET",
    category: "Reservas",
  },
  {
    title: "Cancelar Reserva",
    description: "Cancela una reserva existente",
    href: "#",
    method: "DELETE",
    category: "Reservas",
  },
  {
    title: "Listar Destinos",
    description: "Obtiene la lista de destinos turísticos disponibles en Colombia",
    href: "#",
    method: "GET",
    category: "Destinos",
  },
];

const methodColors: Record<string, string> = {
  GET: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  POST: "bg-green-500/10 text-green-500 border-green-500/20",
  PUT: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  DELETE: "bg-red-500/10 text-red-500 border-red-500/20",
  PATCH: "bg-purple-500/10 text-purple-500 border-purple-500/20",
};

export function SearchComponent() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const fuse = useMemo(
    () =>
      new Fuse(endpoints, {
        keys: ["title", "description", "category", "method"],
        threshold: 0.3,
      }),
    []
  );

  const results = useMemo(() => {
    if (!query) return [];
    return fuse.search(query).map((result) => result.item);
  }, [query, fuse]);

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar endpoints, métodos o categorías..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-20 h-12 text-base"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <kbd className="hidden sm:inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-xs text-muted-foreground">
            <Command className="h-3 w-3" />
            K
          </kbd>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && query && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 z-50 mt-2 rounded-lg border bg-card shadow-xl overflow-hidden"
            >
              {results.length > 0 ? (
                <div className="max-h-96 overflow-y-auto">
                  <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {results.length} resultado{results.length !== 1 ? "s" : ""}
                  </div>
                  {results.map((result, index) => (
                    <button
                      key={result.href + index}
                      onClick={() => handleSelect(result.href)}
                      className="w-full flex items-start gap-3 px-4 py-3 hover:bg-muted transition-colors text-left"
                    >
                      {result.method && (
                        <Badge
                          variant="outline"
                          className={`text-xs font-mono ${methodColors[result.method] || ""}`}
                        >
                          {result.method}
                        </Badge>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{result.title}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {result.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {result.category}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center">
                  <p className="text-muted-foreground">No se encontraron resultados para &quot;{query}&quot;</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Intenta buscar endpoints, métodos HTTP o categorías
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
