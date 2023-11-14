import React, { useState } from "react";
import Select from "react-select";

import { gradesData } from "../../data";

export default function GradeSelect() {
  const [grade, setGrade] = useState("All");

  return (
    <Select
      options={gradesData}
      onChange={(e) => setGrade(e.value)}
      defaultValue={{ label: "All Grades", value: "All" }}
      placeholder="Select a grade"
      name="grades"
      className="pr-4"
    />
  );
}
