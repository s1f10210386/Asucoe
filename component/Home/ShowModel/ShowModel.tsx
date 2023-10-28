import { showModelAtom } from '@/utils/jotai';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import styles from './ShowModel.module.css'

export const ShowModel = () => {
    const [showModel] = useAtom(showModelAtom)
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: showModel ? 1 : 0 }}
            transition={{ duration: 2 }}
            className={styles.container}>
            今日も一日お疲れさまでした！
        </motion.div>
    )
}