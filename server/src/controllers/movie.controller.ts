import type { Request, Response } from "express";
import { httpStatusCode } from "../utils/httpStatusCode.js";

export const addMovie = async (req: Request, res: Response) => {
    try {
        //create others fisrt
        
    } catch (error: any) {
        console.error("error in create Account :", error)
        return res.status(httpStatusCode["INTERNAL SERVER ERROR"]).json({
            success: false,
            error: error.name
        })
    }
}