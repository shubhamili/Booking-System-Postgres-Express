import { Router } from "express";
import { verifyToken } from "../middleware/token.js";
import { addSeatType, deleteSeatType } from "../controllers/seatType.controller.js";

const seatTypeRoute: Router = Router();

seatTypeRoute.post('/add', verifyToken, addSeatType);
seatTypeRoute.delete('/delete', verifyToken, deleteSeatType);


export default seatTypeRoute;
