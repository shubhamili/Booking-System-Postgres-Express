import { Router } from "express";
import adminRoutes from "./admin.route.js";
import authRouter from "./auth.route.js";




const rootRouter: Router = Router()


rootRouter.use('/admin', adminRoutes)
rootRouter.use('/auth', authRouter)

export default rootRouter;