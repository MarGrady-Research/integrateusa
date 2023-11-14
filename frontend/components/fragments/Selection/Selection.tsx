import React, { useState } from "react";

import LevelSelect from "./components/LevelSelect";
import SearchSelect from "./components/SearchSelect";

export default function Selection() {
  const [levels, setLevels] = useState(0);

  return (
    <div className="flex flex-row">
      <LevelSelect setLevels={setLevels} />
      <SearchSelect levels={levels} />
    </div>
  );
}
