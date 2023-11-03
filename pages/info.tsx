import Link from 'next/link'
import styles from './info.module.css'
import { Box, IconButton, Slider, Typography, Link as MuiLink, TextField, FormControl, InputLabel, Select, MenuItem, Button  } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useAtom } from 'jotai';
import { TimeDataAtom, UserAtom } from '@/utils/jotai';

// import { Box, Typography, IconButton, Link as MuiLink } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faXTwitter  } from '@fortawesome/free-brands-svg-icons'
import { baseURL } from '@/utils/url';



export default function Info(){
    
    const [TimeData, setTimeData] = useAtom(TimeDataAtom); // 初期値は1900（19:00）

    const formatTime = (value: number) => {
        const hour = Math.floor(value / 100);
        const minute = value % 100;
        return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    };

    const handleTimeChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === "number") {
            setTimeData(newValue);
        }
    };

    type User = {
        name: string;
        gender: string;
        age: string;
        profession: string;
    };

    const addUserDB = async(user:User)=>{
        console.log("user",user)
        const response = await fetch(`${baseURL}/api/addUserDBAPI`,{
            method:"POST",
            headers:{
                'Content-Type' : "application/json",
            },
            body: JSON.stringify(user),
        })
        const data = await response.json();
        return data;
    }


    const [user, setUser] = useAtom(UserAtom);
    const [editMode, setEditMode] = useState(false);

    const handleUserChange = (field:any) => (e: { target: { value: any; }; }) => {
        setUser({
            ...user,
            [field]: e.target.value
        });
        // console.log("user",user)
    };
      
    const handleUserSubmit =()=>{
        setEditMode(false);
        // console.log(user)
        addUserDB(user);
    }

    const getUser = async()=>{
        const response = await fetch(`${baseURL}/api/getDB`,{
            method: "GET",
            headers:{
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        const DB_user = data.user;
        return DB_user
    }

    useEffect(()=>{
        const fetchUser = async()=>{
            const DB_user = await getUser()
            const userToSet = {
                name: DB_user[0].name,
                gender: DB_user[0].gender,
                age: DB_user[0].age,
                profession: DB_user[0].profession,
            }

            setUser(userToSet);
        }
        fetchUser();
        
    },[setUser])
    // console.log(user.name)

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

            <div className={styles.main}>
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
                        onChange={handleTimeChange}
                    /> 
                    </Box>
                </div>

                <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
                <Typography variant="h5" gutterBottom>
                    ユーザー情報
                </Typography>
                {editMode ? (
                    <>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="名前"
                            value={user.name}
                            onChange={handleUserChange('name')}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>性別</InputLabel>
                            <Select value={user.gender} onChange={handleUserChange('gender')}>
                                <MenuItem value="男性">男性</MenuItem>
                                <MenuItem value="女性">女性</MenuItem>
                                <MenuItem value="その他">その他</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="年齢"
                            type="number"
                            value={user.age}
                            onChange={handleUserChange('age')}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="職業"
                            value={user.profession}
                            onChange={handleUserChange('profession')}
                        />
                        <Button 
                            variant="contained" 
                            color="primary" 
                            style={{ marginTop: '20px' }}
                            onClick={handleUserSubmit}
                        >
                            保存
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography variant="body1">名前: {user.name}</Typography>
                        <Typography variant="body1">性別: {user.gender}</Typography>
                        <Typography variant="body1">年齢: {user.age}</Typography>
                        <Typography variant="body1">職業: {user.profession}</Typography>
                        <Button 
                            variant="outlined" 
                            color="primary" 
                            style={{ marginTop: '20px' }}
                            onClick={() => setEditMode(true)}
                        >   
                            編集
                        </Button>
                    </>
                )}
                </div>
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