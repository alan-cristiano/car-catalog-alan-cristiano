import { Request, Response } from "express";
import { ICarController, ICarService } from "../interfaces";
import { inject, injectable } from "tsyringe";

@injectable()
class CarController implements ICarController {
    constructor(@inject("CarService") private service: ICarService) {}

    public create = async (req: Request, res: Response): Promise<Response> => {
        const result = await this.service.create(req.body);

        return res.status(201).json(result);
    };

    public list = async (req: Request, res: Response): Promise<Response> => {
        const queryParams = req.query.userId
            ? String(req.query.userId)
            : undefined;
        const result = await this.service.list(queryParams);

        return res.status(200).json(result);
    };

    public retrieve = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        const carId = req.params.id;
        const result = await this.service.retrieve(carId);

        return res.status(200).json(result);
    };

    public update = async (req: Request, res: Response): Promise<Response> => {
        const carId = req.params.id;
        const result = await this.service.update(carId, req.body);

        return res.status(200).json(result);
    };

    public delete = async (req: Request, res: Response): Promise<Response> => {
        const carId = req.params.id;
        await this.service.delete(carId);

        return res.status(204).json();
    };
}

export { CarController };
