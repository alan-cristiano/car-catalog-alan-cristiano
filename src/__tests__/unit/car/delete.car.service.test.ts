import { prisma } from "../../../../prisma/database";
import { CarService } from "../../../services";
import {
    createCarValidPayloadMock,
    createUserValidPayloadMock,
} from "../../__mocks__";
import { container } from "tsyringe";

describe("Unit tests: Car service - delete car", () => {
    beforeEach(async () => {
        await prisma.car.deleteMany();
        await prisma.user.deleteMany();
    });

    const carService = container.resolve(CarService);

    test("should be able to delete a car", async () => {
        const user = await prisma.user.create({
            data: createUserValidPayloadMock,
        });
        const newCar = await prisma.car.create({
            data: { ...createCarValidPayloadMock, userId: user.id },
        });

        await carService.delete(newCar.id);

        const searchCar = await prisma.car.findUnique({
            where: { id: newCar.id },
        });

        expect(searchCar).toBeFalsy();
    });
});
