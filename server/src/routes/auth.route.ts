import { Router } from "express";
import { createAccount, login } from "../controllers/auth.controller.js";


const authRouter: Router = Router()


authRouter.post('/create', createAccount);
authRouter.post('/signin', login)

export default authRouter;