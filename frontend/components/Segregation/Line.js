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


export default function LineGraph ({linedata, id}) {

    const options = {
        responsive: true,
        maintainAspectRatio:false,
        plugins: {
            legend: {
                position: 'top',
            }
        },
        scales: {
            y: {
                position: 'right',
                min:0,
                max: 1
            }
        }
    }

    const labels = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
                    2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
    
    const makeLines = () => { 
        return linedata.map((e) => {
                return (
                    {
                    label: e.name,
                    data: e.data.map(e =>e.seg),
                    borderColor:  e.id === id ? 'rgb(255, 99, 132)' : 'rgb(169, 169, 169)',
                    backgroundColor:  e.id === id ? 'rgb(255, 99, 132)' : 'rgb(169, 169, 169)'
                    }  
                )     
        })
    }

    const data = {
        labels,
        datasets: 
            makeLines()
    }

    useEffect(() => {
         makeLines();
    }, [linedata, makeLines])


    return(

        <div>
           <Line options={options} data={data} className='w-full h-full'/>
        </div>

    )

}