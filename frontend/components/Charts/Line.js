import axios from 'axios';
import {Chart as ChartJS, LinearScale, LineElement, CategoryScale, Legend, PointElement, scaleService}  from 'chart.js'
import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import useLines from '/hooks/useLines.jsx';

ChartJS.register(
    LinearScale,
    LineElement,
    CategoryScale,
    Legend,
    PointElement
);

const LineChart = () => {

    const [chart, setChart] = useState([]);

    let baseURL = "http://localhost:8000/api/state/?state_abb=NY"

    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get(baseURL);
                setChart(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [baseURL])

    let gradeArray = ["g01", "g02", "g03"]

    let lines = useLines(gradeArray, chart)

    console.log(lines)

    const linedata = 
        {
            labels: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
            datasets: [{
                label: "Test",
                data: chart.map(x => x.seg_index_tot),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)'
                  ],
                  borderWidth: 1
            }] 
        }

    const options = {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }, 
        legend: {
            labels:{
                fontSize: 40
            }
        }
      } 

return(
    <div>
        <Line 
        data = {linedata}
        options = {options} 
        height = {400}
        width = {500}
        />
    </div>
)
}

export default LineChart