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
            data: [focus.exp_as_as, focus.exp_bl_as, focus.exp_hi_as, focus.exp_or_as, focus.exp_wh_as],
            backgroundColor: "#FF5050",
        },
        {
            label: 'Black',
            id: 'bl',
            data: [focus.exp_as_bl, focus.exp_bl_bl, focus.exp_hi_bl, focus.exp_or_bl, focus.exp_wh_bl],
            backgroundColor: "#4472C4",
        },
        {
            label: 'Hispanic',
            id: 'hi',
            data: [focus.exp_as_hi, focus.exp_bl_hi, focus.exp_hi_hi, focus.exp_or_hi, focus.exp_wh_hi],
            backgroundColor: "#FF9900",
        },
        {
            label: 'Other',
            id: 'or',
            data: [focus.exp_as_or, focus.exp_bl_or, focus.exp_hi_or, focus.exp_or_or, focus.exp_wh_or],
            backgroundColor: "#FFC000",
        },
        {
            label: 'White',
            id: 'wh',
            data: [focus.exp_as_wh, focus.exp_bl_wh, focus.exp_hi_wh, focus.exp_or_wh, focus.exp_wh_wh],
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