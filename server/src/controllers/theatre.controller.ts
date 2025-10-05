import type { Request, Response } from "express";
import { httpStatusCode } from "../utils/httpStatusCode.js";
import { prismaClient } from "../index.js";


export const addtheatre = async (req: Request, res: Response) => {
    try {
        const { name, location } = req.body;

        const theatreCreated = await prismaClient.theatre.create({
            data: {
                name,
                location
            }
        })

        if (!theatreCreated) {
            return res.status(httpStatusCode.FORBIDDEN).json({
                success: false,
                message: "theatre add failed",
            })
        }

        return res.status(httpStatusCode.CREATED).json({
            success: true,
            message: "theatre added",
            data: theatreCreated
        })

    } catch (error: any) {
        console.error("error in create Account :", error)
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            error: error.name
        })
    }
}
