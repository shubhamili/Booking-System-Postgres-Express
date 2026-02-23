import type { Request, Response } from "express";
import { httpStatusCode } from "../utils/httpStatusCode.js";
import { prismaClient } from "../lib/prisma.js";

export const addMovie = async (req: Request, res: Response) => {
    try {
        const {
            title,
            description,
            duration,
            type,
            language,
            genre,
            rating,
            // poster,
            trailerUrl,
            releaseDate,
            currency
        } = req.body;

        const poster = req.file?.filename || "";

        if (!title || !duration || !type || !language || !releaseDate) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: "Missing required fields",
            });
        }

        const releaseDateValidatedObj = new Date(releaseDate);
        if (isNaN(releaseDateValidatedObj.getTime())) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: "Invalid release date format",
            });
        }


        const createdMovie = await prismaClient.movie.create({
            data:
            {
                title,
                description,
                duration: Number(duration),
                type,
                language,
                genre,
                rating: rating ? Number(rating) : null,
                poster,
                trailerUrl,
                releaseDate: releaseDateValidatedObj,
                currency: currency || "INR",

            }
        })
        if (!createdMovie) {
            return res.status(httpStatusCode.FORBIDDEN).json({
                success: false,
                message: "movie add failed",
            })
        }

        return res.status(httpStatusCode.CREATED).json({
            success: true,
            message: "Movie added",
            data: createdMovie
        })



    } catch (error: any) {
        console.error("error in create movie :", error)
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            error: error.name
        })
    }
}


export const editMovie = async (req: Request, res: Response) => {
    try {
        const { movieId } = req.params; // movieId from route
        const {
            title,
            description,
            duration,
            type,
            language,
            genre,
            rating,

            trailerUrl,
            releaseDate,
            currency,
        } = req.body;

        const poster = req.file?.filename;

        if (!movieId) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: "Movie ID is required",
            });
        }

        const existingMovie = await prismaClient.movie.findUnique({
            where: { id: Number(movieId) },
        });

        if (!existingMovie) {
            return res.status(httpStatusCode["NOT FOUND"]).json({
                success: false,
                message: "Movie not found",
            });
        }

        const updatedMovie = await prismaClient.movie.update({
            where: { id: Number(movieId) },
            data: {
                title: title ?? existingMovie.title,
                description: description ?? existingMovie.description,
                duration: duration ? Number(duration) : existingMovie.duration,
                type: type ?? existingMovie.type,
                language: language ?? existingMovie.language,
                genre: genre ?? existingMovie.genre,
                rating: rating !== undefined ? Number(rating) : existingMovie.rating,
                poster: poster ?? existingMovie.poster,
                trailerUrl: trailerUrl ?? existingMovie.trailerUrl,
                releaseDate: releaseDate ? new Date(releaseDate) : existingMovie.releaseDate,
                currency: currency ?? existingMovie.currency,
            },
        });

        return res.status(httpStatusCode["OK"]).json({
            success: true,
            message: "Movie updated successfully",
            data: updatedMovie,
        });
    } catch (error: any) {
        console.error("Error updating movie:", error);
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            message: "Server error while updating movie",
            error: error.message,
        });
    }
};



export const getAllMovies = async (req: Request, res: Response) => {
    try {
        const movies = await prismaClient.movie.findMany({
            orderBy: { createdAt: "asc" }, // optional: latest first
            // include: {
            //     shows: {
            //         include: {
            //             screen: {
            //                 include: {
            //                     theatre: true,
            //                 },
            //             },
            //         },
            //     },
            // },
        });

        if (!movies.length) {
            return res.status(httpStatusCode["NO CONTENT"]).json({
                success: false,
                message: "No movies found",
            });
        }

        const totalPages = Math.ceil((movies.length) / 10);

        return res.status(httpStatusCode["OK"]).json({
            success: true,
            message: "Movies fetched successfully",
            data: movies,
            totalPages: totalPages
        });
    } catch (error: any) {
        console.error("Error in getting all movies:", error);
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            message: "Server error while fetching movies",
            error: error.message,
        });
    }
};



export const deleteMovie = async (req: Request, res: Response) => {
    try {
        const { movieId } = req.params; // movieId from route

        if (!movieId) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: "Movie ID is required",
            });
        }

        const existingMovie = await prismaClient.movie.findUnique({
            where: { id: Number(movieId) },
        });

        if (!existingMovie) {
            return res.status(httpStatusCode["NOT FOUND"]).json({
                success: false,
                message: "Movie not found",
            });
        }

        // ⚠ Optional: handle cascading delete of shows, prices, bookings if needed
        // Prisma handles relations depending on your schema (onDelete behavior)

        await prismaClient.movie.delete({
            where: { id: Number(movieId) },
        });

        return res.status(httpStatusCode["OK"]).json({
            success: true,
            message: "Movie deleted successfully",
        });
    } catch (error: any) {
        console.error("Error deleting movie:", error);
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            message: "Server error while deleting movie",
            error: error.message,
        });
    }
};



export const getMovieById = async (req: Request, res: Response) => {
    try {
        const { movieId } = req.params;

        if (!movieId) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: "Movie ID is required",
            });
        }

        const movie = await prismaClient.movie.findUnique({
            where: { id: Number(movieId) },
            include: {
                shows: {
                    include: {
                        screen: {
                            include: {
                                theatre: true,
                            },
                        },
                        prices: true,
                        bookings: true,
                    },
                },
            },
        });

        if (!movie) {
            return res.status(httpStatusCode["NOT FOUND"]).json({
                success: false,
                message: "Movie not found",
            });
        }

        return res.status(httpStatusCode["OK"]).json({
            success: true,
            message: "Movie fetched successfully",
            data: movie,
        });
    } catch (error: any) {
        console.error("Error fetching movie by ID:", error);
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            message: "Server error while fetching movie",
            error: error.message,
        });
    }
};
