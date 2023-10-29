import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient()

export default async function addEmotionalValueAPI(req:NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST"){
        const { id, emotionalValue } = req.body;
        const calendar = await prisma.calendar.update({
            where:{id:id},
            data:{ emotionalValue: emotionalValue}
        });

        res.json({calendar})
    }
}