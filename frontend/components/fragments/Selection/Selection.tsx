import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";

import LevelSelect from "./components/LevelSelect";

import { levelSelectData } from "./data";

export default function Selection() {
  const [levels, setLevels] = useState(0);

  const [id, setID] = useState(3620580);
  const [selectedname, setSelectedName] = useState();
  const [bounds, setBounds] = useState([
    [-74.25609, 40.496094],
    [-73.70017, 40.915276],
  ]);

  const nameIdBounds = (e) => {
    setID(e.value);
    setSelectedName(e.label);
    setBounds([
      [e.lngmin, e.latmin],
      [e.lngmax, e.latmax],
    ]);
  };

  const [alt, setAlt] = useState(false);

  const Alt = useCallback(async () => {
    setAlt(!alt);
  }, []);

  useEffect(() => {
    setURL();
  }, [alt]);

  const setURL = () => {
    if (alt === true && levels === 0) {
      return "http://localhost:8000/" + "api/districtnamesalt/?q=";
    } else {
      return "http://localhost:8000/" + levelSelectData[levels].route;
    }
  };

  const loadOptions = async (input) => {
    if (input.length === 0) {
      return null;
    }

    const response = await axios.get(setURL() + input);

    const Options = await response.data.map((d) => {
      if (levels == 0) {
        return {
          value: d.dist_id,
          label: d.dist_name,
          lngmin: d.lngmin,
          latmin: d.latmin,
          lngmax: d.lngmax,
          latmax: d.latmax,
        };
      }
      if (levels === 1) {
        return {
          value: d.county_id,
          label: d.county_name,
          lngmin: d.lngmin,
          latmin: d.latmin,
          lngmax: d.lngmax,
          latmax: d.latmax,
        };
      }
      if (levels === 2) {
        return {
          value: d.state_abb,
          label: d.state_name,
          lngmin: d.lngmin,
          latmin: d.latmin,
          lngmax: d.lngmax,
          latmax: d.latmax,
        };
      }
      if (levels === 3) {
        return {
          value: d.nces_id,
          label: d.sch_name,
          lngmin: d.lngmin,
          latmin: d.latmin,
          lngmax: d.lngmax,
          latmax: d.latmax,
        };
      }
    });

    return Options;
  };

  const [input, setInput] = useState("");
  const handleInputChange = (inputValue) => setInput(inputValue);

  return (
    <div className="flex flex-row">
      <LevelSelect setLevels={setLevels} />
      <AsyncSelect
        name="idselect"
        cacheOptions
        defaultOptions
        defaultValue={{
          label: "New York City Public Schools (NY)",
          value: 3620580,
        }}
        onChange={nameIdBounds}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        placeholder={"Type a " + levelSelectData[levels].label + " name"}
        className="pr-2 flex-none w-72"
      />
    </div>
  );
}
