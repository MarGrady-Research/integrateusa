import React, { useEffect } from "react";
import AreaChart from "./Area";
import TrendTable from "./TrendTable";
import GradeLines from "./GradeLine";


export default function Trends ({TrendData, id, grade, title}) {

   
    return (
        <>
        <div className="flex flex-row">
            <span className="text-2xl">Demographic Trends</span>
        </div>


        <div className="flex flex-wrap justify-apart h-full">
        <div className="w-1/2 h-full pt-3">
            <AreaChart TrendData={TrendData} grade={grade}/>
         </div>

        <div className="w-1/2 h-full py-3"> 
            <GradeLines TrendData={TrendData} grade={grade}/>
        </div>
        </div>
      
        </>
    )

}