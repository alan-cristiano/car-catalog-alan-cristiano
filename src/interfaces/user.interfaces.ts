import { z } from "zod";
import {
    createUserPayloadSchema,
    userSchema,
    updateUserPayloadSchema,
    createUserReturnSchema,
    loginUserPayloadSchema,
    loginUserReturnSchema,
} from "../schemas";
import { Request, Response } from "express";

type User = z.infer<typeof userSchema>;
type CreateUserPayload = z.infer<typeof createUserPayloadSchema>;
type CreateUserReturn = z.infer<typeof createUserReturnSchema>;
type LoginUserPayload = z.infer<typeof loginUserPayloadSchema>;
type LoginUserReturn = z.infer<typeof loginUserReturnSchema>;
type UpdateUserPayload = z.infer<typeof updateUserPayloadSchema>;

interface IUserService {
    create(payload: CreateUserPayload): Promise<CreateUserReturn>;
    login(payload: LoginUserPayload): Promise<LoginUserReturn>;
    retrieve(userId: string): Promise<CreateUserReturn>;
}

interface IUserController {
    create(req: Request, res: Response): Promise<Response>;
    login(req: Request, res: Response): Promise<Response>;
    retrieve(req: Request, res: Response): Promise<Response>;
}

export {
    User,
    CreateUserPayload,
    CreateUserReturn,
    UpdateUserPayload,
    IUserService,
    IUserController,
    LoginUserPayload,
    LoginUserReturn,
};
