import { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  fastify.get(
    '/health',
    {
      schema: {
        tags: ['Health'],
        description: 'Health check endpoint',
        response: {
          200: {
            type: 'object',
            properties: {
              status: { type: 'string' },
              timestamp: { type: 'string' },
              uptime: { type: 'number' },
              version: { type: 'string' },
            },
          },
        },
      },
    },
    async () => {
      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '1.0.0',
      };
    }
  );
}
