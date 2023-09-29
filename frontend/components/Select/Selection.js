import React, { useState, useEffect, useLayoutEffect, useCallback} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import {years, grades} from './SelectOptions';
import Info from '../Info/Info';
import Segregation from '../Segregation/Segregation';
import Trends from '../Trends/Trends';
import { Loader } from '../Loader';
import Accordion from './Accordion';
import SelectSlideover from './SelectSlideover';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

export default function Selection() {

  // adding in NextJS router for conditionally rendering different pages in return statement
  const router = useRouter()
  const currentpath = router.pathname

  // ***** Section below sets State variables to manage API queries and data for both the Info and Segregation pages *****

  // Defining level state variable and levelselect array
  const [levels, setLevels] = useState(0);

  const levelselect = [
    {value: 0, label: "District", route:  "api/districtnames/?q=", id: "dist_id", name: "dist_name"},
    {value: 1, label: "County", route: "api/countynames/?q=", id: "county_id", name: "county_name"},
    {value: 2, label: "State", route: "api/statenames/?q=", id: "state_abb", name: "state_name"},
    {value: 3, label: "School", route: "api/schoolnames/?q=", id: "nces_id", name: "sch_name"}
  ]

  // Measure state variable and handleMeasure function to pass to Accordion
  const [measure, setMeasure] = useState({})
  const handleMeasure = (e) => setMeasure(e)

  // Input state and function to handle inputs into state/county/district select
  const [input, setInput] = useState('');
  const handleInputChange = (inputValue) => setInput(inputValue)

  // ID state
  const [id, setID] = useState(3620580);

  // Initialize variable to hold ID before click
  // const [tempID, setTempID] = useState();

  // Grade state
  const gradelevel = () => currentpath === '/segregation' ? '01': 'All'
  const [grade, setGrade] = useState(gradelevel)

  // Year state 

  // Get max year from array
  let currentYear = Math.max(...years.map(e=>e.value));
  let currentYearLabel = years.filter(e => e.value === currentYear)[0]["label"];

  // Set state
  const [year, setYear] = useState(currentYear);

  // Selected Name state
  const [selectedname, setSelectedName] = useState(); 

  // Bounds for map
  const [bounds, setBounds] = useState([[-74.25609, 40.496094], [-73.70017, 40.915276]]);

  // Alt district variable
  const [alt, setAlt] = useState(false);

  // Click state
  const [clicked, setClicked] = useState(false);

  // Title State
  const [title, setTitle] = useState("New York City Public Schools (NY)");

  // For all pages: state to hold loading state
  const [isLoading, setIsLoading] = useState(true);

  // Info data state 
  const [infoData, setInfoData] = useState([]);

  // Trend data state
  const [trendData, setTrendData] = useState([]);

  // Segregation state data
  const [segData, setSegData] = useState([]);

  // ***** End of State variables ******

   const Alt = useCallback(async () => {
    setAlt(!alt)
   }, [])

   useEffect(() => {
     setURL()
   }, [alt])

  
  // Setting URL based on level
  const setURL = () => {
    if (alt === true && levels === 0) {
      return "https://integrateusa.org/" + "api/districtnamesalt/?q="
    } else {
      return "https://integrateusa.org/" + levelselect[levels].route
    }
  }

  // async function returning a promise for name data
  const loadOptions = async (input) => {
 
      if (input.length === 0) {
        return null;
      }

      const response = await axios.get(setURL() + input);

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
        } if (levels === 3) {
          return {
          "value": d.nces_id,
          "label": d.sch_name,
          "lngmin": d.lngmin,
          "latmin":d.latmin,
          "lngmax": d.lngmax,
          "latmax":d.latmax,
          }
        }
        })

      return Options;
  
    }


  //  function to set name, ID, and bounds on district/county/state change
  const nameIdBounds = e => {
    setID(e.value); // JLM was setTempID but changed due to double-click requirement
    setSelectedName(e.label);
    setBounds([[e.lngmin, e.latmin], [e.lngmax, e.latmax]])
  };

  const getTrendData = async () => {

    if (id != undefined) {

      let table;
      
      if (levels === 0) {
        table = 'districttrends';
      } else if (levels === 1) {
        table = 'countytrends';
      } else if (levels === 2) {
        table = 'statetrends';
      } else if (levels === 3) {
        table = 'schools'
      }

      const response = await axios.get("https://integrateusa.org/api/" + table + "/?" + levelselect[levels].id + "=" + id);
      setTrendData(response.data);

      }
    };

  // function to get data for info page (also calls TrendData function)
  const getInfoData = async () => {

    if (year != undefined && grade != undefined && id != undefined) {
      setIsLoading(true);
      const response = await axios.get("https://integrateusa.org/api/schools/?year=" + year + "&grade=" + grade + "&" + levelselect[levels].id + "=" + id);
      setInfoData(response.data);
      getTrendData();
      trendData && setIsLoading(false);
    }

    };

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

      const response = await axios.get("https://integrateusa.org/api/" + idlevel + "/?year=" + year + "&grade=" + grade);
      setSegData(response.data);
      setIsLoading(false);
    }
  };

  // useEffect on load
  useEffect(() => {
    if (currentpath === '/info') {
      // let data = getInfoData(year, grade, id, levels);
      getInfoData();
      // setIsLoading(false);
    } else if (currentpath === '/segregation') { 
      getSegData();
    }
  }, [])

  // useEffect wrapper for getData functions on different pages 
  useEffect( () => {
    let canceled = false
    if (clicked != canceled) {
      // setID(tempID);
      if (currentpath === '/info') {
        getInfoData();
      } else if (currentpath === '/segregation') { 
        getSegData();
      }
      setTitle(selectedname);
      setInput('');
    }
    setClicked(false);
  }, [clicked])

  return (
    <div className='absolute w-full h-full'>
    <div className='relative container mx-auto p-5 h-full'>
      <div className='relative flex flex-row mx-auto justify-between w-full'>
       
        <div className='flex flex-row'>

          <Select 
          options = {levelselect}
          placeholder = "Geographic Level"
          defaultValue={{label: 'District', value: 0}}
          onChange= {e => {setLevels(e.value)}} 
          components={{IndicatorSeparator: () => null}}
          className="pr-2"
          isSearchable={false}
          />

          <AsyncSelect 
          name='idselect'
          cacheOptions
          defaultOptions
          defaultValue={{label: "New York City Public Schools (NY)", value: 3620580}}
          onChange={nameIdBounds} 
          loadOptions={loadOptions}
          onInputChange={handleInputChange}
          components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
          placeholder= {"Type a " + levelselect[levels].label + " name"}
          className='pr-2 flex-none w-72'
          /> 

          {//{currentpath === '/info' &&
          <Select 
          options={years}
          onChange={e => setYear(e.value)}
          defaultValue={{label: currentYearLabel, value: currentYear}} 
          isOptionDisabled={(e) => levels == 1 ? e.value >= 2000 && e.value <= 2002 : null}
          placeholder="Select a year"
          name='years'
          className='pr-2'
          isSearchable={false}
          />
          }

          <Select 
          options={grades}
          onChange={e => setGrade(e.value)}
          defaultValue={() => { if (currentpath === '/segregation') {return {label: 'Grade 1', value: '01'}} else { return {label: 'All Grades', value: 'All'}}}}
          isOptionDisabled={(e) => currentpath === '/segregation' ? e.value === 'All' : null}
          placeholder="Select a grade"
          name='grades'
          className='pr-4'
          />
         
         <button onClick={() => setClicked(!clicked)} className='btn px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center'>
            <MagnifyingGlassIcon className='h-4 w-4'/>
          </button>
          
        </div> 
        
        <div className=''>
        <SelectSlideover/>
        </div>

      </div>

      {/* Conditionally render the Info page once the data has been returned */}

      {currentpath === '/info' && (isLoading ? <div className='pt-5'><Loader /></div> :
      <div className='mx-auto mt-5'>
      <Info InfoData={infoData} title={title} id={id} bounds={bounds} grade={grade} year={year}/>
      <Trends TrendData={trendData} id={id} grade={grade} title={title}/>
      </div>)
      }

      {/* Conditionally render the Segregation page once the data has been returned */}

      {currentpath === '/segregation' && (isLoading ? <div className='pt-5'><Loader /></div> :
      <div className='mx-auto mt-5'>
      <Segregation SegData={segData} id={id} grade={grade} title={title} measure={measure} handleMeasure={handleMeasure}/>
      </div>)
      }

    </div>
    </div>
  );
};