import React, { useEffect, useRef, useState } from "react";
import {Chart as ChartJS, LinearScale, BarElement, CategoryScale, Tooltip}  from 'chart.js'
import {Bar} from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
    LinearScale,
    BarElement,
    CategoryScale,
    Tooltip,
    annotationPlugin
);


export default function ScrollerBar({schooldata}) {

    const bar = (data, group) => {
        return data.map(e => (e[group]))
        }

    const labels = schooldata.map(e => e.sch_name)

    const barData = [
        {
            label: 'White',
            id: "prop_wh",
            data: bar(schooldata, 'prop_wh'),
            backgroundColor: "#339933",
        },
        {
            label: 'Asian',
            id: "prop_as",
            data: bar(schooldata, 'prop_as'),
            backgroundColor: "#FF5050",
        },
        {
            label: 'Black',
            id: "prop_bl",
            data: bar(schooldata, 'prop_bl'),
            backgroundColor: "#4472C4",
        },
        {
            label: 'Hispanic',
            id: "prop_hi",
            data: bar(schooldata, 'prop_hi'),
            backgroundColor: "#FF9900",
        },
        {
            label: 'Other',
            id: "prop_or",
            data: bar(schooldata, 'prop_or'),
            backgroundColor: "#FFC000",
        },
    ]

    const data = {
        labels: labels,
        datasets: barData
    }

    const options = {
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    display: true,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.data[context.dataIndex];
                            return (context.dataset.label + ' ' + label + '%');
                        }
                    }
                },
            },
            responsive: true,
            scales: {
                x: {
                    ticks: false,
                    display: false,
                    stacked: true,
                    barPercentage: 1
                },
                y: {
                    stacked: true,
                    max: 100,
                    grid: {
                        display: false
                    },
                    position: 'right'
                }
            },
        }

    return(

        <Bar
        data={data}
        options={options}/>

    )

}