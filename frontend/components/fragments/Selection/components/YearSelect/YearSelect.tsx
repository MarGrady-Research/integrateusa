import React from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import { yearsData } from "../../data";
import {
  selectLevel,
  selectYear,
  setYear,
} from "../../../../../store/selectSlice";
import { Level } from "../../../../../interfaces";

export default function YearSelect() {
  const level = useSelector(selectLevel);
  const year = useSelector(selectYear);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setYear(e.value));
  };

  const selectedYear = yearsData.find((y) => y.value === year);

  return (
    <Select
      options={yearsData}
      onChange={handleChange}
      value={selectedYear}
      isOptionDisabled={(e) =>
        level == Level.County ? e.value >= 2000 && e.value <= 2002 : null
      }
      placeholder="Select a year"
      name="years"
      isSearchable={false}
    />
  );
}
