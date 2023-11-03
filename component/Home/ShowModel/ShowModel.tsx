import { countAtom, showModelAtom } from '@/utils/jotai';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import styles from './ShowModel.module.css'
import Image from 'next/image';

export const ShowModel = () => {
    const [showModel] = useAtom(showModelAtom)

    const [count, setCount] = useAtom(countAtom);

    console.log("count", count)

    //これでパス設定
    const imagePath = `/icon/kyoryu${count}.png`;

    return (
        <div className={styles.container}>
            <div className={styles.kyoryu} >
            <Image src={imagePath} width={1550} height={1550} alt={`kyoryu ${count}`} />
            </div>
        </div>
    )
}