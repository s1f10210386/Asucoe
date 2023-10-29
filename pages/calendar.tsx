import Link from "next/link"
import styles from "./calendar.module.css"
import { IconButton } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCallback, useEffect, useMemo, useState } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HomeIcon from '@mui/icons-material/Home';
import { DayData, getDaysInMonth, isToday } from "@/utils/makeCalendar";


export default function Calendar(){
    type CalendarItem = {
        date: string;
        emotionalValue: number;
        id: number;
    }
    
    type MessageItem = {
        content: string;
        timestamp: string;
        calendarId: number;
    }

    const [eventData, setEventData] = useState<any[]>([]);
    const [DbCalendarData, setDbCalendarData] = useState<CalendarItem[]>([]);
    const [DbMessageData, setDbMessageData] = useState<MessageItem[]>([]);

    const getCalendar = async()=>{
        const responce = await fetch('/api/getDB',{
            method:'GET',
            headers:{
                'Content-Type' : 'application/json',
            },
        })
        const data = await responce.json()
        const DB_calendar = data.calendar;
        const DB_messages = data.messages;

        const combinedData_Calendar = DB_calendar.map((item:any)=>({
            date : item.date,
            emotionalValue : item.emotionalValue,
            id : item.id
        }))

        const combinedDate_messages = DB_messages.map((item:any)=>({
            content : item.content,
            timestamp:item.timestamp,
            calendarId: item.calendarId
        }))
        return { combinedData_Calendar, combinedDate_messages}
    }
    
    useEffect(()=>{
        const fetchDB = async()=>{
            const DB = await getCalendar();
            setDbCalendarData(DB.combinedData_Calendar)
            setDbMessageData(DB.combinedDate_messages);
        }
        fetchDB()
    },[]);

    const emotionalValueToColor = (value: number) => {
        if(value === 1) return '#EAF4FF'; 
        if(value === 2) return "#D4E8FF";
        if(value === 3) return "#BFDFFF";
        if(value === 4) return "#A9D6FF";
        if(value === 5) return "#93CEFF";
    };
    
      
    useEffect(()=>{
        const eventData = DbCalendarData.map(calendarItem =>{
            const message = DbMessageData.find(
                messageItem => messageItem.calendarId === calendarItem.id
            );
            return{
                date: new Date(calendarItem.date),
                note: message ? message.content  : "",
                color : emotionalValueToColor(calendarItem.emotionalValue)
            }
        })
        setEventData(eventData);
    },[DbCalendarData, DbMessageData])
    

        
    const [currentDate, setCurrentDate] = useState(new Date());
    const days = ["日", "月", "火", "水", "木", "金", "土"];

    

    const prevMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
    }
    
    const nextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
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
            const dataForDay = eventData.find(data => 
                data.date && 
                data.date.getDate() === i && 
                data.date.getMonth() === month && 
                data.date.getFullYear() === year
            );
            if(dataForDay){
                daysArray.push(dataForDay);
            }else{
                daysArray.push({
                    date:currentDate,
                    color: isToday(currentDate) ? "white" : "rgb(255, 255, 255)",
                    note : isToday(currentDate) ? "今日" : "イベントはまだ書かれていないです"
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
            <div style={{display:"grid",justifyContent:"right", marginRight:"10%"}}>
            <Link href="/" passHref>
                <IconButton aria-label="calendar" size="large" style={{ marginLeft: 'auto', padding: '8px', color: '#000000' }}>
                    <HomeIcon />
                </IconButton>
            </Link>
            </div>
            
            <div className={styles.calendar}>
                <div className={styles.calendarHeader}>
                <IconButton onClick={prevMonth}>
                    <ArrowBackIcon/>
                </IconButton>
                <h2 className={styles.calendarMonth}>
                    {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
                </h2>
                <IconButton onClick={nextMonth}>
                    <ArrowForwardIcon/>
                </IconButton>
                </div>
                
                <div className={styles.daysHeader}>
                    {days.map(day => <div key={day} className={styles.dayHeader}>
                                        {day}
                                    </div>)}
                </div>
                <div className={styles.days}>
                    {calendarDays.map((day,index)=>(
                        <div 
                            key={index} 
                            className={styles.day}  
                            onClick={() => handleDayClick(day)}
                            style={{ backgroundColor : day.color || 'rgb(255, 255, 255)'}}
                        >
                            {day.date ? day.date.getDate() : ""}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                {selectedMessage &&(
                    <div className={styles.noteDisplay}>
                        {selectedMessage}
                    </div>
                )}
            </div>    
        </div>
    )
}

