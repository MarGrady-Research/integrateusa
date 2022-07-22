import axios from 'axios';
import {Chart as ChartJS, LinearScale, BarElement, CategoryScale, Legend}  from 'chart.js'
import React, {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2'

ChartJS.register(
    LinearScale,
    BarElement,
    CategoryScale,
    Legend,
);

const BarChart = () => {

    const [chart, setChart] = useState([]);

    let baseURL = "http://localhost:8000/api/state/?state_abb=NY&year=2020"

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

    const data = {
        labels: chart?.map(x => x.grade),
        datasets: [{
          label: "Test",
          data: chart?.map(x => x.seg_index_tot), 
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
        <Bar 
        data = {data}
        options = {options} 
        height = {400}
        width = {500}
        />
    </div>
)
}

export default BarChart