# Travel API Docs - Proyecto de Documentación Interactiva

## Descripción
Sitio web interactivo para documentación de APIs de viajes (Ideas Fractal + Expedia Rapid)

## Estructura

```
travel-api-docs/
├── frontend/          # Aplicación React/Next.js
├── backend/           # API Gateway/Node.js
├── docs/              # Documentación fuente
├── scripts/           # Utilidades y automatización
└── README.md
```

## Tecnologías Propuestas

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Estilos:** Tailwind CSS + shadcn/ui
- **Animaciones:** Framer Motion
- **Búsqueda:** Algolia DocSearch o Fuse.js
- **Código:** Prism.js o Shiki para syntax highlighting

### Backend
- **Runtime:** Node.js + Express o Fastify
- **API:** REST + OpenAPI/Swagger
- **Cache:** Redis
- **Auth:** JWT

### DevOps
- **Repo:** GitHub (pacardenaz/travel-api-docs)
- **Deploy:** Vercel (frontend) + Railway/Render (backend)
- **CI/CD:** GitHub Actions

## Features Planificados

- [ ] Buscador inteligente de endpoints
- [ ] Playground interactivo (probar APIs)
- [ ] Diagramas de flujo visuales
- [ ] Generador de código (SDK)
- [ ] Comparador de APIs (Ideas Fractal vs Expedia)
- [ ] Dark/Light mode
- [ ] Responsive design
- [ ] i18n (ES/EN)

## Autor
Pablo Cardenas - Ideas Fractal Colombia
