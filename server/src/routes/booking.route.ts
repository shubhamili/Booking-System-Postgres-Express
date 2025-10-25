import { Router } from "express";
import { verifyToken } from "../middleware/token.js";
import { LockSeatBooking } from "../controllers/booking.controller.js";

const bookignRoute: Router = Router();


bookignRoute.post('/init', verifyToken, LockSeatBooking);

export default bookignRoute;

