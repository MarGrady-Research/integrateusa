import React from "react";
import { VictoryPie } from "victory";

export default function PieChart ({InfoData}) {

    const groups = ["asian", "black", "hispanic", "other", "white"]

    const enrSum = (arr, group) => {
        return arr.reduce(function(a,b) {
            return a+b[group];
        }, 0);
    };

    const enrData = (arr) => {
        return  arr.map(item => {
            return ({
                group: item,
                enr: enrSum(InfoData, item)
            })
        });
    }

    const enrGroups = enrData(groups)
    const enrTotal = enrSum(InfoData, "tot_enr")

    const pie = (groups, total) => {
        return groups.map(e => {
            return ({
                x: e.group,
                y: Math.round((e.enr/total)*100)
            })
        })
    }

    const pieData = pie(enrGroups, enrTotal);

    return (
        <div>
        <VictoryPie
        animate = {{duration: 2000, easing: 'bounce'}}
        colorScale={["#FF5050", "#4472C4", "#FF9900", "#FFC000", "#339933"]}
        // standalone={true}
        width = {350}
        height={250}
        data={pieData}
        labels={() => null}
        // style={{width: '50%', height: "auto"}}
        />
        </div>
    )
}