import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

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
  const selectedValue = selectedLevel.value.toString();

  const options = data.map((o) => (
    <MenuItem key={o.value} value={o.value.toString()}>
      {o.label}
    </MenuItem>
  ));

  return (
    <FormControl fullWidth>
      <InputLabel id="level-select-label">Level</InputLabel>
      <Select
        labelId="level-select-label"
        id="level-select"
        value={selectedValue}
        label="Level"
        onChange={handleChange}
        classes={{
          select: "!py-2",
        }}
      >
        {options}
      </Select>
    </FormControl>
  );
}
