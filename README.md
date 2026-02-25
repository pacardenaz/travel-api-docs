# Travel API Docs - Documentación Interactiva Ideas Fractal

## Descripción
Sitio web interactivo para documentación de la API de viajes de **Ideas Fractal Colombia**.

## Estructura

```
travel-api-docs/
├── frontend/          # Aplicación React/Next.js
├── backend/           # API Gateway/Node.js
├── docs/              # Documentación fuente
├── scripts/           # Utilidades y automatización
└── README.md
```

## Tecnologías

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Estilos:** Tailwind CSS + shadcn/ui
- **Animaciones:** Framer Motion
- **Búsqueda:** Fuse.js
- **Código:** Shiki para syntax highlighting

### Backend
- **Runtime:** Node.js + Fastify
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
- [ ] Dark/Light mode
- [ ] Responsive design
- [ ] i18n (ES/EN)

## Documentación API

La documentación cubre los siguientes servicios de Ideas Fractal:

- **Autenticación** - JWT-based auth
- **Disponibilidad** - Búsqueda de vuelos (precio, horario, familias tarifarias)
- **Tarifación** - Confirmación de tarifas
- **Upsell** - Otras tarifas disponibles
- **Reserva** - Creación de reservas
- **Emisión** - Generación de tiquetes
- **Cancelación** - Anulaciones
- **Retrieve** - Consulta de reservas
- **Ancillaries** - Servicios adicionales
- **Autocompletado** - Aeropuertos

## Autor
Pablo Cardenas - Ideas Fractal Colombia
