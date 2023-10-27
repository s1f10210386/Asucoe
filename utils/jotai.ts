import { atom } from "jotai";

type Message ={
    content: string;
    timestamp: string;
}

export const messageListAtom = atom<Message[]>([]);

export const showModelAtom = atom(false);

export const commentBoxShowAtom = atom(true);
