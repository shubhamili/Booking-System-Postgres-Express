import { Router } from "express";
import { createAccount, login, me } from "../controllers/auth.controller.js";
import { loginLimiter } from "../utils/rateLimiter.js";
import { verifyToken } from "../middleware/token.js";


const authRouter: Router = Router()


authRouter.post('/create', createAccount);
authRouter.post('/signin', loginLimiter, login);
authRouter.get('/me', verifyToken, me);

export default authRouter;