import OpenAI from "openai";

const openai =  new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://api.openai.iniad.org/api/v1"
})

export const summaryGPT = async(content: string):Promise<string>=>{
    const chatCompletion = await openai.chat.completions.create({
        messages:[
            {
                role:"user",
                content:`
                    "${content}"の文を１行程度に要約してください。なお内容が少ない場合はその分でいいです
                `
            },
        ],
        model: "gpt-3.5-turbo",
    });

    const chatContent = chatCompletion.choices[0].message.content;
    if(chatContent ===null)return summaryGPT(content);
    return chatContent;
    
}