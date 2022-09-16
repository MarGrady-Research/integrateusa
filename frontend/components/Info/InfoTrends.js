import React from "react";
import BarChart from "./Bar";
import PieChart from "./Pie";
import RaceTable from "./RaceTable";
import Select from "react-select";
import { Data } from "victory";

export default function Info({InfoData, title}) {


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
            {/* <Select 
            options={charterOptions}
            defaultInputValue = {"All Schools"}
            className = 'ml-5'/> */}
        </div>
        }
        <div className="relative flex flex-row justify-evenly mt-5">
            <p>There {InfoData.length == 1 ? 'is 1 School' : `are ${InfoData.length} Schools`} in {title}</p>
            <RaceTable enrGroups={enrGroups} enrTotal={enrTotal} className="border-r-2 border-r-black"/>
            <PieChart InfoData={InfoData}/>
        </div>
        <div>
            <BarChart InfoData={InfoData}/>
        </div>
        </>
    )

}