import Fastify from 'fastify';
import { config } from './config';

// Import plugins
import swaggerPlugin from './plugins/swagger';
import corsPlugin from './plugins/cors';
import jwtPlugin from './plugins/jwt';

// Import routes
import healthRoutes from './routes/health';
import docsRoutes from './routes/docs';
import ideasFractalRoutes from './routes/proxy/ideas-fractal';

async function buildServer() {
  const fastify = Fastify({
    logger: {
      level: config.NODE_ENV === 'development' ? 'debug' : 'info',
      transport: config.NODE_ENV === 'development'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
    },
    genReqId: () => `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  });

  // Register rate limiting
  await fastify.register(import('@fastify/rate-limit'), {
    max: 100,
    timeWindow: '1 minute',
    errorResponseBuilder: (req, context) => ({
      statusCode: 429,
      error: 'Too Many Requests',
      message: `Rate limit exceeded. Try again in ${context.after}`,
      retryAfter: context.after,
    }),
  });

  // Register plugins
  await fastify.register(corsPlugin);
  await fastify.register(jwtPlugin);
  await fastify.register(swaggerPlugin);

  // Register routes
  await fastify.register(healthRoutes);
  await fastify.register(docsRoutes);
  await fastify.register(ideasFractalRoutes, { prefix: '/proxy/ideas-fractal' });

  // Error handler
  fastify.setErrorHandler((error: any, request, reply) => {
    fastify.log.error(error);
    
    reply.status(error.statusCode || 500).send({
      statusCode: error.statusCode || 500,
      error: error.name || 'Internal Server Error',
      message: config.NODE_ENV === 'production' 
        ? 'Internal Server Error' 
        : error.message,
    });
  });

  // Not found handler
  fastify.setNotFoundHandler((request, reply) => {
    reply.status(404).send({
      statusCode: 404,
      error: 'Not Found',
      message: `Route ${request.method} ${request.url} not found`,
    });
  });

  return fastify;
}

async function start() {
  try {
    const fastify = await buildServer();
    
    await fastify.listen({ 
      port: parseInt(config.PORT), 
      host: config.HOST 
    });

    fastify.log.info(`🚀 Server listening on http://${config.HOST}:${config.PORT}`);
    fastify.log.info(`📚 API Documentation available at http://${config.HOST}:${config.PORT}/docs`);
    
    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      fastify.log.info(`Received ${signal}. Starting graceful shutdown...`);
      await fastify.close();
      process.exit(0);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    
  } catch (err: any) {
    console.error(err);
    process.exit(1);
  }
}

start();
