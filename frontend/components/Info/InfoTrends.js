import React from "react";
import RaceTable from "./RaceTable";


export default function Info({InfoData, levels, levelselect}) {

    const Level = levelselect[levels].label

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

    return(
        <div className="flex flex-row">
            <p>There are {InfoData.length} Schools in this {Level}</p>
            <RaceTable enrGroups={enrGroups} enrTotal={enrTotal}/>
            {/* <p>There are {enrSum(InfoData, "asian")} Asian Students in the {Level}</p> */}
        </div>
    )

}