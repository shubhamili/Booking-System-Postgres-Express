import { Router } from "express";
import adminRoutes from "./admin.route.js";




const rootRouter: Router = Router()


rootRouter.use('/admin', adminRoutes)

export default rootRouter;