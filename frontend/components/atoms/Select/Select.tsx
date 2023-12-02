import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (e: SelectChangeEvent) => void;
  options: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
}
export default function SelectComponent({
  id,
  label,
  value,
  onChange,
  options,
}: Props) {
  const inputLabel = `${id}-label`;

  const selectOptions = options.map((o) => (
    <MenuItem key={o.value} value={o.value.toString()} disabled={o.disabled}>
      {o.label}
    </MenuItem>
  ));

  return (
    <FormControl fullWidth>
      <InputLabel id={inputLabel}>{label}</InputLabel>
      <Select
        labelId={inputLabel}
        id={id}
        value={value}
        label={label}
        onChange={onChange}
        classes={{
          select: "!py-2",
        }}
      >
        {selectOptions}
      </Select>
    </FormControl>
  );
}
