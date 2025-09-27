import express, { Router, type Express, type Request, type Response } from 'express'
import config from './config/config.js'
import adminRoutes from './routes/admin.route.js'
import rootRouter from './routes/index.js'
import { PrismaClient } from '@prisma/client'
const app: Express = express()

app.get("/", (req: Request, res: Response) => {
    // const users = await prisma.user.findMany();
    // console.log(users);

    res.send("app started")
})

// app.use('/api/admin', adminRoutes)
app.use('/api', rootRouter);

export const prismaClient = new PrismaClient({ log: ['query'] })

app.listen(config.port, () => console.log(`server started at port http://localhost:${config.port}`))

