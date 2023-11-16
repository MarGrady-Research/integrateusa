import React, { useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import { gradesData } from "../../data";
import { selectGrade, setGrade } from "../../../../../store/selectSlice";

export default function GradeSelect() {
  const grade = useSelector(selectGrade);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setGrade(e.value));
  };

  const selectedGrade = gradesData.find((g) => g.value === grade);

  return (
    <Select
      options={gradesData}
      onChange={handleChange}
      value={selectedGrade}
      placeholder="Select a grade"
      name="grades"
    />
  );
}
