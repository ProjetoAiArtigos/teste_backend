import { Response, NextFunction } from "express";
import { IRequest } from "../../types";

export const info = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        res.status(200).send({ status: "OK" })
        return 
    } catch (error) {
        next(error);
    }
};