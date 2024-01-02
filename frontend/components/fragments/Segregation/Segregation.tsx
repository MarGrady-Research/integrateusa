import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { SelectChangeEvent } from "@mui/material";

import SegBar from "./components/Bar";
import Info from "./components/Info";
import ComparisonTable from "./components/ComparisonTable";

import {
  selectId,
  selectGrade,
  selectYear,
  selectSelectedName,
  selectLevel,
} from "../../../store/selectSlice";

import { SegData } from "../../../interfaces";

interface Props {
  segData: SegData;
  isLoading: boolean;
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

const defaultOption = options[1];

const findFocus = (segData: SegData, id: string) => {
  let idLevel: string;

  if (id.length === 7) {
    idLevel = "dist_id";
  } else if (id.length === 5) {
    idLevel = "county_id";
  } else {
    idLevel = "state_abb";
  }

  const posIdx = segData.findIndex((d) => d[idLevel] && d[idLevel] === id);

  if (posIdx != -1) {
    return segData[posIdx];
  }

  return null;
};

export default function Segregation({ segData, isLoading }: Props) {
  const grade = useSelector(selectGrade);
  const year = useSelector(selectYear);
  const id = useSelector(selectId);
  const name = useSelector(selectSelectedName);
  const level = useSelector(selectLevel);

  const [selected, setSelected] = useState(defaultOption);

  const handleChange = (e: SelectChangeEvent) => {
    const selectedValue = e.target.value;

    const option = options.find((o) => o.value === selectedValue);

    if (option) {
      setSelected(option);
    }
  };

  const measure = useMemo(
    () => ({
      name: `${selected.label} Normalized Exposure`,
      accessor: selected.value,
    }),
    [selected]
  );

  let idLevel: string;
  let nameLevel: string;
  let table: string;

  if (id.length === 7) {
    idLevel = "dist_id";
    nameLevel = "dist_name";
    table = "district";
  } else if (id.length === 5) {
    idLevel = "county_id";
    nameLevel = "county_name";
    table = "county";
  } else {
    idLevel = "state_abb";
    nameLevel = "state_abb";
    table = "state";
  }

  const focus = useMemo(() => findFocus(segData, id), [segData, id]);

  return (
    <>
      <h1 className="text-4xl font-bold mb-5">{name}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-y-0 lg:gap-x-5 mb-10">
        <Info
          focus={focus}
          selected={selected}
          handleChange={handleChange}
          options={options}
          title={name}
          isLoading={isLoading}
          year={year}
          grade={grade}
        />
        <SegBar focus={focus} isLoading={isLoading} />
      </div>
      <ComparisonTable
        id={id}
        name={name}
        grade={grade}
        level={level}
        segData={segData}
        measure={measure}
        year={year}
        isLoading={isLoading}
      />
    </>
  );
}
