import type { Request, Response } from "express";
import { httpStatusCode } from "../utils/httpStatusCode.js";
import { prismaClient } from "../index.js";


export const addScreen = async (req: Request, res: Response) => {
    try {

        const { theatreId } = req.body;

        if (!theatreId) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({ success: false, message: "Theatre ID is required" });
        }

        const theatre = await prismaClient.theatre.findUnique({
            where: { id: Number(theatreId) }
        })

        if (!theatre || isNaN(theatreId)) {
            return res.status(httpStatusCode["NOT FOUND"]).json({ success: false, message: "Theatre Not found or invalid" });
        }

        const screenAdded = await prismaClient.screen.create({
            data: {
                theatreId: Number(theatreId)
            }
        })

        return res.status(httpStatusCode.CREATED).json({
            success: true,
            message: "Screen created successfully",
            data: screenAdded,
        });


    } catch (error: any) {
        console.error("error in create Account :", error)
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            error: error.name
        })
    }
}


