import { Router } from "express";
import { createAccount, login } from "../controllers/auth.controller.js";
import { loginLimiter } from "../utils/rateLimiter.js";


const authRouter: Router = Router()


authRouter.post('/create', createAccount);
authRouter.post('/signin', loginLimiter, login)

export default authRouter;