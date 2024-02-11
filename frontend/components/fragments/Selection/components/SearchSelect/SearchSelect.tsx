import React, { SyntheticEvent, useState, useMemo, useEffect } from "react";
import axios from "axios";
import { debounce } from "@mui/material/utils";
import { useSelector, useDispatch } from "react-redux";

import Autocomplete from "components/atoms/Autocomplete";

import {
  selectId,
  selectSelectedName,
  selectBounds,
  selectLevel,
  selectSchoolCoordinates,
  selectDistrictType,
  setSelectedName,
  setBounds,
  setLevelAndId,
  setSchoolCoordinates,
  setDistrictType,
} from "store/selectSlice";
import {
  setLocationSearchRequest,
  setLocationSearchSuccess,
  setLocationSearchFailure,
  selectLocationSearch,
} from "store/apiCacheSlice";

import { levelSelectData } from "../../data";

import {
  ApiStatus,
  CountySearchResult,
  DistrictSearchResult,
  Level,
  LocationSearchOption,
  LocationSearchResult,
  SchoolSearchResult,
  StateSearchResult,
} from "interfaces";

interface Props {
  level: Level;
}

export default function SearchSelect({ level }: Props) {
  const id = useSelector(selectId);
  const selectedName = useSelector(selectSelectedName);
  const bounds = useSelector(selectBounds);
  const coordinates = useSelector(selectSchoolCoordinates);
  const storeLevel = useSelector(selectLevel);
  const locationSearchStore = useSelector(selectLocationSearch);
  const distType = useSelector(selectDistrictType);

  const dispatch = useDispatch();

  const [value, setValue] = useState<LocationSearchOption | null>({
    label: selectedName,
    value: id,
    lngmin: bounds.lngmin,
    latmin: bounds.latmin,
    lngmax: bounds.lngmax,
    latmax: bounds.latmax,
    lat_new: coordinates.lat_new,
    lon_new: coordinates.lon_new,
    dist_type: distType,
  });
  const [inputValue, setInputValue] = useState(selectedName);
  const [loading, setLoading] = useState(false);

  const locationSearchKey = `${level}-${inputValue}`;
  const locationSearchKeyCache = locationSearchStore[locationSearchKey];
  const isLocationSearchKeyCached =
    typeof locationSearchKeyCache !== "undefined";
  const locationSearchDataCache = isLocationSearchKeyCached
    ? locationSearchKeyCache.data
    : null;
  const isLocationSearchDataCached =
    typeof locationSearchDataCache !== "undefined";

  const locationSearchData = isLocationSearchDataCached
    ? locationSearchDataCache || []
    : [];

  const isLocationSearchDataLoading =
    !isLocationSearchKeyCached ||
    (!isLocationSearchDataCached &&
      locationSearchKeyCache.status !== ApiStatus.Failure);

  const isLoading = isLocationSearchDataLoading && loading;
  let options = locationSearchData;

  if (value != null) {
    const isValueInOptions =
      options.findIndex((o) => o.value === value.value) != -1;

    if (!isValueInOptions) {
      options = [value, ...options];
    }
  }

  const fetch = useMemo(
    () =>
      debounce(
        (
          input: string,
          abortController: AbortController,
          callback: (results?: readonly LocationSearchResult[]) => void,
          callbackFailure: (error) => void
        ) => {
          const url = `${levelSelectData[level].route}${input}`;

          axios
            .get<LocationSearchResult[]>(url, {
              signal: abortController.signal,
            })
            .then((res) => {
              sessionStorage.setItem(url, JSON.stringify(res.data));
              callback(res.data);
            })
            .catch((error) => callbackFailure(error));
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
        dist_type: distType,
      });
      setInputValue(selectedName);
    } else if (level != storeLevel) {
      setValue(null);
      setInputValue("");
    }
  }, [
    id,
    value,
    selectedName,
    bounds,
    level,
    storeLevel,
    coordinates,
    distType,
  ]);

  useEffect(() => {
    const abortController = new AbortController();

    if (inputValue === "") {
      setLoading(false);
      return;
    }

    if (value && value.label === inputValue) {
      setLoading(false);
      return;
    }

    const callback = (results?: readonly LocationSearchResult[]) => {
      let newOptions: LocationSearchOption[] = [];

      if (results) {
        const resultsOptions = results.map((ro) => {
          let labelData = {};

          switch (level) {
            case Level.School:
              labelData = {
                value: (ro as SchoolSearchResult).nces_id,
                label: (ro as SchoolSearchResult).sch_name,
                lat_new: (ro as SchoolSearchResult).lat_new || null,
                lon_new: (ro as SchoolSearchResult).lon_new || null,
              };
              break;
            case Level.District:
              labelData = {
                value: (ro as DistrictSearchResult).dist_id,
                label: (ro as DistrictSearchResult).dist_name,
                dist_type: (ro as DistrictSearchResult).dist_type,
              };
              break;
            case Level.County:
              labelData = {
                value: (ro as CountySearchResult).county_id,
                label: (ro as CountySearchResult).county_name,
              };
              break;
            case Level.State:
              labelData = {
                value: (ro as StateSearchResult).state_abb,
                label: (ro as StateSearchResult).state_name,
              };
              break;
          }

          return {
            value: "",
            label: "",
            ...labelData,
            lngmin: ro.lngmin,
            latmin: ro.latmin,
            lngmax: ro.lngmax,
            latmax: ro.latmax,
          };
        });

        newOptions = [...newOptions, ...resultsOptions];
      }

      dispatch(
        setLocationSearchSuccess({ key: locationSearchKey, data: newOptions })
      );
      setLoading(false);
    };

    const callbackFailure = (error) => {
      if (error.name !== "CanceledError") {
        dispatch(setLocationSearchFailure(locationSearchKey));
        setLoading(false);
      }
    };

    dispatch(setLocationSearchRequest(locationSearchKey));
    setLoading(true);

    fetch(inputValue, abortController, callback, callbackFailure);

    return () => {
      abortController.abort();
    };
  }, [inputValue, value, fetch, level, locationSearchKey, dispatch]);

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: LocationSearchOption
  ) => {
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
    dispatch(setDistrictType(newValue.dist_type));
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
      loading={isLoading}
      handleChange={handleChange}
      handleInputChange={handleInputChange}
      label="Name"
      isOptionEqualToValue={(o, v) => o.value == v.value}
    />
  );
}
