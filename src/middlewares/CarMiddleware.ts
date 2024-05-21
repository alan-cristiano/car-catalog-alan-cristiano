import { NextFunction, Request, Response } from "express";
import { prisma } from "../../prisma/database";
import { AppError } from "../errors";

class CarMiddleware {
    public idIsValid = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const carId = req.params.id;
        const foundCar = await prisma.car.findUnique({
            where: { id: carId },
        });

        if (!foundCar) throw new AppError("Car not found.", 404);

        res.locals = { ...res.locals, foundCar };

        return next();
    };
}

const ensureCar = new CarMiddleware();

export { ensureCar };
