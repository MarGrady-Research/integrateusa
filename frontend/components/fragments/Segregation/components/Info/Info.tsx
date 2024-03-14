import React from "react";
import { SelectChangeEvent } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import ErrorIcon from "@mui/icons-material/Error";
import clsx from "clsx";

import { SegEntity } from "interfaces";

import { yearsData, gradesData } from "../../../Selection/data";

import Select from "components/atoms/Select";

import { errorContainer } from "./Info.module.scss";

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
  focus: SegEntity | null;
  isLoading: boolean;
  hasFailed: boolean;
  year: number;
  grade: string;
}

export default function Info({
  selected,
  handleChange,
  options,
  title,
  focus,
  isLoading,
  hasFailed,
  year,
  grade,
}: Props) {
  if (hasFailed && !focus) {
    return (
      <div
        className={clsx(
          "flex flex-col items-center justify-center",
          errorContainer
        )}
      >
        <ErrorIcon color="error" fontSize="medium" className="mb-1" />
        Error loading data
      </div>
    );
  }

  const selectedValue = selected.value;

  const raceDropdown = isLoading ? (
    <Skeleton variant="text" className="!inline-block w-24" />
  ) : (
    <Select
      value={selectedValue}
      onChange={handleChange}
      options={options}
      ariaLabel="Change Race"
      variant="standard"
      classes={{
        root: "!text-md lg:!text-xl mt-px lg:mt-0",
        select: "!py-0",
      }}
    />
  );

  const entityName = isLoading ? (
    <Skeleton variant="text" className="!inline-block w-32" />
  ) : (
    title
  );

  const selectedIso = isLoading ? (
    <Skeleton variant="text" className="!inline-block w-12" />
  ) : (
    <b>{focus && `${focus[selected.iso].toFixed(1)}%`}</b>
  );

  const selectedNon = isLoading ? (
    <Skeleton variant="text" className="!inline-block w-12" />
  ) : (
    <b>{focus && `${focus[selected.non].toFixed(1)}%`}</b>
  );

  const segValue = isLoading ? (
    <Skeleton variant="text" className="!inline-block w-12" />
  ) : (
    <b>{focus && `${focus[selected.value].toFixed(1)}%`}</b>
  );

  const selectedLabel = isLoading ? (
    <Skeleton variant="text" className="!inline-block w-20" />
  ) : (
    selected.label
  );

  const selectedYear = yearsData.find((y) => y.value === year);
  const selectedYearString = selectedYear?.label;

  const selectedGrade = gradesData.find((g) => g.value === grade);
  const selectedGradeString = selectedGrade?.label2;

  return (
    <div className="text-md lg:text-xl">
      <p className="mb-4 lg:mb-6">
        We can measure segregation by comparing the makeup of schools attended
        by students in different racial groups.
      </p>
      <div className="mb-4 lg:mb-6">
        {`In ${selectedYearString}, the typical `}
        {raceDropdown}
        {` ${selectedGradeString} in `}
        {entityName}
        {` attended a school that was `}
        {selectedIso}
        {` `}
        {selectedLabel}.
      </div>
      <div className="mb-4 lg:mb-6">
        {`The typical non-`}
        {selectedLabel}
        {` ${selectedGradeString} attended a school that was `}
        {selectedNon}
        {` `}
        {selectedLabel}.
      </div>
      <div className="mb-4 lg:mb-6">
        {`The difference between these two numbers, `}
        {segValue}
        {`, is a measure of segregation for `}
        {selectedLabel}
        {` ${selectedGradeString}s.`}
      </div>
    </div>
  );
}
