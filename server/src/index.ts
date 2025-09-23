import express, { type Express, type Request, type Response } from 'express'
import config from './config/config.js'

const app: Express = express()

app.get("/", (req: Request, res: Response) => {
    // const users = await prisma.user.findMany();
    // console.log(users);

    res.send("app started")
})

app.listen(config.port, () => console.log(`server started at port http://localhost:${config.port} ..`))