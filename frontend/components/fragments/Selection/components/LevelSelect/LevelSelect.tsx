import React from "react";
import { SelectChangeEvent } from "@mui/material/Select";

import Select from "../../../../atoms/Select";

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
  const handleChange = (e: SelectChangeEvent) => {
    const value = parseInt(e.target.value as string);
    handleLevelChange(value);
  };

  const data = omitSchools
    ? levelSelectData.filter((d) => d.label != "School")
    : levelSelectData;

  const selectedLevel = data.find((l) => l.value === level);
  const selectedValue = selectedLevel?.value.toString() || "";

  const options = data.map((o) => ({
    value: o.value.toString(),
    label: o.label,
  }));

  return (
    <Select
      id="level-select"
      value={selectedValue}
      label="Level"
      onChange={handleChange}
      options={options}
    />
  );
}
