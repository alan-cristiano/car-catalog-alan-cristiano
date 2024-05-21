import { prisma } from "../../../../prisma/database";
import { CarService } from "../../../services";
import {
    createCarValidPayloadMock,
    createCarValidReturnMock,
    createUserValidPayloadMock,
} from "../../__mocks__";
import { container } from "tsyringe";

describe("Unit tests: Car service - getMany cars", () => {
    beforeEach(async () => {
        await prisma.car.deleteMany();
        await prisma.user.deleteMany();
    });

    const carService = container.resolve(CarService);

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

        const carsList = await carService.list();

        expect(carsList).toHaveLength(2);
        expect(carsList[0]).toEqual(createCarValidReturnMock);
        expect(carsList[1]).toEqual(createCarValidReturnMock);
    });
});
