import React from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { useSelector, useDispatch } from "react-redux";

import { levelSelectData } from "../../data";
import {
  selectLevel,
  selectId,
  selectSelectedName,
  setId,
  setSelectedName,
  setBounds,
} from "../../../../../store/selectSlice";
import { Level } from "../../../../../interfaces";

export default function SearchSelect() {
  const level = useSelector(selectLevel);
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

  const loadOptions = async (input: string) => {
    if (input.length === 0) {
      return null;
    }

    const url = `${levelSelectData[level].route}${input}`;

    const response = await axios.get(url);

    const options = await response.data.map((d) => {
      let labelData = {
        value: "",
        label: "",
      };

      switch (level) {
        case Level.School:
          labelData = {
            value: d.nces_id,
            label: d.sch_name,
          };
          break;
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
