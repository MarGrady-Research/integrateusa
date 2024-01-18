import React from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";

import Select from "components/atoms/Select";

import { yearsData } from "../../data";

import { selectLevel, selectYear, setYear } from "store/selectSlice";

import { Level } from "interfaces";

export default function YearSelect() {
  const level = useSelector(selectLevel);
  const year = useSelector(selectYear);
  const dispatch = useDispatch();

  const handleChange = (e: SelectChangeEvent) => {
    const value = parseInt(e.target.value as string);

    dispatch(setYear(value));
  };

  const selectedYear = yearsData.find((y) => y.value === year);
  const selectedValue = selectedYear.value.toString();

  const options = yearsData.map((o) => ({
    value: o.value.toString(),
    label: o.label,
    disabled: level == Level.County && o.value >= 2000 && o.value <= 2002,
  }));

  return (
    <Select
      id="year-select"
      value={selectedValue}
      label="Year"
      onChange={handleChange}
      options={options}
      full
    />
  );
}
