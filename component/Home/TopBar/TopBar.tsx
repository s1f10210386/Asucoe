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

    const router = useRouter();
    const CalendarControls = useAnimation(); //calendar用アニメ定義
    const InfoControls = useAnimation(); //info用アニメ定義
    const [isClicked, setIsClicked] = useState(false); // アイコンがクリックされた状態を管理


    

    //クリックしたらアニメショーン起動しpath飛ぶ
    // const handleIconClick = async (path:string,controls: AnimationControls) => { 
    //     await controls.start({
    //         x: '-30vw',
    //         y: '50vh',
    //         scale: 20,
    //         opacity:0,
    //         transition: { duration: 0.5,ease:[0.42, 0, 0.58, 1] },
    //     });
    //     // setTimeout(() => router.push('/calendar'), 100);
    //     //たまにスマホ画面遷移バグる
    //     router.push(path);
    // }

    const handleIconClick = (path: string) => {
        setIsClicked(true); 
        setTimeout(() => router.push(path), 500);
    }

    const [summary, setSummary] = useState<string>()

   

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


            <Stack direction="row" spacing={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton aria-label="search" size="large" style={{ marginLeft:'auto',padding:'8px',color: '#000000' }} >
                    <SearchIcon fontSize="inherit" />
                </IconButton>
                        
                
                {/* <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isClicked ? 0.8 : 0 }} 
                    className={styles.overlay}
                ></motion.div> */}

                {/* <MotionIconButton
                    aria-label="calendar"
                    size="large"
                    style={{ marginLeft: 'auto', padding: '8px', color: '#000000',
                 }}
                    initial={{scale:1}}
                    whileHover={{ scale: 1.1 }} // ホバー時に少し拡大する
                    onClick={() => {
                        handleIconClick('/calendar',CalendarControls);
                        setIsClicked(true);
                    }} // クリック時にアニメーションを実行する
                    animate={CalendarControls}
                >
                    <CalendarMonthIcon fontSize="inherit" />
                </MotionIconButton> */}
              
                <Grow in={isClicked}>
                    <IconButton
                        aria-label="calendar"
                        size="large"
                        style={{ marginLeft: 'auto', padding: '8px', color: '#000000' }}
                        onClick={() => handleIconClick('/calendar')}
                    >
                        <CalendarMonthIcon fontSize="inherit" />
                    </IconButton>
                </Grow>
                {/* <MotionIconButton
                    aria-label="info"
                    size="large"
                    style={{ marginLeft: 'auto', padding: '8px', color: '#000000',
                 }}
                    initial={{scale:1}}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => {
                        handleIconClick('/info',InfoControls);
                        setIsClicked(true);
                    }}
                    animate={InfoControls}
                >
                    <InfoIcon fontSize="inherit" />
                </MotionIconButton> */}
                <MotionIconButton>
                <Grow in={isClicked}>
                    <IconButton
                        aria-label="info"
                        size="large"
                        style={{ marginLeft: 'auto', padding: '8px', color: '#000000' }}
                        onClick={() => handleIconClick('/info')}
                    >
                        <InfoIcon fontSize="inherit" />
                    </IconButton>
                </Grow>
                </MotionIconButton>
                

                

            </Stack>


        </div>
    )
}