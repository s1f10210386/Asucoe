//月の日数を取得する関数
export const getDaysInMonth=(month: number, year: number)=>{
    return new Date(year, month, 0).getDate();
}

    
export type DayData = {
    date: Date | null;
    note?: string;
    color?: string;
    counseling?: string;
}

export const isToday = (date: Date | null)=>{
    if(!date) return false;
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
}

