import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Button from "@mui/material/Button";
import clsx from "clsx";
import { useSelector } from "react-redux";

import LevelSelect from "./components/LevelSelect";
import SearchSelect from "./components/SearchSelect";
import YearSelect from "./components/YearSelect";
import GradeSelect from "./components/GradeSelect";

import { selectLevel } from "../../../store/selectSlice";

import { Level } from "../../../interfaces";

// @ts-ignore
import { expandButton } from "./Selection.module.scss";

interface Props {
  getData: () => void;
  isLoading: boolean;
  omitSchools?: boolean;
}

export default function Selection({ getData, isLoading, omitSchools }: Props) {
  const storeLevel = useSelector(selectLevel);

  const [level, setLevel] = useState(storeLevel);
  const handleLevelChange = (l: Level) => setLevel(l);

  useEffect(() => {
    setLevel(storeLevel);
  }, [storeLevel]);

  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded((e) => !e);

  const expandIcon = expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />;

  return (
    <div className="shadow sticky top-0 z-10 bg-white">
      <div
        className={clsx({
          "grid grid-cols-1 lg:grid-cols-5 gap-2 container mx-auto p-5 pb-10 lg:pb-5 font-sans":
            true,
          "hidden lg:grid": !expanded,
        })}
      >
        <LevelSelect
          omitSchools={omitSchools}
          level={level}
          handleLevelChange={handleLevelChange}
        />
        <SearchSelect level={level} />
        <YearSelect />
        <GradeSelect />
        <div>
          <Button
            onClick={getData}
            disabled={isLoading}
            variant="contained"
            className="h-full"
          >
            <SearchIcon />
          </Button>
        </div>
      </div>
      <Button
        className={clsx(
          "!absolute left-1/2 -translate-x-1/2 -translate-y-1/3 !p-0 !bg-white !rounded-full  lg:!hidden",
          expandButton
        )}
        variant="outlined"
        onClick={toggleExpanded}
      >
        {expandIcon}
      </Button>
    </div>
  );
}
