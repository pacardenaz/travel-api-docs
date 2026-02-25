import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async function (fastify: FastifyInstance) {
  await fastify.register(import('@fastify/cors'), {
    origin: (origin, cb) => {
      // Allow all origins in development
      if (process.env.NODE_ENV === 'development') {
        cb(null, true);
        return;
      }
      
      // In production, check against whitelist
      const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
      if (!origin || allowedOrigins.includes(origin)) {
        cb(null, true);
        return;
      }
      
      cb(new Error('Not allowed'), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
  });
});
