import Link from "next/link"
import styles from "./calendar.module.css"
import { IconButton } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function Calendar(){
    return (
        <div className={styles.container}>
            <Link  href="/" passHref>
                <IconButton aria-label="calendar" size="large" style={{ marginLeft:'auto' ,padding:'8px',color: '#000000' }}>
                    <ArrowBackIcon/>
                </IconButton>
            </Link>
            <p>hello</p>
        </div>
    )
}