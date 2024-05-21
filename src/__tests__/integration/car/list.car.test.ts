import { prisma } from "../../../../prisma/database";
import {
    createCarValidPayloadMock,
    createCarValidReturnMock,
    createUserValidPayloadMock,
} from "../../__mocks__";

import { request } from "../../utils/request";

describe("Integration tests: GET /cars - List cars", () => {
    const endPoint = "/cars";
    beforeEach(async () => {
        await prisma.car.deleteMany();
        await prisma.user.deleteMany();
    });

    test("should be able to list all cars", async () => {
        const user = await prisma.user.create({
            data: createUserValidPayloadMock,
        });
        await prisma.car.create({
            data: { ...createCarValidPayloadMock, userId: user.id },
        });
        await prisma.car.create({
            data: { ...createCarValidPayloadMock, userId: user.id },
        });
        const response = await request.get(endPoint);

        expect(response.body).toHaveLength(2);
        expect(response.body[0]).toEqual(createCarValidReturnMock);
        expect(response.body[1]).toEqual(createCarValidReturnMock);
        expect(response.status).toBe(200);
    });

    test("should be able to list all cars registered to a user", async () => {
        const user1 = await prisma.user.create({
            data: createUserValidPayloadMock,
        });

        const user2 = await prisma.user.create({
            data: {
                ...createUserValidPayloadMock,
                email: "user_email2@mail.com",
            },
        });

        const searchParams = "?userId=" + user1.id;

        await prisma.car.create({
            data: { ...createCarValidPayloadMock, userId: user1.id },
        });
        await prisma.car.create({
            data: { ...createCarValidPayloadMock, userId: user1.id },
        });
        await prisma.car.create({
            data: { ...createCarValidPayloadMock, userId: user2.id },
        });
        const response = await request.get(endPoint + searchParams);

        expect(response.body).toHaveLength(2);
        expect(response.body[0]).toEqual(createCarValidReturnMock);
        expect(response.body[1]).toEqual(createCarValidReturnMock);
        expect(response.status).toBe(200);
    });
});
