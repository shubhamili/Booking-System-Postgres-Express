import express, { Router, type Express, type Request, type Response } from 'express'
import config from './config/config.js'
import adminRoutes from './routes/admin.route.js'
import rootRouter from './routes/index.js'
import { PrismaClient } from '@prisma/client'
import cookieParser from 'cookie-parser'
import morgan from "morgan";
import { rateLimit } from 'express-rate-limit';
import { basicLimiter } from './utils/rateLimiter.js'
import cors from 'cors';



const app: Express = express()


app.use(basicLimiter);


app.get("/", (req: Request, res: Response) => {
    res.send("app started")
})
app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"));


const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};

app.use(cors(corsOptions));

app.use("/uploads", express.static("public/uploads"));
app.use('/api', rootRouter);

//this was old prisma setup code: 
// export const prismaClient = new PrismaClient({ log: ['query'] })

app.listen(config.port, () => console.log(`Server Started at port http://localhost:${config.port}`))

