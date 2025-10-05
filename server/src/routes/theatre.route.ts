import { Router } from "express";
import { verifyToken } from "../middleware/token.js";
import { addtheatre, deleteTheatre } from "../controllers/theatre.controller.js";

const theatreRoute: Router = Router();

theatreRoute.post("/add", verifyToken, addtheatre);
theatreRoute.delete('/delete', verifyToken, deleteTheatre);

export default theatreRoute;