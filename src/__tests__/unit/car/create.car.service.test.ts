import { prisma } from "../../../../prisma/database";
import { CarService } from "../../../services";
import {
    createCarValidPayloadMock,
    createCarValidReturnMock,
    createUserValidPayloadMock,
} from "../../__mocks__";
import { container } from "tsyringe";

describe("Unit tests: Car service - Create car", () => {
    beforeEach(async () => {
        await prisma.car.deleteMany();
        await prisma.user.deleteMany();
    });

    const carService = container.resolve(CarService);

    test("should be able to create a car", async () => {
        const user = await prisma.user.create({
            data: createUserValidPayloadMock,
        });
        const newCar = await carService.create({
            ...createCarValidPayloadMock,
            userId: user.id,
        });

        expect(newCar).toEqual({
            ...createCarValidReturnMock,
            userId: user.id,
        });
    });

    test("should throw an error if creating a car with invalid user id", async () => {
        await expect(
            carService.create(createCarValidPayloadMock)
        ).rejects.toThrow("User not registered");
    });
});
