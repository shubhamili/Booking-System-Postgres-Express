import type { Request, Response } from "express";
import { prismaClient } from "../lib/prisma.js";


export const addAdmin = async (req: Request, res: Response) => {
    const adminData = await prismaClient.admin.findMany({})
    return res.status(200).json({ success: true, data: adminData })
} 
