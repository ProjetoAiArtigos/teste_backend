import { Response, NextFunction } from "express";
import { IRequest } from "../types";
import { User } from "../entities/User";

const roles = (roles: number[]) => {
    return async (
        req: IRequest,
        res: Response,
        next: NextFunction
    ) => {
        try {
            if (!req.sub) {
                res.status(404).send({ message: "User not found." });
                return 
            }
            const user = await User.findOneBy({ id: req.sub });
            if (!user) {
                res.status(404).send({ message: "User not found." });
                return 
            }
            for (let i = 0; i < roles.length; i++) {
                if (user.role === roles[i]) {
                    next()
                    return
                }
            }
            res.status(403).send({ error: "Unauthorized." });
            return 
        } catch (error) {
            next(error);
        }
    };
};

export default roles;