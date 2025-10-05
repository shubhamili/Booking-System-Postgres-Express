import { Router } from "express";
import { verifyToken } from "../middleware/token.js";
import { createPrice, deletePrice } from "../controllers/price.controller.js";

const priceRoute: Router = Router();


priceRoute.post('/add', verifyToken, createPrice);
priceRoute.delete('/delete', verifyToken, deletePrice);


export default priceRoute;