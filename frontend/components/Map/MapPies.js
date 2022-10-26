import React from "react";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)


export default function MapPie({clickInfo}) {


    const pieData = [clickInfo.prop_as, clickInfo.prop_bl, clickInfo.prop_hi, clickInfo.prop_or, clickInfo.prop_wh]

    const options = {
        reponsive: true,
        plugins: {
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