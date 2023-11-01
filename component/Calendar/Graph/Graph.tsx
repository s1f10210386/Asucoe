import { graphDataAtom } from "@/utils/jotai"
import { useAtom } from "jotai";
import { useState } from "react"
import styles from "./Graph.module.css"

export function Graph(){
    const [graphData] = useAtom(graphDataAtom);
    return(
        <div>
            {graphData.map((item, index)=>(
                <div key={index}>
                    <div>{item.date}</div>
                    <div>{item.emotionalValue}</div>
                </div>
            ))}
        </div>
    )
}