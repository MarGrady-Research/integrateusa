import React from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import { selectLevels, setLevels } from "../../../../../store/selectSlice";

import { levelSelectData } from "../../data";

export default function LevelSelect() {
  const levels = useSelector(selectLevels);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setLevels(e.value));
  };

  const selectedLevel = levelSelectData.find((l) => l.value === levels);

  return (
    <Select
      options={levelSelectData}
      placeholder="Geographic Level"
      value={selectedLevel}
      onChange={handleChange}
      components={{ IndicatorSeparator: () => null }}
      className="pr-2"
      isSearchable={false}
    />
  );
}
