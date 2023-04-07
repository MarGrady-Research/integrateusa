import React from "react";
import { useState, useRef } from "react";
// import styles from '../styles/multiRangeSlider.css'

export default function Slider({min, max}) {

    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);

    const minValRef = useRef(null);
    const maxValRef = useRef(null);

    return(

        <>
                <input
                    min={min}
                    max={max}
                    // ref={minValRef}
                    onChange={(e) => {
                        const value = Math.min(+e.target.value, maxVal-1);
                        setMinVal(value);
                        e.target.value = value.toString();
                    }}
                    type="range"
                    className="z-10 pointer-events-none"
                />
                <input
                    min={min}
                    max={max}
                    ref={maxValRef}
                    onChange={(e) => {
                        const value = Math.max(+e.target.value, minVal+1);
                        setMaxVal(value);
                        e.target.value = value.toString();
                    }}
                    type="range"
                    className="z-20 pointer-events-none"
                />
                <div className="slider">
                    <div className=" " />
                    <div className="slider__range" />
                </div>
        </>
    )
}
