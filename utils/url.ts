const base =()=>{
    if(process.env.NODE_ENV === "production"){
        return ""
    }else if(process.env.NODE_ENV === "development"){
        return ""
    }
}

export const baseURL = base()