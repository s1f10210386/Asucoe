import { summaryGPT } from "@/utils/summaryGPT";
import { NextApiRequest, NextApiResponse } from "next";

export default async function summaryAPI(req:NextApiRequest, res:NextApiResponse) {
    if(req.method === "POST"){
        const summaryContent = await summaryGPT(req.body);
        res.status(200).json(summaryContent);
    }else{
        res.status(405).end()
    }
}