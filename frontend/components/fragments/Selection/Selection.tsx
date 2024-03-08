import React, { useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";
import { useWindowScroll } from "@uidotdev/usehooks";
import clsx from "clsx";

import LevelSelect from "./components/LevelSelect";
import SearchSelect from "./components/SearchSelect";
import YearSelect from "./components/YearSelect";
import GradeSelect from "./components/GradeSelect";

import { selectLevel } from "store/selectSlice";

import { useBreakpointRegion } from "hooks";

import { Level } from "interfaces";

import { animate } from "./Selection.module.scss";

import constants from "styles/_constants.module.scss";

interface Props {
  omitSchools?: boolean;
}

const navbarDesktopHeight = parseInt(
  constants.navbarDesktopHeight.slice(0, -2)
);
const navbarMobileHeight = parseInt(constants.navbarMobileHeight.slice(0, -2));

const selectsHeight = 224;

export default function Selection({ omitSchools }: Props) {
  const [{ y }] = useWindowScroll();

  const breakpointRegion = useBreakpointRegion();

  let navbarHeight = 0;

  switch (breakpointRegion) {
    case "xs":
      navbarHeight = navbarMobileHeight;
      break;
    case "sm":
    case "md":
    case "lg":
    case "xl":
      navbarHeight = navbarDesktopHeight;
      break;
  }

  const storeLevel = useSelector(selectLevel);

  const [level, setLevel] = useState(storeLevel);
  const handleLevelChange = (l: Level) => setLevel(l);

  useEffect(() => {
    setLevel(storeLevel);
  }, [storeLevel]);

  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded((e) => !e);

  const topOffset = Math.max(0, navbarHeight - y);
  const translateY = expanded ? 0 : -selectsHeight;

  const selects = (prefix = "") => (
    <>
      <div className="w-full mb-3 lg:mb-0">
        <LevelSelect
          omitSchools={omitSchools}
          level={level}
          handleLevelChange={handleLevelChange}
          labelPrefix={prefix}
        />
      </div>
      <div className="w-full mb-3 lg:mb-0">
        <SearchSelect level={level} />
      </div>
      <div className="w-full mb-3 lg:mb-0">
        <YearSelect labelPrefix={prefix} />
      </div>
      <div className="w-full mb-0">
        <GradeSelect labelPrefix={prefix} />
      </div>
    </>
  );

  return (
    <>
      <div className="hidden lg:block shadow sticky top-0 z-10 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 container mx-auto p-5 pb-10 lg:pb-5 hidden lg:grid">
          {selects()}
        </div>
      </div>
      <div
        className={clsx("lg:hidden shadow bg-white fixed w-full z-10", animate)}
        style={{ top: topOffset, transform: `translateY(${translateY}px)` }}
      >
        <div className="p-3 pt-5">{selects("mobile-")}</div>
        <div className="flex justify-center p-1">
          <IconButton
            onClick={toggleExpanded}
            aria-label={
              expanded ? "Close selection panel" : "Open selection panel"
            }
          >
            <ExpandMoreIcon
              className={clsx({ "rotate-180": expanded, [animate]: true })}
            />
          </IconButton>
        </div>
      </div>
    </>
  );
}
