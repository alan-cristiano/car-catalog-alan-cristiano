import { prisma } from "../../../../prisma/database";
import { CarService } from "../../../services";
import {
    createCarValidPayloadMock,
    createCarValidReturnMock,
    createUserValidPayloadMock,
} from "../../__mocks__";
import { container } from "tsyringe";

describe("Unit tests: Car service - retrieve car", () => {
    beforeEach(async () => {
        await prisma.car.deleteMany();
        await prisma.user.deleteMany();
    });

    const carService = container.resolve(CarService);

    test("should be able to retrieve a car", async () => {
        const user = await prisma.user.create({
            data: createUserValidPayloadMock,
        });
        const newCar = await prisma.car.create({
            data: { ...createCarValidPayloadMock, userId: user.id },
        });

        const retrieve = await carService.retrieve(newCar.id);

        expect(retrieve).toEqual(createCarValidReturnMock);
    });
});
