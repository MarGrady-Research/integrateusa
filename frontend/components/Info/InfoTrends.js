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
                enr: enrSum(InfoData, item)
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
        { InfoData.length > 0 &&
        <div className="flex flex-row">
            <span className="text-4xl"><b>{title}</b></span>
            <Select 
            options={charterOptions}
            defaultInputValue = {"All Schools"}
            className = 'ml-5'/>
        </div>
        }
        <div className="relative flex flex-row justify-evenly mt-5">
            <p>There are {InfoData.length} Schools in {title}</p>
            <RaceTable enrGroups={enrGroups} enrTotal={enrTotal}/>
            <PieChart InfoData={InfoData}/>
        </div>
        <div>
            <BarChart InfoData={InfoData}/>
        </div>
        </>
    )

}