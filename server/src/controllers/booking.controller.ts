import type { Request, Response } from "express";
import { prismaClient } from "../index.js";
import { httpStatusCode } from "../utils/httpStatusCode.js";


export const LockSeatBooking = async (req: Request, res: Response) => {
    try {
        const { showId, userId, seatIds } = req.body;

        // console.log("seats ids", seatIds);
        // console.log("req.body", req.body);


        // Step 1: Basic Validations
        const DoesUserExist = await prismaClient.user.findUnique({
            where: { id: userId }
        })


        if (!DoesUserExist) {
            return res.status(httpStatusCode["NOT FOUND"]).json({ success: false, message: "User do not exist" });
        }

        const seatData = await prismaClient.seat.findMany({
            where: { id: { in: seatIds } }
        });


        // if (seatData.length === 0) {
        //     return res.status(httpStatusCode["NOT FOUND"]).json({ success: false, message: "Seats not found" });
        // }

        console.log("seat data", seatData);


        if (seatData.length !== seatIds?.length) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: "Some requested seats do not exist"
            });
        }

        if (new Set(seatIds).size !== seatIds.length) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: "Duplicate seat IDs provided"
            });
        }
        const uniqueSeatTypeIds = [...new Set(seatData.map(s => s.seatTypeId))];

        const prices = await prismaClient.price.findMany({
            where: { showId, seatTypeId: { in: uniqueSeatTypeIds } }
        });



        if (prices.length === 0) {
            return res.status(httpStatusCode["NOT FOUND"]).json({ success: false, message: "No price found" });
        }

        const priceMap = prices.reduce((acc, p) => {
            acc[p.seatTypeId] = p.price;
            return acc;
        }, {} as Record<number, number>);


        const missingSeatTypes = uniqueSeatTypeIds.filter(id => !priceMap[id]);
        if (missingSeatTypes.length > 0) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: "Pricing not available for some seat types"
            });
        }

        const totalAmount = seatData.reduce((sum, seat) => sum + (priceMap[seat.seatTypeId] || 0), 0);
        console.log("total amount", totalAmount);


        // Step 2: Run atomic booking logic -- db entriess
        const result = await prismaClient.$transaction(async (tx) => {
            // Re-check booked seats INSIDE transaction


            const existingBooking = await tx.booking.findFirst({
                where: {
                    userId,
                    showId,
                    bookingStatus: { in: ["PENDING", "BOOKED"] },
                },
            });
            if (existingBooking) throw new Error("You already have an active booking for this show");


            const alreadyBookedSeats = await tx.bookingSeat.findMany({
                where: {
                    showId,
                    seatId: { in: seatData.map(seat => seat.id) },
                },
                select: { seatId: true },
            });

            if (alreadyBookedSeats.length > 0) {
                const bookedIds = alreadyBookedSeats.map(s => s.seatId);
                throw new Error(`Seats ${bookedIds.join(", ")} are already booked`);
            }

            // Create booking
            const initializeBooking = await tx.booking.create({
                data: {
                    showId,
                    userId,
                    totalAmount,
                    expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes from now
                }
            });


            // Create bookingSeat entries
            const bookingSeatData = seatData.map(seat => ({
                bookingId: initializeBooking.id,
                seatId: seat.id,
                showId,
                price: priceMap[seat.seatTypeId] ?? 0
            }));

            await tx.bookingSeat.createMany({
                data: bookingSeatData
            });

            return { initializeBooking, bookingSeatData }

        })



        return res.status(httpStatusCode.OK).json({
            success: true,
            message: "Seats locked successfully",
            data: result
        });

    } catch (error: any) {

        if (error.code === "P2002") {
            // Prisma unique constraint violation
            return res.status(httpStatusCode.CONFLICT).json({
                success: false,
                message: "Some seats were already booked",
            });
        }


        console.error("Error initializing booking:", error);
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            message: error.message || "Server error while booking"
        });
    }
};


//payment webhook + finalize booking
export const ConfirmBooking = async (req: Request, res: Response) => {
    try {

        const { bookingId, userId } = req.body;






    } catch (error: any) {
        console.error("Error confirming booking:", error);
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            message: error.message || "Server error while booking"
        });
    }
}

//cancel booking
export const cancelBooking = async (req: Request, res: Response) => {
    try {

    } catch (error) {

    }
}

// user booking history
export const userBookingHistory = async (req: Request, res: Response) => {
    try {

    } catch (error) {

    }
}