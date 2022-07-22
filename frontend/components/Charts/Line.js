import axios from 'axios';
import {Chart as ChartJS, LinearScale, LineElement, CategoryScale, Legend, PointElement}  from 'chart.js'
import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2'

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
                console.log(response)
                setChart(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [baseURL])


    const linedata = 
        {
            labels: chart.map(x => x.year),
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