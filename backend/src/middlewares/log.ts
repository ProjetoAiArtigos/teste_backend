import { Response, NextFunction } from "express";
import { IRequest } from "../types";
import logger from "../logs";

const log = async (req: IRequest, res: Response, next: NextFunction) => {
    logger.info({ message: `${req.method} ${req.url}`});
    next();
};

export default log;
