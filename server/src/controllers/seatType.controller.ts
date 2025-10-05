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



export const deleteSeatType = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: "Valid SeatType ID is required",
            });
        }

        const seatType = await prismaClient.seatType.findUnique({
            where: { id: Number(id) },
        });

        if (!seatType) {
            return res.status(httpStatusCode["NOT FOUND"]).json({
                success: false,
                message: "SeatType not found",
            });
        }

        await prismaClient.seatType.delete({
            where: { id: Number(id) },
        });

        return res.status(httpStatusCode.OK).json({
            success: true,
            message: "SeatType deleted successfully",
        });

    } catch (error: any) {
        console.error("Error deleting seat type:", error);
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            error: error.message || "Internal Server Error",
        });
    }
};


