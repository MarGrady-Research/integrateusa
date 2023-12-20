import React, { useEffect, useState, useMemo, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import clsx from "clsx";

import { sortRows, filterRows, paginateRows } from "../../helpers";
import { yearsData } from "../../../Selection/data";

import {
  SegData,
  LineData,
  LineDataLoaded,
  LineDataBase,
} from "../../../../../interfaces";

interface Props {
  id: string;
  name: string;
  grade: string;
  segData: SegData;
  idLevel: string;
  nameLevel: string;
  table: string;
  measure: {
    accessor: string;
    name: string;
  };
  minSchools: number;
  maxSchools: number;
  year: number;
  isLoading: boolean;
}

const ROWS_PER_PAGE = 10;

function TableHolder({ children }: { children: React.ReactNode }) {
  return (
    <div className="shadow overflow-x-auto border border-gray-200">
      {children}
    </div>
  );
}

export default function ComparisonTable({
  id,
  name,
  grade,
  segData,
  nameLevel,
  idLevel,
  table,
  measure,
  minSchools,
  maxSchools,
  year,
  isLoading,
}: Props) {
  const columns = [
    { accessor: "checkbox", label: "" },
    { accessor: nameLevel, label: "Name" },
    { accessor: "num_schools", label: "# of Schools" },
    { accessor: "enr_prop_as", label: "% Asian" },
    { accessor: "enr_prop_bl", label: "% Black" },
    { accessor: "enr_prop_hi", label: "% Hispanic" },
    { accessor: "enr_prop_wh", label: "% White" },
    { accessor: "enr_prop_or", label: "% Other" },
    { accessor: measure.accessor, label: measure.name },
  ];

  const [filters, setFilters] = useState({});

  const [activePage, setActivePage] = useState(1);
  const handleActivePage = (p: number) => setActivePage(p);

  const handleSearch = (value, accessor) => {
    setActivePage(1);

    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [accessor]: value,
      }));
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        delete updatedFilters[accessor];

        return updatedFilters;
      });
    }
  };

  const [sort, setSort] = useState({ orderDesc: true, orderBy: "num_schools" });

  const handleSort = (accessor) => {
    setActivePage(1);
    setSort((prevSort) => ({
      orderDesc: !prevSort.orderDesc && prevSort.orderBy === accessor,
      orderBy: accessor,
    }));
  };

  const filteredRows = useMemo(
    () => filterRows(segData, filters),
    [segData, filters]
  );

  const sortedRows = useMemo(
    () => sortRows(filteredRows, sort),
    [filteredRows, sort]
  );

  const count = filteredRows.length;
  const totalPages = Math.ceil(count / ROWS_PER_PAGE);

  const calculatedRows = paginateRows(sortedRows, activePage, ROWS_PER_PAGE);

  const [min, setMin] = useState({
    num_schools: 1,
    enr_prop_as: 0,
    enr_prop_bl: 0,
    enr_prop_hi: 0,
    enr_prop_or: 0,
    enr_prop_wh: 0,
    [measure.accessor]: 0,
  });

  const [max, setMax] = useState({
    num_schools: maxSchools,
    enr_prop_as: 100,
    enr_prop_bl: 100,
    enr_prop_hi: 100,
    enr_prop_or: 100,
    enr_prop_wh: 100,
    [measure.accessor]: 1,
  });

  const [lines, setLines] = useState([{ id, name }] as LineDataBase[]);
  const [linesData, setLinesData] = useState([] as LineData[]);

  const labels = yearsData
    .map((e) => e.value)
    .sort((a, b) => {
      return a - b;
    });

  const processLineData = (data, id: string, name: string) => {
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

    const newLine = {
      id,
      name,
      data: finalData,
      status: "loaded",
    } as LineDataLoaded;

    return newLine;
  };

  const abortControllersRef = useRef({});

  const getLineData = (lineId: string, lineName: string) => {
    const url =
      "/api/" + table + "/?grade=" + grade + "&" + idLevel + "=" + lineId;

    const newLineDataLoading = {
      id: lineId,
      name: lineName,
      status: "loading" as "loading",
    };

    setLinesData((ld) => [...ld, newLineDataLoading]);

    abortControllersRef.current = {
      ...abortControllersRef.current,
      [lineId]: new AbortController(),
    };

    const currentAbortController = abortControllersRef.current[lineId];

    axios
      .get(url, { signal: currentAbortController.signal })
      .then((res) => {
        const newLineData = processLineData(res.data, lineId, lineName);

        setLinesData((ld) => {
          const lineIdx = ld.findIndex((l) => l.id === lineId);

          if (lineIdx != -1) {
            const newLinesData = [
              ...ld.slice(0, lineIdx),
              newLineData,
              ...ld.slice(lineIdx + 1),
            ];

            return newLinesData;
          } else {
            return [...ld, newLineData];
          }
        });
      })
      .catch((error) => {
        if (error.name !== "CanceledError") {
          const failedLineData = {
            id: lineId,
            name: lineName,
            status: "failed" as "failed",
          };

          setLinesData((ld) => {
            const lineIdx = ld.findIndex((l) => l.id === lineId);

            if (lineIdx != -1) {
              const newLinesData = [
                ...ld.slice(0, lineIdx),
                failedLineData,
                ...ld.slice(lineIdx + 1),
              ];

              return newLinesData;
            } else {
              return [...ld, failedLineData];
            }
          });
        }
      });
  };

  const removeLineData = (lineId: string) => {
    const currentAbortController = abortControllersRef.current[lineId];

    if (currentAbortController) {
      currentAbortController.abort();
    }

    setLinesData((linesData) => linesData.filter((l) => l.id !== lineId));
  };

  const updateLineState = (lineId: string, lineName: string) => {
    const isLineAbsent = lines.findIndex((l) => l.id === lineId) === -1;

    if (isLineAbsent) {
      setLines((currentLines) => [
        ...currentLines,
        { id: lineId, name: lineName },
      ]);
      getLineData(lineId, lineName);
    } else {
      setLines((currentLines) => currentLines.filter((l) => l.id !== lineId));
      removeLineData(lineId);
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

    const loadingLinesData = lines.map((l) => ({
      id: l.id,
      name: l.name,
      status: "loading" as "loading",
    }));

    setLinesData(loadingLinesData);

    const promises = lines.map((l) =>
      axios.get(`/api/${table}/?grade=${grade}&${idLevel}=${l.id}`, {
        signal: abortController.signal,
      })
    );

    Promise.all(promises)
      .then((values) => {
        const linesData = [];

        for (const [index, res] of values.entries()) {
          const newLineData = processLineData(
            res.data,
            lines[index].id,
            lines[index].name
          );

          linesData.push(newLineData);
        }

        setLinesData(linesData);
      })
      .catch((error) => {
        if (error.name !== "CanceledError") {
          const failedLinesData = lines.map((l) => ({
            id: l.id,
            name: l.name,
            status: "failed" as "failed",
          }));

          setLinesData(failedLinesData);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [measure]);

  useEffect(() => {
    stopAllLineDataRequests();

    const abortController = new AbortController();

    setLines([{ id, name }]);
    setLinesData([
      {
        id,
        name,
        status: "loading" as "loading",
      },
    ]);

    axios
      .get(`/api/${table}/?grade=${grade}&${idLevel}=${id}`, {
        signal: abortController.signal,
      })
      .then((res) => {
        const linesData = [];

        const newLineData = processLineData(res.data, id, name);

        linesData.push(newLineData);
        setLinesData(linesData);
      })
      .catch((error) => {
        if (error.name !== "CanceledError") {
          setLinesData([
            {
              id,
              name,
              status: "failed" as "failed",
            },
          ]);
        }
      });
    return () => {
      abortController.abort();
    };
  }, [id]);

  const tableHeader = () => (
    <TableHead className="bg-gray-200">
      <TableRow>
        {columns.map((column) => {
          const sortIcon = () => {
            if (column.accessor === sort.orderBy) {
              if (!sort.orderDesc) {
                return "\u2191";
              }
              return "\u2193";
            } else {
              return "\u2195";
            }
          };

          return (
            <TableCell
              key={column.accessor}
              className="!text-center !text-xs font-medium text-gray-900 uppercase tracking-wider"
            >
              <div
                className={clsx({
                  "flex flex-row items-center": true,
                  "justify-center": column.accessor != nameLevel,
                })}
              >
                <span className="px-1">{column.label}</span>
                {column.accessor !== "checkbox" && (
                  <IconButton
                    onClick={() => handleSort(column.accessor)}
                    size="small"
                    className="!text-xs h-6 w-6"
                    aria-label="sort"
                  >
                    {sortIcon()}
                  </IconButton>
                )}
              </div>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );

  const tableSearchRowCheckbox = () => (
    <TableCell scope="row">
      <Checkbox
        onClick={() => {
          calculatedRows.forEach((e) =>
            updateLineState(e[idLevel], e[nameLevel])
          );
        }}
      />
    </TableCell>
  );

  const tableSearchRowNameSearch = () => (
    <TableCell scope="row">
      <TextField
        variant="standard"
        placeholder="Search Name"
        value={filters[nameLevel]}
        onChange={(event) => handleSearch(event.target.value, nameLevel)}
      />
    </TableCell>
  );

  const tableSearchRowNameOther = (accessor: string) => {
    const minSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      const useDefaultValue = value === "" || value === undefined;

      let newValue: number;

      if (useDefaultValue) {
        const isNumSchoolsAccessor = accessor === "num_schools";
        newValue = isNumSchoolsAccessor ? minSchools : 0;
      } else {
        newValue = parseInt(value);
      }

      setMin((oldmin) => ({
        ...oldmin,
        [accessor]: newValue,
      }));

      const searchVal = value === "" ? 0 : parseInt(value);
      handleSearch([searchVal, max[accessor]], accessor);
    };

    return null;
  };

  const tableSearchRow = () => (
    <TableRow>
      {columns.map((column) => {
        switch (column.accessor) {
          case "checkbox":
            return tableSearchRowCheckbox();
          case nameLevel:
            return tableSearchRowNameSearch();
          default:
            return tableSearchRowNameOther(column.accessor);
        }
      })}
    </TableRow>
  );

  return (
    <TableContainer component={TableHolder}>
      <Table>
        {tableHeader()}
        <TableBody>{tableSearchRow()}</TableBody>
      </Table>
    </TableContainer>
  );
}
