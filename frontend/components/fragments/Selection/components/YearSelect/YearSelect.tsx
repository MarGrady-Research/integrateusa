import React, { useState } from "react";
import Select from "react-select";

import { yearsData } from "../../data";

interface Props {
  levels: number;
}

export default function YearSelect({ levels }: Props) {
  let currentYear = Math.max(...yearsData.map((e) => e.value));
  let currentYearLabel = yearsData.filter((e) => e.value === currentYear)[0][
    "label"
  ];

  const [year, setYear] = useState(currentYear);

  return (
    <Select
      options={yearsData}
      onChange={(e) => setYear(e.value)}
      defaultValue={{ label: currentYearLabel, value: currentYear }}
      isOptionDisabled={(e) =>
        levels == 1 ? e.value >= 2000 && e.value <= 2002 : null
      }
      placeholder="Select a year"
      name="years"
      className="pr-2"
      isSearchable={false}
    />
  );
}
