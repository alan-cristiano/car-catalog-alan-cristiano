import { Express } from "express";
import { carRouter } from "./car.routes";
import { userRouter } from "./user.routes";

const initRoutes = (app: Express) => {
    app.use("/cars", carRouter);
    app.use("/users", userRouter);
};

export { initRoutes };
