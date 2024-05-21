import { injectable } from "tsyringe";
import { prisma } from "../../prisma/database";
import {
    CreateUserPayload,
    CreateUserReturn,
    IUserService,
    LoginUserPayload,
    LoginUserReturn,
} from "../interfaces/";
import { createUserReturnSchema, loginUserReturnSchema } from "../schemas";
import { AppError } from "../errors";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

@injectable()
class UserService implements IUserService {
    private prismaModel = prisma.user;

    public create = async (
        payload: CreateUserPayload
    ): Promise<CreateUserReturn> => {
        const foundEmail = await this.prismaModel.findUnique({
            where: { email: payload.email },
        });

        if (foundEmail) throw new AppError("E-mail already registered", 409);

        payload.password = await hash(payload.password, 10);

        const newUser = await this.prismaModel.create({ data: payload });

        return createUserReturnSchema.parse(newUser);
    };

    public login = async (
        payload: LoginUserPayload
    ): Promise<LoginUserReturn> => {
        const foundUser = await this.prismaModel.findUnique({
            where: { email: payload.email },
        });

        if (!foundUser) throw new AppError("User not registered", 404);

        const passwordMatch = await compare(
            payload.password,
            foundUser.password
        );

        if (!passwordMatch)
            throw new AppError("E-mail and password doesn't match", 401);

        const token = sign({}, process.env.JWT_SECRET_KEY!, {
            expiresIn: process.env.EXPIRES_IN || "1h",
            subject: foundUser.id,
        });

        const userReturn = {
            token,
            user: foundUser,
        };

        return loginUserReturnSchema.parse(userReturn);
    };

    public retrieve = async (userId: string): Promise<CreateUserReturn> => {
        const foundUser = await this.prismaModel.findUnique({
            where: { id: userId },
        });

        if (!foundUser) throw new AppError("User not registered", 404);

        return createUserReturnSchema.parse(foundUser);
    };
}

export { UserService };
