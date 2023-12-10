import React, { useState, useMemo, useEffect, SyntheticEvent } from "react";
import axios from "axios";
import { debounce } from "@mui/material/utils";

import Autocomplete from "../../../../atoms/Autocomplete";

import { Level, Bounds, LocationSearchResult } from "../../../../../interfaces";

interface Props {
  level: Level;
  handleBounds: (e: Bounds) => void;
}

const getURL = (level: Level) => {
  if (level === Level.District) {
    return "/api/districtnames/?q=";
  } else if (level === Level.County) {
    return "/api/countynames/?q=";
  } else if (level === Level.State) {
    return "/api/statenames/?q=";
  }
};

export default function Search({ level, handleBounds }: Props) {
  const [value, setValue] = useState<LocationSearchResult | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly LocationSearchResult[]>([]);

  const [loading, setLoading] = useState(false);

  const fetch = useMemo(
    () =>
      debounce(
        (
          input: string,
          abortController: AbortController,
          callback: (results?: readonly any[]) => void,
          callbackFailure: () => void
        ) => {
          const url = `${getURL(level)}${input}`;

          const cachedOption = sessionStorage.getItem(url);

          if (cachedOption) {
            const cachedOptionJSON = JSON.parse(cachedOption);
            callback(cachedOptionJSON);
            return;
          }

          axios
            .get(url, { signal: abortController.signal })
            .then((res: any) => {
              sessionStorage.setItem(url, JSON.stringify(res.data));
              callback(res.data);
            })
            .catch(() => callbackFailure());
        },
        400
      ),
    [level]
  );

  useEffect(() => {
    const abortController = new AbortController();

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      setLoading(false);
      return;
    }

    if (value && inputValue === value.label) {
      return;
    }

    setLoading(true);

    const callback = (results?: readonly any[]) => {
      let newOptions: readonly LocationSearchResult[] = [];

      if (value) {
        newOptions = [value];
      }

      if (results) {
        const resultsOptions = results.map((ro) => {
          let labelData = {
            value: "",
            label: "",
          };

          switch (level) {
            case Level.School:
              labelData = {
                value: ro.nces_id,
                label: ro.sch_name,
              };
              break;
            case Level.District:
              labelData = {
                value: ro.dist_id,
                label: ro.dist_name,
              };
              break;
            case Level.County:
              labelData = {
                value: ro.county_id,
                label: ro.county_name,
              };
              break;
            case Level.State:
              labelData = {
                value: ro.state_abb,
                label: ro.state_name,
              };
              break;
          }

          return {
            ...labelData,
            lngmin: ro.lngmin,
            latmin: ro.latmin,
            lngmax: ro.lngmax,
            latmax: ro.latmax,
          };
        });

        newOptions = [...newOptions, ...resultsOptions];
      }

      setOptions(newOptions);
      setLoading(false);
    };

    const callbackFailure = () => {
      setLoading(false);
    };

    fetch(inputValue, abortController, callback, callbackFailure);

    return () => {
      abortController.abort();
    };
  }, [inputValue, value, fetch]);

  useEffect(() => {
    setValue(null);
    setInputValue("");
    setOptions([]);
  }, [level]);

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: LocationSearchResult
  ) => {
    setOptions(newValue ? [newValue, ...options] : options);
    setValue(newValue);

    if (newValue) {
      handleBounds(newValue);
    }
  };

  const handleInputChange = (
    event: SyntheticEvent<Element, Event>,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
  };

  let placeholder = "";

  switch (level) {
    case Level.School:
      placeholder = "Select District, County or State";
      break;
    default:
      const levelName = Level[level].toLowerCase();
      placeholder = `Type a ${levelName} name`;
      break;
  }

  const isDisabled = level === Level.School;

  return (
    <Autocomplete
      id="map-search-select"
      value={value}
      inputValue={inputValue}
      options={options}
      loading={loading}
      handleChange={handleChange}
      handleInputChange={handleInputChange}
      placeholder={placeholder}
      disabled={isDisabled}
    />
  );
}
