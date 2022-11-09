import React from "react";
import AreaChart from "./Area";
import TrendTable from "./TrendTable";


export default function Trends ({TrendData, id, title}) {


    return (
        <>
        <div className="flex flex-row">
            <span className="text-4xl">Demographic Trends for <b>{title}</b></span>
        </div>


        <div className="pt-3">
            <AreaChart TrendData={TrendData}/>
        </div>

        <div className="pt-3">
            <span className="text-4xl">Enrollment Trends by Grade</span>
        </div>
        
        <div className="py-3">
            <TrendTable TrendData={TrendData}/>
        </div>

        
        </>
    )

}