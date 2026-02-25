import { z } from 'zod';

// Auth types
export const AuthRequestSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const AuthResponseSchema = z.object({
  token: z.string(),
  expiresIn: z.number(),
  type: z.string(),
});

// Availability types
export const AvailabilityRequestSchema = z.object({
  destination: z.string().min(1),
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  guests: z.number().int().min(1).max(10),
  rooms: z.number().int().min(1).max(5).optional(),
});

export const AvailabilityResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['hotel', 'apartment', 'resort', 'hostel']),
  price: z.object({
    amount: z.number(),
    currency: z.string(),
    perNight: z.boolean(),
  }),
  rating: z.number().min(0).max(5).optional(),
  amenities: z.array(z.string()),
  available: z.boolean(),
});

// Sources types
export const SourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  enabled: z.boolean(),
  baseUrl: z.string().url(),
});

// Error types
export const ApiErrorSchema = z.object({
  statusCode: z.number(),
  error: z.string(),
  message: z.string(),
});

export type AuthRequest = z.infer<typeof AuthRequestSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type AvailabilityRequest = z.infer<typeof AvailabilityRequestSchema>;
export type AvailabilityResponse = z.infer<typeof AvailabilityResponseSchema>;
export type Source = z.infer<typeof SourceSchema>;
export type ApiError = z.infer<typeof ApiErrorSchema>;
