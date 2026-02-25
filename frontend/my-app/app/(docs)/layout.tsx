import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Sidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ideas Fractal API Documentation",
  description: "Documentación completa de la API de Ideas Fractal Colombia",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} min-h-screen`}>
      <Sidebar />
      <div className="ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div />
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </header>

        {/* Main content */}
        <main className="px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
