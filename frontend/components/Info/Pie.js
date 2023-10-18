import React from "react";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

export default function PieChart({filterData}) {

    console.log(filterData)

    const groups = ["asian", "black", "hispanic", "other", "white"]

    const enrSum = (arr, group) => {
        return arr.reduce(function(a,b) {
            return a+b[group];
        }, 0);
    };

    const enrData = (arr, total) => {
        return  arr.map(item => {
            return ({
                group: item,
                enr: Math.round((enrSum(filterData, item)/total)*100)
            })
        });
    }

    const enrTotal = enrSum(filterData, "tot_enr")
    const pieData = enrData(groups, enrTotal);


    const options = {
        reponsive: true,
        plugins: {
            tooltip: {
                enabled: true,
                display: true,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.data[context.dataIndex];
                        return (data.labels[context.dataIndex] + ' ' + label + '%');
                    }
                }
            },
        }
    }

    const data = {
        labels: ['Asian', 'Black', 'Hispanic', 'Other', 'White'],
        datasets: [
            {
                label: "Enrollment Share by Race",
                data: pieData.map(e => e.enr),
                borderColor: ["#FF5050", "#4472C4", "#FF9900", "#FFC000", "#339933"],
                borderWidth: 1,
                backgroundColor: ["#FF5050", "#4472C4", "#FF9900", "#FFC000", "#339933"]
            }
        ]
    }

    return (
        <Pie 
        data={data}
        options={options}
        />
    )

}

