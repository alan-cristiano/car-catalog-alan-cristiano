import { prisma } from "../../../../prisma/database";
import {
    createCarValidPayloadMock,
    createCarValidReturnMock,
    createUserValidPayloadMock,
} from "../../__mocks__";

import { request } from "../../utils/request";

describe("Integration tests: GET /cars/:id - Retrieve car", () => {
    const endPointPrefix = "/cars/";
    beforeEach(async () => {
        await prisma.car.deleteMany();
        await prisma.user.deleteMany();
    });

    test("should be able to retrieve a car", async () => {
        const user = await prisma.user.create({
            data: createUserValidPayloadMock,
        });
        const newCar = await prisma.car.create({
            data: { ...createCarValidPayloadMock, userId: user.id },
        });

        const endPoint = endPointPrefix + newCar.id;
        const response = await request.get(endPoint);

        expect(response.body).toEqual(createCarValidReturnMock);
        expect(response.status).toBe(200);
    });

    test("should throw an error if retrieving a car with invalid id", async () => {
        const endPoint = endPointPrefix + "invalidCarId";
        const response = await request.get(endPoint);

        const expectedResponseMessage = { error: "Car not found." };

        expect(response.body).toEqual(expectedResponseMessage);
        expect(response.statusCode).toBe(404);
    });
});
