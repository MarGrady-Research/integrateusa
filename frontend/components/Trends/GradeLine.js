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
    Legend,
)

export default function GradeLines ({TrendData}) {

    const grades = ["PK", "KG", "01", "02", "03", "04", "05", "06", "07", "08" ,"09", "10", "11", "12"]



    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        },
        scales: {
            y: {
                position: 'right'
            }
        }
    }

    const labels = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
                    2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]


    const makeLines = () => { 
                return grades.map(el => {return ({
                    label: el,
                    data:  TrendData.filter(e => e.grade === el).map((e) => e.asian + e.black + e.hispanic + e.other + e.white),
                    borderColor:  'rgb(255, 99, 132)',
                    backgroundColor:  'rgb(255, 99, 132)'})
            } 
        )}


    const data = {
        labels,
        datasets: makeLines()
    }


    return (
        <>
        {TrendData &&
        <Line options={options} data={data}/> 
        }
        </>
    )



}