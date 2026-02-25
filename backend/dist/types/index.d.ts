import { z } from 'zod';
export declare const AuthRequestSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const AuthResponseSchema: z.ZodObject<{
    token: z.ZodString;
    expiresIn: z.ZodNumber;
    type: z.ZodString;
}, z.core.$strip>;
export declare const AvailabilityRequestSchema: z.ZodObject<{
    destination: z.ZodString;
    checkIn: z.ZodString;
    checkOut: z.ZodString;
    guests: z.ZodNumber;
    rooms: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const AvailabilityResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    type: z.ZodEnum<{
        hotel: "hotel";
        apartment: "apartment";
        resort: "resort";
        hostel: "hostel";
    }>;
    price: z.ZodObject<{
        amount: z.ZodNumber;
        currency: z.ZodString;
        perNight: z.ZodBoolean;
    }, z.core.$strip>;
    rating: z.ZodOptional<z.ZodNumber>;
    amenities: z.ZodArray<z.ZodString>;
    available: z.ZodBoolean;
}, z.core.$strip>;
export declare const SourceSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    enabled: z.ZodBoolean;
    baseUrl: z.ZodString;
}, z.core.$strip>;
export declare const ApiErrorSchema: z.ZodObject<{
    statusCode: z.ZodNumber;
    error: z.ZodString;
    message: z.ZodString;
}, z.core.$strip>;
export type AuthRequest = z.infer<typeof AuthRequestSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type AvailabilityRequest = z.infer<typeof AvailabilityRequestSchema>;
export type AvailabilityResponse = z.infer<typeof AvailabilityResponseSchema>;
export type Source = z.infer<typeof SourceSchema>;
export type ApiError = z.infer<typeof ApiErrorSchema>;
//# sourceMappingURL=index.d.ts.map