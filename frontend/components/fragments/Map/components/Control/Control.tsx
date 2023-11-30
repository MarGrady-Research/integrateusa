import React, { useState } from "react";
import Search from "../Search";

import { Bounds, Level } from "../../../../../interfaces";
import {
  asianColor,
  blackColor,
  hispanicColor,
  whiteColor,
  otherColor,
} from "../../../../../constants";

interface Props {
  handleVisibility: (l: Level) => void;
  handleBounds: (e: Bounds) => void;
}

const race = [
  { race: "Asian", color: asianColor },
  { race: "Black", color: blackColor },
  { race: "Hispanic", color: hispanicColor },
  { race: "White", color: whiteColor },
  { race: "Other Races", color: otherColor },
];

export default function Control({ handleVisibility, handleBounds }: Props) {
  const [level, setLevel] = useState(Level.School);

  const handleChange = (e) => {
    const val = parseInt(e.target.value);
    setLevel(val);
    handleVisibility(val);
  };

  const legend = () =>
    race.map((el) => (
      <div key={el.race} className="flex items-center">
        <div
          className="w-4 h-4 rounded-sm mr-2 p-1"
          style={{ backgroundColor: el.color }}
        />
        <p className="text-md">{el.race}</p>
      </div>
    ));

  const radio = (l: Level, label: string, secondaryLabel?: string) => {
    return (
      <div className="inline-flex">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name={label}
            value={l}
            checked={level === l}
            onChange={handleChange}
            className="w-4 h-4 mr-2"
          />
          {secondaryLabel || label}
        </label>
      </div>
    );
  };

  const boundaries = () => (
    <>
      <p className="text-lg text-gray-900 mb-1">Boundaries</p>
      <div className="flex flex-col mb-4">
        {radio(Level.School, "School", "No Boundary")}
        {radio(Level.District, "District")}
        {radio(Level.County, "County")}
        {radio(Level.State, "State")}
      </div>
      <div>
        <Search level={level} handleBounds={handleBounds} />
      </div>
    </>
  );

  return (
    <>
      <p className="text-lg text-gray-900 mb-1">Legend</p>
      <div className="flex flex-col w-full mb-4">
        <div className="text-left">{legend()}</div>
      </div>
      {boundaries()}
    </>
  );
}
