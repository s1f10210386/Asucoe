import { atom } from "jotai";

type Message ={
    content: string;
    timestamp: string;
}

export const messageListAtom = atom<Message[]>([]);
