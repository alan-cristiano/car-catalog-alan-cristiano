import { prisma } from "../../../../prisma/database";
import { UserService } from "../../../services";
import {
    createUserValidPayloadMock,
    createUserValidReturnMock,
} from "../../__mocks__";
import { container } from "tsyringe";

describe("Unit tests: User service - Retrieve user", () => {
    beforeEach(async () => {
        await prisma.user.deleteMany();
        await prisma.car.deleteMany();
    });

    const userService = container.resolve(UserService);

    test("should be able to retrieve a user", async () => {
        const newUser = await prisma.user.create({
            data: createUserValidPayloadMock,
        });

        const retrieveUser = await userService.retrieve(newUser.id);

        expect(retrieveUser).toEqual(createUserValidReturnMock);
    });

    test("should throw an error if retrieving a user with invalid id", async () => {
        const userId = "invalid_userId";
        await expect(userService.retrieve(userId)).rejects.toThrow(
            "User not registered"
        );
    });
});
