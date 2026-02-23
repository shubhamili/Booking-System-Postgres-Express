import type { Request, Response } from "express";
import { httpStatusCode } from "../utils/httpStatusCode.js";
import { prismaClient } from "../lib/prisma.js";


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





export const getAllSeatTypes = async (req: Request, res: Response) => {
    try {

        const seatTypes = await prismaClient.seatType.findMany({})


        // const modified = shows.map(show => ({
        //     id: show.id,
        //     formate: show.format,
        //     startTime: show.startTime,
        //     endTime: show.endTime,
        //     screenId: show.screen.id,
        //     theatre: show.screen.theatre.name,
        //     movie: show.movie.title
        // }));



        if (seatTypes.length === 0) {
            return res.status(httpStatusCode["NO CONTENT"]).json({
                success: false,
                message: 'displaying all seatTypes',
                data: seatTypes
            });
        }


        return res.status(httpStatusCode.OK).json({
            success: true,
            message: 'displaying all seatTypes',
            data: seatTypes
        });



    } catch (error: any) {
        console.error("Error displaying seatTypes:", error);
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            error: error.message || "Internal Server Error",
        });

    }
}



