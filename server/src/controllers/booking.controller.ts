import type { Request, Response } from "express";





//create PENDING booking + bookingSeats (atomic)
export const LockSeatBooking = async (req: Request, res: Response) => {
    try {

        const {
            showId,
            seatId,
        } = req.body;




    } catch (error) {

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