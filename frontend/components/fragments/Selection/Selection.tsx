import React, { useState } from "react";

import LevelSelect from "./components/LevelSelect";
import SearchSelect from "./components/SearchSelect";
import YearSelect from "./components/YearSelect";
import GradeSelect from "./components/GradeSelect";

export default function Selection() {
  const [levels, setLevels] = useState(0);

  return (
    <div className="flex flex-row">
      <LevelSelect setLevels={setLevels} />
      <SearchSelect levels={levels} />
      <YearSelect levels={levels} />
      <GradeSelect />
    </div>
  );
}
