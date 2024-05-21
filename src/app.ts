import "reflect-metadata";
import express from "express";
import helmet from "helmet";
import "express-async-errors";
import { handlErrors } from "./middlewares";
import { initRoutes } from "./routers";
import { checkEnvVariables } from "./configs/checkEnvVariables";
import { customMorganLogger } from "./configs/morgan.logger";
import { initSwagger } from "./configs/swagger";

const initApp = () => {
    const app = express();

    app.use(customMorganLogger);

    app.use(helmet());

    app.use(express.json());

    checkEnvVariables();

    initRoutes(app);

    initSwagger(app);

    app.use(handlErrors.execute);

    return app;
};

const app = initApp();

export { app };
