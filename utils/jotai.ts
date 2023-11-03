import { atom } from "jotai";

type Message ={
    content: string;
    timestamp: string;
    calendarId: number
}

export const messageListAtom = atom<Message[]>([]);

export const showModelAtom = atom(false);

export const commentBoxShowAtom = atom<boolean>(true);

export const TimeDataAtom = atom<number>(1900);

export const graphDataAtom = atom<{date:string, emotionalValue: number }[]>([])

export const hasLoadedOnceAtom = atom(false)


export const UserAtom = atom({
    name: "",
    gender: "",
    year: "",
    profession: "",
});

export const countAtom = atom<number>(0);