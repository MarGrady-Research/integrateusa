import React from "react";
import clsx from "clsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";

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

  for (const school of infoData) {
    schoolLevel.Total.schools += 1;
    schoolLevel.Total.students += school.tot_enr;

    schoolLevel[school.level].schools += 1;
    schoolLevel[school.level].students += school.tot_enr;
  }

  return schoolLevel;
};

function TableHolder({ children }: { children: React.ReactNode }) {
  return (
    <div className="shadow overflow-x-auto border border-gray-200">
      {children}
    </div>
  );
}

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
      <TableRow className={contentRow}>
        <TableCell>{schoolType}</TableCell>
        <TableCell>{noOfSchoolsString}</TableCell>
        <TableCell>{percentageOfSchools}</TableCell>
        <TableCell>{noOfStudentsString}</TableCell>
        <TableCell>{percentageOfStudents}</TableCell>
      </TableRow>
    );
  };

  if (infoData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full shadow border border-gray-200">
        No data available
      </div>
    );
  }

  return (
    <TableContainer component={TableHolder}>
      <Table>
        <TableHead className="bg-gray-200">
          <TableRow className={headRow}>
            <TableCell>School Type</TableCell>
            <TableCell># of Schools</TableCell>
            <TableCell>% of Schools</TableCell>
            <TableCell># of Students</TableCell>
            <TableCell>% of Students</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRow("ES")}
          {tableRow("ESMS")}
          {tableRow("MS")}
          {tableRow("MSHS")}
          {tableRow("HS")}
          {tableRow("K12")}
          {tableRow("Other")}
        </TableBody>
        <TableFooter>
          <TableRow className={clsx(contentRow, footerRow)}>
            <TableCell>Total</TableCell>
            <TableCell>{totalSchoolsString}</TableCell>
            <TableCell>100</TableCell>
            <TableCell>{totalStudentsString}</TableCell>
            <TableCell>100</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
