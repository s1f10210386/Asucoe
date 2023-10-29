import { scoringGPT } from "@/utils/scoringGPT";
import { NextApiRequest, NextApiResponse } from "next";

export default async function  scoringTPT(req:NextApiRequest, res:NextApiResponse) {
    if(req.method === "POST"){
        const score = await scoringGPT(req.body);
        res.status(200).json(score);
    }else{
        res.status(405).end()
    }
}