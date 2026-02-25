# Travel API Gateway

API Gateway para documentación de APIs de viajes. Construido con Fastify, TypeScript y OpenAPI.

## Características

- ⚡ **Fastify** - Framework rápido y eficiente
- 🔒 **JWT Authentication** - Autenticación segura
- 📚 **Swagger/OpenAPI** - Documentación automática
- 🌐 **CORS** - Configuración flexible de CORS
- ⏱️ **Rate Limiting** - Protección contra abuso
- 📝 **Pino Logging** - Logging estructurado y eficiente
- 🧪 **TypeScript** - Tipado estático completo
- ✅ **Zod** - Validación de esquemas

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:3000`

## Producción

```bash
npm run build
npm start
```

## Endpoints

### Health Check
- `GET /health` - Verifica el estado del servidor

### Documentación
- `GET /docs` - Interfaz Swagger UI
- `GET /documentation/json` - Especificación OpenAPI en JSON

### Proxy Ideas Fractal
- `POST /proxy/ideas-fractal/auth` - Autenticación (mock)
- `POST /proxy/ideas-fractal/availability` - Consultar disponibilidad (requiere auth)
- `GET /proxy/ideas-fractal/sources` - Listar fuentes (requiere auth)

## Variables de Entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| `NODE_ENV` | Entorno (development/production) | `development` |
| `PORT` | Puerto del servidor | `3000` |
| `HOST` | Host del servidor | `0.0.0.0` |
| `JWT_SECRET` | Secreto para JWT | `your-secret-key-change-in-production` |
| `REDIS_URL` | URL de Redis (opcional) | - |
| `IDEAS_FRACTAL_API_URL` | URL base de Ideas Fractal API | `https://api.ideasfractal.com` |

## Estructura del Proyecto

```
src/
├── config/         # Configuración
├── plugins/        # Plugins de Fastify
├── routes/         # Rutas de la API
├── services/       # Servicios de negocio
├── types/          # Tipos y esquemas
├── utils/          # Utilidades
└── index.ts        # Punto de entrada
```

## Autenticación

Los endpoints protegidos requieren un token JWT en el header:

```
Authorization: Bearer <token>
```

Para obtener un token, usa el endpoint `/proxy/ideas-fractal/auth` (mock).
