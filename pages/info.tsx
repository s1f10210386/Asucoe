import Link from 'next/link'
import styles from './info.module.css'
import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Info(){
    return (
        <div className={styles.container}>
            <Link href="/" passHref>
                <IconButton aria-label="calendar" size="large" style={{ marginLeft: 'auto', padding: '8px', color: '#000000' }}>
                    <ArrowBackIcon />
                </IconButton>
            </Link>
            <p>infoページ</p>
        </div>
    )
}