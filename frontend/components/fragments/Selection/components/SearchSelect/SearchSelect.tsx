import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { useSelector, useDispatch } from "react-redux";

import { levelSelectData } from "../../data";
import {
  selectLevels,
  selectId,
  selectSelectedName,
  setId,
  setSelectedName,
  setBounds,
} from "../../../../../store/selectSlice";

export default function SearchSelect() {
  const levels = useSelector(selectLevels);
  const id = useSelector(selectId);
  const selectedName = useSelector(selectSelectedName);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setId(e.value));
    dispatch(setSelectedName(e.label));
    dispatch(
      setBounds({
        lngmin: e.lngmin,
        latmin: e.latmin,
        lngmax: e.lngmax,
        latmax: e.latmax,
      })
    );
  };

  const [alt, setAlt] = useState(false);

  useCallback(async () => {
    setAlt(!alt);
  }, []);

  useEffect(() => {
    setURL();
  }, [alt]);

  const setURL = () => {
    if (alt === true && levels === 0) {
      return "/api/districtnamesalt/?q=";
    } else {
      return "/" + levelSelectData[levels].route;
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

  return (
    <AsyncSelect
      name="idselect"
      cacheOptions
      defaultOptions
      value={{
        label: selectedName,
        value: id,
      }}
      onChange={handleChange}
      loadOptions={loadOptions}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
      placeholder={"Type a " + levelSelectData[levels].label + " name"}
    />
  );
}
