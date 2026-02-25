"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    PORT: zod_1.z.string().default('3000'),
    HOST: zod_1.z.string().default('0.0.0.0'),
    JWT_SECRET: zod_1.z.string().default('your-secret-key-change-in-production'),
    REDIS_URL: zod_1.z.string().optional(),
    IDEAS_FRACTAL_API_URL: zod_1.z.string().default('https://api.ideasfractal.com'),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
    process.exit(1);
}
exports.config = parsed.data;
//# sourceMappingURL=index.js.map