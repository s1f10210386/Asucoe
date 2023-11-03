import { showModelAtom } from '@/utils/jotai';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import styles from './ShowModel.module.css'

export const ShowModel = () => {
    const [showModel] = useAtom(showModelAtom)

    //質問内容
    //今日はハッカソン当日で、いまちょうど発表の途中でてが震えて緊張しています。

    const answer = `
    大丈夫ですよ！ハッカソンの発表は緊張するものですが、
    あなたがこれまでにやってきた努力と成果を伝える大切な機会です。
    深呼吸をして、自分を信じてください。皆さんもあなたのプロジェクトに興味を持って聞いています。
    頑張ってください！発表が終わった後の達成感も楽しみにしてくださいね。
    `
    return (
            <div>今日も１日お疲れさまでした。</div>
    )
}