import { z } from "zod";
import { logger } from "./winston.logger";

const envVariablesSchema = z.object({
    DATABASE_URL: z.string(),
    JWT_SECRET_KEY: z.string(),
    PORT: z.string().optional(),
});

const checkEnvVariables = () => {
    const result = envVariablesSchema.safeParse(process.env);

    if (!result.success) {
        result.error.issues.forEach(({ path }) =>
            logger.error(`Missing environment variable '${path}'`)
        );

        process.exit(1);
    }
};

export { checkEnvVariables };
