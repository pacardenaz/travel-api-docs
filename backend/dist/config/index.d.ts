import { z } from 'zod';
declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<{
        development: "development";
        production: "production";
        test: "test";
    }>>;
    PORT: z.ZodDefault<z.ZodString>;
    HOST: z.ZodDefault<z.ZodString>;
    JWT_SECRET: z.ZodDefault<z.ZodString>;
    REDIS_URL: z.ZodOptional<z.ZodString>;
    IDEAS_FRACTAL_API_URL: z.ZodDefault<z.ZodString>;
}, z.core.$strip>;
export declare const config: {
    NODE_ENV: "development" | "production" | "test";
    PORT: string;
    HOST: string;
    JWT_SECRET: string;
    IDEAS_FRACTAL_API_URL: string;
    REDIS_URL?: string | undefined;
};
export type Config = z.infer<typeof envSchema>;
export {};
//# sourceMappingURL=index.d.ts.map