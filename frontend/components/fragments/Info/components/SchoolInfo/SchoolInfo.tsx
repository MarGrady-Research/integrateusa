import React from "react";
import Skeleton from "@mui/material/Skeleton";
import ErrorIcon from "@mui/icons-material/Error";

import { School, SchoolInfo } from "interfaces";

interface Props {
  infoData: School[];
  isInfoDataLoading: boolean;
  schoolInfo: SchoolInfo[];
  isSchoolInfoLoading: boolean;
  hasSchoolInfoFailed: boolean;
}

export default function SchoolInfo({
  infoData,
  isInfoDataLoading,
  schoolInfo,
  isSchoolInfoLoading,
  hasSchoolInfoFailed,
}: Props) {
  if (hasSchoolInfoFailed) {
    return (
      <div className="flex flex-col items-center justify-center h-full shadow border border-gray-200 px-4 py-3">
        <ErrorIcon color="error" fontSize="medium" className="mb-1" />
        Error loading data
      </div>
    );
  }

  let tot_enr_str = "Not available",
    level_str = "Not available",
    school_name = "Not available",
    district_name = "Not available",
    state = "Not available",
    years = "Not available";

  if (infoData[0]) {
    const { level, asian, black, hispanic, white, other } = infoData[0];

    const tot_enr = asian + black + hispanic + white + other;

    tot_enr_str = tot_enr.toLocaleString();
    level_str = level;
  }

  if (schoolInfo[0]) {
    const { sch_name, dist_name, state_abb, year_open, year_close } =
      schoolInfo[0];

    school_name = sch_name;
    district_name = dist_name;
    state = state_abb;
    years = `${year_open} - ${year_close}`;
  }

  const schoolName = isSchoolInfoLoading ? (
    <Skeleton className="!inline-block w-32" />
  ) : (
    <>{school_name}</>
  );

  const districtName = isSchoolInfoLoading ? (
    <Skeleton className="!inline-block w-32" />
  ) : (
    <>{district_name}</>
  );

  const stateName = isSchoolInfoLoading ? (
    <Skeleton className="!inline-block w-32" />
  ) : (
    <>{state}</>
  );

  const schoolLevel = isInfoDataLoading ? (
    <Skeleton className="!inline-block w-32" />
  ) : (
    <> {level_str}</>
  );

  const enrollment = isInfoDataLoading ? (
    <Skeleton className="!inline-block w-32" />
  ) : (
    <> {tot_enr_str}</>
  );

  const enrollmentYears = isSchoolInfoLoading ? (
    <Skeleton className="!inline-block w-32" />
  ) : (
    <> {years}</>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 shadow border border-gray-200 px-4 py-3">
        <p>
          <b>Name: </b>
          {schoolName}
        </p>
        <p>
          <b>District: </b>
          {districtName}
        </p>
        <p>
          <b>State: </b>
          {stateName}
        </p>
        <p>
          <b>Level: </b>
          {schoolLevel}
        </p>
        <p>
          <b>Enrollment: </b>
          {enrollment}
        </p>
        <p>
          <b>Enrollment Years: </b>
          {enrollmentYears}
        </p>
      </div>
      <p className="text-sm mt-1">
        Note: Figures only include students for whom race/ethnicity data was
        reported.
      </p>
    </div>
  );
}
