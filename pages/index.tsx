import { CommentBox } from "@/component/CommentBox/CommentBox"
import styles from "./index.module.css"
import { Main } from "@/component/Main/Main"
import { TopBar } from "@/component/TopBar/TopBar"
export default function Home(){
  return (
    <div className={styles.container}>
      <TopBar />
      <Main />
      <CommentBox/>
    </div>
  )
}