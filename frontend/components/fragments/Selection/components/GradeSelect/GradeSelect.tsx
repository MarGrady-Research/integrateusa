import React from "react";
import Select from "react-select";

import { gradesData } from "../../data";

interface Props {
  grade: string;
  handleGradeChange: (g: string) => void;
}

export default function GradeSelect({ grade, handleGradeChange }: Props) {
  const handleChange = (e) => {
    handleGradeChange(e.value);
  };

  const selectedGrade = gradesData.find((g) => g.value === grade);

  return (
    <Select
      options={gradesData}
      onChange={handleChange}
      value={selectedGrade}
      placeholder="Select a grade"
      name="grades"
    />
  );
}
