import { Response, NextFunction } from "express";
import { IRequest } from "../../types";
import { User } from "../../entities/User";
import { UserRoles } from "../../constants";

export const update = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findOneBy({ id: req.sub, isActived: true });

        if (!user) {
            res.status(404).send({ message: "User not found." });
            return
        }

        const { role } = req?.body;

        if (!Object.values(UserRoles)?.includes(role)) {
            res.status(400).send({ message: "Bad request!" });
            return
        }

        user.role = role
        await user.save()
        
        res.status(200).send({ email: user.email, name: user.name, role: user.role });
    } catch (error) {
        next(error);
    }
};

export const list = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await User.findBy({ isActived: true });
        if (!users){
            res.status(404).send({ message: "Not found" })
            return
        }
        res.status(200).send(users)
        return 
    } catch (error) {
        next(error);
    }
};