import type { Request, Response } from "express";
import { prismaClient } from "../index.js";
import { httpStatusCode } from "../utils/httpStatusCode.js";

export const createSeat = async (req: Request, res: Response) => {
    try {
        const {
            row,
            number,
            seatTypeId,
            screenId, } = req.body;

        if (!row || !number || !seatTypeId || !screenId) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: "all fiels are required",
            });
        }

        // const existSeatType = await prismaClient.seatType.findUnique({
        //     where: { id: Number(seatTypeId) }
        // })

        // const existScreen = await prismaClient.screen.findUnique({
        //     where: { id: Number(screenId) }
        // })

        const [existSeatType, existScreen] = await Promise.all([
            prismaClient.seatType.findUnique({ where: { id: Number(seatTypeId) } }),
            prismaClient.screen.findUnique({ where: { id: Number(screenId) } }),
        ]);


        if (!existScreen || !existSeatType) {
            return res.status(httpStatusCode["NOT FOUND"]).json({
                success: false,
                message: "Seat type or Screen may not exist.",
            });
        }
        const existingSeat = await prismaClient.seat.findFirst({
            where: {
                screenId: Number(screenId),
                row,
                number: Number(number),
            },
        });

        if (existingSeat) {
            return res.status(httpStatusCode["CONFLICT"]).json({
                success: false,
                message: "Seat already exists in this screen",
            });
        }

        const newSeat = await prismaClient.seat.create({
            data: {
                row,
                number: Number(number),
                seatTypeId: Number(seatTypeId),
                screenId: Number(screenId),
            },
            include: {
                seatType: true,
                screen: true,
            },
        });

        if (!newSeat) {
            return res.status(httpStatusCode["FORBIDDEN"]).json({
                success: false,
                message: "failed to add seat",
            });
        }

        return res.status(httpStatusCode["CREATED"]).json({
            success: true,
            message: "Seat added successFully",
            data: newSeat
        });



    } catch (error: any) {
        console.error("Error creating seat:", error);
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            message: error.message || "Server error while creating seat",
        });
    }
};


export const deleteSeat = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: "Valid Seat ID is required",
            });
        }

        const seat = await prismaClient.seat.findUnique({
            where: { id: Number(id) },
        });

        if (!seat) {
            return res.status(httpStatusCode["NOT FOUND"]).json({
                success: false,
                message: "Seat not found",
            });
        }

        await prismaClient.seat.delete({
            where: { id: Number(id) },
        });

        return res.status(httpStatusCode.OK).json({
            success: true,
            message: "Seat deleted successfully",
        });

    } catch (error: any) {
        console.error("Error deleting seat:", error);
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            error: error.message || "Internal Server Error",
        });
    }
};
