import jwt, { type SignOptions, type JwtPayload } from "jsonwebtoken";
import config from "../config/config.js";
import type { NextFunction, Request, Response } from "express";

interface JwtUserPayload {
    id: number;
    email: string;
}

export const createToken = (
    payload: JwtUserPayload,
    expiresIn: SignOptions["expiresIn"] = "1h"
): string => {
    return jwt.sign(payload, config.jwt_secret, { expiresIn });
};

export const verifyToken = (req: Request, res: Response, next: NextFunction): JwtPayload | string => {
    try {
        const token = req.cookies.token;
        const success = jwt.verify(token, config.jwt_secret);
        if (!success) { throw new Error }
        next()
    } catch {
        throw new Error("Invalid or expired token");
    }
};
