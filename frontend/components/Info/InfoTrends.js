import React from "react";
import BarChart from "./Bar";
import PieChart from "./Pie";
import RaceTable from "./RaceTable";
import Select from "react-select";

export default function Info({InfoData, selectedname}) {


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
        <div className="flex flex-row">
            <span className="text-4xl"><b>{selectedname}</b></span>
            <Select 
            options={charterOptions}
            defaultInputValue = {"All Schools"}
            className = 'ml-5'/>
        </div>
        <div className="relative flex flex-row mt-5">
            <p>There are {InfoData.length} Schools in {selectedname}</p>
            <RaceTable enrGroups={enrGroups} enrTotal={enrTotal}/>
            <PieChart enrGroups={enrGroups} enrTotal={enrTotal}/>
        </div>
        <div>
            <BarChart InfoData={InfoData}/>
        </div>
        </>
    )

}