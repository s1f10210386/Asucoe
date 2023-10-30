import { counselingGPT } from "@/utils/counselingGPT";
import { NextApiRequest, NextApiResponse } from "next";

export default async function  counselingGPTAPI(req:NextApiRequest, res:NextApiResponse) {
    if(req.method === "POST"){
        const score = await counselingGPT(req.body);
        res.status(200).json(score);
    }else{
        res.status(405).end()
    }
}


