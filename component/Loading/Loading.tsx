import styles from "./Loading.module.css"
import Image from "next/image"

export const Loading =()=>{
    return(
        <div className={styles.container}>
            {/* <div className={styles.icon}/> */}
            <div className={styles.icon}>
            <Image src="/icon/asucoe_icon1.png" width={240} height={240} alt="asucoe" />
            </div>
        </div>
    )
}