import React from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import { yearsData } from "../../data";
import {
  selectLevels,
  selectYear,
  setYear,
} from "../../../../../store/selectSlice";

export default function YearSelect() {
  const levels = useSelector(selectLevels);
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
        levels == 1 ? e.value >= 2000 && e.value <= 2002 : null
      }
      placeholder="Select a year"
      name="years"
      className="pr-2"
      isSearchable={false}
    />
  );
}
