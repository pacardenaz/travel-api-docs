"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
async function default_1(fastify) {
    fastify.get('/health', {
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
    }, async () => {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            version: '1.0.0',
        };
    });
}
//# sourceMappingURL=health.js.map