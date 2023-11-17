import React, { useState } from "react";
import clsx from "clsx";
import Button from "@mui/material/Button";

import { yearsData } from "../../../Selection/data";
import { gradesTableData } from "../../data";

export default function TableYearGrade({
  TrendData,
  selectedGrade,
  selectedYear,
}) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((e) => !e);

  const tableHeader = (e) => (
    <tr>
      <th scope="col" className="school-ch"></th>
      {e.map((element) => (
        <th scope="col" className="school-th" key={element.value}>
          {element.label}
        </th>
      ))}
    </tr>
  );

  const renderCell = (grade, year) => {
    let content = "-";

    const cells = TrendData.filter((e) => e.year === year && e.grade === grade);

    if (cells.length > 0) {
      content = cells[0]["total"].toLocaleString();
    }

    const isSelectedYear = year === selectedYear;
    const isSelectedGrade = grade === selectedGrade;

    const isSelected = isSelectedGrade || isSelectedYear;

    return (
      <td
        className={clsx({ "school-td": true, "bg-gray-100": isSelected })}
        key={grade}
      >
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
      <tr key={year.value}>
        <td
          className={clsx({
            "school-ch": true,
            "bg-gray-100": year.value === selectedYear,
          })}
        >
          {year.label}
        </td>
        {gradesTableData.map((grade) => renderCell(grade.value, year.value))}
      </tr>
    ));
  };

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
          <Button variant="outlined">
            {expanded ? "View less" : "View more"}
          </Button>
        </div>
      )}
    </>
  );
}
