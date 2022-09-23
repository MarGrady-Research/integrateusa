import React, { useRef, useState, useEffect } from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";
import axios from "axios";
import { years } from "../SelectOptions";


export default function LineGraph ({linedata}) {

    
    const makeLines = () => { 
        { linedata.length >0 &&
        linedata.map((e) => {
                console.log(e);
                return (
                    <VictoryLine 
                    style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc"},
                        labels: {display: "none"}
                    }}
                    data={e.data}
                    />
            )}
        )}
    }

    console.log(linedata[0].data)

    useEffect(() => {
         makeLines();
    }, [linedata])


    return(

        <div>
            <VictoryChart 
            width={1000}
            height={400}>

            {/* {makeLines()} */}

            </VictoryChart>
        </div>

    )

}