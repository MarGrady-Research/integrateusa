import React from "react";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)


export default function SummaryPie({renderedFeatures}) {


    const pieData = [((renderedFeatures.map(e => e.properties.as).reduce((a,b) => a+b, 0)/renderedFeatures.map(e => e.properties.tot_enr).reduce((a,b) => a+b, 0))*100),
                     ((renderedFeatures.map(e => e.properties.bl).reduce((a,b) => a+b, 0)/renderedFeatures.map(e => e.properties.tot_enr).reduce((a,b) => a+b, 0))*100),
                     ((renderedFeatures.map(e => e.properties.hi).reduce((a,b) => a+b, 0)/renderedFeatures.map(e => e.properties.tot_enr).reduce((a,b) => a+b, 0))*100),
                     ((renderedFeatures.map(e => e.properties.or).reduce((a,b) => a+b, 0)/renderedFeatures.map(e => e.properties.tot_enr).reduce((a,b) => a+b, 0))*100),
                     ((renderedFeatures.map(e => e.properties.wh).reduce((a,b) => a+b, 0)/renderedFeatures.map(e => e.properties.tot_enr).reduce((a,b) => a+b, 0))*100)
                    ]


    const options = {
        reponsive: true,
        plugins: {
            tooltip: {
                enabled: true,
                display: true,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.data[context.dataIndex];
                        return (data.labels[context.dataIndex] + ' ' + (label).toFixed(1) + '%');
                    }
                }
            },
            legend: {
                display: false
            }
        }
    }

    const data = {
        labels: ['Asian', 'Black', 'Hispanic', 'Other', 'White'],
        datasets: [
            {
                label: "Enrollment Share by Race",
                data: pieData,
                borderColor: ["#FF5050", "#4472C4", "#FF9900", "#FFC000", "#339933"],
                borderWidth: 1,
                backgroundColor: ["#FF5050", "#4472C4", "#FF9900", "#FFC000", "#339933"]
            }
        ]
    }

    return (
        <Pie 
        data={data}
        options={options}
        />
    )


}