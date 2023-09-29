import React, { useEffect } from "react";
import AreaChart from "./Area";
import BarChart from "./Bar";
import BarChart100 from "./Bar100";
import TableYearGrade from "./TableYearGrade"; // can set ./TableYearGrade back to ./GradeLine to get line graph back

export default function Trends ({TrendData, id, grade, title}) {

    /* calculate totals and percentages by race */
    for (let i = 0; i < TrendData.length; i++) {
        TrendData[i]["total"] = TrendData[i]["asian"] + TrendData[i]["black"] + TrendData[i]["hispanic"] + TrendData[i]["white"] + TrendData[i]["other"]
        TrendData[i]["prop_as"] = Math.round(TrendData[i]["asian"] / TrendData[i]["total"]*1000)/10
        TrendData[i]["prop_bl"] = Math.round(TrendData[i]["black"] / TrendData[i]["total"]*1000)/10
        TrendData[i]["prop_hi"] = Math.round(TrendData[i]["hispanic"] / TrendData[i]["total"]*1000)/10
        TrendData[i]["prop_wh"] = Math.round(TrendData[i]["white"] / TrendData[i]["total"]*1000)/10
        TrendData[i]["prop_ot"] = Math.round((100 - (TrendData[i]["prop_as"] + TrendData[i]["prop_bl"] + TrendData[i]["prop_hi"] + TrendData[i]["prop_wh"]))*10)/10
    }

    /* display trend bar charts and table (wrapped in if statement b/c otherwise runs through twice,
    once to display blank tables and then a second time with data) */

    if(0 < TrendData.length) {
  
    return (
        <>
        <div className="flex flex-row">
            <span className="text-2xl">Enrollment Trends by Race</span>
        </div>

        <div className="flex flex-wrap justify-apart h-full">
        <div className="w-1/2 h-full pt-3">
            <BarChart TrendData={TrendData} grade={grade}/>
        </div>

        <div className="w-1/2 h-full py-3"> 
            <BarChart100 TrendData={TrendData} grade={grade}/>
        </div>
        </div>
        
        <div className="flex flex-row">
            <span className="text-2xl">Enrollment Trends by Grade</span>
        </div>

        <div className="flex flex-row">
            <TableYearGrade TrendData={TrendData} grade={grade}/>
        </div>


        </>
    )

    }

}
