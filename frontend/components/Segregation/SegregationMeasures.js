import React from "react";
import SegTable from "./SegTable";


export default function Segregation({SegData, title}) {

    console.log(SegData);

    return (
        <>
        <div className="flex flex-row">
            <span className="text-4xl"><b>{title}</b></span>
        </div>
        <div className="pt-3">
            <SegTable SegData={SegData}/>
        </div>
        </>
    )
}