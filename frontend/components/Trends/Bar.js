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

/* Regular Bar Chart */
export default function BarChart({TrendData, grade}) {

    let sortedData = TrendData.filter(e => e.grade === grade).sort((a,b) => {return ((a['year']-b['year']))})

    const labels = sortedData.map(e=>e.year)

    /* create bar chart */
    const data = {
        labels,
        datasets: [
            {
                label: 'Asian',
                data: sortedData.map(e => e.asian),
                backgroundColor: "#FF5050",
            },
            {
                label: 'Black',
                data: sortedData.map(e => e.black),
                backgroundColor: "#4472C4",
            },
            {
                label: 'Hispanic',
                data: sortedData.map(e => e.hispanic),
                backgroundColor: "#FF9900",
            },
            {
                label: 'Other',
                data: sortedData.map(e => e.other),
                backgroundColor: "#FFC000",
            },
            {
                label: 'White',
                data: sortedData.map(e => e.white),
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

