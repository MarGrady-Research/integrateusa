import React, { useState } from "react";
import Accordion from "./Disclosure.js";
import Search from "./Search";
import Radio from "./Radio.js";


export default function Control ({handleVisibility, handleBounds}) {

    // Radio Elements and functions
    const [radio, setRadio] = useState({level: "School"})

    const handleRadio = (evt) => {
        setRadio({level: evt.target.value})
    }

    const handleChange = (e) => {
        handleRadio(e);
        handleVisibility(e.target.value);
    }

    //  Legend elements and functions
    const race = [{race: "Asian", color: "#FF5050"}, 
                  {race: "Black", color:"#4472C4"}, 
                  {race: "Hispanic", color: "#FF9900"}, 
                  {race: "Other Races", color: "#FFC000"}, 
                  {race: "White", color: "#339933"}]

    const legend = () => race.map(el => {
        return(
            <div key={el.race}> 
                <span className='w-4 h-4 rounded-sm inline-flex items-center mr-2 p-1' key={el.color} style={{'backgroundColor': el.color}}></span>
                <span key={el.race} className="text-md">{el.race}</span>
            </div>
        )
    })

    const boundaries = () => {
        return (
        <>
            <div className="flex flex-col pt-2">
                <div className="mx-auto">
                <div className="p-1">
                <label>
                    <input
                        type="radio"
                        name="School"
                        value="School"
                        checked={radio.level === "School"}
                        onChange={handleChange} 
                    />
                    No Boundary
                </label>
                </div>
                <div className="p-1">
                <label>
                    <input
                        type="radio"
                        name="District"
                        value="District"
                        checked={radio.level === "District"}
                        onChange={handleChange} 
                    />
                    District
                </label>
                </div>
                <div className="p-1">
                <label>
                    <input
                        type="radio"
                        name="County"
                        value="County"
                        checked={radio.level === "County"}
                        onChange={handleChange} 
                    />
                    County
                </label>
                </div>
                <div className="p-1">
                <label>
                    <input
                        type="radio"
                        name="State"
                        value="State"
                        checked={radio.level === "State"}
                        onChange={handleChange} 
                    />
                    State
                </label>
                </div>
                </div>
            </div>
            {/* <Radio /> */}

            <div className="pt-5">
            <Search radio={radio} handleBounds={handleBounds}/>
            </div>
        </>
        )
    }

    return(
        <div>

        {/* <Accordion legend={legend} boundaries={boundaries} /> */}
        <div className="flex flex-col w-full">
            <p className="text-lg text-gray-900 pb-2">Legend</p>
                <div className="text-left">
                {legend()}
                </div>
        </div>

        <p className="text-lg pt-4 text-gray-900">Boundaries</p>
        {boundaries()}

        {/* <Radio/> */}
        
        </div>
    )
  
}