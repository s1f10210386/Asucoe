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


export function TopBar(){
    const [messageList] = useAtom(messageListAtom);
    const controls = useAnimation();
    
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);

    
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
                <Link  href="/calendar" passHref>
                    <IconButton aria-label="calendar" size="large" style={{ marginLeft:'auto' ,padding:'8px',color: '#000000' }}>
                        <CalendarMonthIcon fontSize="inherit" />
                    </IconButton>
                </Link>
                <Link href="/info" passHref>
                    <IconButton aria-label="info" size="large" style={{ marginLeft:'auto' ,padding:'8px',color: '#000000' }}>
                        <InfoIcon fontSize="inherit" />
                    </IconButton>
                </Link>
                

            </Stack>


        </div>
    )
}