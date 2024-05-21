import { injectable } from "tsyringe";
import { prisma } from "../../prisma/database";
import {
    Car,
    CreateCarPayload,
    ICarService,
    UpdateCarPayload,
} from "../interfaces";
import { carSchema } from "../schemas";
import { AppError } from "../errors";

@injectable()
class CarService implements ICarService {
    private prismaModel = prisma.car;

    public async create(payload: CreateCarPayload): Promise<Car> {
        const foundUser = await prisma.user.findUnique({
            where: { id: payload.userId },
        });
        if (!foundUser) throw new AppError("User not registered", 404);

        const newCar = await this.prismaModel.create({ data: payload });
        return carSchema.parse(newCar);
    }

    public async list(userId?: string): Promise<Array<Car>> {
        const carsList = await this.prismaModel.findMany({
            where: { userId },
        });
        return carSchema.array().parse(carsList);
    }

    public async retrieve(carId: string): Promise<Car> {
        const foundCar = await this.prismaModel.findUnique({
            where: { id: carId },
        });

        return carSchema.parse(foundCar);
    }

    public async update(
        carId: string,
        payload: UpdateCarPayload
    ): Promise<Car> {
        const updatedCar = await this.prismaModel.update({
            where: { id: carId },
            data: payload,
        });

        return carSchema.parse(updatedCar);
    }

    public async delete(carId: string): Promise<void> {
        await this.prismaModel.delete({
            where: { id: carId },
        });
    }
}

export { CarService };
