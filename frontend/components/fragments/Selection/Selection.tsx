import React, { useState } from "react";

import LevelSelect from "./components/LevelSelect";
import SearchSelect from "./components/SearchSelect";
import YearSelect from "./components/YearSelect";
import GradeSelect from "./components/GradeSelect";

export default function Selection() {
  return (
    <div className="flex flex-row">
      <LevelSelect />
      <SearchSelect />
      <YearSelect />
      <GradeSelect />
    </div>
  );
}
