import type { Request, Response } from "express";
import { httpStatusCode } from "../utils/httpStatusCode.js";
import { prismaClient } from "../lib/prisma.js";

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


//payment webhook : pending will integrate when frontennd + finalize booking
export const ConfirmBooking = async (req: Request, res: Response) => {
    try {

        const { bookingId, userId, paymentId } = req.body;

        if (!bookingId || !userId) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: "bookingId, userId and paymentId are required"
            });
        }

        const booking = await prismaClient.booking.findUnique({
            where: { id: bookingId },
            include: { bookingSeats: true }
        })

        if (!booking) {
            return res.status(httpStatusCode["NOT FOUND"]).json({
                success: false,
                message: "Booking not found"
            });
        } else if (booking.userId !== userId) {
            return res.status(httpStatusCode.UNAUTHORIZED).json({
                success: false,
                message: "You are not authorized to confirm this booking"
            });
        } else if (booking.bookingStatus === "BOOKED") {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: `Booking is already ${booking.bookingStatus}`
            });
        } else if (!booking.expiresAt || booking.expiresAt < new Date()) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: "Booking has expired or invalid"
            });
        }



        const updatedBooking = await prismaClient.booking.update({
            where: { id: bookingId },
            data: {
                bookingStatus: "BOOKED",
                paymentStatus: "SUCCESS",
                bookedAt: new Date(),
                paymentId,

            }
        });



        return res.status(httpStatusCode.OK).json({
            success: true,
            message: "Booking confirmed successfully",
            data: updatedBooking
        });


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

        const { bookingId, userId } = req.body
        // Validate input
        if (!bookingId || !userId) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({
                success: false,
                message: "bookingId and userId are required"
            });
        }

        const booking = await prismaClient.booking.findUnique({
            where: { id: bookingId },
            include: { bookingSeats: true }
        });

        if (!booking) {
            return res.status(httpStatusCode["NOT FOUND"]).json({
                success: false,
                message: "Booking not found"
            });
        }
        else if (booking.userId !== userId) {
            return res.status(httpStatusCode.UNAUTHORIZED).json({
                success: false,
                message: "You are not authorized to cancel this booking"
            });
        }

        if (["CANCELLED", "EXPIRED"].includes(booking.paymentStatus)) {
            return res.status(httpStatusCode["BAD REQUEST"]).json({ message: "Booking cannot be cancelled as its either canceled already or expired" });
        }


        const result = await prismaClient.$transaction(async (tx) => {

            const canceledBooking = await tx.booking.update({
                where: { id: bookingId },
                data: {
                    bookingStatus: "CANCELLED",
                }
            });

            // Delete associated booking seats
            await tx.bookingSeat.deleteMany({
                where: { bookingId: bookingId }
            });

            return canceledBooking;



        });


        return res.status(httpStatusCode.OK).json({
            success: true,
            message: "Booking cancelled successfully",
            data: result
        });
    } catch (error: any) {
        console.error("Error cancelling booking:", error);
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            message: error.message || "Server error while cancelling booking"
        });
    }
}



export const viewBooking = async (req: Request, res: Response) => {
    try {
        const { bookingId, userId } = req.query;


        const booking = await prismaClient.booking.findUnique({
            where: { id: Number(bookingId) },
            include: { bookingSeats: true }
        });
        if (!booking || booking.userId !== Number(userId)) {
            return res.status(httpStatusCode.UNAUTHORIZED).json({
                success: false,
                message: "You are not authorized to view this booking"
            });
        }

        return res.status(httpStatusCode.OK).json({
            success: true,
            message: "Booking details fetched successfully",
            data: booking
        });

    } catch (error: any) {
        console.error("Error viewing booking:", error);
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            message: error.message || "Server error while fetching booking"
        });
    }
}


export const myBookings = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        // const user = (req as any).user;
        // console.log("users", user);


        const bookings = await prismaClient.booking.findMany({
            where: { userId: Number(userId) },
            include: { bookingSeats: true }
        });

        return res.status(httpStatusCode.OK).json({
            success: true,
            message: "User bookings fetched successfully",
            data: bookings
        });


    } catch (error: any) {
        console.error("Error fetching user bookings:", error);
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            message: error.message || "Server error while fetching bookings"
        });
    }
}





export const getAllBooking = async (req: Request, res: Response) => {
    try {

        const bookings = await prismaClient.booking.findMany({})


        // const modified = shows.map(show => ({
        //     id: show.id,
        //     formate: show.format,
        //     startTime: show.startTime,
        //     endTime: show.endTime,
        //     screenId: show.screen.id,
        //     theatre: show.screen.theatre.name,
        //     movie: show.movie.title
        // }));



        if (bookings.length === 0) {
            return res.status(httpStatusCode["NO CONTENT"]).json({
                success: false,
                message: 'displaying all shows',
                data: bookings
            });
        }


        return res.status(httpStatusCode.OK).json({
            success: true,
            message: 'displaying all shows',
            data: bookings
        });



    } catch (error: any) {
        console.error("Error displaying show:", error);
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            error: error.message || "Internal Server Error",
        });

    }
}

