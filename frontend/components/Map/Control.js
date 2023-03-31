import React, { useState } from "react";
import Search from "./Search";


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
                <span className='w-3 h-3 rounded-sm inline-block mr-2 p-1' key={el.color} style={{'backgroundColor': el.color}}></span>
                <span key={el.race}>{el.race}</span>
            </div>
        )
    })

    return(
        <div>

        <div className="flex flex-col w-full">
            <p className="text-lg text-gray-900 pb-2">Legend</p>
                <div className="text-left mx-auto">
                {legend()}
                </div>
        </div>

        <p className="text-lg pt-4 text-gray-900">Toggle Boundaries</p>
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

        <div className="pt-5">
        <Search radio={radio} handleBounds={handleBounds}/>
        </div>
        
        </div>
    )
  
}