import React, { SyntheticEvent } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import clsx from "clsx";

// @ts-ignore
import { inputLabel } from "./Autocomplete.module.scss";

interface SearchResult {
  value: string;
  label: string;
  [prop: string]: any;
}

interface Props {
  id: string;
  value: SearchResult | null;
  inputValue: string;
  options: readonly SearchResult[];
  loading: boolean;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  handleChange: (
    event: SyntheticEvent<Element, Event>,
    newValue: SearchResult
  ) => void;
  handleInputChange: (
    event: SyntheticEvent<Element, Event>,
    value: string
  ) => void;
}

export default function AutocompleteComponent({
  id,
  value,
  inputValue,
  options,
  loading,
  handleChange,
  handleInputChange,
  label,
  placeholder,
  disabled,
}: Props) {
  return (
    <Autocomplete
      id={id}
      disabled={disabled}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      inputValue={inputValue}
      noOptionsText={loading ? "Searching..." : "No results"}
      classes={{ inputRoot: "!pl-3.5 !py-2", input: "!p-0" }}
      onChange={handleChange}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth
          placeholder={placeholder}
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
