import { Router } from "express";
import { createSeat, deleteSeat, showSeats } from "../controllers/seat.controller.js";
import { verifyToken } from "../middleware/token.js";

const seatRoute: Router = Router();

seatRoute.post('/add', verifyToken, createSeat);
seatRoute.delete('/delete', verifyToken, deleteSeat);
seatRoute.get('/show', verifyToken, showSeats);

export default seatRoute;