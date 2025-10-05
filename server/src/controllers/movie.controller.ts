import type { Request, Response } from "express";
import { httpStatusCode } from "../utils/httpStatusCode.js";
import { prismaClient } from "../index.js";

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
            imageUrl,
            trailerUrl,
            releaseDate,
            currency
        } = req.body;

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
                imageUrl,
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
        console.error("error in create Account :", error)
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            error: error.name
        })
    }
}


