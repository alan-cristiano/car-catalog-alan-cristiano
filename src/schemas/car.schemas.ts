import { z } from "zod";

const carSchema = z.object({
    id: z.string(),
    name: z.string().max(255),
    description: z.string().max(255).nullish(),
    brand: z.string().max(255),
    year: z.number().positive(),
    km: z.number().positive(),
    userId: z.string(),
});

const createCarPayloadSchema = carSchema.omit({ id: true });

const updateCarPayloadSchema = carSchema
    .omit({ id: true, userId: true })
    .partial();

export { createCarPayloadSchema, carSchema, updateCarPayloadSchema };
