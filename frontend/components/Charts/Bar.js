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
    
    // mapping State options array to another array in a format that react-select likes 
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

  // useEffect hook -- after page load, get data from API endpoint using values of state and year State variables
    useEffect(() => {
        async function getData() {
          if (year !== undefined && state !== undefined) {
            try {
                const response = await axios.get(baseURL + "year=" + year + "&state_abb=" + state);
                setChart(response.data)
            } catch (error) {
                console.log(error)
            }
          }
        }
        getData()
    }, [baseURL, state, year])

  // Defining data object as per chartJS convention
    const data = {
        labels: chart?.map(x => x.grade),
        datasets: [{
          label: year + " Asian-White Normalized Exposure totals",
          data: chart?.map(x => x.norm_exp_aw), 
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgb(255, 99, 132)'],
          borderWidth: 1
        }]
    }

  // Defining options object as per chartJS convention
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

// Returning JSX
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