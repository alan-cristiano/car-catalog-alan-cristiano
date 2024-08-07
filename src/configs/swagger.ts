import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { Express, Request, Response } from "express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Car API Docs",
            version: "0.0.1",
        },
    },
    apis: ["./src/docs/**/*.swagger.yaml"],
};

const initSwagger = (app: Express) => {
    const swaggerSpec = swaggerJSDoc(options);

    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get("/docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
};

export { initSwagger };
