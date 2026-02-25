# Ideas Fractal API Documentation

Sitio de documentación moderno y responsive para la API de Ideas Fractal Colombia, construido con Next.js 14, TypeScript, Tailwind CSS y shadcn/ui.

## Características

- **Stack Moderno**: Next.js 14 con App Router, TypeScript, Tailwind CSS
- **Componentes UI**: shadcn/ui con primitivas Radix UI
- **Búsqueda**: Búsqueda difusa con Fuse.js para endpoints
- **Bloques de Código**: Ejemplos multi-lenguaje con resaltado de sintaxis (cURL, JavaScript, Python, C#)
- **Modo Oscuro/Claro**: Toggle de tema con next-themes
- **Animaciones**: Framer Motion para transiciones suaves
- **Responsive**: Navegación con sidebar adaptable a móviles

## Estructura del Proyecto

```
app/
├── (docs)/                 # Grupo de rutas para documentación
│   ├── layout.tsx         # Layout con sidebar
│   ├── page.tsx           # Página de inicio con hero
│   └── ideas-fractal/
│       └── availability/
│           └── page.tsx   # Documentación del endpoint de disponibilidad
├── layout.tsx             # Layout raíz
├── globals.css            # Estilos globales
└── providers.tsx          # Proveedor de tema

components/
├── ui/                    # Componentes shadcn/ui
├── sidebar.tsx            # Sidebar de navegación
├── search.tsx             # Componente de búsqueda Fuse.js
├── code-block.tsx         # Visualizador de código multi-lenguaje
├── endpoint-card.tsx      # Tarjetas de endpoints
└── theme-toggle.tsx       # Toggle modo oscuro/claro

lib/
└── utils.ts               # Funciones utilitarias
```

## Comenzar

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Navegar al directorio del proyecto
cd my-app

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) para ver el sitio.

### Compilar para Producción

```bash
npm run build
```

Los archivos estáticos se generarán en el directorio `dist/`.

## Personalización

### Agregar Nuevos Endpoints

1. Crear una nueva página en el grupo de rutas correspondiente:
   ```bash
   mkdir -p app/\(docs\)/categoria/endpoint
   touch app/\(docs\)/categoria/endpoint/page.tsx
   ```

2. Actualizar la navegación del sidebar en `components/sidebar.tsx`

3. Agregar el endpoint al índice de búsqueda en `components/search.tsx`

### Estilos

- Estilos globales: `app/globals.css`
- Config Tailwind: `tailwind.config.ts`
- Tema shadcn/ui: `components.json`

## Scripts Disponibles

- `npm run dev` - Iniciar servidor de desarrollo
- `npm run build` - Compilar para producción
- `npm run lint` - Ejecutar ESLint

## Tecnologías

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Fuse.js](https://fusejs.io/)
- [Lucide Icons](https://lucide.dev/)

## Licencia

MIT

---

Desarrollado para Ideas Fractal Colombia - API de Servicios Turísticos
