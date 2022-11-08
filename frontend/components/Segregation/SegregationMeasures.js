import React, { useEffect, useState } from "react";
import SegTable from "./SegTable";
import Comparison from "./ComparisonTable";

export default function Segregation({SegData, id, grade, title}) {

    let strID = ''+id;

    const name = () => {
        if (strID.length === 7) {
            return "dist_name"
        } else if (strID.length === 5) {
            return "county_name"
        } else {
            return "state_name"
        }}
    
    
    const findFocus = () => {
        let pos = SegData.map(e => e.dist_id).indexOf(''+id);
        return SegData[pos];
    }
 
    const [focus, setFocus] = useState(findFocus());
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFocus(findFocus);
        let filter = SegData.filter(e => e.dist_id !== ''+id)
        setFilteredData(filter)
    }, [SegData])

    return (
        <>
        <div className="flex flex-row">
            <span className="text-4xl"><b>{title}</b></span>
        </div>

        {focus &&
        <div className="pt-3">
            <SegTable focus={focus} id ={id}/>
        </div>
        }

        <div className="flex flex-row py-3">
            <span className="text-4xl">Comparison Districts for {title}</span>
        </div>

        <div>
            <span>Use the sliders below to filter the data or search for specific districts. Select up to 10 comparison districts and see their changes in exposure over time</span>
        </div>

        <div className="pt-3">
            <Comparison id={id} grade={grade} filteredData={filteredData}/>
        </div>  
        </>
    )
}