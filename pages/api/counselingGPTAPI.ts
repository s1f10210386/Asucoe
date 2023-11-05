import { counselingGPT } from "@/utils/counselingGPT";
import { NextApiRequest, NextApiResponse } from "next";

export default async function counselingGPTAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { user, content } = req.body;
    const counselingContent = await counselingGPT(user, content);
    res.status(200).json(counselingContent);
  } else {
    res.status(405).end();
  }
}
