import Link from 'next/link'
import styles from './info.module.css'
import { Box, IconButton, Slider, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useAtom } from 'jotai';
import { TimeDataAtom } from '@/utils/jotai';


export default function Info(){
    
    const [TimeData, setTimeData] = useAtom(TimeDataAtom); // 初期値は1900（19:00）

    const formatTime = (value: number) => {
        const hour = Math.floor(value / 100);
        const minute = value % 100;
        return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    };

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === "number") {
            setTimeData(newValue);
        }
    };
    console.log(TimeData);
    return (

        <div className={styles.container}>
            <div className={styles.topbar}>
            <Link href="/" passHref>
                <IconButton aria-label="Home" size="large" style={{ marginLeft: 'auto', padding: '8px', color: '#000000' }}>
                    <HomeIcon />
                </IconButton>
            </Link>
            <Link href="/calendar" passHref>
            <IconButton size="large" style={{ marginLeft: 'auto', padding: '8px', color: '#000000' }}>
                <CalendarMonthIcon/>
            </IconButton>
            </Link>
            </div>

            
            <Box sx={{ width: 300 }}>
            <Typography gutterBottom>設定時刻</Typography>
            <Slider
                value={TimeData}
                min={0}
                max={2359}
                step={100} // 1時間ごとにステップ
                valueLabelDisplay="auto"
                valueLabelFormat={formatTime}
                onChange={handleChange}
            />
            <Typography>Selected Time: {formatTime(TimeData)}</Typography>
            </Box>
        </div>
        
    )
}