import { prisma } from "../../../../prisma/database";
import { CarService } from "../../../services";
import {
    createCarValidPayloadMock,
    createUserValidPayloadMock,
    updateCarValidPayloadMock,
    updateCarValidReturnMock,
} from "../../__mocks__";
import { container } from "tsyringe";

describe("Unit tests: Car service - update car", () => {
    beforeEach(async () => {
        await prisma.car.deleteMany();
        await prisma.user.deleteMany();
    });

    const carService = container.resolve(CarService);

    test("should be able to update a car", async () => {
        const user = await prisma.user.create({
            data: createUserValidPayloadMock,
        });
        const newCar = await prisma.car.create({
            data: { ...createCarValidPayloadMock, userId: user.id },
        });

        const updatedCar = await carService.update(
            newCar.id,
            updateCarValidPayloadMock
        );

        expect(updatedCar).toEqual(updateCarValidReturnMock);
    });
});
