import { Router } from "express";
import { addAdmin } from "../controllers/admin.controller.js";


const adminRoutes: Router = Router();

adminRoutes.get('/get', addAdmin)


export default adminRoutes;