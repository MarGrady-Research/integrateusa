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

import AreaPie from "../AreaPie";

import { MapData } from "../../../../../interfaces";

// @ts-ignore
import { paper } from "./AreaDialog.module.scss";

interface Props {
  dialogInfo: any;
  open: boolean;
  handleClose: () => void;
  mapData: MapData;
}

const getAreaInfo = (dialogInfo, mapData) => {
  const { NAME, GEOID, STUSPS } = dialogInfo.feature.properties;

  const areaName = NAME;
  const layerProp = STUSPS || GEOID;

  let areaId = "";

  if (GEOID.length === 5) {
    areaId = "county_id";
  } else if (GEOID.length === 7) {
    areaId = "dist_id";
  } else if (STUSPS) {
    areaId = "state_abb";
  }

  let schoolsTotal = 0;
  let studentsTotal = 0;
  let asianTotal = 0;
  let blackTotal = 0;
  let hispanicTotal = 0;
  let whiteTotal = 0;
  let otherTotal = 0;

  for (const feature of mapData) {
    const { tot_enr, as, bl, hi, wh, or } = feature.properties;

    if (feature.properties[areaId] === layerProp) {
      schoolsTotal += 1;
      studentsTotal += tot_enr;
      asianTotal += as;
      blackTotal += bl;
      hispanicTotal += hi;
      whiteTotal += wh;
      otherTotal += or;
    }
  }

  const asianPercentageRaw = (asianTotal / studentsTotal) * 100;
  const blackPercentageRaw = (blackTotal / studentsTotal) * 100;
  const hispanicPercentageRaw = (hispanicTotal / studentsTotal) * 100;
  const whitePercentageRaw = (whiteTotal / studentsTotal) * 100;
  const otherPercentageRaw = (otherTotal / studentsTotal) * 100;

  const schoolsInArea = schoolsTotal.toLocaleString();
  const studentsEnrolled = studentsTotal.toLocaleString();
  const asianPercentage = asianPercentageRaw.toFixed(1);
  const blackPercentage = blackPercentageRaw.toFixed(1);
  const hispanicPercentage = hispanicPercentageRaw.toFixed(1);
  const whitePercentage = whitePercentageRaw.toFixed(1);
  const otherPercentage = otherPercentageRaw.toFixed(1);

  const pieData = [
    asianPercentageRaw,
    blackPercentageRaw,
    hispanicPercentageRaw,
    whitePercentageRaw,
    otherPercentageRaw,
  ];

  return {
    areaName,
    schoolsInArea,
    studentsEnrolled,
    asianPercentage,
    blackPercentage,
    hispanicPercentage,
    whitePercentage,
    otherPercentage,
    pieData,
  };
};

const AreaDialog = memo(({ dialogInfo, open, handleClose, mapData }: Props) => {
  const {
    areaName,
    schoolsInArea,
    studentsEnrolled,
    asianPercentage,
    blackPercentage,
    hispanicPercentage,
    whitePercentage,
    otherPercentage,
    pieData,
  } = getAreaInfo(dialogInfo, mapData);

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
        {areaName}
      </DialogTitle>
      <DialogContent>
        <DialogContentText className="pb-10">
          <p>
            <b>Total Schools:</b> {schoolsInArea}
          </p>
          <p>
            <b>Students Enrolled:</b> {studentsEnrolled}
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
        <div className="w-1/2 justify-center pt-2 mx-auto">
          <AreaPie pieData={pieData} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
});

export default AreaDialog;
