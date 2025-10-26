import type { Request, Response } from "express";
import { prismaClient } from "../index.js";
import { httpStatusCode } from "../utils/httpStatusCode.js";


export const LockSeatBooking = async (req: Request, res: Response) => {
    try {
        const { showId, userId, seatIds } = req.body;




        const DoesUserExist = await prismaClient.user.findUnique({
            where: { id: userId }
        })


        if (!DoesUserExist) {
            return res.status(httpStatusCode["NOT FOUND"]).json({ success: false, message: "User do not exist" });
        }

        const seatData = await prismaClient.seat.findMany({
            where: { id: { in: seatIds } }
        });




        if (!seatData.length) {
            return res.status(httpStatusCode["NOT FOUND"]).json({ success: false, message: "No seats found" });
        }


        const uniqueSeatTypeIds = [...new Set(seatData.map(s => s.seatTypeId))];
        const prices = await prismaClient.price.findMany({
            where: { showId, seatTypeId: { in: uniqueSeatTypeIds } }
        });

        if (!prices.length) {
            return res.status(httpStatusCode["NOT FOUND"]).json({ success: false, message: "Prices not found for these seats" });
        }
        const priceMap = prices.reduce((acc, p) => {
            acc[p.seatTypeId] = p.price;
            return acc;
        }, {} as Record<number, number>);

        const totalAmount = seatData.reduce((sum, seat) => sum + (priceMap[seat.seatTypeId] || 0), 0);
        console.log("total amount", totalAmount);

        const initializeBooking = await prismaClient.booking.create({
            data: {
                showId,
                userId,
                totalAmount,
                expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes from now
            }
        });

        if (!initializeBooking) {
            return res.status(httpStatusCode["NOT FOUND"]).json({
                success: false,
                message: "Booking initialization failed."
            });
        }

        const bookingSeatData = seatData.map(seat => ({
            bookingId: initializeBooking.id,
            seatId: seat.id,
            showId,
            price: priceMap[seat.seatTypeId] ?? 0
        }));

        await prismaClient.bookingSeat.createMany({
            data: bookingSeatData
        });

        return res.status(httpStatusCode.OK).json({
            success: true,
            message: "Booking initialized",
            data: {
                booking: initializeBooking,
                seats: bookingSeatData
            }
        });

    } catch (error: any) {
        console.error("Error initializing booking:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server error while booking"
        });
    }
};


//payment webhook + finalize booking
export const ConfirmBooking = async (req: Request, res: Response) => {
    try {

        const { bookingId } = req.body;






    } catch (error) {

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