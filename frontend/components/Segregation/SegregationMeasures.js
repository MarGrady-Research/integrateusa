import React, { useEffect, useState } from "react";
import SegTable from "./SegTable";
import Slider from "./Slider";
import Comparison from "./ComparisonTable";
import LineGraph from "./Line";

export default function Segregation({SegData, id, grade, title, compData}) {


    return (
        <>
        <div className="flex flex-row">
            <span className="text-4xl"><b>{title}</b></span>
        </div>

        <div className="pt-3">
            <SegTable SegData={SegData}/>
        </div>

        <div className="flex flex-row py-3">
            <span className="text-4xl">Comparison Districts for {title}</span>
        </div>

        <div>
            <span>Use the sliders below to filter the data or search for specific districts. Select up to 10 comparison districts and see their changes in exposure over time</span>
        </div>
        
        {/* <div className="flex flex-row justify-evenly py-3">
            <Slider />
        </div> */}

        <div  className="pt-3">
            <Comparison SegData={SegData} id={id} grade ={grade} compData={compData} itemsPerPage={10}/>
        </div>

       
        
        </>
    )
}