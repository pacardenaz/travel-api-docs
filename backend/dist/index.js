"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const config_1 = require("./config");
// Import plugins
const swagger_1 = __importDefault(require("./plugins/swagger"));
const cors_1 = __importDefault(require("./plugins/cors"));
const jwt_1 = __importDefault(require("./plugins/jwt"));
// Import routes
const health_1 = __importDefault(require("./routes/health"));
const docs_1 = __importDefault(require("./routes/docs"));
const ideas_fractal_1 = __importDefault(require("./routes/proxy/ideas-fractal"));
async function buildServer() {
    const fastify = (0, fastify_1.default)({
        logger: {
            level: config_1.config.NODE_ENV === 'development' ? 'debug' : 'info',
            transport: config_1.config.NODE_ENV === 'development'
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
    await fastify.register(Promise.resolve().then(() => __importStar(require('@fastify/rate-limit'))), {
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
    await fastify.register(cors_1.default);
    await fastify.register(jwt_1.default);
    await fastify.register(swagger_1.default);
    // Register routes
    await fastify.register(health_1.default);
    await fastify.register(docs_1.default);
    await fastify.register(ideas_fractal_1.default, { prefix: '/proxy/ideas-fractal' });
    // Error handler
    fastify.setErrorHandler((error, request, reply) => {
        fastify.log.error(error);
        reply.status(error.statusCode || 500).send({
            statusCode: error.statusCode || 500,
            error: error.name || 'Internal Server Error',
            message: config_1.config.NODE_ENV === 'production'
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
            port: parseInt(config_1.config.PORT),
            host: config_1.config.HOST
        });
        fastify.log.info(`🚀 Server listening on http://${config_1.config.HOST}:${config_1.config.PORT}`);
        fastify.log.info(`📚 API Documentation available at http://${config_1.config.HOST}:${config_1.config.PORT}/docs`);
        // Graceful shutdown
        const gracefulShutdown = async (signal) => {
            fastify.log.info(`Received ${signal}. Starting graceful shutdown...`);
            await fastify.close();
            process.exit(0);
        };
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}
start();
//# sourceMappingURL=index.js.map