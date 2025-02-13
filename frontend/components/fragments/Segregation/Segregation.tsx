import React, { useState, useMemo, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SelectChangeEvent } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import dynamic from "next/dynamic";
import axios, { AxiosError } from "axios";

const IconButton = dynamic(() => import("@mui/material/IconButton"));
const DownloadRoundedIcon = dynamic(
  () => import("@mui/icons-material/DownloadRounded")
);
const RotateRightRoundedIcon = dynamic(
  () => import("@mui/icons-material/RotateRightRounded")
);

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
  selectLineData,
} from "store/apiCacheSlice";
import { selectRehydrated } from "store/hydrateSlice";
import { AppDispatch } from "store/store";

import {
  SegEntity,
  Line,
  Level,
  MeasureAccessor,
  LineDataAPI,
  ApiStatus,
} from "interfaces";

import { exportSegregationTrends, exportComparisonEntities } from "excel/excel";

import { raceOptions } from "../Selection/data";

interface Props {
  segData: SegEntity[];
  isLoading: boolean;
  hasFailed: boolean;
  setSnackbarOpen: (open: boolean) => void;
}

const defaultOption = raceOptions[1];

const findFocus = (segData: SegEntity[], id: string) => {
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

export default function Segregation({
  segData,
  isLoading,
  hasFailed,
  setSnackbarOpen,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const grade = useSelector(selectGrade);
  const year = useSelector(selectYear);
  const id = useSelector(selectId);
  const name = useSelector(selectSelectedName);
  const level = useSelector(selectLevel);

  const [selected, setSelected] = useState(defaultOption);

  const handleChange = (e: SelectChangeEvent) => {
    const selectedValue = e.target.value;

    const option = raceOptions.find((o) => o.value === selectedValue);

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
      .get<LineDataAPI[]>(url, { signal: currentAbortController.signal })
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
      .get<LineDataAPI[]>(`/api/${table}/?grade=${grade}&${idLevel}=${id}`, {
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

  const [downloadingSegregationTrends, setDownloadingSegregationTrends] =
    useState(false);

  const downloadSegregationTrends = async () => {
    setDownloadingSegregationTrends(true);

    const linesData = lines.map((line) => {
      const lineKey = `${grade}-${line.id}`;
      const lineKeyCache = lineDataStore[lineKey];
      const isLineKeyCached = typeof lineKeyCache !== "undefined";
      const lineDataCache = isLineKeyCached ? lineKeyCache.data : null;
      const isLineDataCached = typeof lineDataCache !== "undefined";

      if (isLineDataCached && lineDataCache) {
        return lineDataCache;
      }

      return null;
    });

    const downloaded = await exportSegregationTrends(
      linesData,
      grade,
      level,
      name,
      measure
    );

    setDownloadingSegregationTrends(false);

    if (!downloaded) {
      setSnackbarOpen(true);
    }
  };

  const [downloadingComparisonEntities, setDownloadingComparisonEntities] =
    useState(false);

  const downloadComparisonEntities = async () => {
    setDownloadingComparisonEntities(true);

    const downloaded = await exportComparisonEntities(
      segData,
      year,
      grade,
      level,
      name
    );

    setDownloadingComparisonEntities(false);

    if (!downloaded) {
      setSnackbarOpen(true);
    }
  };

  let comparisonText = "";

  switch (level) {
    case Level.County:
      comparisonText = "Comparison Counties";
      break;
    case Level.State:
      comparisonText = "Comparison States";
      break;
    case Level.District:
      comparisonText = "Comparison Districts";
      break;
  }

  const lineDataStore = useSelector(selectLineData);

  const linesLoadingArray = lines.map((l) => {
    const lineKey = `${grade}-${l.id}`;
    const lineKeyCache = lineDataStore[lineKey];
    const isLineKeyCached = typeof lineKeyCache !== "undefined";
    const lineDataCache = isLineKeyCached ? lineKeyCache.data : null;
    const isLineDataCached = typeof lineDataCache !== "undefined";

    const isLoading =
      !isLineKeyCached ||
      (!isLineDataCached && lineKeyCache.status !== ApiStatus.Failure);

    return isLoading;
  });

  const linesLoading = linesLoadingArray.some(Boolean);

  const rehydrated = useSelector(selectRehydrated);

  return (
    <>
      <h1 className="text-3xl lg:text-4xl font-semibold mb-5">
        {rehydrated ? name : <Skeleton width={150} />}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-y-0 lg:gap-x-5 mb-10">
        <Info
          focus={focus}
          selected={selected}
          handleChange={handleChange}
          title={name}
          isLoading={isLoading}
          hasFailed={hasFailed}
          year={year}
          grade={grade}
        />
        <SegBar focus={focus} isLoading={isLoading} hasFailed={hasFailed} />
      </div>
      <div className="mb-4 flex items-center">
        <h2 className="text-2xl font-medium mr-2">Segregation Trends</h2>
        {!linesLoading && (
          <IconButton
            size="small"
            aria-label="Download Segregation Trends data"
            onClick={downloadSegregationTrends}
          >
            {downloadingSegregationTrends ? (
              <RotateRightRoundedIcon
                fontSize="inherit"
                className="animate-spin"
              />
            ) : (
              <DownloadRoundedIcon fontSize="inherit" />
            )}
          </IconButton>
        )}
      </div>
      <LineGraph
        lines={lines}
        measure={measure}
        id={id}
        year={year}
        grade={grade}
      />
      <div className="mb-4 flex items-center">
        <h2 className="text-2xl font-medium mr-2">
          {rehydrated ? comparisonText : <Skeleton width={200} />}
        </h2>
        {!isLoading && (
          <IconButton
            size="small"
            aria-label={`Download ${comparisonText} data`}
            onClick={downloadComparisonEntities}
          >
            {downloadingComparisonEntities ? (
              <RotateRightRoundedIcon
                fontSize="inherit"
                className="animate-spin"
              />
            ) : (
              <DownloadRoundedIcon fontSize="inherit" />
            )}
          </IconButton>
        )}
      </div>
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
