import React, { useEffect, useState } from "react";
import SegTable from "./SegTable";
import Comparison from "./ComparisonTable";

export default function Segregation({SegData, id, grade, title}) {

    const findDistrict = () => {
        let pos = SegData.map(e => e.dist_id).indexOf(id);
        return SegData[pos];
    }

    const [district, setDistrict] = useState(findDistrict);
    // const [selectedID, setSelectedID] = useState(id);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setDistrict(findDistrict);
        let filter = SegData.filter(e => e.dist_id !== id)
        setFilteredData(filter)
    }, [SegData])


    // useEffect(() => {
    //     setSelectedID(district.dist_id)
    // }, [district])

    // console.log(selectedID)

    return (
        <>
        <div className="flex flex-row">
            <span className="text-4xl"><b>{title}</b></span>
        </div>

        <div className="pt-3">
            <SegTable district={district}/>
        </div>

        <div className="flex flex-row py-3">
            <span className="text-4xl">Comparison Districts for {title}</span>
        </div>

        <div>
            <span>Use the sliders below to filter the data or search for specific districts. Select up to 10 comparison districts and see their changes in exposure over time</span>
        </div>

        <div  className="pt-3">
            <Comparison id={id} grade={grade} filteredData={filteredData}/>
        </div>

       
        
        </>
    )
}