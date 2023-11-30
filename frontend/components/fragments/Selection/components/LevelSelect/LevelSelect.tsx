import React from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import { selectLevel, setLevel } from "../../../../../store/selectSlice";

import { levelSelectData } from "../../data";

interface Props {
  omitSchools?: boolean;
}

export default function LevelSelect({ omitSchools }: Props) {
  const level = useSelector(selectLevel);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setLevel(e.value));
  };

  const data = omitSchools
    ? levelSelectData.filter((d) => d.label != "School")
    : levelSelectData;

  const selectedLevel = data.find((l) => l.value === level);

  return (
    <Select
      options={data}
      placeholder="Geographic Level"
      value={selectedLevel}
      onChange={handleChange}
      components={{ IndicatorSeparator: () => null }}
      isSearchable={false}
    />
  );
}
