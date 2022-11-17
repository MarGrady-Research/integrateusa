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
        ES: InfoData.filter(e => e.level === "ES"),
        ESMS: InfoData.filter(e => e.level === "ESMS"),
        MS: InfoData.filter(e => e.level === "MS"),
        MSHS: InfoData.filter(e => e.level === "MSHS"),
        HS: InfoData.filter(e => e.level === "HS"),
        K12: InfoData.filter(e => e.level === "K12"),
        Other: InfoData.filter(e => e.level === "Other"),
        Total: {all_schools: InfoData.length,
                all_students: InfoData.map(e => e.tot_enr).reduce((a,b)=>a+b,0)}
        }

    return(
        <>
        { InfoData.length > 0 && title &&
        <div className="flex flex-row mx-auto">
            <span className="text-4xl"><b>{title}</b></span>
        </div>
        }
        <div className="relative flex flex-wrap justify-between py-5">
            <div className=" w-150 h-300">
            <InsetMap id={id} bounds = {bounds}/>
            </div>
            <div className="w-150 h-300">
            <SchoolLevelTable schoolLevel={schoolLevel} className="border-r-2 border-r-black"/>
            </div>
            <div className="w-150 h-300">
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