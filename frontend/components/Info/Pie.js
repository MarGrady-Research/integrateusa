import React from "react";
import { VictoryPie } from "victory";

export default function PieChart ({enrGroups, enrTotal}) {


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