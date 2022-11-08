import React from "react";
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);


export default function AreaChart({TrendData}) {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        },
        scales: {
            y: {
                stacked: true
            }
        }
    };

    let sortedData = TrendData.filter(e => e.grade === "All").sort((a,b) => {return ((a['year']-b['year']))})

    const labels = sortedData.map(e=>e.year)

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Asian',
                data: sortedData.map(e => e.asian),
                borderColor: "#FF5050",
                backgroundColor: "#FF5050",
            },
            {
                fill: true,
                label: 'Black',
                data: sortedData.map(e => e.black),
                borderColor: "#4472C4",
                backgroundColor: "#4472C4",
            },
            {
                fill: true,
                label: 'Hispanic',
                data: sortedData.map(e => e.hispanic),
                borderColor: "#FF9900",
                backgroundColor: "#FF9900",
            },
            {
                fill: true,
                label: 'Other',
                data: sortedData.map(e => e.other),
                borderColor: "#FFC000",
                backgroundColor: "#FFC000",
            },
            {
                fill: true,
                label: 'White',
                data: sortedData.map(e => e.white),
                borderColor: "#339933",
                backgroundColor: "#339933",
            },
            
        ]
    }

    return(

        <Line options={options} data={data}/>

    )


}