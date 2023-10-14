import React, { useEffect, useState } from "react";
import Comparison from "./ComparisonTable";
import SegBar from "./Bar";
import Select from 'react-select';
import {grades} from "../Select/SelectOptions.js"

export default function Segregation({SegData, id, grade, title, measure, handleMeasure}) {

    // variables to hold query info
    let idlevel;
    let namelevel;
    let table;

    // Find the max number of schools in the dataset
    let maxschools = Math.max(...SegData.map(e => e["num_schools"]));

    // Set variables based on id level
    const name = () => {
        let strID = ''+id; 

        if (strID.length === 7) {
            idlevel = "dist_id"
            namelevel = "dist_name";
            table = "district";
        } else if (strID.length === 5) {
            idlevel = "county_id";
            namelevel = "county_name";
            table = "county";
        } else {
            idlevel = "state_abb";
            namelevel = "state_abb";
            table = "state";
        }}
    
    
    // Function to find data of selected area
    const findFocus = () => {
        name();
        let pos = SegData.map(e => e[idlevel]).indexOf(''+id);
        return SegData[pos];
    }

     // State variable for selected area
     const [focus, setFocus] = useState(findFocus());

    // Find data on selected district once page has been loaded
    useEffect(() => {
        setFocus(findFocus);
    }, [SegData])

    // State variable for selected racial group
    const [selected, setSelected] = useState({value: 'norm_exp_bl', label: 'Black', iso: 'exp_bl_bl', non: 'exp_non_bl_bl'});

    // Options for Race selection:
    const options = [
        {value: 'norm_exp_as', label: 'Asian', iso: 'exp_as_as', non: 'exp_non_as_as'},
        {value: 'norm_exp_bl', label: 'Black', iso: 'exp_bl_bl', non: 'exp_non_bl_bl'},
        {value: 'norm_exp_hi', label: 'Hispanic', iso: 'exp_hi_hi', non: 'exp_non_hi_hi'},
        {value: 'norm_exp_or', label: 'Other Race', iso: 'exp_or_or', non: 'exp_non_or_or'},
        {value: 'norm_exp_wh', label: 'White', iso: 'exp_wh_wh', non: 'exp_non_wh_wh'}
    ]
    
    // Use effect to update normalized exposure for selected group
    useEffect(() => {
        const selectedGroup = {name: `${selected.label} Normalized Exposure`, accessor: selected.value}
        handleMeasure(selectedGroup)
    }, [selected])

    console.log(grades)
    console.log(grade)

    return (

        <>

        <div className="flex flex-row">
            <span className="text-4xl"><b>{title}</b></span>
        </div>
    
        <div className="flex flex-row justify-between pt-3">

            <div className="text-xl flex flex-col justify-between text-justify text-sm ">
                <br></br>
                <span>We can measure segregation by comparing the makeup of schools attended by students in different racial groups.</span>
                <br/>
                <span>The typical <Select options={options} 
                                          defaultValue={{value: 'norm_exp_bl', label: 'Black', iso: 'exp_bl_bl', non: 'exp_non_bl_bl'}} 
                                          onChange={e => setSelected(e)} 
                                          components={{IndicatorSeparator: () => null}} 
                                          isSearchable={false} 
                                          styles={{
                                            control: (provided, state) => ({
                                              ...provided,
                                              boxShadow: "none",
                                              border: state.isFocused && "none"
                                            })}}
                                          className="inline-flex" /> student in {title} attends a school that is <b>{(focus[selected.iso]).toFixed(1)}% {selected.label}</b>.</span>
                <br/>
                <span>The typical non-{selected.label} student attends a school that is <b>{(focus[selected.non]).toFixed(1)}% {selected.label}</b>.</span>
                <br/>
                <span>The difference between these two numbers, <b>{(focus[selected.value]).toFixed(1)}%</b> is a measure of segregation for <b>{selected.label}</b> students.</span>
                <br/>
            </div>

            <div className="h-200 w-1/2">
                <SegBar focus={focus}/>
            </div>

        </div>

        <div className="pt-3 container">
            <Comparison id={id} grade={grade} segData={SegData} idlevel={idlevel} namelevel={namelevel} table={table} measure={measure} maxschools={maxschools}/>
        </div> 

        </>
    )
}