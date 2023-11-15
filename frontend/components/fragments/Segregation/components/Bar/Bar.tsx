import React from "react";
import {Chart as ChartJS, LinearScale, BarElement, CategoryScale, Tooltip, Legend}  from 'chart.js'
import {Bar} from 'react-chartjs-2';

ChartJS.register(
    LinearScale,
    BarElement,
    CategoryScale,
    Tooltip,
    Legend,
);


export default function SegBar({focus}) {

    const labels = ['Asian', 'Black', 'Hispanic', 'Other Races', 'White'];

    const dataset = [
        {
            label: 'Asian',
            id: 'as',
            data: [focus.exp_as_as/100, focus.exp_bl_as/100, focus.exp_hi_as/100, focus.exp_or_as/100, focus.exp_wh_as/100],
            backgroundColor: "#FF5050",
        },
        {
            label: 'Black',
            id: 'bl',
            data: [focus.exp_as_bl/100, focus.exp_bl_bl/100, focus.exp_hi_bl/100, focus.exp_or_bl/100, focus.exp_wh_bl/100],
            backgroundColor: "#4472C4",
        },
        {
            label: 'Hispanic',
            id: 'hi',
            data: [focus.exp_as_hi/100, focus.exp_bl_hi/100, focus.exp_hi_hi/100, focus.exp_or_hi/100, focus.exp_wh_hi/100],
            backgroundColor: "#FF9900",
        },
        {
            label: 'Other',
            id: 'or',
            data: [focus.exp_as_or/100, focus.exp_bl_or/100, focus.exp_hi_or/100, focus.exp_or_or/100, focus.exp_wh_or/100],
            backgroundColor: "#FFC000",
        },
        {
            label: 'White',
            id: 'wh',
            data: [focus.exp_as_wh/100, focus.exp_bl_wh/100, focus.exp_hi_wh/100, focus.exp_or_wh/100, focus.exp_wh_wh/100],
            backgroundColor: "#339933",
        }
    ]

    const data = {
        labels: labels,
        datasets: dataset
    }

    const options = {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    display: true,
                    callbacks: {
                        label: function(context) {
                            let label = (context.dataset.data[context.dataIndex]*100).toFixed(1);
                            return (context.dataset.label + ' ' + label + '%');
                        }
                    }
                }
            },
            scales: {
                x: {
                    // ticks: false,
                    display: true,
                    grid: {
                        display: false
                    },
                    stacked: true,
                    barPercentage: 1
                },
                y: {
                    grid: {
                        display: false
                    },
                    stacked: true,
                    max: 1,
                    position: 'right'
                }
            }
        }

    return (

        <Bar options={options} data={data}/>
    )

}