import React, { useRef, useState } from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";
import axios from "axios";
import { years } from "../SelectOptions";


export default function LineGraph ({selectedIds, grade}) {

    const lineref = useRef(null);

    const getLineData =  async (id) => {
        const response = await axios.get("http://localhost:8000/api/district/?grade=" + grade + "&dist_id=" + id);
        let data = response.data;

        const finaldata = data.map((e) => {
                return {
                    x: e.year,
                    y: e.norm_exp_aw,
                    label: e.dist_id
                }
            })

            lineref.current = (finaldata)

        }

    // selectedIds.map((e) => getLineData(e))

    getLineData(3620580);

    console.log(lineref.current); 

    const makeLines = () => { 
            return (
                <VictoryLine 
                style={{
                    data: { stroke: "#c43a31" },
                    parent: { border: "1px solid #ccc"},
                    labels: {display: "none"}
                }}
                data={lineref.current}
                />
            )}


     

    return(

        <div>
            <VictoryChart 
            width={1000}
            height={200}>

            {makeLines()}

            </VictoryChart>
        </div>

    )

}