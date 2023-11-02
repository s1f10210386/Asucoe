import Link from 'next/link'
import styles from './info.module.css'
import { Box, IconButton, Slider, Typography, Link as MuiLink  } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useAtom } from 'jotai';
import { TimeDataAtom } from '@/utils/jotai';

// import { Box, Typography, IconButton, Link as MuiLink } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faXTwitter  } from '@fortawesome/free-brands-svg-icons'



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
    // console.log(TimeData);
    return (

        <div className={styles.container}>
            <div className={styles.topbar}>
            <Link href="/" passHref>
                <IconButton aria-label="Home" size="large" style={{ marginLeft: 'auto', padding: '8px', color: '#000000' }}>
                    <HomeIcon />
                </IconButton>
            </Link>
            <Link href="/calendar" passHref>
            <IconButton size="large" style={{ marginLeft: 'auto', padding: '8px', color: '#000000' , marginRight:"50px"}}>
                <CalendarMonthIcon/>
            </IconButton>
            </Link>
            </div>

            <div style={{display:"flex", justifyContent:"center",paddingTop:"50px"}}>
            <Box sx={{ 
                width: 300,
                padding: 2, 
                borderRadius: 1, 
                boxShadow: 3, // シャドウを追加
                bgcolor: 'background.paper', 
            }}>
            <Typography>設定時刻: {formatTime(TimeData)}</Typography>
            <Slider
                value={TimeData}
                min={0}
                max={2359}
                step={100} // 1時間ごとにステップ
                valueLabelDisplay="auto"
                valueLabelFormat={formatTime}
                onChange={handleChange}
            />
            
            </Box>
            </div>

        <div className={styles.footer}>
        <Box 
            sx={{ 
                width: '100%',
                // borderTop: '1px solid gray',
                // padding: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                // backgroundColor: 'background.default' 
            }}
        >
            <Typography variant="body1" gutterBottom>Asucoe</Typography>
    
            <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <Box sx={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="body2">Hiroki</Typography>
                    <MuiLink href="https://github.com/s1f10210254" target="_blank" rel="noopener noreferrer">
                        <IconButton >
                            <FontAwesomeIcon icon={faGithub}/>
                        </IconButton>
                    </MuiLink>
                    <MuiLink href="https://twitter.com/ts7307301723521" target="_blank" rel="noopener noreferrer">
                        <IconButton >
                            <FontAwesomeIcon icon={faXTwitter}/>
                        </IconButton>
                    </MuiLink>
                </Box>
            
                <Box sx={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="body2">Hotaka</Typography>
                    <MuiLink href="https://github.com/s1f10210386" target="_blank" rel="noopener noreferrer">
                        <IconButton >
                            <FontAwesomeIcon icon={faGithub}/>
                        </IconButton>
                    </MuiLink>
                    <MuiLink href="https://twitter.com/ladohada386" target="_blank" rel="noopener noreferrer">
                        <IconButton >
                            <FontAwesomeIcon icon={faXTwitter}/>
                        </IconButton>
                    </MuiLink>
                </Box>
            </Box>
        </Box>
        </div>
        
            
        </div>
        
    )
}