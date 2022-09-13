import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import {years, grades} from './SelectOptions';
import { handleInputChange } from 'react-select';
import Info from './Info/InfoTrends';
import {useRouter} from 'next/router';
import Segregation from './Segregation/SegregationMeasures';

function Selection() {

  // adding in NextJS router for conditionally rendering different pages
  const router = useRouter()
  const currentpath = router.pathname

  // Defining level state variable and levelselect array
  const [levels, setLevels] = useState(-1);

  const levelselect = [
    {value: 0, label: "District", route: "api/districtnames/?search=", id: "dist_id", name: "dist_name"},
    {value: 1, label: "County", route: "api/countynames/?q=", id: "county_id", name: "county_name"},
    {value: 2, label: "State", route: "api/statenames/?search=", id: "state_abb", name: "state_name"}
  ]

  // Setting baseURL based on level
  const setURL = () => {
  if (levels > -1) {
    return "http://localhost:8000/" + levelselect[levels].route
    }
  }

  let baseURL = setURL()

  // defining input state
  const [input, setInput] = useState('')

  // Function to handle inputs into searchbox
  handleInputChange = (inputValue) => {
    setInput(inputValue);
  }

  // defining names state variable (array to hold name data)
  const [names, setNames] = useState([])

  // async function returning a promise for name data
  const nameOptions = async () => {

      if (input != undefined) {

        try {
          const response = await axios.get(baseURL + input);
          setNames(response.data);
          let nameOptions = names.map(d => {
            if (levels == 0) {
              return {
              "value": d.dist_id,
              "label": d.dist_name
              }
            }
            if(levels == 1) {
              return {
              "value": d.county_id,
              "label": d.county_name
              }
            } if (levels == 2) {
              return {
              "value": d.state_abb,
              "label": d.state_name
            }
          }
           })
          return nameOptions
        }

        catch(error) {
          console.log(error)
        }

      }
  }

  // Defining ID, year and grade state

  const [id, setID] = useState()

  const [grade, setGrade] = useState()

  const [year, setYear] = useState() 

  // State to hole selected name from dropdown 

  const [selectedname, setSelectedName] = useState(); 

  //  function to set both ID and name on change
  
  const nameandid = e => {
    setID(e.value)
    setSelectedName(e.label)
  };

  // Setting data state variable and get data promise

  const [data, setData] = useState([])

  // getData function to run on click of search button

  const getData = async () => {
    if (year != undefined && grade != undefined && id != undefined) {

      let idlevel = '';
      let table = '';
      
      if (levels === 0) {
        idlevel = "dist_id";
        table = (currentpath == '/segregation' ? 'district' : 'schools');
      } else if (levels === 1) {
        idlevel = "county_id";
        table = (currentpath == '/segregation' ? 'county' : 'schools');
      } else if (levels === 2) {
        idlevel = "state_abb";
        table = (currentpath == '/segregation' ? 'state' : 'schools');
      }

      try {
        const response = await axios.get("http://localhost:8000/api/" + table + "/?year=" + year + "&grade=" + grade + "&" + idlevel + "=" + id);
        setData(response.data);
        console.log(data);
      }

      catch(error) {
        console.log(error)
      }

    }
  }

// Returning JSX
  return (
    <div className='container mx-auto'>
      <div className='flex flex-row ml-20 mt-10'>
        <p className='text-3xl mt-100 mr-5'>Select a </p>
        <Select 
        options = {levelselect}
        placeholder = "Geographic Level"
        onChange= {e => {setLevels(e.value)}} 
        components={{IndicatorSeparator: () => null}}
        />
      </div>
      <div className='relative flex flex-row ml-20 mt-5'>
      {levels > -1 &&
        <>
        <AsyncSelect 
        // cacheOptions
        defaultOptions
        onChange={nameandid} 
        loadOptions={nameOptions}
        onInputChange={handleInputChange}
        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
        placeholder= {"Type a " + levelselect[levels].label + " name"}
        /> 
        <Select 
        options={years}
        onChange={e => setYear(e.value)}
        placeholder="Select a year"
        name='years'
        className='ml-5'
        />
        <Select 
        options={grades}
        onChange={e => setGrade(e.value)}

        placeholder="Select a grade"
        name='grades'
        className='ml-5'
        />
        <button onClick={getData} className='ml-5 bg-blue-500 p-2 rounded-md text-gray-50'>Search</button>
      </>
      }
      </div>
      {/* Conditionally render the Info div once the data array has been returned */}
      {currentpath == '/info' && data.length > 0 &&
      <div className='ml-20 mt-5'>
      <Info InfoData={data} selectedname = {selectedname}/>
      </div>
      }
      {/* Conditionally render the Segregation div once the data array has been returned */}
      {currentpath == '/segregation' && data.length >0 &&
      <div className='ml-20 mt-5'>
      <Segregation SegData={data} selectedname = {selectedname}/>
      </div>
      }
    </div>
  );
};

export default Selection