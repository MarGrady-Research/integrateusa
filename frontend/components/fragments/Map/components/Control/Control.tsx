import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import Search from "../Search";

import { Bounds, MapLevel } from "interfaces";

import {
  asianColor,
  blackColor,
  hispanicColor,
  whiteColor,
  otherColor,
} from "constants/";

interface Props {
  handleVisibility: (l: MapLevel) => void;
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
  const [mapLevel, setMapLevel] = useState(MapLevel.School);

  const handleChange = (e) => {
    const val = parseInt(e.target.value);
    setMapLevel(val);
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

  const radio = (l: MapLevel, label?: string) => (
    <FormControlLabel
      value={l}
      control={<Radio classes={{ root: "!p-0 !mr-1.5" }} size="small" />}
      label={label || MapLevel[l]}
      classes={{ root: "!-ml-0.5" }}
    />
  );

  const boundaries = () => (
    <>
      <FormControl>
        <FormLabel
          id="level-radio-buttons-group-label"
          classes={{ root: "!text-lg !text-gray-900 !mb-1" }}
        >
          Boundaries
        </FormLabel>
        <RadioGroup
          aria-labelledby="level-radio-buttons-group-label"
          value={mapLevel}
          name="level-radio-buttons-group"
          onChange={handleChange}
          classes={{ root: "mb-4" }}
        >
          {radio(MapLevel.School, "No Boundary")}
          {radio(
            MapLevel.UnifiedElementaryDistrict,
            "District (Unified & Elementary)"
          )}
          {radio(
            MapLevel.UnifiedSecondaryDistrict,
            "District (Unified & Secondary)"
          )}
          {radio(MapLevel.County)}
          {radio(MapLevel.State)}
        </RadioGroup>
      </FormControl>
      <Search mapLevel={mapLevel} handleBounds={handleBounds} />
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
