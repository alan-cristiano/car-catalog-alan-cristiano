import { prisma } from "../../../../prisma/database";
import {
    createCarInvalidPayloadMock,
    createCarValidPayloadMock,
    createCarValidReturnMock,
    loginUserMock,
} from "../../__mocks__";

import { request } from "../../utils/request";

describe("Integration tests: POST /cars - Create car", () => {
    const endPoint = "/cars";
    beforeEach(async () => {
        await prisma.car.deleteMany();
        await prisma.user.deleteMany();
    });

    test("should be able to create a car", async () => {
        const { user, token } = await loginUserMock();

        const response = await request
            .post(endPoint)
            .set("Authorization", `Bearer ${token}`)
            .send({ ...createCarValidPayloadMock, userId: user.id });

        expect(response.body).toEqual(createCarValidReturnMock);
        expect(response.status).toBe(201);
    });

    test("should return an error when creating a car with invalid keys", async () => {
        const { user, token } = await loginUserMock();

        const response = await request
            .post(endPoint)
            .set("Authorization", `Bearer ${token}`)
            .send(createCarInvalidPayloadMock);

        const requiredKeys = ["name", "brand", "year", "km", "userId"];
        const receivedKeys = Object.keys(response.body.errors);

        expect(receivedKeys).toEqual(requiredKeys);
        requiredKeys.forEach((key) => {
            expect(response.body.errors[key]).toContain("Required");
        });
        expect(response.statusCode).toBe(400);
    });

    test("should throw an error if creating a car with no token", async () => {
        const { user, token } = await loginUserMock();

        const response = await request
            .post(endPoint)
            .send({ ...createCarValidPayloadMock, userId: user.id });

        const expectedMessage = { error: "Token is required" };

        expect(response.body).toEqual(expectedMessage);
        expect(response.status).toBe(401);
    });

    test("should throw an error if creating a car with invalid token", async () => {
        const { user } = await loginUserMock();
        const token = "invalid_token";
        const response = await request
            .post(endPoint)
            .set("Authorization", `Bearer ${token}`)
            .send({ ...createCarValidPayloadMock, userId: user.id });

        const expectedMessage = { error: "invalid token" };

        expect(response.body).toEqual(expectedMessage);
        expect(response.status).toBe(401);
    });
});
