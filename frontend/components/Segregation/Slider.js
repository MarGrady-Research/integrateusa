import React from "react";

export default function Slider({min, max}) {


    return(

        <>
                <input
                    min={min}
                    max={max}
                    type="range"
                    className="form-range appearance-none w-full h-6 p-0 bg-gray-100 focus:outline-none focus:ring-0 focus:shadow-none"
                />
        </>
    )
}
