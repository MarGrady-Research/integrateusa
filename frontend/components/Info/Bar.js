import React, { useState } from "react";
import { VictoryBar, VictoryStack, VictoryTooltip, VictoryBrushContainer, VictoryZoomContainer } from "victory";
import Select from 'react-select';
import Info from "./InfoTrends";


export default function BarChart({InfoData}) {

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
    const whiteData = bar(InfoData, "white");

    let groupData = [{label: "asian", data: asianData, fill: "#FF5050"}, 
                         {label: "black", data: blackData, fill: "#4472C4"}, 
                         {label: "hispanic", data: hispanicData, fill: "#FF9900"},
                         {label: "other", data: otherData, fill: "#FFC000"},
                         {label: "white", data: whiteData, fill: "#339933"}];

    const sortOptions = [
        {value: 0, label: "% Asian"},
        {value: 1, label: "% Black"},
        {value: 2, label: "% Hispanic"},
        {value: 3, label: "% Other"},
        {value: 4, label: "% White"},
    ]

    // const [sort, setSort] = useState()

    const sorting = () => {
        // if(sort != undefined) {

        // let data = groupData;

        // if (sort > -1) {
        // let obj = data[sort];
        // data.splice(sort, 1);
        // data.splice(0, 0, obj);
        // }

        // console.log(data);

        return groupData.map(e => {
            return (<VictoryBar 
            // animate={{duration: 2000, easing: 'bounce'}}
            style = {{ data: {fill: e.fill}}}
            data = {e.data}
            />
            );
            })
        }

    return(
        <div className="w-full">
        <div>
        {/* <Select 
        options={sortOptions}
        defaultValue={0}
        onChange={e => setSort(e.value)}
        /> */}
        </div>
        <div>
        <VictoryStack
        width={600}
        height={200}>
            {sorting()}
        </VictoryStack>
        </div>
        </div>
    )

}