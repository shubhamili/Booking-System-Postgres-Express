import type { Request, Response } from "express";
import { httpStatusCode } from "../utils/httpStatusCode.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../middleware/token.js";
import config from "../config/config.js";
import { prismaClient } from "../lib/prisma.js";


export const createAccount = async (req: Request, res: Response) => {

    try {

        const { name, email, password } = req.body;
        console.log("boyd", req.body);

        const checkIfExist = await prismaClient.admin.findUnique({
            where: {
                email: email
            }
        });
        if (checkIfExist) {
            return res.status(httpStatusCode.CONFLICT).json({
                success: false,
                message: "user already exist with the email try another one."
            })
        }
        const hashedPass = await hash(password, 8)

        const adminCreateData = {
            name,
            email,
            password: hashedPass
        }

        const CreatedUser = await prismaClient.admin.create({
            data: adminCreateData
        })

        const { password: _, ...userWithoutPass } = CreatedUser;

        if (!CreatedUser) {
            return res.status(httpStatusCode.FORBIDDEN).json({
                success: false,
                message: "failed to create admin user."
            })
        }


        return res.status(httpStatusCode.CREATED).json({
            success: true,
            message: "Admin user created successfully. You may login using your credencials",
            data: userWithoutPass
        })

    } catch (error: any) {
        console.error("error in create Account :", error)
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            error: error.name
        })
    }


}


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const found = await prismaClient.admin.findUnique({
            where: {
                email: email
            }
        })

        if (!found) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: "user with this email does not exist, create an accoutn first then login."
            })
        }

        const isValid = await compare(password, found.password);

        if (!isValid) {
            return res.status(httpStatusCode.UNAUTHORIZED).json({
                success: false,
                message: "invalid email or password."
            })
        }
        const { password: _, ...userWithoutPassword } = found;

        const token = createToken({ id: found.id, email: found.email }, "5d")

        res.cookie("token", token, {
            httpOnly: true,
            secure: config.nodeEnv === "production",
            sameSite: config.nodeEnv === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/", // cookie available site-wide
        });


        return res.status(httpStatusCode.OK).json({
            success: true, data: {
                ...userWithoutPassword, token
            }
        })

    } catch (error: any) {
        console.error("error login :", error)
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            message: error.message || "something went wrong!"
        })
    }

}