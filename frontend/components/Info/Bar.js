import React, { useEffect, useRef, useState } from "react";
import {Chart as ChartJS, LinearScale, BarElement, CategoryScale, Tooltip, Legend}  from 'chart.js'
import {Bar} from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import Select from 'react-select';

ChartJS.register(
    LinearScale,
    BarElement,
    CategoryScale,
    Tooltip,
    Legend,
    zoomPlugin,
);


export default function BarChart({InfoData}) {

    const bar = (data, group) => {
        return data.map(e => (e[group]))
        }

    const [labels, setLabels] = useState(InfoData.map(e => e.sch_name))

    const [asianData, setAsianData] = useState(bar(InfoData, "prop_as"));
    const [blackData, setBlackData] = useState(bar(InfoData, "prop_bl"));
    const [hispanicData, setHispanicData] = useState(bar(InfoData, "prop_hi"));
    const [otherData, setOtherData] = useState(bar(InfoData, "prop_or"));
    const [whiteData, setWhiteData] = useState(bar(InfoData, "prop_wh"));

    const [asianOrder, setAsianOrder] = useState(0);
    const [blackOrder, setBlackOrder] = useState(1);
    const [hispanicOrder, setHispanicOrder] = useState(1);
    const [otherOrder, setOtherOrder] = useState(1);
    const [whiteOrder, setWhiteOrder] = useState(1);

    const barData = [
        {
            label: 'Asian',
            id: "prop_as",
            data: asianData,
            backgroundColor: "#FF5050",
            order: asianOrder
        },
        {
            label: 'Black',
            id: "prop_bl",
            data: blackData,
            backgroundColor: "#4472C4",
            order: blackOrder
        },
        {
            label: 'Hispanic',
            id: "prop_hi",
            data: hispanicData,
            backgroundColor: "#FF9900",
            order: hispanicOrder
        },
        {
            label: 'Other',
            id: "prop_or",
            data: otherData,
            backgroundColor: "#FFC000",
            order: otherOrder
        },
        {
            label: 'White',
            id: "prop_wh",
            data: whiteData,
            backgroundColor: "#339933",
            order: whiteOrder
        }
    ]
 
    const sortData = (group) => {

        let newdata = InfoData;
        newdata.sort((a, b) => {return ((a[group]) - (b[group]))});

        setLabels(newdata.map(e => e.sch_name))

        setAsianData(newdata.map(e => e.prop_as));
        setBlackData(newdata.map(e => e.prop_bl));
        setHispanicData(newdata.map(e => e.prop_hi));
        setOtherData(newdata.map(e => e.prop_or));
        setWhiteData(newdata.map(e => e.prop_wh));

        group === 'prop_as' ? setAsianOrder(0) : setAsianOrder(1)
        group === 'prop_bl' ? setBlackOrder(0) : setBlackOrder(1)
        group === 'prop_hi' ? setHispanicOrder(0) : setHispanicOrder(1)
        group === 'prop_or' ? setOtherOrder(0) : setOtherOrder(1)
        group === 'prop_wh' ? setWhiteOrder(0) : setWhiteOrder(1)

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
                    max: 100,
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
        data={data}
        options={options}/>
        </>
    )

};

