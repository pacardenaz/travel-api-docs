import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async function (fastify: FastifyInstance) {
  await fastify.register(import('@fastify/swagger'), {
    openapi: {
      info: {
        title: 'Travel API Gateway',
        description: 'API Gateway para documentación de APIs de viajes',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
      ],
      tags: [
        { name: 'Health', description: 'Health check endpoints' },
        { name: 'Proxy', description: 'Proxy endpoints for external APIs' },
        { name: 'Documentation', description: 'API documentation' },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
  });

  await fastify.register(import('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
    },
    staticCSP: true,
  });
});
