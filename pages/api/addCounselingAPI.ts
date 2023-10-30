import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient()

export default async function addCounseling(req:NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST"){
        console.log("Request body:", req.body);
        const { id, counseling } = req.body;
        const message = await prisma.message.update({
            where:{id:id},
            data:{ counseling : counseling}
        });

        res.json({message})
    }
}