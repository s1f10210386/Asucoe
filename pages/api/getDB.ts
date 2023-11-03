import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


const prisma = new PrismaClient();


export default async function getDB(req: NextApiRequest, res: NextApiResponse) {
    try{
        const calendar = await prisma.calendar.findMany()
        const messages = await prisma.message.findMany()
        const user = await prisma.user.findMany()
        res.json({calendar, messages, user})
    }catch(error){
        console.error("Error fetching messages:", error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message, stack: error.stack });
        } else {
            res.status(500).json({ error: "Internal server error" });
            }
    }
}