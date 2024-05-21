import { Router } from "express";
import { CarController } from "../controllers";
import { ensure, ensureCar } from "../middlewares";
import { createCarPayloadSchema, updateCarPayloadSchema } from "../schemas";
import { container } from "tsyringe";
import { CarService } from "../services";
import { auth } from "../middlewares/AuthMiddleware";

const carRouter = Router();
container.registerSingleton("CarService", CarService);
const carController = container.resolve(CarController);

carRouter.post(
    "",
    auth.isAuthenticated,
    ensure.bodyIsValid(createCarPayloadSchema),
    auth.isAccountOwner,
    carController.create
);

carRouter.get("", carController.list);

carRouter.use("/:id", ensureCar.idIsValid);

carRouter.get("/:id", carController.retrieve);

carRouter.use("/:id", auth.isAuthenticated);

carRouter.patch(
    "/:id",
    ensure.bodyIsValid(updateCarPayloadSchema),
    auth.isCarOwner,
    carController.update
);

carRouter.delete("/:id", auth.isCarOwner, carController.delete);

export { carRouter };
