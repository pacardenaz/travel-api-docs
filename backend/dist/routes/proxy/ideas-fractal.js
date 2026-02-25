"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
// Mock data for Ideas Fractal API
const mockAuthResponse = {
    token: 'mock-jwt-token-' + Math.random().toString(36).substring(7),
    expiresIn: 86400,
    type: 'Bearer',
};
const mockAvailabilityResponse = [
    {
        id: 'hotel-001',
        name: 'Grand Hotel Barcelona',
        type: 'hotel',
        price: {
            amount: 150.00,
            currency: 'EUR',
            perNight: true,
        },
        rating: 4.5,
        amenities: ['wifi', 'pool', 'spa', 'gym', 'restaurant'],
        available: true,
    },
    {
        id: 'apt-002',
        name: 'Modern Apartment Eixample',
        type: 'apartment',
        price: {
            amount: 95.00,
            currency: 'EUR',
            perNight: true,
        },
        rating: 4.2,
        amenities: ['wifi', 'kitchen', 'washer', 'ac'],
        available: true,
    },
    {
        id: 'resort-003',
        name: 'Beach Resort Costa Brava',
        type: 'resort',
        price: {
            amount: 280.00,
            currency: 'EUR',
            perNight: true,
        },
        rating: 4.8,
        amenities: ['wifi', 'pool', 'spa', 'beach', 'restaurant', 'bar'],
        available: false,
    },
];
const mockSources = [
    {
        id: 'ideas-fractal',
        name: 'Ideas Fractal',
        description: 'API de reservas y disponibilidad de Ideas Fractal',
        enabled: true,
        baseUrl: 'https://api.ideasfractal.com',
    },
    {
        id: 'booking-com',
        name: 'Booking.com',
        description: 'Integración con Booking.com API',
        enabled: false,
        baseUrl: 'https://distribution-xml.booking.com',
    },
    {
        id: 'expedia',
        name: 'Expedia',
        description: 'Expedia Partner Solutions API',
        enabled: false,
        baseUrl: 'https://api.expediapartner.com',
    },
];
async function default_1(fastify) {
    // POST /proxy/ideas-fractal/auth
    fastify.post('/auth', {
        schema: {
            tags: ['Proxy'],
            description: 'Authenticate with Ideas Fractal API (mock)',
            body: {
                type: 'object',
                properties: {
                    username: { type: 'string' },
                    password: { type: 'string' },
                },
                required: ['username', 'password'],
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        token: { type: 'string' },
                        expiresIn: { type: 'number' },
                        type: { type: 'string' },
                    },
                },
                401: {
                    type: 'object',
                    properties: {
                        statusCode: { type: 'number' },
                        error: { type: 'string' },
                        message: { type: 'string' },
                    },
                },
            },
        },
    }, async (request, reply) => {
        const body = request.body;
        // Simple mock validation
        if (!body.username || !body.password) {
            return reply.status(401).send({
                statusCode: 401,
                error: 'Unauthorized',
                message: 'Invalid credentials',
            });
        }
        fastify.log.info(`Mock auth for user: ${body.username}`);
        return {
            ...mockAuthResponse,
            token: `mock-jwt-token-${body.username}-${Date.now()}`,
        };
    });
    // POST /proxy/ideas-fractal/availability
    fastify.post('/availability', {
        onRequest: [fastify.authenticate],
        schema: {
            tags: ['Proxy'],
            description: 'Check availability with Ideas Fractal API (mock)',
            security: [{ bearerAuth: [] }],
            body: {
                type: 'object',
                properties: {
                    destination: { type: 'string' },
                    checkIn: { type: 'string', format: 'date' },
                    checkOut: { type: 'string', format: 'date' },
                    guests: { type: 'number', minimum: 1, maximum: 10 },
                    rooms: { type: 'number', minimum: 1, maximum: 5 },
                },
                required: ['destination', 'checkIn', 'checkOut', 'guests'],
            },
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            type: { type: 'string' },
                            price: {
                                type: 'object',
                                properties: {
                                    amount: { type: 'number' },
                                    currency: { type: 'string' },
                                    perNight: { type: 'boolean' },
                                },
                            },
                            rating: { type: 'number' },
                            amenities: { type: 'array', items: { type: 'string' } },
                            available: { type: 'boolean' },
                        },
                    },
                },
            },
        },
    }, async (request, reply) => {
        const body = request.body;
        fastify.log.info(`Mock availability search for: ${body.destination}`);
        // Simulate some processing delay
        await new Promise(resolve => setTimeout(resolve, 100));
        // Return filtered mock data based on destination
        return mockAvailabilityResponse.map(item => ({
            ...item,
            id: `${item.id}-${Date.now()}`,
        }));
    });
    // GET /proxy/ideas-fractal/sources
    fastify.get('/sources', {
        onRequest: [fastify.authenticate],
        schema: {
            tags: ['Proxy'],
            description: 'List available data sources from Ideas Fractal API (mock)',
            security: [{ bearerAuth: [] }],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            description: { type: 'string' },
                            enabled: { type: 'boolean' },
                            baseUrl: { type: 'string' },
                        },
                    },
                },
            },
        },
    }, async (request, reply) => {
        fastify.log.info('Mock sources list request');
        return mockSources;
    });
}
//# sourceMappingURL=ideas-fractal.js.map