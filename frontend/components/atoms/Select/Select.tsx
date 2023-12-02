import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import clsx from "clsx";

// @ts-ignore
import { inputLabel } from "./Select.module.scss";

interface Props {
  id: string;
  label?: string;
  value: string;
  onChange: (e: SelectChangeEvent) => void;
  variant?: "filled" | "outlined" | "standard";
  options: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
  classes?: any;
  menuItemClasses?: any;
}

export default function SelectComponent({
  id,
  label,
  value,
  onChange,
  options,
  variant = "outlined",
  classes,
}: Props) {
  const inputLabelId = `${id}-label`;

  const selectOptions = options.map((o) => (
    <MenuItem key={o.value} value={o.value.toString()} disabled={o.disabled}>
      {o.label}
    </MenuItem>
  ));

  const emptyInput = value === "";

  return (
    <FormControl variant={variant}>
      {label && (
        <InputLabel
          id={inputLabel}
          className={clsx({ [inputLabel]: emptyInput })}
        >
          {label}
        </InputLabel>
      )}
      <Select
        labelId={inputLabelId}
        id={id}
        value={value}
        label={label}
        onChange={onChange}
        classes={{
          select: "!py-2",
          ...classes,
        }}
      >
        {selectOptions}
      </Select>
    </FormControl>
  );
}
