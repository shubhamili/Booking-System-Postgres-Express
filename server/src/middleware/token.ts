// import jwt, { type SignOptions, type JwtPayload } from "jsonwebtoken";
// import config from "../config/config.js";
// import type { NextFunction, Request, Response } from "express";

// interface JwtUserPayload {
//     id: number;
//     email: string;
// }

// export const createToken = (
//     payload: JwtUserPayload,
//     expiresIn: SignOptions["expiresIn"] = "1h"
// ): string => {
//     return jwt.sign(payload, config.jwt_secret, { expiresIn });
// };

// export const verifyToken = (req: Request, res: Response, next: NextFunction): JwtPayload => {
//     try {
//         const token = req.cookies.token;
//         const success = jwt.verify(token, config.jwt_secret);
//         console.log("sucees:",success);

//         if (!success) { throw new Error }
//         next()
//     } catch {
//         throw new Error("Invalid or expired token");
//     }
// };




import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import config from "../config/config.js";
import type { NextFunction, Request, Response } from "express";

interface JwtUserPayload extends JwtPayload {
    id: number;
    email: string;
}

export const createToken = (
    payload: JwtUserPayload,
    expiresIn: SignOptions["expiresIn"] = "1h"
): string => {
    return jwt.sign(payload, config.jwt_secret, { expiresIn });
};
export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies?.token; // safer optional chaining

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, config.jwt_secret) as JwtUserPayload;

        // attach user payload to request so other middlewares/routes can use it
        (req as any).user = decoded;
        console.log("decoded:", decoded)

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
