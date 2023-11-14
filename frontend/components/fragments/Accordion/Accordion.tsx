import { Disclosure, Transition, RadioGroup } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function Accordion({ handleMeasure, currentpath }) {
  const exposure = [
    {
      name: "Asian Normalized Exposure",
      accessor: "norm_exp_as",
      group: "Asian",
    },
    {
      name: "Black Normalized Exposure",
      accessor: "norm_exp_bl",
      group: "Black",
    },
    {
      name: "Hispanic Normalized Exposure",
      accessor: "norm_exp_hi",
      group: "Hispanic",
    },
    {
      name: "Other Race Race Normalized Exposure",
      accessor: "norm_exp_or",
      group: "Other Race",
    },
    {
      name: "White Normalized Exposure",
      accessor: "norm_exp_wh",
      group: "White",
    },
    {
      name: "Asian/White Normalized Exposure",
      accessor: "norm_exp_aw",
      group: "Asian and White",
    },
  ];

  const measures = [
    {
      name: "Exposure Rate",
      desc: "The share of students of one racial group enrolled in the average school attended by students of another (or the same) racial group",
    },
    {
      name: "Normalized Exposure",
      desc: "Calculates the difference in the exposure rates for two groups of students to the same group of students",
    },
    {
      name: "Segregation Index",
      desc: "The average percentage point difference between the proportion of a group of students in a school and that same proportion in the school's district (or county, etc.)",
    },
    {
      name: "Dissimilarity Index",
      desc: "The share of students of one group who would have to switch schools to have an even balance of students across a district (or county, etc.)",
    },
  ];

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
    );
  }

  function ExposureRadio() {
    const [selected, setSelected] = useState(exposure[4]);

    return (
      <div className="w-full px-4 py-3">
        <div className="w-full">
          <RadioGroup value={selected.name} onChange={setSelected}>
            <RadioGroup.Label className="sr-only">
              Normalized Exposure
            </RadioGroup.Label>
            <div className="grid grid-cols-4 w-full gap-2 mx-auto overflow-x-hidden ">
              {exposure.map((exposure) => (
                <RadioGroup.Option
                  key={exposure.accessor}
                  // id={exposure.accessor}
                  value={exposure.name}
                  onClick={() => handleMeasure(exposure)}
                  className={({ active, checked }) =>
                    `${
                      active
                        ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                        : ""
                    }
                        ${
                          checked
                            ? "bg-sky-900 bg-opacity-75 text-white"
                            : "bg-white"
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
                                checked ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {exposure.name}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className={`inline ${
                                checked ? "text-sky-100" : "text-gray-500"
                              }`}
                            >
                              <span>
                                Compare Exposure rates of {exposure.group} and
                                non-{exposure.group} students
                              </span>
                            </RadioGroup.Description>
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
    );
  }

  function MeasureRadio() {
    const [selected, setSelected] = useState(measures[1]);

    return (
      <div className="w-full px-4 py-3">
        <div className="w-full">
          <RadioGroup value={selected.name} onChange={setSelected}>
            <RadioGroup.Label className="sr-only">
              Segregation Measures
            </RadioGroup.Label>
            <div className="grid grid-cols-3 w-full gap-2">
              {measures.map((measure) => (
                <RadioGroup.Option
                  key={measure.name}
                  value={measure.name}
                  className={({ active, checked }) =>
                    `${
                      active
                        ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                        : ""
                    }
                        ${
                          checked
                            ? "bg-sky-900 bg-opacity-75 text-white"
                            : "bg-white"
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
                                checked ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {measure.name}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className={`inline ${
                                checked ? "text-sky-100" : "text-gray-500"
                              }`}
                            >
                              <span>{measure.desc}</span>
                            </RadioGroup.Description>
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
    );
  }

  return (
    <div className="pt-2">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="font-raleway inline-flex justify-between bg-transparent hover:bg-gray-500 text-black hover:text-white py-2 px-2 border border-gray-300 hover:border-transparent rounded">
              Options + Info
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-black`}
              />
            </Disclosure.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="text-black font-raleway pt-2">
                <div className="space-y-2 bg-gray-100 rounded-md">
                  <div className="text-xl font-semibold px-4">
                    <span>District</span>
                  </div>
                  <span className="px-4">
                    <input type="checkbox" disabled={true} />
                    NYC as 32 School Districts
                  </span>
                  {currentpath === "/segregation" && (
                    <>
                      <div>
                        <span className="text-xl font-semibold px-4">
                          Segregation Measures
                        </span>
                      </div>
                      {MeasureRadio()}
                      <div>
                        <span className="text-xl font-semibold px-4">
                          Groups
                        </span>
                      </div>
                      {ExposureRadio()}
                    </>
                  )}
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}
