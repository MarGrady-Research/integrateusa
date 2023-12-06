import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";

import LevelSelect from "./components/LevelSelect";
import SearchSelect from "./components/SearchSelect";
import YearSelect from "./components/YearSelect";
import GradeSelect from "./components/GradeSelect";

import { selectLevel } from "../../../store/selectSlice";

import { Level } from "../../../interfaces";

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
      <div className="w-full mb-3 lg:mb-0">
        <GradeSelect />
      </div>
    </>
  );

  return (
    <>
      <div className="hidden lg:block shadow sticky top-0 z-10 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 container mx-auto p-5 pb-10 lg:pb-5 font-sans hidden lg:grid">
          {selects}
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
      </div>
      <div className="lg:hidden shadow bg-white fixed w-full">
        <div className="flex justify-center p-1">
          <IconButton onClick={toggleExpanded}>
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}
