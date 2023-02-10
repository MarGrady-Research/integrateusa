import React, { useRef, useState, useEffect } from "react";
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
)


export default function ScrollerLine({d15ExposureWhite}) {

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                position: 'right',
                min:0,
                max: .5,
                grid: {
                    display: false
                }
            }
        },
    }

    const labels = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
                    2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]

    const data = {
        labels,
        datasets: [
            {label: 'District 15',
            data: d15ExposureWhite,
            borderColor:  'rgb(255, 99, 132)',
            backgroundColor: 'rgb(255, 99, 132)'}
        ]
    }


    return (
        <Line options={options} data={data}/>
    )

}