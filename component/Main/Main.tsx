import { messageListAtom } from "@/utils/jotai";
import { baseURL } from "@/utils/url";
import { useAtom } from "jotai";
import styles from "./Main.module.css"
import { useEffect } from "react";

export function Main(){
    const [messageList, setMessageList] = useAtom(messageListAtom);


    const getMessages= async()=>{
        const response = await fetch(`/api/getMessages`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            },
    
        });
        const data = await response.json()

        const combinedData = data.map((item:any)=>({
            content : item.content,
            timestamp:item.timestamp
        }))
        return combinedData;
    }

    useEffect(()=>{
        const fetchMessages=async()=>{
            const DB = await getMessages();
            setMessageList(DB)
        }
        
        fetchMessages();
    },[setMessageList]);
    

    return (
        <div className={styles.container}>
            {messageList.map((message,index)=>(
                <div
                    key={index}
                >
                    {message.content}
                </div>
            ))}
        </div>
    )
}