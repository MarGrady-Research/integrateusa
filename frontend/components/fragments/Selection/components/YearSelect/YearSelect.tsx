import React from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";

import { selectLevel, selectYear, setYear } from "store/selectSlice";
import { AppDispatch } from "store/store";

import { Level } from "interfaces";

import Select from "components/atoms/Select";

import { yearsData } from "../../data";

interface Props {
  labelPrefix?: string;
}

export default function YearSelect({ labelPrefix }: Props) {
  const level = useSelector(selectLevel);
  const year = useSelector(selectYear);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: SelectChangeEvent) => {
    const value = parseInt(e.target.value as string);

    dispatch(setYear(value));
  };

  const selectedYear = yearsData.find((y) => y.value === year);
  const selectedValue = selectedYear?.value.toString() || "";

  const options = yearsData.map((o) => ({
    value: o.value.toString(),
    label: o.label,
    disabled: level == Level.County && o.value >= 2000 && o.value <= 2002,
  }));

  return (
    <Select
      value={selectedValue}
      labelPrefix={labelPrefix}
      label="Year"
      onChange={handleChange}
      options={options}
      full
    />
  );
}
