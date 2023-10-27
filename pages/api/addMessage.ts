import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient()

export default async function addMessage(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === "POST"){
        const { content, timestamp } = req.body
        console.log("content addMessage api",content,timestamp)
        const message = await prisma.message.create({
            data: { content,timestamp }
        })
        res.json(message)
    }else{
        res.status(405).end()
    }
}