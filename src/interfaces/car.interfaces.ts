import { z } from "zod";
import {
    createCarPayloadSchema,
    carSchema,
    updateCarPayloadSchema,
} from "../schemas";
import { Request, Response } from "express";

type CreateCarPayload = z.infer<typeof createCarPayloadSchema>;
type Car = z.infer<typeof carSchema>;
type UpdateCarPayload = z.infer<typeof updateCarPayloadSchema>;

interface ICarService {
    create(payload: CreateCarPayload): Promise<Car>;
    list(userId?: string): Promise<Array<Car>>;
    retrieve(carId: string): Promise<Car>;
    update(carId: string, payload: UpdateCarPayload): Promise<Car>;
    delete(carId: string): Promise<void>;
}

interface ICarController {
    create(req: Request, res: Response): Promise<Response>;
    list(req: Request, res: Response): Promise<Response>;
    retrieve(req: Request, res: Response): Promise<Response>;
    update(req: Request, res: Response): Promise<Response>;
    delete(req: Request, res: Response): Promise<Response>;
}

export { CreateCarPayload, Car, ICarService, ICarController, UpdateCarPayload };
