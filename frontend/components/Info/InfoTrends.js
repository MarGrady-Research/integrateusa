import React from "react";
import PieChart from "./Pie";
import InsetMap from "./InsetMap";
import dynamic from "next/dynamic";
import SchoolLevelTable from "./SchoolLevelTable";

const BarChart2 = dynamic(() => import('./Bar'), {
    ssr: false
})

export default function Info({InfoData, title, id, bounds}) {


    const schoolLevel = {
        ES: InfoData.filter(e => e.level === "ES").length,
        ESMS: InfoData.filter(e => e.level === "ESMS").length,
        MS: InfoData.filter(e => e.level === "MS").length,
        MSHS: InfoData.filter(e => e.level === "MSHS").length,
        HS: InfoData.filter(e => e.level === "HS").length,
        K12: InfoData.filter(e => e.level === "K12").length,
        Other: InfoData.filter(e => e.level === "Other").length,
        Total: InfoData.length
    }

    // const groups = ["asian", "black", "hispanic", "other", "white"]

    // const enrSum = (arr, group) => {
    //     return arr.reduce(function(a,b) {
    //         return a+b[group];
    //     }, 0);
    // };

    // const enrData = (arr) => {
    //     return  arr.map(item => {
    //         return ({
    //             group: item,
    //             enr: enrSum(InfoData, item),
    //             pct: Math.round(enrSum(InfoData, item)/enrSum(InfoData, "tot_enr")*100)
    //         })
    //     });
    // }

    // const enrGroups = enrData(groups)
    // const enrTotal = enrSum(InfoData, "tot_enr") 

    return(
        <>
        { InfoData.length > 0 && title &&
        <div className="flex flex-row mx-auto">
            <span className="text-4xl"><b>{title}</b></span>
        </div>
        }
        <div className="relative flex flex-wrap justify-between py-5">
            <div className=" w-200 h-300">
            <InsetMap id={id} bounds = {bounds}/>
            </div>
            <div className="w-200 h-300">
            <SchoolLevelTable schoolLevel={schoolLevel} className="border-r-2 border-r-black"/>
            </div>
            <div className="w-200 h-300">
            <PieChart InfoData={InfoData}/>
            </div>
        </div>
        <div className="py-4">
            <div className="flex flex-row mx-auto">
                <span className="text-2xl pb-2">Race Breakdown by School</span>
            </div>
            <div className="h-100 w-100 overflow-auto">
                <BarChart2 InfoData={InfoData} className="py-4 left-0 top-0 absolute"/>
            </div>
        </div>
        </>
    )

}