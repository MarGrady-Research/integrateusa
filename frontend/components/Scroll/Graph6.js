import React, { useRef, useState, useEffect } from "react";
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import {Line} from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    annotationPlugin
)

export default function ScrollerLine2({d15ExposureWhite}) {

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
        annotations: {
            line1: {
                type: 'line',
                xMin: 9,
                xMax: 9,
                yMax: 0.42,
                borderColor: '#000000',
                borderDash: [3, 4],
                borderCapStyle: 'round',
                borderWidth: 2
            },
            label1: {
                type: 'label',
                xValue: 9,
                yValue: 0.45,
                //backgroundColor: 'rgba(245,245,245)',
                content: ['Integration Plan', 'Implemented'],
                font: {
                  size: 12
                }
            },
        }
    }

    const labels = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, ,]

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