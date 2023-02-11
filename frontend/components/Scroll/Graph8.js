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

export default function ScrollerLine4({compDataNormalized}) {

    const ids = ["0300000", "0400680", "0506330", "0601332", "0606810", "0620250", "0636840", "1500000",
    "1713710", "2012990", "2400480", "2513230", "4814280", "4815000", "4824060", "4825170",
    "4827300", "4837020", "4841100", "5103130"]

    const lines = () => {
        return ids.map(id => {
            return (
                {
                    label: 'test',
                    data: compDataNormalized.filter(e => e.dist_id_alt === id).map(e => e.norm_exp_wh_19),
                    borderColor:  id === '1500000' ? 'rgb(255, 99, 132)' : 'rgb(169, 169, 169)',
                    backgroundColor:  id ==='1500000' ? 'rgb(255, 99, 132)' : 'rgb(169, 169, 169)' 
                }
            )
        })
    }

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
                min:-0.2,
                max: 0.2,
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
                yMin: -.2,
                yMax: 0.12,
                borderColor: '#000000',
                borderDash: [3, 4],
                borderCapStyle: 'round',
                borderWidth: 2
            },
            label1: {
                type: 'label',
                xValue: 9,
                yValue: 0.15,
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
        datasets: lines()
    }


    return (
        <Line options={options} data={data}/>
    )

}