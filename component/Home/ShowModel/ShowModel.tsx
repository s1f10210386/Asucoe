import { countAtom, showModelAtom } from '@/utils/jotai';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import styles from './ShowModel.module.css'

export const ShowModel = () => {
    const [showModel] = useAtom(showModelAtom)

    const [count, setCount] = useAtom(countAtom);

    //質問内容
    //今日はハッカソン当日で、いまちょうど発表の途中でてが震えて緊張しています。

    
    const answer = `ハッカソン頑張れ！`
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: showModel ? 1 : 0 }}
            transition={{ duration: 2 }}
            className={styles.container}>
            {answer}
            {/* 今日も１日お疲れさまでした。 */}
        </motion.div>
    )
}