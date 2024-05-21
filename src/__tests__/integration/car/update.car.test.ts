import { prisma } from "../../../../prisma/database";
import {
    createCarValidPayloadMock,
    createUserValidPayloadMock2,
    loginUserMock,
    updateCarInvalidPayloadMock,
    updateCarValidPayloadMock,
    updateCarValidReturnMock,
} from "../../__mocks__";

import { request } from "../../utils/request";

describe("Integration tests: PATCH /cars/:id - Update car", () => {
    const endPointPrefix = "/cars/";

    beforeEach(async () => {
        await prisma.car.deleteMany();
        await prisma.user.deleteMany();
    });

    test("should be able to update a car", async () => {
        const { user, token } = await loginUserMock();

        const newCar = await prisma.car.create({
            data: { ...createCarValidPayloadMock, userId: user.id },
        });

        const endPoint = endPointPrefix + newCar.id;

        const response = await request
            .patch(endPoint)
            .set("Authorization", `Bearer ${token}`)
            .send({ ...updateCarValidPayloadMock });

        expect(response.body).toEqual(updateCarValidReturnMock);
        expect(response.statusCode).toBe(200);
    });

    test("should throw an error if updating a car with invalid id", async () => {
        const endPoint = endPointPrefix + "invalidCarId";
        const response = await request.patch(endPoint);

        const expectedResponseMessage = { error: "Car not found." };

        expect(response.body).toEqual(expectedResponseMessage);
        expect(response.statusCode).toBe(404);
    });

    test("should throw an error if updating a car with invalid user id", async () => {
        const user1 = await loginUserMock();

        const newCarUser1 = await prisma.car.create({
            data: { ...createCarValidPayloadMock, userId: user1.user.id },
        });

        const user2 = await loginUserMock(createUserValidPayloadMock2);

        const endPoint = endPointPrefix + newCarUser1.id;

        const response = await request
            .patch(endPoint)
            .set("Authorization", `Bearer ${user2.token}`)
            .send({ ...updateCarValidPayloadMock });

        const expectedResponseMessage = { error: "User must be the car owner" };

        expect(response.body).toEqual(expectedResponseMessage);
        expect(response.statusCode).toBe(403);
    });

    test("should throw an error if updating a car with invalid keys", async () => {
        const { user, token } = await loginUserMock();
        const newCar = await prisma.car.create({
            data: { ...createCarValidPayloadMock, userId: user.id },
        });
        const endPoint = endPointPrefix + newCar.id;
        const response = await request
            .patch(endPoint)
            .set("Authorization", `Bearer ${token}`)
            .send(updateCarInvalidPayloadMock);

        const requiredKeys = ["name", "description", "brand", "year", "km"];
        const receivedKeys = Object.keys(response.body.errors);

        expect(receivedKeys).toEqual(requiredKeys);
        requiredKeys.forEach((key) => {
            if (key === "name" || key === "description" || key === "brand") {
                expect(
                    response.body.errors[key].at(0).split(",").at(0)
                ).toContain("Expected string");
            }
            if (key === "km" || key === "year") {
                expect(
                    response.body.errors[key].at(0).split(",").at(0)
                ).toContain("Expected number");
            }
        });
        expect(response.statusCode).toBe(400);
    });

    test("should throw an error if updating a car with no authentication", async () => {
        const { user, token } = await loginUserMock();

        const newCar = await prisma.car.create({
            data: { ...createCarValidPayloadMock, userId: user.id },
        });

        const endPoint = endPointPrefix + newCar.id;

        const response = await request.patch(endPoint);

        const expectedResponseMessage = { error: "Token is required" };

        expect(response.body).toEqual(expectedResponseMessage);
        expect(response.statusCode).toBe(401);
    });
});
