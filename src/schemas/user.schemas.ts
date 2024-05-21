import { z } from "zod";

const userSchema = z.object({
    id: z.string(),
    name: z.string().max(255),
    email: z.string().email().max(255),
    password: z.string().min(8).max(255),
});

const createUserPayloadSchema = userSchema.omit({ id: true });
const createUserReturnSchema = userSchema.omit({ password: true });
const loginUserPayloadSchema = userSchema.omit({ id: true, name: true });
const loginUserReturnSchema = z.object({
    token: z.string(),
    user: userSchema.omit({ password: true }),
});

const updateUserPayloadSchema = userSchema.omit({ id: true }).partial();

export {
    createUserPayloadSchema,
    userSchema,
    createUserReturnSchema,
    updateUserPayloadSchema,
    loginUserPayloadSchema,
    loginUserReturnSchema,
};
