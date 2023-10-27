import { messageListAtom } from "@/utils/jotai";
import { useAtom } from "jotai";
import styles from './TopBar.module.css'

export function TopBar(){
    const [messageList] = useAtom(messageListAtom);

    return (
        <div className={styles.container}>
            {messageList.map((content, index)=>(
                <div key={index}>
                    {index === messageList.length -1 &&(
                        <div>
                            {content.content}
                        </div>
                    )}
                </div>
            ))}

        </div>
    )
}