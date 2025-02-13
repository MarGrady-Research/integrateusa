import React from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { Level } from "interfaces";

import Select from "components/atoms/Select";

import { levelSelectData } from "../../data";

interface Props {
  omitSchools?: boolean;
  level: Level;
  handleLevelChange: (l: Level) => void;
  labelPrefix?: string;
}

export default function LevelSelect({
  omitSchools,
  level,
  handleLevelChange,
  labelPrefix,
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
      value={selectedValue}
      labelPrefix={labelPrefix}
      label="Level"
      onChange={handleChange}
      options={options}
      full
    />
  );
}
