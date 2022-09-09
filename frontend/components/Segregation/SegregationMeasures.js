import React from "react";


export default function Segregation ({segData, selectedname}) {

    console.log(selectedname);

    let currentname = selectedname

    return (
        <>
        <div className="flex flex-row">
            <span className="text-4xl"><b>{currentname}</b></span>
        </div>
        </>
    )
}