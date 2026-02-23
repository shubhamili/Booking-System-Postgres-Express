import { Router } from "express";
import { verifyToken } from "../middleware/token.js";
import { addtheatre, deleteTheatre, getAllTheatre } from "../controllers/theatre.controller.js";

const theatreRoute: Router = Router();

theatreRoute.post("/add", verifyToken, addtheatre);
theatreRoute.delete('/delete', verifyToken, deleteTheatre);
theatreRoute.get('/getAll', verifyToken, getAllTheatre);

export default theatreRoute;