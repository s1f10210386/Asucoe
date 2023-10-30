import OpenAI from "openai";

const openai =  new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://api.openai.iniad.org/api/v1"
})

export const scoringGPT = async(content: string): Promise<number>=>{
    const chatCompletion = await openai.chat.completions.create({
        messages:[
            {
                role:"user",
                content:`
                    "${content}"の文で明るければ５、暗ければ１で５段階評価して。なお答え方は１から５の数値のみ
                `,
            },
        ],
        model: "gpt-3.5-turbo",
    });
    const chatContent = chatCompletion.choices[0].message.content;

    const validResponses = ["1" , "2" , "3" , "4" , "5"]
    if(chatContent === null  || !validResponses.includes(chatContent)){
        console.log("scoringGPT 再帰")
        return scoringGPT(content);
    }
    // console.log("cgatContent",chatContent)
    const result = parseInt(chatContent, 10)
    return result
}
