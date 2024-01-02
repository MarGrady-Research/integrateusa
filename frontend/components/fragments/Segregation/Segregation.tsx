import React, { useState, useMemo, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { SelectChangeEvent } from "@mui/material";
import axios from "axios";

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
} from "../../../store/selectSlice";

import { SegData, LineDataBase, Level } from "../../../interfaces";

import { yearsData } from "../Selection/data";

interface Props {
  segData: SegData;
  isLoading: boolean;
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

const labels = yearsData
  .map((e) => e.value)
  .sort((a, b) => {
    return a - b;
  });

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

const processLineData = (
  data: {
    [key: string]: any;
  }[],
  measure: {
    name: string;
    accessor: string;
  }
) => {
  let finalData = data.map((d) => ({
    seg: d[measure.accessor],
    year: d.year,
  }));

  labels.forEach((l) => {
    const yearInData = finalData.findIndex((d) => d.year === l) != -1;

    if (!yearInData) {
      let tempData = [...finalData, { seg: null, year: l }];

      finalData = tempData.sort((a, b) => {
        return a.year - b.year;
      });
    }
  });

  return finalData;
};

export default function Segregation({ segData, isLoading }: Props) {
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
      accessor: selected.value,
    }),
    [selected]
  );

  const focus = useMemo(() => findFocus(segData, id), [segData, id]);

  let idLevel: string;
  let nameLevel: string;
  let table: string;

  if (id.length === 7) {
    idLevel = "dist_id";
    nameLevel = "dist_name";
    table = "district";
  } else if (id.length === 5) {
    idLevel = "county_id";
    nameLevel = "county_name";
    table = "county";
  } else {
    idLevel = "state_abb";
    nameLevel = "state_abb";
    table = "state";
  }

  const [lines, setLines] = useState([
    { id, name: level === Level.State ? id : name },
  ] as LineDataBase[]);

  const abortControllersRef = useRef({});

  const getLineData = (lineId: string, lineName: string) => {
    const url =
      "/api/" + table + "/?grade=" + grade + "&" + idLevel + "=" + lineId;

    abortControllersRef.current = {
      ...abortControllersRef.current,
      [lineId]: new AbortController(),
    };

    const currentAbortController = abortControllersRef.current[lineId];

    axios
      .get(url, { signal: currentAbortController.signal })
      .then((res) => {
        //do stuff here
      })
      .catch((error) => {
        if (error.name !== "CanceledError") {
          const failedLineData = {
            id: lineId,
            name: lineName,
            status: "failed" as "failed",
          };

          //do stuff here
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
      getLineData(lineId, lineName);
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

    const abortController = new AbortController();

    const promises = lines.map((l) =>
      axios.get(`/api/${table}/?grade=${grade}&${idLevel}=${l.id}`, {
        signal: abortController.signal,
      })
    );

    Promise.all(promises)
      .then((values) => {
        for (const [index, res] of values.entries()) {
          //do stuff here
        }
      })
      .catch((error) => {
        if (error.name !== "CanceledError") {
          //do stuff here
        }
      });

    return () => {
      abortController.abort();
    };
  }, [grade]);

  useEffect(() => {
    stopAllLineDataRequests();

    const abortController = new AbortController();

    const entityName = level === Level.State ? id : name;

    setLines([{ id, name: entityName }]);

    axios
      .get(`/api/${table}/?grade=${grade}&${idLevel}=${id}`, {
        signal: abortController.signal,
      })
      .then((res) => {
        //do stuff here
      })
      .catch((error) => {
        if (error.name !== "CanceledError") {
          //do stuff here
        }
      });
    return () => {
      abortController.abort();
    };
  }, [id]);

  const clearSelection = () => {
    const entityName = level === Level.State ? id : name;

    setLines([{ id, name: entityName }]);
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
          year={year}
          grade={grade}
        />
        <SegBar focus={focus} isLoading={isLoading} />
      </div>
      <ComparisonTable
        id={id}
        segData={segData}
        measure={measure}
        isLoading={isLoading}
        lines={lines}
        updateLine={updateLine}
        clearSelection={clearSelection}
      />
      {/*<LineGraph linesData={linesData} id={id} year={year} />*/}
    </>
  );
}
