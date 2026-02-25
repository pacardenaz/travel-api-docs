"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiErrorSchema = exports.SourceSchema = exports.AvailabilityResponseSchema = exports.AvailabilityRequestSchema = exports.AuthResponseSchema = exports.AuthRequestSchema = void 0;
const zod_1 = require("zod");
// Auth types
exports.AuthRequestSchema = zod_1.z.object({
    username: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1),
});
exports.AuthResponseSchema = zod_1.z.object({
    token: zod_1.z.string(),
    expiresIn: zod_1.z.number(),
    type: zod_1.z.string(),
});
// Availability types
exports.AvailabilityRequestSchema = zod_1.z.object({
    destination: zod_1.z.string().min(1),
    checkIn: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    checkOut: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    guests: zod_1.z.number().int().min(1).max(10),
    rooms: zod_1.z.number().int().min(1).max(5).optional(),
});
exports.AvailabilityResponseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    type: zod_1.z.enum(['hotel', 'apartment', 'resort', 'hostel']),
    price: zod_1.z.object({
        amount: zod_1.z.number(),
        currency: zod_1.z.string(),
        perNight: zod_1.z.boolean(),
    }),
    rating: zod_1.z.number().min(0).max(5).optional(),
    amenities: zod_1.z.array(zod_1.z.string()),
    available: zod_1.z.boolean(),
});
// Sources types
exports.SourceSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    enabled: zod_1.z.boolean(),
    baseUrl: zod_1.z.string().url(),
});
// Error types
exports.ApiErrorSchema = zod_1.z.object({
    statusCode: zod_1.z.number(),
    error: zod_1.z.string(),
    message: zod_1.z.string(),
});
//# sourceMappingURL=index.js.map