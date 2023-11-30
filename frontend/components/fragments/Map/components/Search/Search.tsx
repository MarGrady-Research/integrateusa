import React from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";

import { Level, Bounds } from "../../../../../interfaces";

interface Props {
  level: Level;
  handleBounds: (e: Bounds) => void;
}

const url = (level: Level) => {
  if (level === Level.District) {
    return "/api/districtnames/?q=";
  } else if (level === Level.County) {
    return "/api/countynames/?q=";
  } else if (level === Level.State) {
    return "/api/statenames/?q=";
  }
};

export default function Search({ level, handleBounds }: Props) {
  const loadOptions = async (input) => {
    if (input.length === 0) {
      return null;
    }

    const response = await axios.get(url(level) + input);

    const options = await response.data.map((d) => {
      let labelData = {
        value: "",
        label: "",
      };

      switch (level) {
        case Level.District:
          labelData = {
            value: d.dist_id,
            label: d.dist_name,
          };
          break;
        case Level.County:
          labelData = {
            value: d.county_id,
            label: d.county_name,
          };
          break;
        case Level.State:
          labelData = {
            value: d.state_abb,
            label: d.state_name,
          };
          break;
      }

      return {
        ...labelData,
        lngmin: d.lngmin,
        latmin: d.latmin,
        lngmax: d.lngmax,
        latmax: d.latmax,
      };
    });

    return options;
  };

  let placeholder = "";

  switch (level) {
    case Level.School:
      placeholder = "Select District, County or State to search";
      break;
    default:
      const levelName = Level[level].toLowerCase();
      placeholder = `Type a ${levelName} name`;
      break;
  }

  return (
    <AsyncSelect
      name="idselect"
      cacheOptions
      defaultOptions
      onChange={(e: Bounds) => handleBounds(e)}
      loadOptions={loadOptions}
      isDisabled={level === Level.School}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
      placeholder={placeholder}
      className="pt-2"
    />
  );
}
