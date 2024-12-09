import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config";

const saltRounds = 10;

export const generateAccessToken = (
    sub: string
): string => {
    return jsonwebtoken.sign(
        { sub },
        config.auth.jwt,
        {
            expiresIn: "24h",
        }
    );
};

export const encodePassword = async (
    password: string
): Promise<string> => {
    return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (
    password: string, hash: string
): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};
