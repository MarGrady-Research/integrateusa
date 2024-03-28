import React, { useState } from "react";
import clsx from "clsx";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ErrorIcon from "@mui/icons-material/Error";

import { TrendData } from "interfaces";

import { yearsData } from "../../../Selection/data";
import { gradesTableData } from "../../data";

import { headRow, contentRow, container } from "./TableYearGrade.module.scss";

interface Props {
  trendData: TrendData;
  selectedGrade: string;
  selectedYear: number;
  isLoading: boolean;
  hasFailed: boolean;
}

function TableHolder({ children }: { children: React.ReactNode }) {
  return (
    <div className="shadow border border-gray-200 overflow-x-auto mb-4">
      {children}
    </div>
  );
}

export default function TableYearGrade({
  trendData,
  selectedGrade,
  selectedYear,
  isLoading,
  hasFailed,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  if (isLoading) {
    return (
      <Skeleton variant="rectangular" className={clsx(container, "mb-4")} />
    );
  }

  if (hasFailed) {
    return (
      <div
        className={clsx(
          "flex flex-col items-center justify-center shadow border border-gray-200",
          container
        )}
      >
        <ErrorIcon color="error" fontSize="medium" className="mb-1" />
        Error loading data
      </div>
    );
  }

  const toggleExpanded = () => setExpanded((e) => !e);

  const tableHeader = (grades: { value: string; label: string }[]) => (
    <TableRow className={headRow}>
      <TableCell scope="col" />
      {grades.map((grade) => (
        <TableCell scope="col" key={grade.value}>
          {grade.label}
        </TableCell>
      ))}
    </TableRow>
  );

  const renderCell = (grade: string, year: number) => {
    let content = "-";

    const trend = trendData.find((t) => t.year === year && t.grade === grade);

    if (trend) {
      const { asian, black, hispanic, white, other } = trend;
      const total = asian + black + hispanic + white + other;

      content = total.toLocaleString();
    }

    const isSelectedYear = year === selectedYear;
    const isSelectedGrade = grade === selectedGrade;

    const isSelected = isSelectedGrade || isSelectedYear;

    return (
      <TableCell className={clsx({ "bg-gray-100": isSelected })} key={grade}>
        {content}
      </TableCell>
    );
  };

  const yearIndex = yearsData.findIndex((y) => y.value === selectedYear);
  const isInDecade = yearIndex <= 9;
  const yearsToDisplay =
    isInDecade && !expanded ? yearsData.slice(0, 9) : yearsData;

  const tableBody = () => {
    return yearsToDisplay.map((year) => (
      <TableRow key={year.value} className={contentRow}>
        <TableCell
          className={clsx({
            "bg-gray-100": year.value === selectedYear,
          })}
        >
          {year.label}
        </TableCell>
        {gradesTableData.map((grade) => renderCell(grade.value, year.value))}
      </TableRow>
    ));
  };

  const buttonMsg = expanded ? "View less" : "View more";

  return (
    <>
      <TableContainer component={TableHolder}>
        <Table>
          <TableHead className="bg-gray-200">
            {tableHeader(gradesTableData)}
          </TableHead>
          <TableBody>{tableBody()}</TableBody>
        </Table>
      </TableContainer>
      {isInDecade && (
        <div className="flex justify-end">
          <Button
            variant="outlined"
            className="!normal-case"
            onClick={toggleExpanded}
          >
            {buttonMsg}
          </Button>
        </div>
      )}
    </>
  );
}
