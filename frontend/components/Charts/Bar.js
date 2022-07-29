import axios from 'axios';
import {Chart as ChartJS, LinearScale, BarElement, CategoryScale, Legend}  from 'chart.js'
import React, {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import Select from 'react-select';
import {StateOption, YearOption} from './Options';

ChartJS.register(
    LinearScale,
    BarElement,
    CategoryScale,
    Legend,
);

const BarChart = () => {

  // Select Component
    
    // mapping to 
    const selectoptions = StateOption.map(d => ({
      "value": d.abbreviation,
      "label": d.name
    }) 
    )  

    // Initializing state and year state variables
    const [state, setState] = useState();

    const [year, setYear] = useState();
 

    // Initializing chart state variable
    const [chart, setChart] = useState([]); 

    let baseURL = "http://localhost:8000/api/state/?"

    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get(baseURL + "year=" + year + "&state_abb=" + state);
                setChart(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [baseURL, state, year])

    const data = {
        labels: chart?.map(x => x.grade),
        datasets: [{
          label: year + " Segregation index totals",
          data: chart?.map(x => x.seg_index_tot), 
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgb(255, 99, 132)'],
          borderWidth: 1
        }]
    }

    const options = {
      responsive: true, 
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
      <Select 
        options={selectoptions}
        onChange={e => {setState(e.value)}}
        placeholder="Select a State"/>
      <Select 
        options={YearOption}
        onChange={e => {setYear(e.value)}}
        placeholder="Select a Year"/>
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