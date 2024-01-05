import React, { useState, useMemo, useEffect, SyntheticEvent } from "react";
import axios from "axios";
import { debounce } from "@mui/material/utils";

import Autocomplete from "../../../../atoms/Autocomplete";

import {
  MapLevel,
  Bounds,
  LocationSearchResult,
  DistrictType,
} from "../../../../../interfaces";

interface Props {
  mapLevel: MapLevel;
  handleBounds: (e: Bounds) => void;
}

const getURL = (mapLevel: MapLevel) => {
  switch (mapLevel) {
    case MapLevel.UnifiedElementaryDistrict:
    case MapLevel.UnifiedSecondaryDistrict:
      return "/api/districtnames/?q=";
    case MapLevel.County:
      return "/api/countynames/?q=";
    case MapLevel.State:
      return "/api/statenames/?q=";
  }

  return "";
};

export default function Search({ mapLevel, handleBounds }: Props) {
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
          const url = `${getURL(mapLevel)}${input}`;

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
    [mapLevel]
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
        let filteredResults = [...results];

        if (mapLevel === MapLevel.UnifiedElementaryDistrict) {
          filteredResults = results.filter(
            (r) => r.dist_type !== DistrictType.Secondary
          );
        } else if (mapLevel === MapLevel.UnifiedSecondaryDistrict) {
          filteredResults = results.filter(
            (r) => r.dist_type !== DistrictType.Elementary
          );
        }

        const resultsOptions = filteredResults.map((ro) => {
          let labelData = {
            value: "",
            label: "",
          };

          switch (mapLevel) {
            case MapLevel.School:
              labelData = {
                value: ro.nces_id,
                label: ro.sch_name,
              };
              break;
            case MapLevel.UnifiedElementaryDistrict:
            case MapLevel.UnifiedSecondaryDistrict:
              labelData = {
                value: ro.dist_id,
                label: ro.dist_name,
              };
              break;
            case MapLevel.County:
              labelData = {
                value: ro.county_id,
                label: ro.county_name,
              };
              break;
            case MapLevel.State:
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
            lat_new: ro.lat_new || null,
            lon_new: ro.lon_new || null,
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
  }, [inputValue, value, fetch, mapLevel]);

  useEffect(() => {
    setValue(null);
    setInputValue("");
    setOptions([]);
  }, [mapLevel]);

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

  switch (mapLevel) {
    case MapLevel.School:
      placeholder = "Select District, County or State";
      break;
    case MapLevel.UnifiedElementaryDistrict:
      placeholder = "Type an elementary district name";
      break;
    case MapLevel.UnifiedSecondaryDistrict:
      placeholder = "Type a secondary district name";
      break;
    default:
      const levelName = MapLevel[mapLevel].toLowerCase();
      placeholder = `Type a ${levelName} name`;
      break;
  }

  const isDisabled = mapLevel === MapLevel.School;

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
