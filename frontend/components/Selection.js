import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import {years, grades} from './SelectOptions';
import { handleInputChange } from 'react-select';

function Selection() {

  // Defining level state variable and levelselect array
  const [levels, setLevels] = useState(-1);

  const levelselect = [
    {value: 0, label: "District", route: "api/districtnames/?search="},
    {value: 1, label: "County", route: "api/countynames/?search="},
    {value: 2, label: "State", route: "api/statenames/?search="}
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
    console.log(inputValue)
  }

  // defining names state variable (array to hold name data)
  const [names, setNames] = useState([])

  // async function returning a promise for name data
  const nameOptions = async () => {
      if (input != undefined && input != '') {
        try {
          const response = await axios.get(baseURL + input);
          setNames(response.data);
          let nameOptions = names.map(d => ({
              "value": d.county_id,
              "label": d.county_name
            }
            ))
          return nameOptions
        }
        catch(error) {
          console.log(error)
        }
    }
  }


// Returning JSX
  return (
    <div className='relative w-full'>
      <div className='flex flex-row ml-20 mt-10'>
        <p className='text-3xl mt-100 mr-5'>Select a </p>
        <Select 
        options = {levelselect}
        placeholder = "Geographic Level"
        onChange= {e => {setLevels(e.value)}} 
        components={{IndicatorSeparator: () => null}}
        />
      </div>
      <div className='flex flex-row ml-20 mt-5'>
      {levels > -1 &&
        <>
        <AsyncSelect 
        cacheOptions
        defaultOptions
        loadOptions={nameOptions}
        onInputChange={handleInputChange}
        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
        placeholder= {"Type a " + levelselect[levels].label + " name"}
        /> 
        <Select 
        options={years}
        placeholder="Select a year"
        name='years'
        className='ml-5'
        />
        <Select 
        options={grades}
        placeholder="Select a grade"
        isMulti
        name='grades'
        className='ml-5'
        />
      </>
      }
      </div>
      <div>
        
      </div>
    </div>
  );
};


export default Selection