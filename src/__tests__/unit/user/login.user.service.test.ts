import { hash } from "bcryptjs";
import { prisma } from "../../../../prisma/database";
import { UserService } from "../../../services";
import {
    createUserValidPayloadMock,
    loginUserInvalidPasswordPayloadMock,
    loginUserValidPayloadMock,
    loginUserValidReturnMock,
} from "../../__mocks__";
import { container } from "tsyringe";

describe("Unit tests: User service - User login", () => {
    beforeEach(async () => {
        await prisma.user.deleteMany();
        await prisma.car.deleteMany();
    });

    const userService = container.resolve(UserService);

    test("should be possible a user to login", async () => {
        const createUserWithHashPassword = {
            ...createUserValidPayloadMock,
            password: await hash(createUserValidPayloadMock.password, 10),
        };

        await prisma.user.create({
            data: createUserWithHashPassword,
        });

        const userLogin = await userService.login(loginUserValidPayloadMock);

        expect(userLogin).toEqual(loginUserValidReturnMock);
    });

    test("should throw an error if invalid user", async () => {
        await expect(
            userService.login(loginUserValidPayloadMock)
        ).rejects.toThrow("User not registered");
    });

    test("should throw an error if invalid credentials", async () => {
        const createUserWithHashPassword = {
            ...createUserValidPayloadMock,
            password: await hash(createUserValidPayloadMock.password, 10),
        };

        await prisma.user.create({
            data: createUserWithHashPassword,
        });

        await expect(
            userService.login(loginUserInvalidPasswordPayloadMock)
        ).rejects.toThrow("E-mail and password doesn't match");
    });
});
