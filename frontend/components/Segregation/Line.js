import React, { useRef, useState, useEffect } from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";
import axios from "axios";
import { years } from "../SelectOptions";


export default function LineGraph ({linedata}) {

    
    const makeLines = () => { 
        // { linedata.length >0 &&
        // linedata.map((e) => {
                return (
                    <VictoryLine 
                    style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc"},
                        labels: {display: "none"}
                    }}
                    data={linedata.data}
                    />
            // )}
        )}
    // }

    // console.log(linedata[0].data)
    console.log(linedata);

    useEffect(() => {
         makeLines();
    }, [linedata])


    return(

        <div>
            <VictoryChart
            domain={{x: [2000, 2021], y: [0, 1]}} 
            width={1000}
            height={400}>

            {makeLines()}

            </VictoryChart>
        </div>

    )

}