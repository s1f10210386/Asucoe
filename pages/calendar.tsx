import Link from "next/link"
import styles from "./calendar.module.css"
import { IconButton } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";

export default function Calendar(){
    
    const [currentDate, setCurrentDate] = useState(new Date());
    const days = ["日", "月", "火", "水", "木", "金", "土"];

    const getDaysInMonth=(month: number, year: number)=>{
        return new Date(year, month, 0).getDate();
    }

    const generateCalendarDays=(date: Date)=>{
        const month = date.getMonth();
        const year = date.getFullYear();
        
        const daysInMonth = getDaysInMonth(month + 1, year);
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysArray = [];
        for(let i= 1; i<= daysInMonth; i++){
            daysArray.push(i);
        }
        return daysArray;
    } 
    const calendarDays = generateCalendarDays(currentDate);

    return (
        <div className={styles.container}>
            <Link href="/" passHref>
                <IconButton aria-label="calendar" size="large" style={{ marginLeft: 'auto', padding: '8px', color: '#000000' }}>
                    <ArrowBackIcon />
                </IconButton>
            </Link>
            <h2>{currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月</h2>
            <div className={styles.daysHeader}>
                {days.map(day => <div key={day} className={styles.dayHeader}>{day}</div>)}
            </div>
            <div className={styles.days}>
                {calendarDays.map(day => <div key={day} className={styles.day}>{day}</div>)}
            </div>
        </div>
    )
}

