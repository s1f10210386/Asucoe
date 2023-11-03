import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient()

export default async function addUserDBAPI(req: NextApiRequest, res: NextApiResponse) {
    // console.log("prisma",prisma)
    if(req.method  === "POST"){
        const {name, gender, age, profession}= req.body;
        console.log("name:", name, "gendar:" ,gender, "age:",age,"profession",profession)
        const user = await prisma.user.update({
            where:{id:1},
            data:{
                name: name,
                gender: gender,
                age: age,
                profession: profession
            }
        })
        res.json({user})
    }else{
        res.status(405).end()
    }
}