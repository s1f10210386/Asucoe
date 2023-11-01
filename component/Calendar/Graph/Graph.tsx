import { graphDataAtom } from "@/utils/jotai"
import { useAtom } from "jotai";
import React, { useEffect, useState} from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartOptions,
  ChartData,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)


export function Graph() {
    // const result: number[] = []
    const [graphData] = useAtom(graphDataAtom);
    const [result, setResult] = useState<number[]>([]);
  //   const graphcheck = () => {
  //       console.log("graphdata", graphData)
        
        
  //       graphData.map((item) => {
  //           result.push(item.emotionalValue);
           
        
  //   })
        
  //   }
  //   graphcheck()
  // console.log("result", result)
    
    useEffect(() => {
    const tempResult: number[] = [];
    
    graphData.map((item) => { 
        tempResult.push(item.emotionalValue);
    });

    setResult(tempResult);
    }, [graphData]);
  
  
  // dataオブジェクトをここで定義
  const labels = Array.from({ length: result.length }, (_, i) => (i + 1).toString());
  const data: ChartData<'line'> = {
      labels,
      datasets: [
                {
                    data: result
                },
            ],
      };
    
      return <LineChart data={data} />;
}

const options: ChartOptions<'line'> = {
  responsive: true,
  scales: {
    // x: {
    //   display: false // x軸のラベルを表示しない
    // },
    y: {
      min: 1,       // y軸の最小値を1に設定
      max: 5,       // y軸の最大値を5に設定
      ticks: {
        stepSize: 1  // 1ステップごとにラベルを表示
      }
    }
  }
};

function LineChart({ data }: { data: ChartData<'line'> }): JSX.Element {
  return (
    <div className="graphContainer">
      <Line options={options} data={data} />
    </div>
  )
}