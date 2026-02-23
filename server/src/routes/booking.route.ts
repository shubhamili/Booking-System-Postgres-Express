import { Router } from "express";
import { verifyToken } from "../middleware/token.js";
import { cancelBooking, ConfirmBooking, getAllBooking, LockSeatBooking, myBookings, viewBooking } from "../controllers/booking.controller.js";

const bookignRoute: Router = Router();


bookignRoute.post('/init', verifyToken, LockSeatBooking);
bookignRoute.post('/cnf', verifyToken, ConfirmBooking);
bookignRoute.get('/view', verifyToken, viewBooking);
bookignRoute.delete('/cancel', verifyToken, cancelBooking);
bookignRoute.get('/my-bookings/:userId', verifyToken, myBookings);
bookignRoute.get('/getAll', verifyToken, getAllBooking);

export default bookignRoute;

