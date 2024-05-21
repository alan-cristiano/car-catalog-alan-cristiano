import { prisma } from "../../../../prisma/database";
import {
    createCarValidPayloadMock,
    createUserValidPayloadMock2,
    loginUserMock,
} from "../../__mocks__";
import { request } from "../../utils/request";

describe("Integration tests: DELETE /cars/:id - Delete car", () => {
    const endPointPrefix = "/cars/";
    beforeEach(async () => {
        await prisma.car.deleteMany();
        await prisma.user.deleteMany();
    });

    test("should be able to delete a car", async () => {
        const { user, token } = await loginUserMock();

        const newCar = await prisma.car.create({
            data: { ...createCarValidPayloadMock, userId: user.id },
        });

        const endPoint = endPointPrefix + newCar.id;
        const response = await request
            .delete(endPoint)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(204);

        const searchCar = await prisma.car.findUnique({
            where: { id: newCar.id },
        });

        expect(searchCar).toBeFalsy();
    });

    test("should throw an error if deleting a car with invalid id", async () => {
        const endPoint = endPointPrefix + "invalidCarId";
        const response = await request.delete(endPoint);

        const expectedResponseMessage = { error: "Car not found." };

        expect(response.body).toEqual(expectedResponseMessage);
        expect(response.statusCode).toBe(404);
    });

    test("should throw an error if deleting a car with invalid user id", async () => {
        const user1 = await loginUserMock();

        const newCarUser1 = await prisma.car.create({
            data: { ...createCarValidPayloadMock, userId: user1.user.id },
        });

        const user2 = await loginUserMock(createUserValidPayloadMock2);

        const endPoint = endPointPrefix + newCarUser1.id;

        const response = await request
            .delete(endPoint)
            .set("Authorization", `Bearer ${user2.token}`);

        const expectedResponseMessage = { error: "User must be the car owner" };

        expect(response.body).toEqual(expectedResponseMessage);
        expect(response.statusCode).toBe(403);
    });

    test("should throw an error if deleting a car with no authentication", async () => {
        const { user, token } = await loginUserMock();

        const newCar = await prisma.car.create({
            data: { ...createCarValidPayloadMock, userId: user.id },
        });

        const endPoint = endPointPrefix + newCar.id;

        const response = await request.delete(endPoint);

        const expectedResponseMessage = { error: "Token is required" };

        expect(response.body).toEqual(expectedResponseMessage);
        expect(response.statusCode).toBe(401);
    });
});
