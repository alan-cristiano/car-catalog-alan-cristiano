import { prisma } from "../../../../prisma/database";
import {
    createUserInvalidPayloadMock,
    createUserValidPayloadMock,
    createUserValidReturnMock,
} from "../../__mocks__";

import { request } from "../../utils/request";

describe("Integration tests: POST /users - Create user", () => {
    const endPoint = "/users";

    beforeEach(async () => {
        await prisma.car.deleteMany();
        await prisma.user.deleteMany();
    });

    test("should be able to create a user", async () => {
        const response = await request
            .post(endPoint)
            .send(createUserValidPayloadMock);

        expect(response.body).toEqual(createUserValidReturnMock);
        expect(response.status).toBe(201);
    });

    test("should return an error when creating a user with invalid keys", async () => {
        const response = await request
            .post(endPoint)
            .send(createUserInvalidPayloadMock);

        const requiredKeys = ["name", "email", "password"];
        const receivedKeys = Object.keys(response.body.errors);

        expect(receivedKeys).toEqual(requiredKeys);
        requiredKeys.forEach((key) => {
            expect(response.body.errors[key]).toContain("Required");
        });
        expect(response.statusCode).toBe(400);
    });

    test("should return an error when creating a user with e-mail already registered", async () => {
        await prisma.user.create({ data: createUserValidPayloadMock });

        const response = await request
            .post(endPoint)
            .send(createUserValidPayloadMock);

        const expectedResponseMessage = { error: "E-mail already registered" };

        expect(response.body).toEqual(expectedResponseMessage);
        expect(response.statusCode).toBe(409);
    });
});
