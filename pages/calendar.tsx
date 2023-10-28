import Link from "next/link"
import styles from "./calendar.module.css"
import { IconButton } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type DayObject ={
    color: string;
    content: string;
}


export default function Calendar(){

    const [calendarData, setCalendarData] = useState<any>([]);
    const [messageData, setMessageData] = useState<any>([]);
    

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
    
    useEffect(()=>{
        const fetchDB = async()=>{
            const DB = await getCalendar();
            // console.log("calendar",DB.combinedData_Calendar)
            // console.log("message",DB.combinedDate_messages)
            setCalendarData(DB.combinedData_Calendar)
            setMessageData(DB.combinedDate_messages);
        }
        fetchDB()
    });
        
    const getEmotionalColor = (value: number) => {
        // ここでemotionalValueに応じた色を返すロジックを書くことができます
        return value === 0 ? "grey" : "blue"; // 仮のコード
    }
    
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
            // const dateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
            // const calendarItem = calendarData.find((item: { date: string; }) => item.date.startsWith(dateString));
            // const messageItem = messageData.find((item: { timestamp: string | string[]; }) => item.timestamp.includes(`${i}日`));
            // if(calendarItem){
            //     const dayObject: DayObject = {
            //         color: getEmotionalColor(calendarItem.emotionalValue),
            //         content: messageItem ? messageItem.content : ''
            //     };
            //     daysArray.push(dayObject);
            // } else {
                daysArray.push(i);
            }
        
            // daysArray.push(i)
        // }
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
                {/* <div className={styles.days}>
                    {calendarDays.map((day, index) => {
                        if (typeof day === 'number' || day === null) {
                            return (
                                <div key={day !== null ? day : `empty-${index}`} className={styles.day}>
                                    {day}
                                </div>
                            );
                        } else {
                            return (
                                <div 
                                    key={`day-${index}`}
                                    className={styles.day}
                                    onClick={() => handleDayClick(day)}
                                    style={{ backgroundColor: day.color }}
                                >
                                    {index + 1}
                                </div>
                            );
                        }
                    })} 
                </div> */}
                
            </div>
        </div>
            
        
    )
}

