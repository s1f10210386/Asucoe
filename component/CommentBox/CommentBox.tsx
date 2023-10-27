import { messageListAtom } from "@/utils/jotai";
import { useAtom } from "jotai";

export function CommentBox(){

    const [messageList, setMessageList] = useAtom(messageListAtom);

    return (
        <div><p>commentbox</p></div>
    )
}