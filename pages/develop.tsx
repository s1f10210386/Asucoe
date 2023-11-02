import { ShowModel } from "@/component/Home/ShowModel/ShowModel";
import { Loading } from "@/component/Loading/Loading";
import { useEffect, useState } from "react";

export default function Develop(){
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setIsLoading(false);
        }, 2000);

        return ()=>{
            clearTimeout(timer);
        }
    },[])

    return (
        <div>
            {/* {isLoading ? (
                <div>
                    <Loading/>
                </div>
            ) : (
                <div>
                    <ShowModel/>
                </div>
            )} */}
            <p>aa</p>
        </div>
    )
}