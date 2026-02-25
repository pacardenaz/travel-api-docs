import { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  // Redirect root to docs
  fastify.get('/', async (request, reply) => {
    return reply.redirect('/docs');
  });
}
