import { sign } from "jsonwebtoken";
import { prisma } from "../../../prisma/database";
import { CreateUserPayload } from "../../interfaces";

const createUserValidPayloadMock = {
    name: "User_name",
    email: "user_email@mail.com",
    password: "user_password",
};

const createUserValidPayloadMock2 = {
    name: "User_name2",
    email: "user_email2@mail.com",
    password: "user_password2",
};

const createUserInvalidPayloadMock = {};

const createUserValidReturnMock = {
    id: expect.any(String),
    name: "User_name",
    email: "user_email@mail.com",
};

const loginUserValidPayloadMock = {
    email: createUserValidPayloadMock.email,
    password: createUserValidPayloadMock.password,
};

const loginUserInvalidPayloadMock = {};

const loginUserValidReturnMock = {
    token: expect.any(String),
    user: {
        id: expect.any(String),
        name: createUserValidReturnMock.name,
        email: createUserValidReturnMock.email,
    },
};

const loginUserInvalidPasswordPayloadMock = {
    email: createUserValidPayloadMock.email,
    password: "invalid_password",
};

const loginUserMock = async (
    data: CreateUserPayload = createUserValidPayloadMock
) => {
    const { id, name, email } = await prisma.user.create({
        data: data,
    });
    const user = { id, name, email };

    const token = sign({}, process.env.JWT_SECRET_KEY!, {
        expiresIn: process.env.EXPIRES_IN || "1h",
        subject: user.id,
    });

    return { user, token };
};

export {
    createUserValidPayloadMock,
    createUserValidReturnMock,
    createUserInvalidPayloadMock,
    loginUserValidReturnMock,
    loginUserValidPayloadMock,
    loginUserInvalidPasswordPayloadMock,
    loginUserInvalidPayloadMock,
    loginUserMock,
    createUserValidPayloadMock2,
};
