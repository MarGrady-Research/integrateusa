import React from "react";
import Select from "react-select";

import { levelSelectData } from "../../data";

interface Props {
  setLevels: (value: number) => void;
}

export default function LevelSelect({ setLevels }: Props) {
  return (
    <Select
      options={levelSelectData}
      placeholder="Geographic Level"
      defaultValue={{ label: "District", value: 0 }}
      onChange={(e) => {
        setLevels(e.value);
      }}
      components={{ IndicatorSeparator: () => null }}
      className="pr-2"
      isSearchable={false}
    />
  );
}
