import { messageListAtom } from "@/utils/jotai";
import { useAtom } from "jotai";
import styles from './TopBar.module.css'
import { IconButton, Stack, duration } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InfoIcon from '@mui/icons-material/Info';
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const MotionIconButton = motion(IconButton);

export function TopBar(){
    const [messageList] = useAtom(messageListAtom);

    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);    

    const router = useRouter();
    const controls = useAnimation();
    const [isClicked, setIsClicked] = useState(false); // アイコンがクリックされた状態を管理
    const handleIconClick = async (path:string) => {
        await controls.start({
            x: '-50vw',
            y: '50vh',
            scale: 20,
            opacity:0,
            transition: { duration: 0.7,ease:"easeInOut" },
        });
        // setTimeout(() => router.push('/calendar'), 500);
        router.push('/calendar');
    }

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
                        
                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isClicked ? 1.0 : 0 }} // isClickedの状態に応じて透明度を変更
                    className={styles.overlay} // スタイルを適用
                ></motion.div>

                <MotionIconButton
                    aria-label="calendar"
                    size="large"
                    style={{ marginLeft: 'auto', padding: '8px', color: '#000000',
                 }}
                    initial={{scale:1}}
                    whileHover={{ scale: 1.1 }} // ホバー時に少し拡大する
                    onClick={() => {
                        handleIconClick('/calendar');
                        setIsClicked(true);
                    }} // クリック時にアニメーションを実行する
                    animate={controls}
                >
                    <CalendarMonthIcon fontSize="inherit" />
                </MotionIconButton>
              
                
                <Link href="/info" passHref>
                    <IconButton aria-label="info" size="large" style={{ marginLeft:'auto' ,padding:'8px',color: '#000000' }}>
                        <InfoIcon fontSize="inherit" />
                    </IconButton>
                </Link>
                

            </Stack>


        </div>
    )
}