import { Router } from "express";
import { verifyToken } from "../middleware/token.js";
import { addScreen, deleteScreen } from "../controllers/screen.controller.js";

const screenRoute: Router = Router();

screenRoute.post('/add', verifyToken, addScreen);
screenRoute.delete('/delete', verifyToken, deleteScreen);

export default screenRoute;