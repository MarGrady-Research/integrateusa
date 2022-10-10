import React, { useEffect, useRef, useState } from "react";
import {Chart as ChartJS, LinearScale, BarElement, CategoryScale, Tooltip, Legend}  from 'chart.js'
import {Bar, getElementsAtEvent} from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import Select from 'react-select'
import { indexOf, toLower } from "lodash";

ChartJS.register(
    LinearScale,
    BarElement,
    CategoryScale,
    Tooltip,
    Legend,
    zoomPlugin,
);


export default function BarChart2({InfoData}) {

    const bar = (data, group) => {
        return data.map(e => (e[group]))
        }

    const [labels, setLabels] = useState(InfoData.map(e => e.nces_id))

    const [asianData, setAsianData] = useState(bar(InfoData, "prop_as"));
    const [blackData, setBlackData] = useState(bar(InfoData, "prop_bl"));
    const [hispanicData, setHispanicData] = useState(bar(InfoData, "prop_hi"));
    const [otherData, setOtherData] = useState(bar(InfoData, "prop_or"));
    const [whiteData, setWhiteData] = useState(bar(InfoData, "prop_wh"));

    const barData = [
        {
            label: 'Asian',
            id: "prop_as",
            data: asianData,
            backgroundColor: "#FF5050",
            // order: 0
        },
        {
            label: 'Black',
            id: "prop_bl",
            data: blackData,
            backgroundColor: "#4472C4",
            // order: 1
        },
        {
            label: 'Hispanic',
            id: "prop_hi",
            data: hispanicData,
            backgroundColor: "#FF9900",
            // order: 2
        },
        {
            label: 'Other',
            id: "prop_or",
            data: otherData,
            backgroundColor: "#FFC000",
            // order: 3
        },
        {
            label: 'White',
            id: "prop_wh",
            data: whiteData,
            backgroundColor: "#339933",
            // order: 0
        }
    ]
 
    const sortData = (group) => {

        barData.forEach(el => {
            if (el.id === group) {
                el.order = 0
            } else {
                el.order = 1
            }
        })

        let newdata = InfoData;
        newdata.sort((a, b) => {return ((a[group]) - (b[group]))});

        setLabels(newdata.map(e => e.nces_id))

        setAsianData(newdata.map(e => e.prop_as));
        setBlackData(newdata.map(e => e.prop_bl));
        setHispanicData(newdata.map(e => e.prop_hi));
        setOtherData(newdata.map(e => e.prop_or));
        setWhiteData(newdata.map(e => e.prop_wh));

        // let obj = barData.find(el => toLower(el.value) === group);
        // const pos = barData.map(e => toLower(e.value)).indexOf(group);
        // barData.splice(pos, 1);
        // barData.splice(0, 0, obj);

        console.log(barData)

        } 


    const chartRef = useRef();

    const handleClick = (event) => {
        const {current: chart} = chartRef;
        console.log(getElementsAtEvent(chart, event));
      }

    const sortOptions = [
        {value: "prop_as", label: "Asian"},
        {value: "prop_bl", label: "Black"},
        {value: "prop_hi", label: "Hispanic"},
        {value: "prop_or", label: "Other"},
        {value: "prop_wh", label: "White"}
    ]

    const data = {
        labels: labels,
        datasets: barData
    }

    const options = {
            plugins: {
                title: {
                    display: true,
                    text: "Race Breakdown by School"
                },
                tooltip: {
                    enabled: true,
                    display: true,
                },
                zoom: {
                    pan: {
                        enabled: true,  
                        mode: 'x'
                    },
                    zoom: {
                        wheel: {
                            enabled: true
                        },
                        pinch: {
                            enabled: true 
                        },
                        mode: 'x'
                    },
                    limits: {
                        y: {min: 0, max: 150}
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
                    max: 1,
                }
            }
        }


    return(
        <>
        <Select
        placeholder={"Sort by..."}
        options = {sortOptions}
        onChange={e => sortData(e.value)}
        />
        <Bar  
        ref={chartRef}
        data={data}
        options={options}
        onClick={handleClick}/>
        </>
    )

};

