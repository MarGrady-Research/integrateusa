import React, { useState, useMemo, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SelectChangeEvent } from "@mui/material";
import axios, { AxiosError } from "axios";

import SegBar from "./components/Bar";
import Info from "./components/Info";
import ComparisonTable from "./components/ComparisonTable";
import LineGraph from "./components/Line";

import {
  selectId,
  selectGrade,
  selectYear,
  selectSelectedName,
  selectLevel,
} from "store/selectSlice";
import {
  setLineDataRequest,
  setLineDataSuccess,
  setLineDataFailure,
} from "store/apiCacheSlice";
import { AppDispatch } from "store/store";

import { SegData, Line, Level, MeasureAccessor, LineData } from "interfaces";

interface Props {
  segData: SegData;
  isLoading: boolean;
  hasFailed: boolean;
}

const options = [
  {
    value: "norm_exp_as",
    label: "Asian",
    iso: "exp_as_as",
    non: "exp_non_as_as",
  },
  {
    value: "norm_exp_bl",
    label: "Black",
    iso: "exp_bl_bl",
    non: "exp_non_bl_bl",
  },
  {
    value: "norm_exp_hi",
    label: "Hispanic",
    iso: "exp_hi_hi",
    non: "exp_non_hi_hi",
  },
  {
    value: "norm_exp_or",
    label: "Other Race",
    iso: "exp_or_or",
    non: "exp_non_or_or",
  },
  {
    value: "norm_exp_wh",
    label: "White",
    iso: "exp_wh_wh",
    non: "exp_non_wh_wh",
  },
];

const defaultOption = options[1];

const findFocus = (segData: SegData, id: string) => {
  let idLevel: string;

  if (id.length === 7) {
    idLevel = "dist_id";
  } else if (id.length === 5) {
    idLevel = "county_id";
  } else {
    idLevel = "state_abb";
  }

  const posIdx = segData.findIndex((d) => d[idLevel] && d[idLevel] === id);

  if (posIdx != -1) {
    return segData[posIdx];
  }

  return null;
};

export default function Segregation({ segData, isLoading, hasFailed }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const grade = useSelector(selectGrade);
  const year = useSelector(selectYear);
  const id = useSelector(selectId);
  const name = useSelector(selectSelectedName);
  const level = useSelector(selectLevel);

  const [selected, setSelected] = useState(defaultOption);

  const handleChange = (e: SelectChangeEvent) => {
    const selectedValue = e.target.value;

    const option = options.find((o) => o.value === selectedValue);

    if (option) {
      setSelected(option);
    }
  };

  const measure = useMemo(
    () => ({
      name: `${selected.label} Normalized Exposure`,
      accessor: selected.value as MeasureAccessor,
    }),
    [selected]
  );

  const focus = useMemo(() => findFocus(segData, id), [segData, id]);

  let idLevel: string;
  let table: string;

  if (id.length === 7) {
    idLevel = "dist_id";
    table = "district";
  } else if (id.length === 5) {
    idLevel = "county_id";
    table = "county";
  } else {
    idLevel = "state_abb";
    table = "state";
  }

  const [lines, setLines] = useState([
    { id, name: level === Level.State ? id : name },
  ] as Line[]);

  const abortControllersRef = useRef({});

  const getLineData = (lineId: string) => {
    const url =
      "/api/" + table + "/?grade=" + grade + "&" + idLevel + "=" + lineId;

    abortControllersRef.current = {
      ...abortControllersRef.current,
      [lineId]: new AbortController(),
    };

    const currentAbortController = abortControllersRef.current[lineId];

    const lineKey = `${grade}-${lineId}`;

    dispatch(setLineDataRequest(lineKey));

    axios
      .get<LineData>(url, { signal: currentAbortController.signal })
      .then((res) => {
        dispatch(setLineDataSuccess({ key: lineKey, data: res.data }));
      })
      .catch((error: AxiosError) => {
        if (error.name !== "CanceledError") {
          dispatch(setLineDataFailure(lineKey));
        }
      });
  };

  const stopLineRequest = (lineId: string) => {
    const currentAbortController = abortControllersRef.current[lineId];

    if (currentAbortController) {
      currentAbortController.abort();
    }
  };

  const updateLine = (lineId: string, lineName: string) => {
    const isLineAbsent = lines.findIndex((l) => l.id === lineId) === -1;

    if (isLineAbsent) {
      setLines((currentLines) => [
        ...currentLines,
        { id: lineId, name: lineName },
      ]);
      getLineData(lineId);
    } else {
      setLines((currentLines) => currentLines.filter((l) => l.id !== lineId));
      stopLineRequest(lineId);
    }
  };

  const stopAllLineDataRequests = () => {
    const abortControllers = abortControllersRef.current;

    for (const id in abortControllers) {
      abortControllers[id].abort();
    }
  };

  useEffect(() => {
    stopAllLineDataRequests();

    setLines([{ id, name }]);

    const abortController = new AbortController();

    const lineKey = `${grade}-${id}`;

    dispatch(setLineDataRequest(lineKey));

    axios
      .get<LineData>(`/api/${table}/?grade=${grade}&${idLevel}=${id}`, {
        signal: abortController.signal,
      })
      .then((res) => {
        dispatch(setLineDataSuccess({ key: lineKey, data: res.data }));
      })
      .catch((error: AxiosError) => {
        if (error.name !== "CanceledError") {
          dispatch(setLineDataFailure(lineKey));
        }
      });
    return () => {
      abortController.abort();
    };
  }, [id, dispatch, grade, idLevel, level, name, table]);

  const clearSelection = () => {
    setLines([{ id, name }]);
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-5">{name}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-y-0 lg:gap-x-5 mb-10">
        <Info
          focus={focus}
          selected={selected}
          handleChange={handleChange}
          options={options}
          title={name}
          isLoading={isLoading}
          hasFailed={hasFailed}
          year={year}
          grade={grade}
        />
        <SegBar focus={focus} isLoading={isLoading} hasFailed={hasFailed} />
      </div>
      <LineGraph
        lines={lines}
        measure={measure}
        id={id}
        year={year}
        grade={grade}
      />
      <ComparisonTable
        id={id}
        segData={segData}
        measure={measure}
        isLoading={isLoading}
        hasFailed={hasFailed}
        lines={lines}
        updateLine={updateLine}
        clearSelection={clearSelection}
      />
    </>
  );
}
