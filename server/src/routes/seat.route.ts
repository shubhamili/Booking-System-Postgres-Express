import { Router } from "express";
import { createSeat, deleteSeat } from "../controllers/seat.controller.js";
import { verifyToken } from "../middleware/token.js";

const seatRoute: Router = Router();

seatRoute.post('/add', verifyToken, createSeat);
seatRoute.delete('/delete', verifyToken, deleteSeat);

export default seatRoute;