import { CircularProgress } from "@mui/material"
import styles from "./Loading.module.css"
import Image from "next/image"

export const Loading =()=>{
    return(
        
        <div className={styles.container}>
            {/* <div className={styles.mozi}>
                Asucoe
            <link rel="stylesheet" href="https://use.typekit.net/olh3xss.css"></link>
            </div> */}
            
            <div className={styles.icon}>
                <Image src="/icon/asucoe_icon1.png" width={155} height={155} alt="asucoe" />
            </div>
            {/* <div className={styles.load}>
                <CircularProgress/>
            </div> */}
        </div>
    )
}