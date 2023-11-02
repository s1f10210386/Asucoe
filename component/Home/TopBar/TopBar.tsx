import { messageListAtom } from "@/utils/jotai";
import { useAtom } from "jotai";
import styles from './TopBar.module.css'
import { Grow, IconButton, Stack, duration } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InfoIcon from '@mui/icons-material/Info';
import { AnimationControls, motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { baseURL } from "@/utils/url";

const MotionIconButton = motion(IconButton);

export function TopBar(){
    const [messageList] = useAtom(messageListAtom);
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
        setIsOpen(!isOpen)
    };    

    // const router = useRouter();
    // const [isClicked, setIsClicked] = useState(false); // アイコンがクリックされた状態を管理


    // const handleClick = () => {
    //     setIsClicked(true);
    //     setTimeout(() => {
    //         router.push("/calendar");
    //     }, 1000); // 1000ms = 1秒、Growのアニメーションが完了するまでの時間に合わせて調整
    // };

    // const [summary, setSummary] = useState<string>()

   

    // useEffect(()=>{
    //     const summaryContent = async()=>{
    //         const latestContent = messageList[messageList.length -1]?.content;
    //         const response = await fetch(`${baseURL}/api/summaryAPI`,{
    //             method: "POST",
    //             headers:{
    //                 'Content-Type' : 'application/json',
    //             },
    //             body: JSON.stringify(latestContent),
    //         })
    //         const data:string = await response.json()
    //         setSummary(data);
    //     }
    //     summaryContent()
    //     console.log(summary)
    // },[messageList, summary])
    

    return (
        <div className={styles.container}>
            <motion.div
                className={styles.message}
                initial={false}
                animate={{ height: isOpen ? 'auto' : '30px' }}
                transition={{ duration: 0.5 }}
                onClick={ toggleOpen }
                style={{
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transformOrigin:'top', //上を基準に下に拡張
                }}
            >
            {messageList.map((content, index)=>(
                <div key={index}>
                    {index === messageList.length -1 &&(
                        <div>
                            {content.content}
                        </div>
                    )}
                </div>
            ))}
            </motion.div>


            <Stack direction="row" spacing={1} sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: "5px"}}>
                {/* <IconButton aria-label="search" size="large" sx={{color:`#000000`, padding: `8px`}} >
                    <SearchIcon fontSize="inherit" />
                </IconButton> */}
              
                <Link href="/calendar" passHref>
                    {/* <Grow in={isClicked} timeout={1000}> */}
                        <IconButton
                            aria-label="calendar"
                            size="large"
                            sx={{color:`#000000`, padding: `8px`}}
                        >
                            <CalendarMonthIcon fontSize="inherit"/>
                        </IconButton>
                    {/* </Grow> */}
                </Link>
                
                
                {/* <Grow in={isClicked}> */}
                <Link href="/info" passHref>
                    <IconButton
                        aria-label="info"
                        size="large"
                        sx={{color:`#000000`, padding: `8px`}}
                    >
                        <InfoIcon fontSize="inherit" />
                    </IconButton>
                </Link>
                {/* </Grow> */}
                

                

            </Stack>


        </div>
    )
}