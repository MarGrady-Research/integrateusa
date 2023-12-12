import React, { SyntheticEvent, useState, useMemo, useEffect } from "react";
import axios from "axios";
import { debounce } from "@mui/material/utils";
import { useSelector, useDispatch } from "react-redux";

import Autocomplete from "../../../../atoms/Autocomplete";

import {
  selectId,
  selectSelectedName,
  selectBounds,
  selectLevel,
  selectSchoolCoordinates,
  setSelectedName,
  setBounds,
  setLevelAndId,
  setSchoolCoordinates,
} from "../../../../../store/selectSlice";

import { levelSelectData } from "../../data";

import { Level, LocationSearchResult } from "../../../../../interfaces";

interface Props {
  level: Level;
}

export default function SearchSelect({ level }: Props) {
  const id = useSelector(selectId);
  const selectedName = useSelector(selectSelectedName);
  const bounds = useSelector(selectBounds);
  const coordinates = useSelector(selectSchoolCoordinates);
  const storeLevel = useSelector(selectLevel);

  const dispatch = useDispatch();

  const [value, setValue] = useState<LocationSearchResult | null>({
    label: selectedName,
    value: id,
    lngmin: bounds.lngmin,
    latmin: bounds.latmin,
    lngmax: bounds.lngmax,
    latmax: bounds.latmax,
    lat_new: coordinates.lat_new,
    lon_new: coordinates.lon_new,
  });
  const [inputValue, setInputValue] = useState(selectedName);
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
          const url = `${levelSelectData[level].route}${input}`;

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
    if (value && id !== value.value) {
      setValue({
        label: selectedName,
        value: id,
        lngmin: bounds.lngmin,
        latmin: bounds.latmin,
        lngmax: bounds.lngmax,
        latmax: bounds.latmax,
        lat_new: coordinates.lat_new,
        lon_new: coordinates.lon_new,
      });
      setInputValue(selectedName);
    } else if (level != storeLevel) {
      setValue(null);
      setInputValue("");
    }
    setOptions([]);
  }, [id, value, selectedName, bounds, level, storeLevel]);

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
  }, [inputValue, value, fetch]);

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: LocationSearchResult
  ) => {
    setOptions(newValue ? [newValue, ...options] : options);
    setValue(newValue);

    if (!newValue) {
      return;
    }

    dispatch(setLevelAndId({ level, id: newValue.value }));
    dispatch(setSelectedName(newValue.label));
    dispatch(
      setBounds({
        lngmin: newValue.lngmin,
        latmin: newValue.latmin,
        lngmax: newValue.lngmax,
        latmax: newValue.latmax,
      })
    );
    dispatch(
      setSchoolCoordinates({
        lat_new: newValue.lat_new,
        lon_new: newValue.lon_new,
      })
    );
  };

  const handleInputChange = (
    event: SyntheticEvent<Element, Event>,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
  };

  return (
    <Autocomplete
      id="search-select"
      value={value}
      inputValue={inputValue}
      options={options}
      loading={loading}
      handleChange={handleChange}
      handleInputChange={handleInputChange}
      label="Name"
    />
  );
}
