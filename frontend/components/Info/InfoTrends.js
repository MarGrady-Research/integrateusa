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
        <div className="flex flex-row mt-auto">
        <span className="text-2xl pt-4 pb-2">Overview</span>
        </div>
        <div className="container relative flex flex-wrap justify-between pb-5">
            <div className="w-1/3 h-300 border rounded-md ">
            <InsetMap id={id} bounds = {bounds}/>
            </div>
            <div className="w-1/3 h-full">
            <SchoolLevelTable schoolLevel={schoolLevel}/>
            </div>
            <div className="w-1/4 h-full">
            <PieChart InfoData={InfoData} />
            </div>
        </div>
        <div className="pb-5">
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