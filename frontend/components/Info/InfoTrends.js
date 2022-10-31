import React from "react";
import PieChart from "./Pie";
import RaceTable from "./RaceTable";
import InsetMap from "./InsetMap";
import dynamic from "next/dynamic";
import Select from "react-select";

const BarChart2 = dynamic(() => import('./Bar'), {
    ssr: false
})

export default function Info({InfoData, title, id, bounds}) {


    const groups = ["asian", "black", "hispanic", "other", "white"]

    const enrSum = (arr, group) => {
        return arr.reduce(function(a,b) {
            return a+b[group];
        }, 0);
    };

    const enrData = (arr) => {
        return  arr.map(item => {
            return ({
                group: item,
                enr: enrSum(InfoData, item),
                pct: Math.round(enrSum(InfoData, item)/enrSum(InfoData, "tot_enr")*100)
            })
        });
    }

    const enrGroups = enrData(groups)
    const enrTotal = enrSum(InfoData, "tot_enr") 


    const charterOptions = [
        {label: "All Schools", value: 0},
        {label: "Charter Schools", value: 1}
    ]

    return(
        <>
        { InfoData.length > 0 && title &&
        <div className="flex flex-row mx-auto">
            <span className="text-4xl"><b>{title}</b></span>
        </div>
        }
        <div className="relative flex flex-row justify-between py-5">
            <InsetMap id={id} bounds = {bounds}/>
            <RaceTable enrGroups={enrGroups} enrTotal={enrTotal} className="border-r-2 border-r-black"/>
            <div>
            <PieChart InfoData={InfoData}/>
            </div>
        </div>
        <div className="py-4">
            <div className="h-100 w-100 overflow-auto">
                <BarChart2 InfoData={InfoData} className="py-4 left-0 top-0 absolute"/>
            </div>
        </div>
        </>
    )

}