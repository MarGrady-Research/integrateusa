import React, { useRef, useState, useEffect } from "react";
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import {Line} from 'react-chartjs-2';
import axios from "axios";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
)


export default function LineGraph ({linedata}) {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        },
        scales: {
            y: {
                min:0,
                max: 1
            }
        }
    }

    const labels = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
                    2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
    
    const makeLines = () => { 
        // { linedata.length >0 &&
        return linedata.map((e) => {
                return (
                    {
                    label: e.name,
                    data: e.data,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }  
                )     
        })
    }

    const data = {
        labels,
        datasets: 
            makeLines()
        
    }

    console.log(data.datasets)

    useEffect(() => {
         makeLines();
    }, [linedata])


    return(

        <div>
           <Line options={options} data={data} />
        </div>

    )

}