import Link from "next/link"
import styles from "./calendar.module.css"
import { IconButton } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCallback, useEffect, useMemo, useState } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type DayObject ={
    color: string;
    content: string;
}


export default function Calendar(){   

    const getCalendar = async()=>{
        const responce = await fetch('/api/getDB',{
            method:'GET',
            headers:{
                'Content-Type' : 'application/json',
            },
        })
        const data = await responce.json()
        const DB_calendar = data.calendar;
        console.log("DB_calendar",DB_calendar)
        const DB_messages = data.messages;

        const combinedData_Calendar = DB_calendar.map((item:any)=>({
            date : item.date,
            emotionalValue : item.emotionalValue,
        }))

        const combinedDate_messages = DB_messages.map((item:any)=>({
            content : item.content,
            timestamp:item.timestamp,
            calendarId: item.calendarId
        }))
        return { combinedData_Calendar, combinedDate_messages}
    }
    
    // useEffect(()=>{
    //     const fetchDB = async()=>{
    //         const DB = await getCalendar();
    //         // console.log("calendar",DB.combinedData_Calendar)
    //         // console.log("message",DB.combinedDate_messages)
    //         setCalendarData(DB.combinedData_Calendar)
    //         setMessageData(DB.combinedDate_messages);
    //     }
    //     fetchDB()
    // });
        
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

    type DayData = {
        date: Date | null;
        // date: string | null;
        note?: string;
        color?: string;
    }
    const eventData: DayData[] = [
        {
            date: new Date(2023, 9, 20), //月は0から始まるので１０月
            // date: "2023-11-20",
            note: "aaa",
            color: "#e8f07b"
        },
        {
            date: new Date(2023, 10, 17), //月は0から始まるので１０月
            
            note: "bbb",
            color: "#4c4d45"
        }
    ]
    const isToday = (date: Date | null)=>{
        if(!date) return false;
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    }


    const generateCalendarDays = (date: Date): DayData[]=>{
        const month = date.getMonth();
        const year = date.getFullYear()

        const daysInMonth = getDaysInMonth(month + 1, year);
        const firstDayOfMonth = new Date(year, month, 1).getDay();

        const daysArray: DayData[] = [];

        for(let i = 0; i < firstDayOfMonth; i++) {
            daysArray.push({ date: null });
        }

        for(let i = 1; i<= daysInMonth; i++){
            const currentDate = new Date(year, month, i);
            console.log("month",month)
            const dataForDay = eventData.find(data => 
                data.date && 
                data.date.getDate() === i && 
                data.date.getMonth() === month && 
                data.date.getFullYear() === year
            );
            console.log(dataForDay)
            
            if(dataForDay){
                daysArray.push(dataForDay);
            }else{
                daysArray.push({
                    date:currentDate,
                    color: isToday(currentDate) ? "white" : "rgb(234, 234, 243)"
                })
            }
        }
        return daysArray;
    }
    const calendarDays = generateCalendarDays(currentDate)

    const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

    const handleDayClick = (day: DayData) => {
        setSelectedMessage(day.note || null);
    };

    
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
                    {calendarDays.map((day,index)=>(
                        <div 
                            key={index} 
                            className={styles.day}  
                            onClick={() => handleDayClick(day)}
                            style={{ backgroundColor : day.color || 'rgb(234, 234, 243)'}}
        
                        >
                            
                            {day.date ? day.date.getDate() : ""}
                        </div>
                    ))}
                </div>
                
                
            </div>
            {selectedMessage &&(
                    <div className={styles.noteDisplay}>
                        {selectedMessage}
                    </div>
            )}
        </div>
            
        
    )
}

