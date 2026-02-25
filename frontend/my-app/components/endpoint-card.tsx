"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface EndpointCardProps {
  method: string;
  path: string;
  title: string;
  description: string;
  href?: string;
}

const methodColors: Record<string, { bg: string; text: string; border: string }> = {
  GET: {
    bg: "bg-blue-500/10",
    text: "text-blue-500",
    border: "border-blue-500/20",
  },
  POST: {
    bg: "bg-green-500/10",
    text: "text-green-500",
    border: "border-green-500/20",
  },
  PUT: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-500",
    border: "border-yellow-500/20",
  },
  DELETE: {
    bg: "bg-red-500/10",
    text: "text-red-500",
    border: "border-red-500/20",
  },
  PATCH: {
    bg: "bg-purple-500/10",
    text: "text-purple-500",
    border: "border-purple-500/20",
  },
};

export function EndpointCard({
  method,
  path,
  title,
  description,
  href,
}: EndpointCardProps) {
  const colors = methodColors[method] || methodColors.GET;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group hover:border-primary/50 transition-colors">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className={`font-mono text-xs font-semibold ${colors.bg} ${colors.text} ${colors.border}`}
              >
                {method}
              </Badge>
              <code className="text-sm font-mono text-muted-foreground">{path}</code>
            </div>
            {href && (
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" asChild>
                <Link href={href}>
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
          <CardTitle className="text-lg mt-3">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
}

interface EndpointSectionProps {
  title: string;
  description?: string;
  endpoints: EndpointCardProps[];
}

export function EndpointSection({
  title,
  description,
  endpoints,
}: EndpointSectionProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="grid gap-4">
        {endpoints.map((endpoint, index) => (
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
  );
}
