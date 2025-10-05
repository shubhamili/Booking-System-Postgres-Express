import type { Request, Response } from "express";
import { prismaClient } from "../index.js";
import { httpStatusCode } from "../utils/httpStatusCode.js";

export const createPrice = async (req: Request, res: Response) => {
    try {
        const { showId, seatTypeId, dayType, price, currency } = req.body;

        if (!showId || !seatTypeId || !price) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: "showId, seatTypeId, and price are required",
            });
        }

        const [show, seatType] = await Promise.all([
            prismaClient.show.findUnique({ where: { id: Number(showId) } }),
            prismaClient.seatType.findUnique({ where: { id: Number(seatTypeId) } }),
        ]);

        if (!show || !seatType) {
            return res.status(httpStatusCode["NOT FOUND"]).json({
                success: false,
                message: "Show or Seat Type not found",
            });
        }

        const existingPrice = await prismaClient.price.findFirst({
            where: {
                showId: Number(showId),
                seatTypeId: Number(seatTypeId),
                dayType: dayType || "Weekday", // optional
            },
        });

        if (existingPrice) {
            return res.status(httpStatusCode["CONFLICT"]).json({
                success: false,
                message: "Price already exists for this show and seat type",
            });
        }

        const newPrice = await prismaClient.price.create({
            data: {
                showId: Number(showId),
                seatTypeId: Number(seatTypeId),
                dayType: dayType || "Weekday",
                price: Number(price),
                currency: currency || "INR",
            },
            include: {
                show: {
                    include: {
                        movie: true,
                        screen: {
                            include: { theatre: true },
                        },
                    },
                },
                seatType: true,
            },
        });

        return res.status(httpStatusCode.CREATED).json({
            success: true,
            message: "Price created successfully",
            data: newPrice,
        });
    } catch (error: any) {
        console.error("Error creating price:", error);
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            message: "Server error while creating price",
            error: error.message,
        });
    }
};

export const deletePrice = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: "id is required"
            })
        }

        const findIfExist = await prismaClient.price.findUnique({
            where: { id: Number(id) }
        })

        if (!findIfExist) {
            return res.status(httpStatusCode["NOT FOUND"]).json({
                success: false,
                message: "the price dont exist"
            })
        }

        const deletePrice = await prismaClient.price.delete({
            where: { id: Number(id) }
        })

        if (!deletePrice) {
            return res.status(httpStatusCode["FORBIDDEN"]).json({
                success: false,
                message: "failed to delete the price"
            })
        }


        return res.status(httpStatusCode.ACCEPTED).json({
            success: false,
            message: "deleted price successfully",
            data: deletePrice
        })

    } catch (error: any) {
        console.error("Error deleting price:", error);
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            message: "Server error while deleting price",
            error: error.message,
        });

    }
}