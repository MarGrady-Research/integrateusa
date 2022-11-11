import React, { useEffect, useState } from "react";
import SegTable from "./SegTable";
import Comparison from "./ComparisonTable";

export default function Segregation({SegData, id, grade, title}) {

    let idlevel;
    let namelevel;
    let table;

    const name = () => {
        let strID = ''+id; 

        if (strID.length === 7) {
            idlevel = "dist_id"
            namelevel = "dist_name";
            table = "district";
        } else if (strID.length === 5) {
            idlevel = "county_id";
            namelevel = "county_name";
            table = "county";
        } else {
            idlevel = "state_abb";
            namelevel = "state_abb";
            table = "state";
        }}

    const level = () => {
        let strID = ''+id; 
        if (strID.length === 7) {
            return "Districts"
        } else if (strID.length === 5) {
            return "Counties"
        } else {
            return "States"
        }}
    
    
    const findFocus = () => {
        name();
        let pos = SegData.map(e => e[idlevel]).indexOf(''+id);
        return SegData[pos];
    }
 
    const [focus, setFocus] = useState(findFocus());
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFocus(findFocus);
        let filter = SegData.filter(e => e[idlevel] !== ''+id)
        setFilteredData(filter.map(e => ({
            ...e,
            enr_prop_as: Math.round(e.enr_prop_as*100),
            enr_prop_bl: Math.round(e.enr_prop_bl*100),
            enr_prop_hi: Math.round(e.enr_prop_hi*100),
        })))
    }, [SegData])

    console.log(filteredData)

    return (
        <>
        <div className="flex flex-row">
            <span className="text-4xl"><b>{title}</b></span>
        </div>

        {focus &&
        <div className="pt-3">
            <SegTable focus={focus} idlevel={idlevel} namelevel={namelevel}/>
        </div>
        }

        <div className="flex flex-row py-3">
            <span className="text-4xl">Comparison {level()} for {title}</span>
        </div>

        <div>
            <span>Use the sliders below to filter the data or search for specific {level()}. Select comparison {level()} to see their changes in exposure over time</span>
        </div>

        <div className="pt-3">
            <Comparison id={id} grade={grade} filteredData={filteredData} idlevel={idlevel} namelevel={namelevel} table={table}/>
        </div>  
        </>
    )
}