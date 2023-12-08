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

import { selectLevel } from "../../../store/selectSlice";

import { useBreakpoint } from "../../../hooks";

import { Level } from "../../../interfaces";

// @ts-ignore
import { animate } from "./Selection.module.scss";

interface Props {
  omitSchools?: boolean;
}

const navbarDesktopHeight = 84;
const navbarTabletHeight = 108;
const navbarMobileHeight = 92;

const selectsHeight = 224;

export default function Selection({ omitSchools }: Props) {
  const [{ y }] = useWindowScroll();

  const breakpoint = useBreakpoint();

  let navbarHeight = 0;

  switch (breakpoint) {
    case "xs":
      navbarHeight = navbarMobileHeight;
      break;
    case "sm":
    case "md":
      navbarHeight = navbarTabletHeight;
      break;
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

  const selects = (
    <>
      <div className="w-full mb-3 lg:mb-0">
        <LevelSelect
          omitSchools={omitSchools}
          level={level}
          handleLevelChange={handleLevelChange}
        />
      </div>
      <div className="w-full mb-3 lg:mb-0">
        <SearchSelect level={level} />
      </div>
      <div className="w-full mb-3 lg:mb-0">
        <YearSelect />
      </div>
      <div className="w-full mb-0">
        <GradeSelect />
      </div>
    </>
  );

  return (
    <>
      <div className="hidden lg:block shadow sticky top-0 z-10 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 container mx-auto p-5 pb-10 lg:pb-5 font-sans hidden lg:grid">
          {selects}
        </div>
      </div>
      <div
        className={clsx("lg:hidden shadow bg-white fixed w-full z-10", animate)}
        style={{ top: topOffset, transform: `translateY(${translateY}px)` }}
      >
        <div className="p-3 pt-5">{selects}</div>
        <div className="flex justify-center p-1">
          <IconButton onClick={toggleExpanded}>
            <ExpandMoreIcon
              className={clsx({ "rotate-180": expanded, [animate]: true })}
            />
          </IconButton>
        </div>
      </div>
    </>
  );
}
