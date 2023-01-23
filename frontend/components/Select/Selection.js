import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import {years, grades} from './SelectOptions';
import Info from '../Info/InfoTrends';
import Segregation from '../Segregation/SegregationMeasures';
import Trends from '../Trends/trendpage';
import { Loader } from '../Loader';

export default function Selection() {

  // adding in NextJS router for conditionally rendering different pages in return statement
  const router = useRouter()
  const currentpath = router.pathname

  // Defining level state variable and levelselect array
  const [levels, setLevels] = useState(0);

  const levelselect = [
    {value: 0, label: "District", route: "api/districtnames/?q=", id: "dist_id", name: "dist_name"},
    {value: 1, label: "County", route: "api/countynames/?q=", id: "county_id", name: "county_name"},
    {value: 2, label: "State", route: "api/statenames/?q=", id: "state_abb", name: "state_name"}
  ]

  // Setting baseURL based on level
  const setURL = () => {
    return "http://localhost/" + levelselect[levels].route
  }

  let baseURL = setURL(); 

  // defining input state
  const [input, setInput] = useState('');

  // Function to handle inputs into state/county/district select
 const handleInputChange = (inputValue) => {
    setInput(inputValue);
  }

  // async function returning a promise for name data
  const loadOptions = async (input) => {
 
      if (input.length === 0) {
        return null;
      }

      const response =  await axios.get(baseURL + input);

      const Options = await response.data.map(d => {
        if (levels == 0) {
          return {
          "value": d.dist_id,
          "label": d.dist_name,
          "lngmin": d.lngmin,
          "latmin":d.latmin,
          "lngmax": d.lngmax,
          "latmax":d.latmax,
          }
        }
        if(levels === 1) {
          return {
          "value": d.county_id,
          "label": d.county_name,
          "lngmin": d.lngmin,
          "latmin": d.latmin,
          "lngmax": d.lngmax,
          "latmax":d.latmax,
          }
        } if (levels === 2) {
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
  
  // Defining ID state
  const [id, setID] = useState(3620580)

  // Defining grade state
  const gradelevel = () => {
    if (currentpath === '/segregation') { 
      return 'PK'}
    else { return 'All'}
  }
  const [grade, setGrade] = useState(gradelevel)

  // Defining year state 
  const [year, setYear] = useState(2021) 

  // Defining state to hold selected name from dropdown 
  const [selectedname, setSelectedName] = useState(); 

  const [bounds, setBounds] = useState([[-74.25609, 40.496094], [-73.70017, 40.915276]]);

  //  function to set both ID and name on change
  const nameandid = e => {
    setID(e.value);
    setSelectedName(e.label);
    setBounds([[e.lngmin, e.latmin], [e.lngmax, e.latmax]])
  };

  // Initializing click and title state variables
  const [clicked, setClicked] = useState(false);

  const [title, setTitle] = useState("New York City Public Schools (NY)");

  // For all pages: state to hold loading state
  const [isLoading, setIsLoading] = useState(true);

  // State to hold trends data
  const [trendData, setTrendData] = useState([]);

  //  
  const getTrendData = async () => {

    if (id != undefined) {

      let idlevel;
      let table;
      
      if (levels === 0) {
        idlevel = "dist_id";
        table = 'districttrends';
      } else if (levels === 1) {
        idlevel = "county_id";
        table = 'countytrends';
      } else if (levels === 2) {
        idlevel = "state_abb";
        table = 'statetrends';
      }

      const response = await axios.get("http://localhost/api/" + table + "/?" + idlevel + "=" + id);
      setTrendData(response.data);

      }
    };

  // For info page: state to hold data 
  const [infoData, setInfoData] = useState([]);

  // function to get data for info page (also calls trend data function)
  const getInfoData = async () => {

    if (year != undefined && grade != undefined && id != undefined) {

      setIsLoading(true);

      let idlevel = '';
      
      if (levels === 0) {
        idlevel = "dist_id";
      } else if (levels === 1) {
        idlevel = "county_id";
      } else if (levels === 2) {
        idlevel = "state_abb";
      }

      const response = await axios.get("http://localhost/api/schools/?year=" + year + "&grade=" + grade + "&" + idlevel + "=" + id);
      setInfoData(response.data);
      getTrendData();
      trendData && setIsLoading(false);

      }
    };

  // For trends page, state to hold data
  const [segData, setSegData] = useState([]);

  // For segregation page, function to get the comparison data
  const getSegData = async () => {

    if (currentpath === '/segregation' && year != undefined && grade != undefined) {

      setIsLoading(true);

      let idlevel;

      if(levels === 0) {
          idlevel = "district"
      } 
      if (levels === 1) {
          idlevel = "county"
      }
      if (levels === 2) {
          idlevel = "state"
      }

      const response = await axios.get("http://localhost/api/" + idlevel + "/?year=" + year + "&grade=" + grade);
      setSegData(response.data);
      setIsLoading(false);

    }
  };

  // useEffect wrapper for getData functions on different pages 
  useEffect( () => {
    let canceled = false
    if (clicked != canceled) {
      if (currentpath === '/info') {
        getInfoData();
      } else if (currentpath === '/trends') {
        getTrendData();
      } else if (currentpath === '/segregation') { 
        getSegData();
      }
      setTitle(selectedname);
      setInput('');
    }
    setClicked(false);
  }, [clicked])

  useEffect(() => {
    if (currentpath === '/info') {
      getInfoData();
    } else if (currentpath === '/trends') {
      getTrendData();
    } else if (currentpath === '/segregation') { 
      getSegData();
    }
  }, [])

// Returning JSX
  return (
    <div className='container mx-auto p-5'>
      <div className='flex flex-wrap mx-auto'>
        <Select 
        options = {levelselect}
        placeholder = "Geographic Level"
        defaultValue={{label: 'District', value: 0}}
        onChange= {e => {setLevels(e.value)}} 
        components={{IndicatorSeparator: () => null}}
        className="pr-2"
        />
        <>
        <AsyncSelect 
        name='idselect'
        cacheOptions
        defaultOptions
        defaultValue={{label: "New York City Public Schools (NY)", value: 3620580}}
        onChange={nameandid} 
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
        placeholder= {"Type a " + levelselect[levels].label + " name"}
        className='pr-2'
        /> 
        {currentpath === '/info' &&
          <Select 
          options={years}
          onChange={e => setYear(e.value)}
          defaultValue={{label: 2021, value: 2021}}
          isOptionDisabled={(e) => levels == 1 ? e.value >= 2000 && e.value <= 2002 : null}
          placeholder="Select a year"
          name='years'
          className='flex pr-2'
          />
        }
        {currentpath !== '/trends' &&
          <Select 
          options={grades}
          onChange={e => setGrade(e.value)}
          defaultValue={() => { if (currentpath === '/segregation') {return {label: 'PK', value: 'PK'}} else { return {label: 'All', value: 'All'}}}}
          placeholder="Select a grade"
          name='grades'
          className='flex pr-4'
          />
        }
        <button onClick={() => setClicked(!clicked)} className='btn  px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center'>
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
        </button>
      </>
      </div>

      {/* Conditionally render the Info div once the data array has been returned */}
      {currentpath === '/info' && (isLoading ? <Loader /> :
      <div className='mx-auto mt-5'>
      <Info InfoData={infoData} title={title} id={id} bounds={bounds}/>
      <Trends TrendData={trendData} id={id} grade={grade} title={title}/>
      </div>)
      }
      {/* Conditionally render the Segregation div once the data array has been returned */}
      {currentpath === '/segregation' && (isLoading ? <Loader /> :
      <div className='mx-auto mt-5'>
      <Segregation SegData={segData} id={id} grade={grade} title={title}/>
      </div>)
      }

    </div>
  );
};