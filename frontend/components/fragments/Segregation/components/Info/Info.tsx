import React from "react";
import Select from "../../../../atoms/Select";
import { SelectChangeEvent } from "@mui/material";

import { SegEntity } from "../../../../../interfaces";

interface Props {
  selected: {
    value: string;
    iso: string;
    label: string;
    non: string;
  };
  handleChange: (e: SelectChangeEvent) => void;
  options: {
    value: string;
    label: string;
  }[];
  title: string;
  focus: SegEntity;
}

export default function Info({
  selected,
  handleChange,
  options,
  title,
  focus,
}: Props) {
  const selectedValue = selected.value;

  return (
    <div className="text-justify text-md lg:text-xl">
      <p className="mb-4 lg:mb-6">
        We can measure segregation by comparing the makeup of schools attended
        by students in different racial groups.
      </p>
      <p className="mb-4 lg:mb-6">
        The typical{" "}
        <Select
          id="seg-select"
          value={selectedValue}
          onChange={handleChange}
          options={options}
          variant="standard"
          classes={{
            root: "!text-md lg:!text-xl mt-px lg:mt-0",
            select: "!py-0",
          }}
        />{" "}
        student in {title} attends a school that is{" "}
        <b>
          {focus[selected.iso].toFixed(1)}% {selected.label}
        </b>
        .
      </p>
      <p className="mb-4 lg:mb-6">
        The typical non-{selected.label} student attends a school that is{" "}
        <b>
          {focus[selected.non].toFixed(1)}% {selected.label}
        </b>
        .
      </p>
      <p className="mb-4 lg:mb-6">
        The difference between these two numbers,{" "}
        <b>{focus[selected.value].toFixed(1)}%</b> is a measure of segregation
        for <b>{selected.label}</b> students.
      </p>
    </div>
  );
}
