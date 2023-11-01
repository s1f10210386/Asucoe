import { graphDataAtom } from "@/utils/jotai"
import { useAtom } from "jotai";
import { useState } from "react"
import styles from "../../../pages/calendar.module.css"

export function Graph(){
    const [graphData] = useAtom(graphDataAtom);
    return(
        <div className={styles.graph}>
            {graphData.map((item, index)=>(
                <div key={index}>
                    <div>{item.date}</div>
                    <div>{item.emotionalValue}</div>
                </div>
            ))}
        </div>
    )
}