import React from "react";
import Select from "react-select";

import { Level } from "../../../../../interfaces";

import { levelSelectData } from "../../data";

interface Props {
  omitSchools?: boolean;
  level: Level;
  handleLevelChange: (l: Level) => void;
}

export default function LevelSelect({
  omitSchools,
  level,
  handleLevelChange,
}: Props) {
  const handleChange = (e) => {
    handleLevelChange(e.value);
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
