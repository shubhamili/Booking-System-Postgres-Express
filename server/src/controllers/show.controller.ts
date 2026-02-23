import type { Request, Response } from "express";
import { httpStatusCode } from "../utils/httpStatusCode.js";
import { prismaClient } from "../lib/prisma.js";

export const createShow = async (req: Request, res: Response) => {
    try {
        const { screenId, movieId, format, startTime, endTime } = req.body;

        // Basic validations
        const requiredFields = [screenId, movieId, format, startTime, endTime];

        if (!requiredFields.every(Boolean)) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: "All fields (screenId, movieId, format, startTime, endTime) are required",
            });
        }


        const screenIdNum = Number(screenId);
        const movieIdNum = Number(movieId);

        if (isNaN(screenIdNum) || isNaN(movieIdNum)) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: "Invalid screenId or movieId format",
            });
        }

        // Check if screen exists
        const screen = await prismaClient.screen.findUnique({ where: { id: screenIdNum } });
        if (!screen) {
            return res.status(httpStatusCode["NOT FOUND"]).json({
                success: false,
                message: "Screen not found",
            });
        }

        // Check if movie exists
        const movie = await prismaClient.movie.findUnique({ where: { id: movieIdNum } });
        if (!movie) {
            return res.status(httpStatusCode["NOT FOUND"]).json({
                success: false,
                message: "Movie not found",
            });
        }

        const conflict = await prismaClient.show.findFirst({
            where: {
                screenId: screenIdNum,
                OR: [
                    {
                        startTime: { lte: new Date(endTime) },
                        endTime: { gte: new Date(startTime) },
                    },
                ],
            },
        });

        if (conflict) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: "Time conflict — another show is already scheduled on this screen at that time",
            });
        }

        // Create show
        const newShow = await prismaClient.show.create({
            data: {
                screenId: screenIdNum,
                movieId: movieIdNum,
                format,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
            },
            include: {
                screen: true,
                movie: true,
            },
        });

        return res.status(httpStatusCode.CREATED).json({
            success: true,
            message: "Show created successfully",
            data: newShow,
        });

    } catch (error: any) {
        console.error("Error creating show:", error);
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            message: error.message || "Server error while creating show",
        });
    }
};


export const deleteShow = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: "Valid Show ID is required",
            });
        }

        const show = await prismaClient.show.findUnique({
            where: { id: Number(id) },
        });

        if (!show) {
            return res.status(httpStatusCode["NOT FOUND"]).json({
                success: false,
                message: "Show not found",
            });
        }

        await prismaClient.show.delete({
            where: { id: Number(id) },
        });

        return res.status(httpStatusCode.OK).json({
            success: true,
            message: "Show deleted successfully",
        });

    } catch (error: any) {
        console.error("Error deleting show:", error);
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            error: error.message || "Internal Server Error",
        });
    }
};




export const showsDisplay = async (req: Request, res: Response) => {
    try {
        console.log("helo");

        const { movieId } = req.query;

        if (!movieId) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: 'no movieId provide',
            });
        }

        const shows = await prismaClient.show.findMany({
            where: {
                movieId: Number(movieId)
            },
            include: {
                screen: {
                    include: {
                        theatre: true,
                        seats: {
                            include: {
                                seatType: true
                            }
                        }
                    }
                },
                movie: true,
            }
        })


        if (shows.length === 0) {
            return res.status(httpStatusCode["NO CONTENT"]).json({
                success: false,
                message: 'displaying all shows',
                data: shows
            });
        }


        return res.status(httpStatusCode.OK).json({
            success: true,
            message: 'displaying all shows',
            data: shows
        });



    } catch (error: any) {
        console.error("Error displaying show:", error);
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            error: error.message || "Internal Server Error",
        });

    }
}




export const getAllShows = async (req: Request, res: Response) => {
    try {

        const shows = await prismaClient.show.findMany({
            include: {
                screen: {
                    include: {
                        theatre: true,
                        seats: {
                            include: {
                                seatType: true
                            }
                        }
                    }
                },
                movie: true,
            }
        })


        const modified = shows.map(show => ({
            id: show.id,
            formate: show.format,
            startTime: show.startTime,
            endTime: show.endTime,
            screenId: show.screen.id,
            theatre: show.screen.theatre.name,
            movie: show.movie.title
        }));



        if (modified.length === 0) {
            return res.status(httpStatusCode["NO CONTENT"]).json({
                success: false,
                message: 'displaying all shows',
                data: shows
            });
        }


        return res.status(httpStatusCode.OK).json({
            success: true,
            message: 'displaying all shows',
            data: modified
        });



    } catch (error: any) {
        console.error("Error displaying show:", error);
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            error: error.message || "Internal Server Error",
        });

    }
}

