import React from "react";
import clsx from "clsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import { Skeleton } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

import { School, SchoolType } from "interfaces";

import { headRow, contentRow, footerRow } from "./SchoolLevelTable.module.scss";

interface Props {
  infoData: School[];
  isLoading: boolean;
  hasFailed: boolean;
}

const getSchoolLevel = (infoData: School[]) => {
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
    const { asian, black, hispanic, white, other } = school;

    const tot_enr = asian + black + hispanic + white + other;

    schoolLevel.Total.schools += 1;
    schoolLevel.Total.students += tot_enr;

    schoolLevel[school.level].schools += 1;
    schoolLevel[school.level].students += tot_enr;
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

export default function SchoolLevelTable({
  infoData,
  isLoading,
  hasFailed,
}: Props) {
  if (isLoading) {
    return <Skeleton variant="rectangular" className="!h-full w-full" />;
  }

  if (hasFailed) {
    return (
      <div className="flex flex-col items-center justify-center h-full shadow border border-gray-200">
        <ErrorIcon color="error" fontSize="medium" className="mb-1" />
        Error loading data
      </div>
    );
  }

  if (infoData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full shadow border border-gray-200">
        No data available
      </div>
    );
  }

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

  return (
    <>
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
      <p className="text-sm mt-1">
        Note: Figures only include students for whom race/ethnicity data was
        reported.
      </p>
    </>
  );
}
