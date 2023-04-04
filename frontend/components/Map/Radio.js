import { RadioGroup } from '@headlessui/react';
import {ChevronUpIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

export default function Radio() {


    const areas = [
        {name: "No Boundary"},
        {name: "District"},
        {name: "County"},
        {name: "State"}
    ]

    function CheckIcon(props) {
        return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
            <path
            d="M7 13l3 3 7-7"
            stroke="#fff"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            />
        </svg>
        )
    }

    function AreaRadio() {
        const [selected, setSelected] = useState(areas[0])
    
        return (
        <div className="w-full px-4 py-3">
            <div className="w-full">
            <RadioGroup value={selected.name} onChange={setSelected}>
                <RadioGroup.Label className="sr-only">Normalized Exposure</RadioGroup.Label>
                <div className="grid grid-cols-1 w-full gap-2 mx-auto overflow-x-hidden ">
                {areas.map((area) => (
                    <RadioGroup.Option
                    // key={exposure.accessor}
                    value={area.name}
                    // onClick={() => handleMeasure(area)}
                    className={({ active, checked }) =>
                        `${
                        active
                            ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                            : ''
                        }
                        ${
                        checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                        }
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                    }
                    >
                    {({ active, checked }) => (
                        <>
                        <div className="flex w-full items-center justify-between">
                            <div className="flex items-center">
                            <div className="text-sm">
                                <RadioGroup.Label
                                as="p"
                                className={`font-medium  ${
                                    checked ? 'text-white' : 'text-gray-900'
                                }`}
                                >
                                {area.name}
                                </RadioGroup.Label>
                                {/* <RadioGroup.Description
                                as="span"
                                className={`inline ${
                                    checked ? 'text-sky-100' : 'text-gray-500'
                                }`}
                                >
                                <span>
                                    Compare Exposure rates of  and non- students
                                </span>
                                </RadioGroup.Description> */}
                            </div>
                            </div>
                            {checked && (
                            <div className="shrink-0 text-white">
                                <CheckIcon className="h-6 w-6" />
                            </div>
                            )} 
                        </div>
                        </>
                    )}
                    </RadioGroup.Option>
                ))}
                </div>
            </RadioGroup>
            </div>
        </div>
        )
    }


    return (

        <AreaRadio />

    )


}