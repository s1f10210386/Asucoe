import OpenAI from "openai";


const openai =  new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://api.openai.iniad.org/api/v1"
})

export const scoringGPT = async(content: string)=>{
    const completion = await openai.completions.create({
        prompt :`
        "${content}"の文で明るければ５、暗ければ１で５段階評価して。なお答え方は１から５の数値のみ
        `,
        model: "gpt-3.5-turbo",
        
    });
    const data = completion.choices[0]
    console.log("aaaaaaaaaaaaaaaaaa",completion.choices[0])
    return data
}