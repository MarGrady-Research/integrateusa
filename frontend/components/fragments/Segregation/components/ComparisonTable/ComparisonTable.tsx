import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import clsx from "clsx";
import Skeleton from "@mui/material/Skeleton";

import LineGraph from "../Line";
import Pagination from "../Pagination";

import { sortRows, filterRows, paginateRows } from "../../helpers";
import { yearsData } from "../../../Selection/data";

import { SegData, LineData } from "../../../../../interfaces";

interface Props {
  id: string;
  grade: string;
  segData: SegData;
  idLevel: string;
  nameLevel: string;
  table: string;
  measure: {
    accessor: string;
    name: string;
  };
  maxSchools: number;
  year: number;
  isLoading: boolean;
}

export default function Comparison({
  id,
  grade,
  segData,
  nameLevel,
  idLevel,
  table,
  measure,
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

  const [sort, setSort] = useState({ order: "desc", orderBy: "num_schools" });

  const handleSort = (accessor) => {
    setActivePage(1);
    setSort((prevSort) => ({
      order:
        prevSort.order === "asc" && prevSort.orderBy === accessor
          ? "desc"
          : "asc",
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

  const [activePage, setActivePage] = useState(1);
  const handleActivePage = (p) => setActivePage(p);

  const rowsPerPage = 10;
  const count = filteredRows.length;
  const totalPages = Math.ceil(count / rowsPerPage);

  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

  const [lines, setLines] = useState([id]);
  const [linesData, setLinesData] = useState([] as LineData[]);

  const labels = yearsData
    .map((e) => e.value)
    .sort((a, b) => {
      return a - b;
    });

  const processLineData = (data, id: string) => {
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

    const name = data[0][nameLevel];

    const newLine = {
      id,
      name,
      data: finalData,
    } as LineData;

    return newLine;
  };

  const getLineData = (lineId: string) => {
    const url =
      "/api/" + table + "/?grade=" + grade + "&" + idLevel + "=" + lineId;

    axios.get(url).then((res) => {
      const newLineData = processLineData(res.data, lineId);

      setLinesData((ld) => [...ld, newLineData]);
    });
  };

  const removeLineData = (lineId: string) => {
    const newLinesData = linesData.filter((l) => l.id !== lineId);

    setLinesData(newLinesData);
  };

  const getLinesData = (id?: string) => {
    if (id) {
      axios
        .get(`/api/${table}/?grade=${grade}&${idLevel}=${id}`)
        .then((res) => {
          const linesData = [];

          const newLineData = processLineData(res.data, id);

          linesData.push(newLineData);
          setLinesData(linesData);
        });
    } else {
      const promises = lines.map((l) =>
        axios.get(`/api/${table}/?grade=${grade}&${idLevel}=${l}`)
      );

      Promise.all(promises).then((values) => {
        const linesData = [];

        for (const [index, res] of values.entries()) {
          const newLineData = processLineData(res.data, lines[index]);

          linesData.push(newLineData);
        }

        setLinesData(linesData);
      });
    }
  };

  const updateLineState = (line) => {
    if (!lines.includes(line)) {
      setLines((currentLines) => [...currentLines, line]);
      getLineData(line);
    } else {
      setLines((currentLines) => currentLines.filter((l) => l !== line));
      removeLineData(line);
    }
  };

  useEffect(() => {
    setLinesData([]);
    getLinesData();
  }, [measure]);

  useEffect(() => {
    setLines([id]);
    setLinesData([]);
    getLinesData(id);
  }, [id]);

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

  const tableRows = (columns) => {
    return (
      <table className="min-w-full table-fixed">
        <thead className="border-b bg-gray-200">
          <tr>
            {columns.map((column) => {
              const sortIcon = () => {
                if (column.accessor === sort.orderBy) {
                  if (sort.order === "asc") {
                    return "\u2191";
                  }
                  return "\u2193";
                } else {
                  return "\u2195";
                }
              };
              return (
                <th
                  key={column.accessor}
                  scope="col"
                  className="px-2 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider"
                >
                  <div
                    className={clsx({
                      "flex flex-row": true,
                      "justify-center": column.accessor != nameLevel,
                    })}
                  >
                    <span className="px-1">{column.label}</span>
                    {column.accessor !== "checkbox" && (
                      <button onClick={() => handleSort(column.accessor)}>
                        {sortIcon()}
                      </button>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            {columns.map((column) => {
              if (column.accessor === "checkbox") {
                return (
                  <th scope="row" className="px-2 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="form-check-input items-center "
                      id="master"
                      onClick={() => {
                        calculatedRows
                          .map((e) => e[idLevel])
                          .forEach((e) => updateLineState(e));
                      }}
                    />
                  </th>
                );
              }
              if (column.accessor === nameLevel) {
                return (
                  <td className="px-2 py-1">
                    <input
                      className="px-2 py-2 whitespace-wrap border border-gray-700 rounded-md"
                      key={`${column.accessor}-search`}
                      type="search"
                      value={filters[column.accessor]}
                      placeholder={`Search Name`}
                      onChange={(event) =>
                        handleSearch(event.target.value, column.accessor)
                      }
                    />
                  </td>
                );
              } else {
                const minSearch = (e) => {
                  if (column.accessor === "num_schools") {
                    e.target.value === "" || e.target.value === undefined
                      ? setMin((oldmin) => ({
                          ...oldmin,
                          [column.accessor]: 1,
                        }))
                      : setMin((oldmin) => ({
                          ...oldmin,
                          [column.accessor]: e.target.value,
                        }));
                  } else {
                    e.target.value === "" || e.target.value === undefined
                      ? setMin((oldmin) => ({
                          ...oldmin,
                          [column.accessor]: 0,
                        }))
                      : setMin((oldmin) => ({
                          ...oldmin,
                          [column.accessor]: e.target.value,
                        }));
                  }

                  let searchVal = e.target.value === "" ? 0 : e.target.value;
                  handleSearch(
                    [searchVal, max[column.accessor]],
                    column.accessor
                  );
                };

                const maxSearch = (e) => {
                  if (column.accessor === "num_schools") {
                    e.target.value === "" || e.target.value === undefined
                      ? setMax((oldmax) => ({
                          ...oldmax,
                          [column.accessor]: maxSchools,
                        }))
                      : setMax((oldmax) => ({
                          ...oldmax,
                          [column.accessor]: e.target.value,
                        }));
                  } else if (column.accessor === measure.accessor) {
                    e.target.value === "" || e.target.value === undefined
                      ? setMax((oldmax) => ({
                          ...oldmax,
                          [column.accessor]: 1,
                        }))
                      : setMax((oldmax) => ({
                          ...oldmax,
                          [column.accessor]: e.target.value,
                        }));
                  } else {
                    e.target.value === "" || e.target.value === undefined
                      ? setMax((oldmax) => ({
                          ...oldmax,
                          [column.accessor]: 100,
                        }))
                      : setMax((oldmax) => ({
                          ...oldmax,
                          [column.accessor]: e.target.value,
                        }));
                  }

                  let searchVal = e.target.value === "" ? 100 : e.target.value;
                  handleSearch(
                    [min[column.accessor], searchVal],
                    column.accessor
                  );
                };

                return (
                  <td>
                    <div className="w-full px-2 py-1 flex flex-row justify-center">
                      <input
                        type="text"
                        className="w-10 bg-gray-200 border rounded-md text-xs text-center mr-2"
                        placeholder={
                          min[column.accessor]
                            ? min[column.accessor].toString()
                            : ""
                        }
                        readOnly={false}
                        onChange={(e) => minSearch(e)}
                      />
                      <input
                        type="text"
                        className="w-10 bg-gray-200 border rounded-md text-xs text-center"
                        placeholder={
                          max[column.accessor]
                            ? max[column.accessor].toString()
                            : ""
                        }
                        readOnly={false}
                        onChange={(e) => maxSearch(e)}
                      />
                    </div>
                  </td>
                );
              }
            })}
          </tr>
          {calculatedRows.map((row) => {
            return (
              <tr key={row[idLevel]}>
                {columns.map((column) => {
                  if (column.accessor == "checkbox") {
                    return (
                      <th scope="row">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={row[idLevel]}
                          checked={
                            row[idLevel] === "" + id
                              ? true
                              : lines.includes(row[idLevel])
                          }
                          disabled={row[idLevel] === "" + id ? true : false}
                          onClick={(e) => updateLineState((e.target as any).id)}
                          readOnly={false}
                        />
                      </th>
                    );
                  } else if (column.accessor === nameLevel) {
                    return (
                      <td
                        key={column.accessor}
                        className={`text-sm text-left text-gray-900 font-light px-2 py-4 ${
                          row[idLevel] === "" + id
                            ? "text-line-red font-semibold"
                            : ""
                        }`}
                      >
                        {row[column.accessor]}
                      </td>
                    );
                  } else {
                    return (
                      <td
                        key={column.accessor}
                        className={`text-sm text-center text-gray-900 font-light px-2 py-4 ${
                          row[idLevel] === "" + id
                            ? "text-line-red font-semibold"
                            : ""
                        }`}
                      >
                        {row[column.accessor]}
                      </td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <>
      {
        <div className="mb-10">
          {isLoading ? (
            <Skeleton className="w-full" height={683} variant="rectangular" />
          ) : (
            <>
              <div className="overflow-x-auto shadow border border-gray-200 sm:rounded-lg mb-4">
                {tableRows(columns)}
              </div>
              <Pagination
                activePage={activePage}
                totalPages={totalPages}
                handleActivePage={handleActivePage}
              />
            </>
          )}
        </div>
      }
      <LineGraph
        linesData={linesData}
        id={id}
        year={year}
        isLoading={isLoading}
      />
    </>
  );
}
