import React from "react";

export default function Slider() {

    const groups = ["asian", "black", "hispanic", "other", "white"];

    const sliders = (arr) => {
        return arr.map( (e) => {
            return (
                <div className="relative pt-1" key={e}>
                <label htmlFor={`${e}Range`} className="form-label">% {e}</label>
                <input
                    max={100}
                    type="range"
                    className="
                    form-range
                    appearance-none
                    w-full
                    h-6
                    p-0
                    bg-gray-100
                    focus:outline-none focus:ring-0 focus:shadow-none
                    "
                    id={`${e}Range`}
                />
                </div>
            )
        })
    }

    return(
        sliders(groups)
    )
}
