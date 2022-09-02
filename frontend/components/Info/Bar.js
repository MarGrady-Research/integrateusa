import React from "react";
import { VictoryBar, VictoryStack } from "victory";
import Info from "./InfoTrends";


export default function BarChart({InfoData}) {

    // "pct_as" = "#FF5050", "pct_bl" = "#4472C4", "pct_hi" = "#FF9900","pct_or" =  "#FFC000", "pct_wh" = "#339933"

    const bar = (data, group) => {
        return data.map(e => {
            return ({
                x: e.nces_id,
                y: Math.round((e[group]/e.tot_enr)*100)
            })
        })
    }

    const asianData = bar(InfoData, "asian");
    const blackData = bar(InfoData, "black");
    const hispanicData = bar(InfoData, "hispanic");
    const otherData = bar(InfoData, "other");
    const whiteData = bar(InfoData, "white")

    console.log()

    return(
        <div className="w-full">
        <VictoryStack
        width={500}
        height={200}>
            <VictoryBar 
                style={{ data: {fill: "#FF5050"} }}
                data = {asianData}/>
            <VictoryBar 
                style={{ data: {fill: "#4472C4"} }}
                data = {blackData}/>
            <VictoryBar 
                style={{ data: {fill: "#FF9900"} }}
                data = {hispanicData}/>
            <VictoryBar 
                style={{ data: {fill: "#FFC000"} }}
                data = {otherData}/>
            <VictoryBar 
                style={{ data: {fill: "#339933"} }}
                data = {whiteData}/>
        </VictoryStack>
        </div>
    )

}