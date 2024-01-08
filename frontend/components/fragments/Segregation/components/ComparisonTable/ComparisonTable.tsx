import React, { useEffect, useState, useMemo } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";
import clsx from "clsx";

import Pagination from "../Pagination";

import { sortRows, filterRows } from "../../helpers";

import { SegData, Line } from "interfaces";

// @ts-ignore
import { container } from "./ComparisonTable.module.scss";

interface Props {
  id: string;
  segData: SegData;
  measure: {
    accessor: string;
    name: string;
  };
  isLoading: boolean;
  lines: Line[];
  updateLine: (id: string, name: string) => void;
  clearSelection: () => void;
}

const ROWS_PER_PAGE = 10;
const ROW_HEIGHT = 55;

function TableHolder({ children }: { children: React.ReactNode }) {
  return (
    <div className="shadow overflow-x-auto border border-gray-200">
      {children}
    </div>
  );
}

export default function ComparisonTable({
  id,
  segData,
  measure,
  isLoading,
  lines,
  updateLine,
  clearSelection,
}: Props) {
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

  const [page, setPage] = useState(0);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = (value, accessor) => {
    setPage(0);

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
    setPage(0);

    setSort((prevSort) => ({
      orderDesc: !prevSort.orderDesc && prevSort.orderBy === accessor,
      orderBy: accessor,
    }));
  };

  const filteredRows = useMemo(
    () => filterRows(segData, filters),
    [segData, filters]
  );

  const emptyRows = Math.max(
    0,
    (1 + page) * ROWS_PER_PAGE - filteredRows.length
  );

  const visibleRows = useMemo(() => {
    const sortedRows = sortRows(filteredRows, sort);

    return sortedRows.slice(
      page * ROWS_PER_PAGE,
      page * ROWS_PER_PAGE + ROWS_PER_PAGE
    );
  }, [page, sort, filteredRows]);

  const maxSchools = Math.max(...segData.map((e) => e["num_schools"]));
  const minSchools = Math.min(...segData.map((e) => e["num_schools"]));

  const [min, setMin] = useState({
    num_schools: minSchools,
    enr_prop_as: 0,
    enr_prop_bl: 0,
    enr_prop_hi: 0,
    enr_prop_or: 0,
    enr_prop_wh: 0,
    norm_exp_as: 0,
    norm_exp_bl: 0,
    norm_exp_hi: 0,
    norm_exp_or: 0,
    norm_exp_wh: 0,
  });

  const [max, setMax] = useState({
    num_schools: maxSchools,
    enr_prop_as: 100,
    enr_prop_bl: 100,
    enr_prop_hi: 100,
    enr_prop_or: 100,
    enr_prop_wh: 100,
    norm_exp_as: 100,
    norm_exp_bl: 100,
    norm_exp_hi: 100,
    norm_exp_or: 100,
    norm_exp_wh: 100,
  });

  useEffect(() => {
    setMax((oldMax) => ({ ...oldMax, num_schools: maxSchools }));
  }, [maxSchools]);

  useEffect(() => {
    setMin((oldMin) => ({ ...oldMin, num_schools: minSchools }));
  }, [minSchools]);

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
                  "w-72": column.accessor === measure.accessor,
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

  const linesIds = lines.map((l) => l.id);
  const visibleRowsIds = visibleRows.map((r) => r[idLevel]);

  const allVisibleSelected = visibleRowsIds.every((i) => linesIds.includes(i));

  const tableSearchRowCheckbox = () => (
    <Checkbox
      checked={allVisibleSelected}
      onClick={() => {
        visibleRows.forEach((r) => {
          const isSelectedRow = r[idLevel] === `${id}`;

          const isLineRendered =
            lines.findIndex((l) => l.id === r[idLevel]) != -1;

          const shouldAdd = !isLineRendered && !allVisibleSelected;
          const shouldRemove = isLineRendered && allVisibleSelected;
          const shouldChange = !isSelectedRow && (shouldAdd || shouldRemove);

          if (shouldChange) {
            updateLine(r[idLevel], r[nameLevel]);
          }
        });
      }}
    />
  );

  const tableSearchRowNameSearch = () => (
    <TextField
      variant="standard"
      placeholder="Search Name"
      value={filters[nameLevel]}
      onChange={(event) => handleSearch(event.target.value, nameLevel)}
      className="!min-w-max"
    />
  );

  const tableSearchRowNameOther = (accessor: string) => {
    const minSearch = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
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

      handleSearch([newValue, max[accessor]], accessor);
    };

    const maxSearch = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { value } = e.target;

      const useDefaultValue = value === "" || value === undefined;

      let newValue: number;

      if (useDefaultValue) {
        const isNumSchoolsAccessor = accessor === "num_schools";
        newValue = isNumSchoolsAccessor ? maxSchools : 100;
      } else {
        newValue = parseInt(value);
      }

      setMax((oldmax) => ({
        ...oldmax,
        [accessor]: newValue,
      }));

      handleSearch([min[accessor], newValue], accessor);
    };

    return (
      <div className="w-full flex flex-row justify-center">
        <TextField
          variant="outlined"
          className="w-10 !mr-2 "
          placeholder={min[accessor].toString()}
          onChange={(e) => minSearch(e)}
          InputProps={{
            classes: {
              input: "!px-0 !py-0.5 !text-xs text-center",
            },
          }}
        />
        <TextField
          variant="outlined"
          className="w-10"
          placeholder={max[accessor].toString()}
          onChange={(e) => maxSearch(e)}
          InputProps={{
            classes: {
              input: "!px-0 !py-0.5 !text-xs text-center",
            },
          }}
        />
      </div>
    );
  };

  const tableSearchRow = () => (
    <TableRow>
      {columns.map((column) => {
        switch (column.accessor) {
          case "checkbox":
            return (
              <TableCell scope="row" key={column.accessor}>
                {tableSearchRowCheckbox()}
              </TableCell>
            );

          case nameLevel:
            return (
              <TableCell scope="row" key={column.accessor}>
                {tableSearchRowNameSearch()}
              </TableCell>
            );

          default:
            return (
              <TableCell key={column.accessor}>
                {tableSearchRowNameOther(column.accessor)}
              </TableCell>
            );
        }
      })}
    </TableRow>
  );

  const tableContentRowCheckbox = (row, isSelectedRow) => (
    <Checkbox
      onClick={() => {
        updateLine(row[idLevel], row[nameLevel]);
      }}
      disabled={isSelectedRow}
      checked={
        isSelectedRow
          ? true
          : lines.findIndex((l) => l.id === row[idLevel]) != -1
      }
    />
  );

  const tableContentRows = () =>
    visibleRows.map((row) => (
      <TableRow key={row[idLevel]}>
        {columns.map((column) => {
          const isSelectedRow = row[idLevel] === `${id}`;

          switch (column.accessor) {
            case "checkbox":
              return (
                <TableCell scope="row" key={column.accessor}>
                  {tableContentRowCheckbox(row, isSelectedRow)}
                </TableCell>
              );
            case nameLevel:
              return (
                <TableCell
                  key={column.accessor}
                  className={clsx({
                    "text-sm text-left text-gray-900 font-light": true,
                    "!text-line-red !font-semibold": isSelectedRow,
                  })}
                >
                  {row[column.accessor]}
                </TableCell>
              );
            default:
              return (
                <TableCell
                  key={column.accessor}
                  className={clsx({
                    "text-sm !text-center text-gray-900 font-light": true,
                    "!text-line-red !font-semibold": isSelectedRow,
                  })}
                >
                  {row[column.accessor].toLocaleString("en-US")}
                </TableCell>
              );
          }
        })}
      </TableRow>
    ));

  const tableEmptyRows = () =>
    emptyRows > 0 && (
      <TableRow
        style={{
          height: ROW_HEIGHT * emptyRows,
        }}
      >
        <TableCell colSpan={8} />
      </TableRow>
    );

  return (
    <div className="mb-10">
      {isLoading ? (
        <Skeleton className={clsx("w-full", container)} variant="rectangular" />
      ) : (
        <>
          <TableContainer component={TableHolder}>
            <Table size="small">
              {tableHeader()}
              <TableBody>
                {tableSearchRow()}
                {tableContentRows()}
                {tableEmptyRows()}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="flex items-center justify-between">
            <Button
              variant="outlined"
              className="!normal-case"
              onClick={clearSelection}
            >
              Clear Selection
            </Button>
            <Pagination
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={ROWS_PER_PAGE}
              count={filteredRows.length}
            />
          </div>
        </>
      )}
    </div>
  );
}
