import React, { useState } from "react";


export default function Control ({handleVisibility}) {

    const [radio, setRadio] = useState({level: "School"})

    const handleRadio = (evt) => {
        setRadio({level: evt.target.value})
    }

    const handleChange = (e) => {
        handleRadio(e);
        handleVisibility(e.target.value);
    }

    return(
        <div className="border border-gray-500">
        <p>Select a level to see the boundary layer:</p>
        <div className="flex flex-col p-3">
            <div>
            <label>
                School
                <input
                    type="radio"
                    name="School"
                    value="School"
                    checked={radio.level == "School"}
                    onChange={handleChange} 
                />
            </label>
            </div>
            <div>
            <label>
                District
                <input
                    type="radio"
                    name="District"
                    value="District"
                    checked={radio.level == "District"}
                    onChange={handleChange} 
                />
            </label>
            </div>
            <div>
            <label>
            County
            <input
                type="radio"
                name="County"
                value="County"
                checked={radio.level == "County"}
                onChange={handleChange} 
            />
            </label>
            </div>
            <div>
            <label>
            State
            <input
                type="radio"
                name="State"
                value="State"
                checked={radio.level == "State"}
                onChange={handleChange} 
            />
            </label>
            </div>
        </div>
        </div>
    )
  
}