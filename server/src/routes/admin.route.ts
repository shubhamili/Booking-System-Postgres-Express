import { Router } from "express";
import { addAdmin } from "../controllers/admin.controller.js";
import { verifyToken } from "../utils/token.js";


const adminRoutes: Router = Router();

adminRoutes.get('/get', verifyToken, addAdmin)


export default adminRoutes;