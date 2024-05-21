import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { decode, verify } from "jsonwebtoken";

class AuthMiddleware {
    public isAuthenticated = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) throw new AppError("Token is required", 401);

        const [_bearer, token] = bearerToken.split(" ");

        const jwtPayload = verify(token, process.env.JWT_SECRET_KEY!);

        res.locals = { ...res.locals, decoded: jwtPayload };

        return next();
    };

    public isAccountOwner = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { sub } = res.locals.decoded;
        const { userId } = req.body;

        if (sub !== userId)
            throw new AppError(
                "You don't have permission to perform this action",
                403
            );

        return next();
    };

    public isCarOwner = (req: Request, res: Response, next: NextFunction) => {
        const { sub } = res.locals.decoded;
        const { userId } = res.locals.foundCar;

        if (sub !== userId)
            throw new AppError("User must be the car owner", 403);

        return next();
    };
}

const auth = new AuthMiddleware();

export { auth };
