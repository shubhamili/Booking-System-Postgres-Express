import type { Request, Response } from "express";
import { httpStatusCode } from "../utils/httpStatusCode.js";
import { prismaClient } from "../lib/prisma.js";


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


export const deleteTheatre = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: "Valid Theatre ID is required",
            });
        }

        const theatre = await prismaClient.theatre.findUnique({
            where: { id: Number(id) },
        });

        if (!theatre) {
            return res.status(httpStatusCode["NOT FOUND"]).json({
                success: false,
                message: "Theatre not found",
            });
        }

        await prismaClient.theatre.delete({
            where: { id: Number(id) },
        });

        return res.status(httpStatusCode.OK).json({
            success: true,
            message: "Theatre deleted successfully",
        });

    } catch (error: any) {
        console.error("Error deleting theatre:", error);
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            error: error.message || "Internal Server Error",
        });
    }
};




export const getAllTheatre = async (req: Request, res: Response) => {
    try {

        const theatre = await prismaClient.theatre.findMany({})


        // const modified = shows.map(show => ({
        //     id: show.id,
        //     formate: show.format,
        //     startTime: show.startTime,
        //     endTime: show.endTime,
        //     screenId: show.screen.id,
        //     theatre: show.screen.theatre.name,
        //     movie: show.movie.title
        // }));



        if (theatre.length === 0) {
            return res.status(httpStatusCode["NO CONTENT"]).json({
                success: false,
                message: 'displaying all theatre',
                data: theatre
            });
        }


        return res.status(httpStatusCode.OK).json({
            success: true,
            message: 'displaying all theatre',
            data: theatre
        });



    } catch (error: any) {
        console.error("Error displaying theatre:", error);
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            error: error.message || "Internal Server Error",
        });

    }
}

