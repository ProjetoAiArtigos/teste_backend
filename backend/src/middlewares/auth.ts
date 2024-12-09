import { Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";
import config from "../config";
import { IRequest } from "../types";

const jwt = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (token == null) {
            res.status(401).send();
            return 
        }
        const user = jsonwebtoken.verify(token, config.auth.jwt)
        if (!user) {
            res.status(403).send({ message: "Unauthorized." });
            return 
        }
        const sub = user.sub as string
        req.sub = sub;
        next();
    } catch (err: any) {
        if (err.name === "JsonWebTokenError") {
            res.status(403).send({ message: "Unauthorized." });
            return 
        }
        res.status(500).send({ message: err.message });
        return 
    }
};

export default jwt;
