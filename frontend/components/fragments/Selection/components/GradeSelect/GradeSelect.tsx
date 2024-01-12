import React from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";

import Select from "components/atoms/Select";

import { gradesData } from "../../data";

import { selectGrade, setGrade } from "store/selectSlice";

export default function GradeSelect() {
  const grade = useSelector(selectGrade);
  const dispatch = useDispatch();

  const handleChange = (e: SelectChangeEvent) => {
    dispatch(setGrade(e.target.value as string));
  };

  const selectedGrade = gradesData.find((g) => g.value === grade);
  const selectedValue = selectedGrade.value;

  const options = gradesData.map((o) => ({
    value: o.value,
    label: o.label,
  }));

  return (
    <Select
      id="grade-select"
      value={selectedValue}
      label="Grade"
      onChange={handleChange}
      options={options}
      full
    />
  );
}
