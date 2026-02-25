"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
async function default_1(fastify) {
    // Redirect root to docs
    fastify.get('/', async (request, reply) => {
        return reply.redirect('/docs');
    });
}
//# sourceMappingURL=index.js.map