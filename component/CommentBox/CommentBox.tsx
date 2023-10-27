import { commentBoxShowAtom, messageListAtom, showModelAtom } from "@/utils/jotai";
import { baseURL } from "@/utils/url";
import { useAtom } from "jotai";
import styles from "./CommentBox.module.css"
import { Button, TextField } from "@mui/material";
import { getCurrentTimestamp } from "@/utils/CurrentTime";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';

export function CommentBox(){

    const [messageList, setMessageList] = useAtom(messageListAtom);
    const [messageContent, setMsseageContent] = useState<string>('');

    const [showModel, setShowModel] = useAtom(showModelAtom);
    const [commentBoxShow, setCommentBoxShow] = useAtom(commentBoxShowAtom);


    const addMessage=async(messageObject: {content:string, timestamp:string})=>{
        console.log('addMessage')
        const responce = await fetch(`/api/addMessage`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(messageObject),
        })

        console.log("addMessage responce",responce)
        const data = await responce.json()
        const DB_message = data.content
        const DB_timestamp = data.timestamp

        
        return {
            content: DB_message,
            timestamp:DB_timestamp
        };
    }

    const run =async()=>{
        if(messageContent === "")return;
        const now = getCurrentTimestamp()
        const messageObject={
            content:messageContent,
            timestamp: now
        }
        const newMessageObject = await addMessage(messageObject)
        setMessageList((prevMessageList) => [...prevMessageList,newMessageObject])
        setMsseageContent("")

        setShowModel(true)
        setCommentBoxShow(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.inputContainer}>
                <TextField 
                    className={styles.textFieldStyle}
                    
                    variant="outlined"
                    multiline
                    rows={1}
                    placeholder="明日の自分へ"
                    value={messageContent}
                    onChange={(e) => setMsseageContent(e.target.value)}
                    InputProps={{ style: { borderRadius: 30 } }}
                    // style={{ borderRadius: "50px" }}
                />
                <Button 
                    variant="contained" 
                    style={{ backgroundColor: '#91CAD3', color: 'white',borderRadius: '18px'  }}
                    onClick={run} 
                    className={styles.sendButton}
                    startIcon={<SendIcon/>}
                >
                </Button>
            </div>
        </div>
    )
}