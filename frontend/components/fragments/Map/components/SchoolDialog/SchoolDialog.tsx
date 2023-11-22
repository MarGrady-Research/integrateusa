import React, { memo } from "react";
import Link from "next/link";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

import MapPie from "../MapPies";

// @ts-ignore
import { paper } from "./SchoolDialog.module.scss";

interface Props {
  dialogInfo: any;
  open: boolean;
  handleClose: () => void;
}

const getSchoolInfo = (dialogInfo) => {
  const {
    dist_name,
    county_name,
    year,
    tot_enr,
    as,
    bl,
    hi,
    wh,
    or,
    sch_name,
  } = dialogInfo.feature.properties;

  const districtName = dist_name;
  const countyName = county_name;
  const enrollmentYear = year;
  const schoolName = sch_name;

  const studentsTotal = tot_enr;
  const asianTotal = as;
  const blackTotal = bl;
  const hispanicTotal = hi;
  const whiteTotal = wh;
  const otherTotal = or;

  const asianRatio = asianTotal / studentsTotal;
  const blackRatio = blackTotal / studentsTotal;
  const hispanicRatio = hispanicTotal / studentsTotal;
  const whiteRatio = whiteTotal / studentsTotal;
  const otherRatio = otherTotal / studentsTotal;

  const studentsEnrolled = studentsTotal.toLocaleString();
  const asianPercentage = (asianRatio * 100).toFixed(1);
  const blackPercentage = (blackRatio * 100).toFixed(1);
  const hispanicPercentage = (hispanicRatio * 100).toFixed(1);
  const whitePercentage = (whiteRatio * 100).toFixed(1);
  const otherPercentage = (otherRatio * 100).toFixed(1);

  const pieData = [
    asianRatio,
    blackRatio,
    hispanicRatio,
    whiteRatio,
    otherRatio,
  ];

  return {
    schoolName,
    districtName,
    countyName,
    enrollmentYear,
    studentsEnrolled,
    asianPercentage,
    blackPercentage,
    hispanicPercentage,
    whitePercentage,
    otherPercentage,
    pieData,
  };
};

const SchoolDialog = memo(({ dialogInfo, open, handleClose }: Props) => {
  const {
    schoolName,
    districtName,
    countyName,
    enrollmentYear,
    studentsEnrolled,
    asianPercentage,
    blackPercentage,
    hispanicPercentage,
    whitePercentage,
    otherPercentage,
    pieData,
  } = getSchoolInfo(dialogInfo);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      fullScreen={fullScreen}
      classes={{ root: "font-sans", paper }}
    >
      <DialogTitle className="text-center !font-semibold">
        {schoolName}
      </DialogTitle>
      <DialogContent>
        <DialogContentText className="pb-10">
          <p>
            <b>District: </b>
            {districtName}
          </p>
          <p>
            <b>County: </b>
            {countyName}
          </p>
          <p>
            <b>{enrollmentYear} Enrollment: </b> {studentsEnrolled}
          </p>
          <Link href="/info">
            <a className="font-semibold text-primary hover:text-secondary table">
              Demographic Info
            </a>
          </Link>
          <Link href="/segregation">
            <a className="font-semibold text-primary hover:text-secondary">
              Segregation
            </a>
          </Link>
        </DialogContentText>
        <DialogContentText className="pb-4 text-center">
          <p>
            <b className="text-asian">Asian: </b> {asianPercentage}%
          </p>
          <p>
            <b className="text-blackstudents">Black: </b> {blackPercentage}%
          </p>
          <p>
            <b className="text-hispanic">Hispanic: </b> {hispanicPercentage}%
          </p>
          <p>
            <b className="text-whitestudents">White: </b> {whitePercentage}%
          </p>
          <p>
            <b className="text-other">Other: </b> {otherPercentage}%
          </p>
        </DialogContentText>
        <div className="w-1/2 justify-center mx-auto">
          <MapPie pieData={pieData} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
});

export default SchoolDialog;
