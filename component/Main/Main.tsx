import { commentBoxShowAtom, messageListAtom } from "@/utils/jotai";
import { baseURL } from "@/utils/url";
import { useAtom } from "jotai";
import styles from "./Main.module.css"
import { useEffect, useRef } from "react";

export function Main(){
    const [messageList, setMessageList] = useAtom(messageListAtom);
    const [commentBoxShow, setCommentBoxShow] = useAtom(commentBoxShowAtom);
    const containerRef = useRef<HTMLDivElement>(null); 


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

    useEffect(() => {
        // 2. メッセージリストが変更されるたびにスクロール位置を最下部に設定
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messageList]);
    

    return (
        <div className={commentBoxShow ? styles.container : styles.container1} ref={containerRef}>
            <div style={{width:'70vw'}}>
            {messageList.map((message,index)=>(
                <div
                    key={index}
                >
                    <div className={styles.timestamp}>{message.timestamp}</div>
                        <div className={index % 2 === 0 ? styles.leftMessage : styles.rightMessage}>
                            {message.content}
                        </div>
                    
                </div>
            ))}
            </div>
            
        </div>
    )
}