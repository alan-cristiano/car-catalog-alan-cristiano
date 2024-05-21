import { prisma } from "../../../../prisma/database";
import { UserService } from "../../../services";
import {
    createUserValidPayloadMock,
    createUserValidReturnMock,
} from "../../__mocks__";
import { container } from "tsyringe";

describe("Unit tests: User service - Create user", () => {
    beforeEach(async () => {
        await prisma.user.deleteMany();
        await prisma.car.deleteMany();
    });

    const userService = container.resolve(UserService);

    test("should be able to create a user", async () => {
        const newUser = await userService.create(createUserValidPayloadMock);

        expect(newUser).toEqual(createUserValidReturnMock);
    });
});
