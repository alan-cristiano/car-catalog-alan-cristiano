import { Router } from "express";
import { container } from "tsyringe";
import { UserService } from "../services";
import { UserController } from "../controllers";
import { ensure } from "../middlewares";
import { createUserPayloadSchema, loginUserPayloadSchema } from "../schemas";
import { auth } from "../middlewares/AuthMiddleware";

const userRouter = Router();
container.registerSingleton("UserService", UserService);
const userController = container.resolve(UserController);

userRouter.post(
    "/",
    ensure.bodyIsValid(createUserPayloadSchema),
    userController.create
);

userRouter.post(
    "/login",
    ensure.bodyIsValid(loginUserPayloadSchema),
    userController.login
);

userRouter.get("/", auth.isAuthenticated, userController.retrieve);

export { userRouter };
