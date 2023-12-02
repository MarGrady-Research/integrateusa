import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { debounce } from "@mui/material/utils";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";

import {
  selectId,
  selectSelectedName,
  selectBounds,
  selectLevel,
  setId,
  setSelectedName,
  setBounds,
  setLevel,
} from "../../../../../store/selectSlice";

import { levelSelectData } from "../../data";

import { Level } from "../../../../../interfaces";
// @ts-ignore
import { inputLabel } from "./SearchSelect.module.scss";

interface SearchResult {
  value: string;
  label: string;
  lngmin: number;
  latmin: number;
  lngmax: number;
  latmax: number;
}

interface Props {
  level: Level;
}

export default function SearchSelect({ level }: Props) {
  const id = useSelector(selectId);
  const selectedName = useSelector(selectSelectedName);
  const bounds = useSelector(selectBounds);
  const storeLevel = useSelector(selectLevel);

  const dispatch = useDispatch();

  const [value, setValue] = useState<SearchResult | null>({
    label: selectedName,
    value: id,
    lngmin: bounds.lngmin,
    latmin: bounds.latmin,
    lngmax: bounds.lngmax,
    latmax: bounds.latmax,
  });
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly SearchResult[]>([]);

  const [loading, setLoading] = useState(false);

  const fetch = useMemo(
    () =>
      debounce(
        (input: string, callback: (results?: readonly any[]) => void) => {
          const url = `${levelSelectData[level].route}${input}`;

          axios.get(url).then((res: any) => callback(res.data));
        },
        400
      ),
    [level]
  );

  useEffect(() => {
    if (level != storeLevel) {
      setValue(null);
      setInputValue("");
    }
  }, [level, selectLevel]);

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      setLoading(false);
      return;
    }

    if (value && inputValue === value.label) {
      return;
    }

    setLoading(true);

    fetch(inputValue, (results?: readonly any[]) => {
      if (active) {
        let newOptions: readonly SearchResult[] = [];

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
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, value, fetch]);

  const handleChange = (event: any, newValue: SearchResult | null) => {
    setOptions(newValue ? [newValue, ...options] : options);
    setValue(newValue);

    if (!newValue) {
      return;
    }

    dispatch(setId(newValue.value));
    dispatch(setSelectedName(newValue.label));
    dispatch(
      setBounds({
        lngmin: newValue.lngmin,
        latmin: newValue.latmin,
        lngmax: newValue.lngmax,
        latmax: newValue.latmax,
      })
    );
    dispatch(setLevel(level));
  };

  return (
    <Autocomplete
      id="search-select"
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText={loading ? "Searching..." : "No results"}
      classes={{ inputRoot: "!pl-3.5 !py-2", input: "!p-0" }}
      onChange={handleChange}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Name"
          fullWidth
          InputLabelProps={{
            className: clsx({ [inputLabel]: inputValue === "" }),
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={14} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => {
        const matchesArray = match(option.label, inputValue);
        const parsedOption = parse(option.label, matchesArray);

        const parts = parsedOption.map((part, index) => (
          <Box
            key={index}
            component="span"
            sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
          >
            {part.text}
          </Box>
        ));

        return (
          <li {...props} key={option.value}>
            <Grid item sx={{ wordWrap: "break-word" }}>
              {parts}
            </Grid>
          </li>
        );
      }}
    />
  );
}
