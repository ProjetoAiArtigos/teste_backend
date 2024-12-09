import { Response, NextFunction } from "express";
import { IRequest } from "../../types";
import { User } from "../../entities/User";
import { comparePassword, encodePassword, generateAccessToken } from "../../helpers/security";
import { UserRoles } from "../../constants";
import logger from "../../logs";

export const login = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const {email, password} = req?.body;

        if (!email || !password){
            res.status(400).send({ message: "Bad request!" });
            return 
        }

        const user = await User.findOneBy({ email });

        if (!user) {
            res.status(401).send({ message: "Unauthorized!" });
            return 
        }

        const valid = await comparePassword(password, user.password);
        
        if (!valid) {
            res.status(401).send({ message: "Unauthorized!" });
            return 
        }

        const token = generateAccessToken(user.id);

        res.status(200).send({ token, email: user.email, name: user.name, role: user.role })
        return 
    } catch (error) {
        next(error);
    }
};

export const register = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password, name, rg } = req?.body;
        console.log(req.body)
        if (!email || !password || !name || !rg) {
            res.status(400).send({ message: "Bad request!" });
            return
        }

        const exists = await User.existsBy({ email });

        if (exists) {
            res.status(400).send({ message: "User already exists!" });
            return
        }

        const newUser = User.create({
            email,
            name, 
            rg,
            role: UserRoles.client,
            password: await encodePassword(password),
            isActived: true,
        });
        
        await newUser.save();

        const token = generateAccessToken(newUser.id);

        res.status(201).send({ token, email: newUser.email, name: newUser.name, role: newUser.role })
        return
    } catch (error) {
        next(error);
    }
};