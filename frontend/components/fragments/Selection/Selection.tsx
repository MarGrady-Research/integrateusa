import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Button from "@mui/material/Button";
import clsx from "clsx";

import LevelSelect from "./components/LevelSelect";
import SearchSelect from "./components/SearchSelect";
import YearSelect from "./components/YearSelect";
import GradeSelect from "./components/GradeSelect";

// @ts-ignore
import { expandButton } from "./Selection.module.scss";

interface Props {
  getData: () => void;
  isLoading: boolean;
  omitSchools?: boolean;
  grade: string;
  year: number;
  handleGradeChange: (g: string) => void;
  handleYearChange: (y: number) => void;
}

export default function Selection({
  getData,
  isLoading,
  omitSchools,
  grade,
  year,
  handleGradeChange,
  handleYearChange,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((e) => !e);

  return (
    <div className="shadow relative">
      <div
        className={clsx({
          "grid grid-cols-1 lg:grid-cols-5 gap-2 container mx-auto p-5 pb-10 lg:pb-5 font-sans":
            true,
          "hidden lg:grid": !expanded,
        })}
      >
        <LevelSelect omitSchools={omitSchools} />
        <SearchSelect />
        <YearSelect year={year} handleYearChange={handleYearChange} />
        <GradeSelect grade={grade} handleGradeChange={handleGradeChange} />
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
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
    </div>
  );
}
