//現在の日時を取得する関数
export const getCurrentTimestamp = ():string=>{
    const now = new Date();
    const daysInJapanese = ["日", "月", "火", "水", "木", "金", "土"];
    const day = daysInJapanese[now.getDay()];
    return `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} (${day}) ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}