import React, { useState } from "react";
import clsx from "clsx";
import Button from "@mui/material/Button";

import { yearsData } from "../../../Selection/data";
import { gradesTableData } from "../../data";
import { TrendData } from "../../../../../interfaces";

// @ts-ignore
import { headRow, contentRow } from "./TableYearGrade.module.scss";

interface Props {
  trendData: TrendData;
  selectedGrade: string;
  selectedYear: number;
}

export default function TableYearGrade({
  trendData,
  selectedGrade,
  selectedYear,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((e) => !e);

  const tableHeader = (grades) => (
    <tr className={headRow}>
      <th scope="col" />
      {grades.map((grade) => (
        <th scope="col" key={grade.value}>
          {grade.label}
        </th>
      ))}
    </tr>
  );

  const renderCell = (grade, year) => {
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
      <td className={clsx({ "bg-gray-100": isSelected })} key={grade}>
        {content}
      </td>
    );
  };

  const yearIndex = yearsData.findIndex((y) => y.value === selectedYear);
  const isInDecade = yearIndex <= 9;
  const yearsToDisplay =
    isInDecade && !expanded ? yearsData.slice(0, 9) : yearsData;

  const tableBody = () => {
    return yearsToDisplay.map((year) => (
      <tr key={year.value} className={contentRow}>
        <td
          className={clsx({
            "bg-gray-100": year.value === selectedYear,
          })}
        >
          {year.label}
        </td>
        {gradesTableData.map((grade) => renderCell(grade.value, year.value))}
      </tr>
    ));
  };

  const buttonMsg = expanded ? "View less" : "View more";

  return (
    <>
      <div className="shadow border border-gray-200 overflow-x-auto mb-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">{tableHeader(gradesTableData)}</thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableBody()}
          </tbody>
        </table>
      </div>
      {isInDecade && (
        <div className="flex justify-end" onClick={toggleExpanded}>
          <Button variant="outlined">{buttonMsg}</Button>
        </div>
      )}
    </>
  );
}
