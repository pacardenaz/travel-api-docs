"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  ChevronRight,
  ChevronDown,
  FolderOpen,
  Plane,
  Lock,
  Search,
  CreditCard,
  Ticket,
  XCircle,
  FileText,
  MapPin,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: "Inicio",
    href: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "API Reference",
    href: "/api-reference",
    icon: <FolderOpen className="h-4 w-4" />,
    children: [
      {
        title: "Autenticación",
        href: "/ideas-fractal/auth",
        icon: <Lock className="h-3 w-3" />,
        badge: "POST",
      },
      {
        title: "Disponibilidad",
        href: "/ideas-fractal/availability",
        icon: <Search className="h-3 w-3" />,
        badge: "POST",
      },
      {
        title: "Tarifación",
        href: "/ideas-fractal/pricing",
        icon: <CreditCard className="h-3 w-3" />,
        badge: "POST",
      },
      {
        title: "Reserva",
        href: "/ideas-fractal/booking",
        icon: <FileText className="h-3 w-3" />,
        badge: "POST",
      },
      {
        title: "Emisión",
        href: "/ideas-fractal/issuance",
        icon: <Ticket className="h-3 w-3" />,
        badge: "POST",
      },
    ],
  },
];

function NavItemComponent({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
  const hasChildren = item.children && item.children.length > 0;
  const [isExpanded, setIsExpanded] = useState(isActive);

  return (
    <div>
      <Link
        href={item.href}
        onClick={(e) => {
          if (hasChildren) {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
          isActive
            ? "bg-primary/10 text-primary font-medium"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        } ${depth > 0 ? "ml-4" : ""}`}
      >
        {hasChildren && (
          <span className="text-muted-foreground">
            {isExpanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </span>
        )}
        {!hasChildren && item.icon && <span>{item.icon}</span>}
        <span className="flex-1">{item.title}</span>
        {item.badge && (
          <Badge variant="secondary" className="text-xs font-mono">
            {item.badge}
          </Badge>
        )}
      </Link>
      {hasChildren && isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-1"
        >
          {item.children?.map((child) => (
            <NavItemComponent key={child.href} item={child} depth={depth + 1} />
          ))}
        </motion.div>
      )}
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
            <Plane className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-sm leading-tight">Ideas Fractal</h1>
            <p className="text-xs text-muted-foreground">API de Vuelos</p>
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-4 py-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavItemComponent key={item.href} item={item} />
            ))}
          </nav>

          <Separator className="my-4" />

          {/* Resources */}
          <div className="space-y-2">
            <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Recursos
            </p>
            <div className="space-y-1">
              <Link
                href="https://beta-dev-rest.kontroltravel.com/json/metadata"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <MapPin className="h-4 w-4" />
                Metadatos API
              </Link>
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t p-4">
          <p className="text-xs text-muted-foreground text-center">
            Ideas Fractal Colombia © 2024
          </p>
        </div>
      </div>
    </aside>
  );
}
