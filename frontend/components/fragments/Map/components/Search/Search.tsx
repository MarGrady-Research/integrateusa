import React from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";

import { Level, Bounds } from "../../../../../interfaces";

interface Props {
  level: Level;
  handleBounds: (e: Bounds) => void;
}

const url = (level: Level) => {
  if (level === "District") {
    return "/api/districtnames/?q=";
  } else if (level === "County") {
    return "/api/countynames/?q=";
  } else if (level === "State") {
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
        case "District":
          labelData = {
            value: d.dist_id,
            label: d.dist_name,
          };
          break;
        case "County":
          labelData = {
            value: d.county_id,
            label: d.county_name,
          };
          break;
        case "State":
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

  return (
    <AsyncSelect
      name="idselect"
      cacheOptions
      defaultOptions
      onChange={(e: Bounds) => handleBounds(e)}
      loadOptions={loadOptions}
      isDisabled={level === "School"}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
      placeholder={
        level === "School"
          ? "Select District, County or State to search"
          : "Type a " + level + " name"
      }
      className="pt-2"
    />
  );
}
