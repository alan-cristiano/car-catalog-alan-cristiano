import { inject, injectable } from "tsyringe";
import { IUserController, IUserService } from "../interfaces/user.interfaces";
import { Request, Response } from "express";

@injectable()
class UserController implements IUserController {
    constructor(@inject("UserService") private service: IUserService) {}

    public create = async (req: Request, res: Response): Promise<Response> => {
        const newUser = await this.service.create(req.body);

        return res.status(201).json(newUser);
    };

    public login = async (req: Request, res: Response): Promise<Response> => {
        const loginUser = await this.service.login(req.body);

        return res.status(200).json(loginUser);
    };

    public retrieve = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        const userId = res.locals.decoded.sub;

        const retrieveUser = await this.service.retrieve(userId);

        return res.status(200).json(retrieveUser);
    };
}

export { UserController };
