import React from "react";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)


export default function MapPie({clickInfo}) {


    const pieData = [clickInfo.feature.properties.as/clickInfo.feature.properties.tot_enr, 
                     clickInfo.feature.properties.bl/clickInfo.feature.properties.tot_enr, 
                     clickInfo.feature.properties.hi/clickInfo.feature.properties.tot_enr, 
                     clickInfo.feature.properties.or/clickInfo.feature.properties.tot_enr, 
                     clickInfo.feature.properties.wh/clickInfo.feature.properties.tot_enr]

    const options = {
        reponsive: true,
        plugins: {
            tooltip: {
                enabled: true,
                display: true,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.data[context.dataIndex];
                        return (data.labels[context.dataIndex] + ' ' + Math.round(label*100) + '%');
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