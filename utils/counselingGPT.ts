import OpenAI from "openai";

const openai =  new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://api.openai.iniad.org/api/v1"
})
type User ={
    name:string,
    gender: string,
    age: string,
    profession: string
}

export const counselingGPT =async (user: User ,content: string) => {
    
    console.log("user",user)
    console.log("content", content)
    let userContent = "";
    if(user.name ===""){
        userContent = `
        カウンセラー相手の基本情報。（これはあまり気にしなくていい）
        名前:${user.name},
        性別:${user.gender},
        年齢:${user.age},
        職業:${user.profession},
        `
    }else{
        userContent = ""
    }
    const chatCompletion = await openai.chat.completions.create({
        messages:[
            {
                role:"user",
                content:`
            
                ${userContent}
                あなたはカウンセラーに成り代わって次の文に対しての３行程度のアドバイスをお願いします。"${content}"
                `
            },
        ],
        model: "gpt-3.5-turbo"
    })
    const chatContent = chatCompletion.choices[0].message.content;

    return chatContent
}