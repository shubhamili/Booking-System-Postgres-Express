import type { Request, Response } from "express";
import { httpStatusCode } from "../utils/httpStatusCode.js";
import { prismaClient } from "../lib/prisma.js";


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


export const deleteScreen = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: "Valid Screen ID is required",
            });
        }

        const screen = await prismaClient.screen.findUnique({
            where: { id: Number(id) },
        });

        if (!screen) {
            return res.status(httpStatusCode["NOT FOUND"]).json({
                success: false,
                message: "Screen not found",
            });
        }

        await prismaClient.screen.delete({
            where: { id: Number(id) },
        });

        return res.status(httpStatusCode.OK).json({
            success: true,
            message: "Screen deleted successfully",
        });

    } catch (error: any) {
        console.error("Error deleting screen:", error);
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            error: error.message || "Internal Server Error",
        });
    }
};
