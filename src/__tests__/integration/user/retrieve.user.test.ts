import { prisma } from "../../../../prisma/database";
import { loginUserMock } from "../../__mocks__";

import { request } from "../../utils/request";

describe("Integration tests: POST /users/login - User login", () => {
    const endPoint = "/users";

    beforeEach(async () => {
        await prisma.car.deleteMany();
        await prisma.user.deleteMany();
    });

    test("should be possible to retrieve a user", async () => {
        const { user, token } = await loginUserMock();

        const response = await request
            .get(endPoint)
            .set("Authorization", `Bearer ${token}`);

        expect(response.body).toEqual(user);
        expect(response.statusCode).toBe(200);
    });

    test("should return an error when trying to retrieve a user without token", async () => {
        const response = await request.get(endPoint);

        const expectedResponseMessage = { error: "Token is required" };

        expect(response.body).toEqual(expectedResponseMessage);
        expect(response.statusCode).toBe(401);
    });

    test("should return an error when trying to retrieve a user with invalid token", async () => {
        const response = await request
            .get(endPoint)
            .set("Authorization", `Bearer invalid_token`);

        const expectedResponseMessage = { error: "invalid token" };

        expect(response.body).toEqual(expectedResponseMessage);
        expect(response.statusCode).toBe(401);
    });
});
