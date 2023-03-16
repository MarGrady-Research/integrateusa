import React, {useState} from "react";
import AsyncSelect from 'react-select/async';
import axios from "axios";


export default function Search({radio, handleBounds}) {

    // Input state and function to handle inputs into state/county/district select
    const [input, setInput] = useState('');
    const handleInputChange = (inputValue) => setInput(inputValue)


    // Set URL to search for Counties/Districts/States
    const url = () => {
        if (radio.level === "District") {
            return "http://localhost:8000/" + "api/districtnames/?q="
        } else if (radio.level === "County") {
            return "http://localhost:8000/" + "api/countynames/?q="
        } else if (radio.level === "State") {
            return "http://localhost:8000/" + "api/statenames/?q="
        }
    };

    const loadOptions = async (input) => {
 
        if (input.length === 0) {
          return null;
        }
  
        const response = await axios.get(url() + input);
  
        const Options = await response.data.map(d => {
          if (radio.level === "District") {
            return {
            "value": d.dist_id,
            "label": d.dist_name,
            "lngmin": d.lngmin,
            "latmin":d.latmin,
            "lngmax": d.lngmax,
            "latmax":d.latmax,
            }
          }
          if(radio.level === "County") {
            return {
            "value": d.county_id,
            "label": d.county_name,
            "lngmin": d.lngmin,
            "latmin": d.latmin,
            "lngmax": d.lngmax,
            "latmax":d.latmax,
            }
          } if (radio.level === "State") {
            return {
            "value": d.state_abb,
            "label": d.state_name,
            "lngmin": d.lngmin,
            "latmin":d.latmin,
            "lngmax": d.lngmax,
            "latmax":d.latmax,
            }
          }
        })
  
        return Options;
    
      }

      return (

        <AsyncSelect 
        name='idselect'
        cacheOptions
        defaultOptions
        onChange={(e) => handleBounds(e)} 
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
        placeholder= {"Type a " + radio.level + " name"}
        className='pt-2'
        />

      )

}