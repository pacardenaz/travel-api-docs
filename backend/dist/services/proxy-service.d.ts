import { FastifyInstance } from 'fastify';
export declare class ProxyService {
    private fastify;
    constructor(fastify: FastifyInstance);
    proxyToIdeasFractal(endpoint: string, method: string, body?: any, headers?: any): Promise<{
        proxied: boolean;
        target: string;
        method: string;
        timestamp: string;
    }>;
}
export default ProxyService;
//# sourceMappingURL=proxy-service.d.ts.map