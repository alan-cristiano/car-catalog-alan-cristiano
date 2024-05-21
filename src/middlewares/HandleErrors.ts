import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors";
import { logger } from "../configs/winston.logger";
import { JsonWebTokenError } from "jsonwebtoken";

class HandleErrors {
    public execute = (
        error: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (error instanceof ZodError)
            return res
                .status(400)
                .json({ errors: error.flatten().fieldErrors });
        else if (error instanceof AppError)
            return res.status(error.statusCode).json({ error: error.message });
        else if (error instanceof JsonWebTokenError)
            return res.status(401).json({ error: "invalid token" });
        else logger.error(error);
        return res.status(500).json({ message: "Internal server error." });
    };
}

const handlErrors = new HandleErrors();

export { handlErrors };
