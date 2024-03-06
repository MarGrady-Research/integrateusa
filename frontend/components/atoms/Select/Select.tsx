import React from "react";
import Select, { SelectChangeEvent, SelectClasses } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import clsx from "clsx";

import { inputLabel } from "./Select.module.scss";

interface Props {
  label?: string;
  value: string;
  onChange: (e: SelectChangeEvent) => void;
  variant?: "filled" | "outlined" | "standard";
  options: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
  classes?: Partial<SelectClasses>;
  full?: boolean;
}

export default function SelectComponent({
  label,
  value,
  onChange,
  options,
  variant = "outlined",
  classes,
  full,
}: Props) {
  const selectOptions = options.map((o) => (
    <MenuItem key={o.value} value={o.value.toString()} disabled={o.disabled}>
      {o.label}
    </MenuItem>
  ));

  const emptyInput = value === "";

  const selectLabel = `select-label-${label}`;

  return (
    <FormControl variant={variant} className={clsx({ "w-full": full })}>
      {label && (
        <InputLabel
          className={clsx({ [inputLabel]: emptyInput })}
          id={selectLabel}
        >
          {label}
        </InputLabel>
      )}
      <Select
        value={value}
        label={label}
        onChange={onChange}
        classes={{
          select: `!py-2 ${classes?.select}`,
          ...classes,
        }}
        SelectDisplayProps={{ "aria-labelledby": selectLabel }}
      >
        {selectOptions}
      </Select>
    </FormControl>
  );
}
