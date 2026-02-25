import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { config } from '../config';

export default fp(async function (fastify: FastifyInstance) {
  await fastify.register(import('@fastify/jwt'), {
    secret: config.JWT_SECRET,
    sign: {
      expiresIn: '24h',
    },
  });

  // Add authentication decorator
  fastify.decorate('authenticate', async function (request: any, reply: any) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.status(401).send({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Invalid or missing token',
      });
    }
  });
});

// Type declarations
declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: any, reply: any) => Promise<void>;
  }
}
