// import { PrismaClient } from "@prisma/client";
// import { NextApiRequest, NextApiResponse } from "next";

// const prisma = new PrismaClient()

// export default async function addMessage(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     if(req.method === "POST"){
//         const { content, timestamp ,calendarId} = req.body
//         console.log("content addMessage api",content,timestamp, calendarId )

//         if (!calendarId) {
//             res.status(400).json({ error: 'calendarId is required' });
//             return;
//         }
//         const message = await prisma.message.create({
//             data: { 
//                 content,
//                 timestamp,
//                 calendar: {
//                     connect: {
//                         id: calendarId
//                     }
//                 }
//             }
//         })
//         res.json(message)
//     }else{
//         res.status(405).end()
//     }
// }