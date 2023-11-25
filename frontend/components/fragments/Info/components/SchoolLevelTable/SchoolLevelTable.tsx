import React from "react";
import clsx from "clsx";

import { InfoData, SchoolType } from "../../../../../interfaces";

// @ts-ignore
import { headRow, contentRow, footerRow } from "./SchoolLevelTable.module.scss";

interface Props {
  infoData: InfoData;
}

const getSchoolLevel = (infoData: InfoData) => {
  const schoolLevel = {
    ES: {
      schools: 0,
      students: 0,
    },
    ESMS: {
      schools: 0,
      students: 0,
    },
    MS: {
      schools: 0,
      students: 0,
    },
    MSHS: {
      schools: 0,
      students: 0,
    },
    HS: {
      schools: 0,
      students: 0,
    },
    K12: {
      schools: 0,
      students: 0,
    },
    Other: {
      schools: 0,
      students: 0,
    },
    Total: {
      schools: 0,
      students: 0,
    },
  };

  for (let school of infoData) {
    schoolLevel.Total.schools += 1;
    schoolLevel.Total.students += school.tot_enr;

    schoolLevel[school.level].schools += 1;
    schoolLevel[school.level].students += school.tot_enr;
  }

  return schoolLevel;
};

export default function SchoolLevelTable({ infoData }: Props) {
  const schoolLevel = getSchoolLevel(infoData);

  const totalSchools = schoolLevel.Total.schools;
  const totalStudents = schoolLevel.Total.students;

  const totalSchoolsString = totalSchools.toLocaleString();
  const totalStudentsString = totalStudents.toLocaleString();

  const tableRow = (schoolType: SchoolType) => {
    const noOfSchools = schoolLevel[schoolType].schools;
    const noOfStudents = schoolLevel[schoolType].students;

    const percentageOfSchools = Math.round((noOfSchools / totalSchools) * 100);
    const percentageOfStudents = Math.round(
      (noOfStudents / totalStudents) * 100
    );

    const noOfSchoolsString = noOfSchools.toLocaleString();
    const noOfStudentsString = noOfStudents.toLocaleString();

    return (
      <tr key={schoolType} className={contentRow}>
        <td>{schoolType}</td>
        <td>{noOfSchoolsString}</td>
        <td>{percentageOfSchools}</td>
        <td>{noOfStudentsString}</td>
        <td>{percentageOfStudents}</td>
      </tr>
    );
  };

  return (
    <div className="shadow overflow-x-auto border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-200">
          <tr className={headRow}>
            <th scope="col">School Type</th>
            <th scope="col"># of Schools</th>
            <th scope="col">% of Schools</th>
            <th scope="col"># of Students</th>
            <th scope="col">% of Students</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableRow("ES")}
          {tableRow("ESMS")}
          {tableRow("MS")}
          {tableRow("MSHS")}
          {tableRow("HS")}
          {tableRow("K12")}
          {tableRow("Other")}
        </tbody>
        <tfoot>
          <tr className={clsx(contentRow, footerRow)}>
            <td scope="col">Total</td>
            <td scope="col">{totalSchoolsString}</td>
            <td scope="col">100</td>
            <td scope="col">{totalStudentsString}</td>
            <td scope="col">100</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
