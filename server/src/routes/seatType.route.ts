import { Router } from "express";
import { verifyToken } from "../middleware/token.js";
import { addSeatType, deleteSeatType, getAllSeatTypes } from "../controllers/seatType.controller.js";

const seatTypeRoute: Router = Router();

seatTypeRoute.post('/add', verifyToken, addSeatType);
seatTypeRoute.delete('/delete/:id', verifyToken, deleteSeatType);
seatTypeRoute.get('/getAll', verifyToken, getAllSeatTypes);

export default seatTypeRoute;
