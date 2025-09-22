import express, { type NextFunction, type Request, type Response } from "express";


const app = express();

app.use(express.json());

app.use("/home", (req: Request, res: Response, next: NextFunction) => {
    res.send("hellow from server....")
})


export default app;