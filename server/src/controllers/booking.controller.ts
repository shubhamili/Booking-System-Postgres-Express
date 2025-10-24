import type { Request, Response } from "express";
import { prismaClient } from "../index.js";
import { httpStatusCode } from "../utils/httpStatusCode.js";


//create PENDING booking + bookingSeats (atomic)
export const LockSeatBooking = async (req: Request, res: Response) => {
    try {

        const {
            userId,
            showId,
            totalAmount,
            paymentId,
        } = req.body;

        const {
            bookingId,
            seatId,
            price,
        } = req.body;


        const newBooking = await prismaClient.booking.create({
            data: {
                userId,
                showId,
                totalAmount,
                paymentId,
            }
        })



        //create booking seat from selected seat
        const newBookingSeat = await prismaClient.bookingSeat.create({
            data: {
                bookingId,
                seatId,
                price,
                showId
            }
        })





        return res.status(httpStatusCode.CREATED).json({
            success: true,
            message: "booking initialized",
            data: { newBooking, newBookingSeat }
        })


    } catch (error: any) {

        console.error("Error initializing booking:", error);
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            message: error.message || "Server error while bookign",
        });

    }
}

//payment webhook + finalize booking
export const ConfirmBooking = async (req: Request, res: Response) => {
    try {

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