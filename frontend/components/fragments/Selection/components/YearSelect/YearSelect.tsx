import React from "react";
import Select from "react-select";
import { useSelector } from "react-redux";

import { yearsData } from "../../data";
import { selectLevel } from "../../../../../store/selectSlice";
import { Level } from "../../../../../interfaces";

interface Props {
  year: number;
  handleYearChange: (y: number) => void;
}

export default function YearSelect({ year, handleYearChange }: Props) {
  const level = useSelector(selectLevel);

  const handleChange = (e) => {
    handleYearChange(e.value);
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
