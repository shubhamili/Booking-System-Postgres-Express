import { Router } from "express";
import { verifyToken } from "../middleware/token.js";
import { createShow, deleteShow } from "../controllers/show.controller.js";

const showRoute: Router = Router();

showRoute.post('/add', verifyToken, createShow);
showRoute.delete('/delete', verifyToken, deleteShow);

export default showRoute;