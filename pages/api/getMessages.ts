import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


const prisma = new PrismaClient();


export default async function getMessages(
    req: NextApiRequest,
    res: NextApiResponse
) {
    
        try{
            if(req.method === "GET"){
            const messages = await prisma.message.findMany()
            console.log("message",messages)
            res.json(messages)
            }else{
                res.status(405).end();
            }
        }catch(error){
            console.error("Error fetching messages:", error);
            if (error instanceof Error) {
                res.status(500).json({ error: error.message, stack: error.stack });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
        
    
}