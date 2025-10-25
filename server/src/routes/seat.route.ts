import { Router } from "express";
import { createSeat, deleteSeat, displaySeats } from "../controllers/seat.controller.js";
import { verifyToken } from "../middleware/token.js";

const seatRoute: Router = Router();

seatRoute.post('/add', verifyToken, createSeat);
seatRoute.delete('/delete', verifyToken, deleteSeat);
seatRoute.get('/display', verifyToken, displaySeats);

export default seatRoute;