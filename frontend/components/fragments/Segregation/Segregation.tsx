import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";

import Comparison from "./components/ComparisonTable";
import SegBar from "./components/Bar";

import {
  selectId,
  selectGrade,
  selectSelectedName,
} from "../../../store/selectSlice";

import { SegData } from "../../../interfaces";

interface Props {
  segData: SegData;
  year: number;
}

const options = [
  {
    value: "norm_exp_as",
    label: "Asian",
    iso: "exp_as_as",
    non: "exp_non_as_as",
  },
  {
    value: "norm_exp_bl",
    label: "Black",
    iso: "exp_bl_bl",
    non: "exp_non_bl_bl",
  },
  {
    value: "norm_exp_hi",
    label: "Hispanic",
    iso: "exp_hi_hi",
    non: "exp_non_hi_hi",
  },
  {
    value: "norm_exp_or",
    label: "Other Race",
    iso: "exp_or_or",
    non: "exp_non_or_or",
  },
  {
    value: "norm_exp_wh",
    label: "White",
    iso: "exp_wh_wh",
    non: "exp_non_wh_wh",
  },
];

const defaultOption = options[2];

const findFocus = (segData: SegData, idLevel: string, strID: string) => {
  const posIdx = segData.findIndex((d) => d[idLevel] && d[idLevel] === strID);

  if (posIdx != -1) {
    return segData[posIdx];
  }

  return null;
};

export default function Segregation({ segData, year }: Props) {
  const grade = useSelector(selectGrade);
  const id = useSelector(selectId);
  const title = useSelector(selectSelectedName);

  const [selected, setSelected] = useState(defaultOption);

  let idLevel: string;
  let nameLevel: string;
  let table: string;

  const strID = id.toString();

  if (strID.length === 7) {
    idLevel = "dist_id";
    nameLevel = "dist_name";
    table = "district";
  } else if (strID.length === 5) {
    idLevel = "county_id";
    nameLevel = "county_name";
    table = "county";
  } else {
    idLevel = "state_abb";
    nameLevel = "state_abb";
    table = "state";
  }

  const [focus, setFocus] = useState(findFocus(segData, idLevel, strID));

  const maxSchools = Math.max(...segData.map((e) => e["num_schools"]));

  const measure = {
    name: `${selected.label} Normalized Exposure`,
    accessor: selected.value,
  };

  useEffect(() => {
    setFocus(findFocus(segData, idLevel, strID));
  }, [segData, idLevel, strID]);

  if (!focus) {
    return null;
  }

  return (
    <>
      <h1 className="text-4xl font-bold mb-5">{title}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-5 mb-10">
        <div className="text-justify text-md lg:text-xl">
          <p className="mb-4 lg:mb-6">
            We can measure segregation by comparing the makeup of schools
            attended by students in different racial groups.
          </p>
          <p className="mb-4 lg:mb-6">
            The typical{" "}
            <Select
              options={options}
              defaultValue={options[2]}
              onChange={(e) => setSelected(e)}
              components={{ IndicatorSeparator: () => null }}
              isSearchable={false}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  boxShadow: "none",
                  border: state.isFocused && "none",
                }),
              }}
              className="inline-flex"
            />{" "}
            student in {title} attends a school that is{" "}
            <b>
              {focus[selected.iso].toFixed(1)}% {selected.label}
            </b>
            .
          </p>
          <p className="mb-4 lg:mb-6">
            The typical non-{selected.label} student attends a school that is{" "}
            <b>
              {focus[selected.non].toFixed(1)}% {selected.label}
            </b>
            .
          </p>
          <p className="mb-4 lg:mb-6">
            The difference between these two numbers,{" "}
            <b>{focus[selected.value].toFixed(1)}%</b> is a measure of
            segregation for <b>{selected.label}</b> students.
          </p>
        </div>
        <div>
          <SegBar focus={focus} />
        </div>
      </div>
      <Comparison
        id={id}
        grade={grade}
        segData={segData}
        idLevel={idLevel}
        nameLevel={nameLevel}
        table={table}
        measure={measure}
        maxSchools={maxSchools}
        year={year}
      />
    </>
  );
}
