import React from "react";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

/* 100% Bar Chart */
export default function BarChart100({TrendData, grade}) {

    let sortedData = TrendData.filter(e => e.grade === grade).sort((a,b) => {return ((a['year']-b['year']))})

    const labels = sortedData.map(e=>e.year)

    /* create bar chart */
    const data = {
        labels,
        datasets: [
            {
                label: 'Asian',
                data: sortedData.map(e => e.prop_as),
                backgroundColor: "#FF5050",
            },
            {
                label: 'Black',
                data: sortedData.map(e => e.prop_bl),
                backgroundColor: "#4472C4",
            },
            {
                label: 'Hispanic',
                data: sortedData.map(e => e.prop_hi),
                backgroundColor: "#FF9900",
            },
            {
                label: 'Other',
                data: sortedData.map(e => e.prop_ot),
                backgroundColor: "#FFC000",
            },
            {
                label: 'White',
                data: sortedData.map(e => e.prop_wh),
                backgroundColor: "#339933",
            },
            
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        },
        scales: {
            y: {
                min: 0,
                max: 100,
                stacked: true
            },
            x: {
                stacked: true
            }
        }
    };

    return(

        <Bar options={options} data={data}/>

    )

}