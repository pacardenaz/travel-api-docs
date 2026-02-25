import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),
  HOST: z.string().default('0.0.0.0'),
  JWT_SECRET: z.string().default('your-secret-key-change-in-production'),
  REDIS_URL: z.string().optional(),
  IDEAS_FRACTAL_API_URL: z.string().default('https://api.ideasfractal.com'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const config = parsed.data;

export type Config = z.infer<typeof envSchema>;
