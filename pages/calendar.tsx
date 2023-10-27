import Link from "next/link"
import styles from "./calendar.module.css"
import { IconButton } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type DayObject ={
    color: string;
    content: string;
}


export default function Calendar(){
    
    // 現在表示しているコンテンツの状態を追加
    const [displayedContent, setDisplayedContent] = useState<string>("");

    const [currentDate, setCurrentDate] = useState(new Date());
    const days = ["日", "月", "火", "水", "木", "金", "土"];

    //月の日数を取得する関数
    const getDaysInMonth=(month: number, year: number)=>{
        return new Date(year, month, 0).getDate();
    }

    const prevMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
    }
    
    const nextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
    }

    const generateCalendarDays=(date: Date)=>{
        const month = date.getMonth();
        const year = date.getFullYear();
        
        const daysInMonth = getDaysInMonth(month + 1, year);
        console.log("daysInMonth",daysInMonth)
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        // console.log("first",firstDayOfMonth)
        const daysArray = [];
        for(let i=0; i< firstDayOfMonth;i++){
            daysArray.push(null)
            // daysArray.push(0);
        }
        for(let i= 1; i<= daysInMonth; i++){
            // daysArray.push({
            //     color: "",
            //     content: `2023年${month + 1}月${i}日のコンテンツ`
            // });
            daysArray.push(i)
        }
        return daysArray;
    } 

    const handleDayClick = (day: DayObject)=>{
        if(day && day.content){
            setDisplayedContent(day.content)
        }
    }
    const calendarDays = generateCalendarDays(currentDate);

    return (
        <div className={styles.container}>
            <Link href="/" passHref>
                <IconButton aria-label="calendar" size="large" style={{ marginLeft: 'auto', padding: '8px', color: '#000000' }}>
                    <ArrowBackIcon />
                </IconButton>
            </Link>
            <div className={styles.calendar}>
                <div style={{display:"flex"}}>
                <IconButton onClick={prevMonth}>
                    <ArrowBackIcon/>
                </IconButton>
                <h2>{currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月</h2>
                <IconButton onClick={nextMonth}>
                    <ArrowForwardIcon/>
                </IconButton>
                </div>
                
                <div className={styles.daysHeader}>
                    {days.map(day => <div key={day} className={styles.dayHeader}>{day}</div>)}
                </div>
                <div className={styles.days}>
                    {calendarDays.map((day, index) => (
                        <div key={day !== null ? day : `empty-${index}`} className={styles.day}>
                            {day}
                        </div>
                    ))} 
                </div>
                {/* {calendarDays.map((item, index) => {
                    if (item === null ) { // 0またはnullの場合の処理を追加
                        return <div key={`empty-${index}`} className={styles.day}></div>;
                    }
                    const day = typeof item === "number" ? item : item.content.split('日')[0].split('月')[1]; 
                    return (
                        <div 
                            key={typeof item === "number" ? item : `day-${day}`}
                            className={styles.day}
                            onClick={() => typeof item !== "number" && item && handleDayClick(item)}
                            style={{ color: typeof item !== "number" && item ? item.color : "inherit" }}
                        >
                            {day}
                        </div>
                    );
                })} */}
            </div>

            {/* contentの表示部分を追加 */}
            {/* <div className={styles.contentDisplay}>
                {displayedContent}
            </div> */}
        </div>
            
        
    )
}

