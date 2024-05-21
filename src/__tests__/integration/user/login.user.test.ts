import { hash } from "bcryptjs";
import { prisma } from "../../../../prisma/database";
import {
    createUserValidPayloadMock,
    loginUserInvalidPasswordPayloadMock,
    loginUserInvalidPayloadMock,
    loginUserValidPayloadMock,
    loginUserValidReturnMock,
} from "../../__mocks__";

import { request } from "../../utils/request";

describe("Integration tests: POST /users/login - User login", () => {
    const endPoint = "/users/login";

    beforeEach(async () => {
        await prisma.car.deleteMany();
        await prisma.user.deleteMany();
    });

    test("should be possible a user to login", async () => {
        const createUserWithHashPassword = {
            ...createUserValidPayloadMock,
            password: await hash(createUserValidPayloadMock.password, 10),
        };

        await prisma.user.create({
            data: createUserWithHashPassword,
        });

        const response = await request
            .post(endPoint)
            .send(loginUserValidPayloadMock);

        expect(response.body).toEqual(loginUserValidReturnMock);
        expect(response.status).toBe(200);
    });

    test("should return an error when trying to login with invalid keys", async () => {
        const response = await request
            .post(endPoint)
            .send(loginUserInvalidPayloadMock);

        const requiredKeys = ["email", "password"];
        const receivedKeys = Object.keys(response.body.errors);

        expect(receivedKeys).toEqual(requiredKeys);
        requiredKeys.forEach((key) => {
            expect(response.body.errors[key]).toContain("Required");
        });
        expect(response.statusCode).toBe(400);
    });

    test("should return an error when trying to login with invalid user data", async () => {
        const response = await request
            .post(endPoint)
            .send(loginUserValidPayloadMock);

        const expectedResponseMessage = { error: "User not registered" };

        expect(response.body).toEqual(expectedResponseMessage);
        expect(response.statusCode).toBe(404);
    });

    test("should return an error when trying to login with invalid credentials", async () => {
        const createUserWithHashPassword = {
            ...createUserValidPayloadMock,
            password: await hash(createUserValidPayloadMock.password, 10),
        };

        await prisma.user.create({
            data: createUserWithHashPassword,
        });

        const response = await request
            .post(endPoint)
            .send(loginUserInvalidPasswordPayloadMock);

        const expectedResponseMessage = {
            error: "E-mail and password doesn't match",
        };

        expect(response.body).toEqual(expectedResponseMessage);
        expect(response.statusCode).toBe(401);
    });
});
