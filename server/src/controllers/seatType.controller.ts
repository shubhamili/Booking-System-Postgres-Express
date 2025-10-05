import type { Request, Response } from "express";
import { httpStatusCode } from "../utils/httpStatusCode.js";
import { prismaClient } from "../index.js";
export const addSeatType = async (req: Request, res: Response) => {
    try {

        const { name } = req.body;

        const createdSeat = await prismaClient.seatType.create({
            data: {
                name
            }
        })

        if (!createdSeat) {
            return res.status(httpStatusCode.FORBIDDEN).json({
                success: false,
                message: "seat type add failed",
            })
        }

        return res.status(httpStatusCode.CREATED).json({
            success: true,
            message: "seat type added",
            data: createdSeat
        })
    } catch (error: any) {
        console.error("error in create Account :", error)
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            error: error.name
        })
    }
}
