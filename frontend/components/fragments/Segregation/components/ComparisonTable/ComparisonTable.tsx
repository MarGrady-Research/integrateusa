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
import ErrorIcon from "@mui/icons-material/Error";

import Pagination from "../Pagination";

import { sortRows, filterRows } from "../../helpers";

import {
  SegEntity,
  Line,
  MeasureAccessor,
  ColumnAccessor,
  Filters,
} from "interfaces";

import { container } from "./ComparisonTable.module.scss";
import { selectedLineColor } from "@/constants";
import {
  EntityName,
  MinMaxAccessor,
  Sort,
} from "interfaces/segregationInterfaces";

interface Props {
  id: string;
  segData: SegEntity[];
  measure: {
    name: string;
    accessor: MeasureAccessor;
  };
  isLoading: boolean;
  hasFailed: boolean;
  lines: Line[];
  updateLine: (id: string, name: string) => void;
  clearSelection: () => void;
}

const ROWS_PER_PAGE = 10;
const ROW_HEIGHT = 55;

const intRegex = /^[0-9]+$/;

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
  hasFailed,
  lines,
  updateLine,
  clearSelection,
}: Props) {
  let idLevel: string;
  let nameLevel: EntityName;
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
    nameLevel = "state_name";
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
  ] as { accessor: "checkbox" | ColumnAccessor; label: string }[];

  const [filters, setFilters] = useState({} as Filters);

  const [page, setPage] = useState(0);
  const handleChangePage = ({}, newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = (
    value: string | [string, string],
    accessor: ColumnAccessor
  ) => {
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

  const [sort, setSort] = useState({
    orderDesc: true,
    orderBy: "num_schools",
  } as Sort);

  const handleSort = (accessor: ColumnAccessor) => {
    setPage(0);

    setSort((prevSort) => ({
      orderDesc: !prevSort.orderDesc && prevSort.orderBy === accessor,
      orderBy: accessor,
    }));
  };

  const sortedRows = useMemo(() => {
    const filteredRows = filterRows(segData, filters);

    return sortRows(filteredRows, sort);
  }, [filters, segData, sort]);

  const emptyRows = Math.max(0, (1 + page) * ROWS_PER_PAGE - sortedRows.length);

  const visibleRows = sortedRows.slice(
    page * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE + ROWS_PER_PAGE
  );

  const maxSchools = Math.max(...segData.map((e) => e["num_schools"]));
  const minSchools = Math.min(...segData.map((e) => e["num_schools"]));

  const [min, setMin] = useState({
    num_schools: minSchools.toString(),
    enr_prop_as: "0",
    enr_prop_bl: "0",
    enr_prop_hi: "0",
    enr_prop_or: "0",
    enr_prop_wh: "0",
    norm_exp_as: "0",
    norm_exp_bl: "0",
    norm_exp_hi: "0",
    norm_exp_or: "0",
    norm_exp_wh: "0",
  });

  const [max, setMax] = useState({
    num_schools: maxSchools.toString(),
    enr_prop_as: "100",
    enr_prop_bl: "100",
    enr_prop_hi: "100",
    enr_prop_or: "100",
    enr_prop_wh: "100",
    norm_exp_as: "100",
    norm_exp_bl: "100",
    norm_exp_hi: "100",
    norm_exp_or: "100",
    norm_exp_wh: "100",
  });

  useEffect(() => {
    setMax((oldMax) => ({ ...oldMax, num_schools: maxSchools.toString() }));
  }, [maxSchools]);

  useEffect(() => {
    setMin((oldMin) => ({ ...oldMin, num_schools: minSchools.toString() }));
  }, [minSchools]);

  if (isLoading) {
    return (
      <div className="mb-10">
        <Skeleton className={clsx("w-full", container)} variant="rectangular" />
      </div>
    );
  }

  if (hasFailed) {
    return (
      <div className="mb-10">
        <div
          className={clsx(
            "flex flex-col items-center justify-center shadow border border-gray-200",
            container
          )}
        >
          <ErrorIcon color="error" fontSize="medium" className="mb-1" />
          Error loading data
        </div>
      </div>
    );
  }

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

          const sortIconButton = (accessor: ColumnAccessor | "checkbox") => {
            if (accessor !== "checkbox") {
              return (
                <IconButton
                  onClick={() => handleSort(accessor)}
                  size="small"
                  className="!text-xs h-6 w-6"
                  aria-label="sort"
                >
                  {sortIcon()}
                </IconButton>
              );
            }

            return null;
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
                {sortIconButton(column.accessor)}
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

          const name = r[nameLevel];

          if (shouldChange && typeof name !== "undefined") {
            updateLine(r[idLevel], name);
          }
        });
      }}
      inputProps={{
        "aria-label": allVisibleSelected ? "Hide all lines" : "Show all lines",
      }}
      sx={{
        "&.Mui-checked": {
          color: selectedLineColor,
        },
      }}
    />
  );

  const tableSearchRowNameSearch = () => (
    <TextField
      variant="standard"
      placeholder="Search Name"
      value={filters[nameLevel] || ""}
      onChange={(event) => handleSearch(event.target.value, nameLevel)}
      className="!min-w-max"
    />
  );

  const tableSearchRowNameOther = (accessor: MinMaxAccessor | EntityName) => {
    const minSearch = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { value } = e.target;

      if (value != "") {
        if (!intRegex.test(value)) {
          return;
        } else {
          handleSearch([value, max[accessor]], accessor);
        }
      }

      setMin((oldmin) => ({
        ...oldmin,
        [accessor]: value,
      }));
    };

    const maxSearch = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { value } = e.target;

      if (value != "") {
        if (!intRegex.test(value)) {
          return;
        } else {
          handleSearch([min[accessor], value], accessor);
        }
      }

      setMax((oldmax) => ({
        ...oldmax,
        [accessor]: value,
      }));
    };

    return (
      <div className="w-full flex flex-row justify-center">
        <TextField
          variant="outlined"
          className="w-10 !mr-2 "
          value={min[accessor].toString()}
          placeholder={accessor === "num_schools" ? minSchools.toString() : "0"}
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
          value={max[accessor].toString()}
          placeholder={
            accessor === "num_schools" ? maxSchools.toString() : "100"
          }
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

  const tableContentRowCheckbox = (row, isSelectedRow: boolean) => {
    const name = row[nameLevel];
    const id = row[idLevel];

    const isChecked =
      isSelectedRow || lines.findIndex((l) => l.id === row[idLevel]) != -1;
    return (
      <Checkbox
        onClick={() => {
          updateLine(id, name);
        }}
        disabled={isSelectedRow}
        checked={isChecked}
        inputProps={{
          "aria-label": isChecked
            ? `Hide line for ${name}`
            : `Show line for ${name}`,
        }}
        sx={{
          "&.Mui-checked": {
            color: !isSelectedRow ? selectedLineColor : "",
          },
        }}
      />
    );
  };

  const tableSelectedRow = () => {
    const selectedRow = segData.find((row) => row[idLevel] === `${id}`);

    return (
      <TableRow>
        {selectedRow &&
          columns.map((column) => {
            switch (column.accessor) {
              case "checkbox":
                return (
                  <TableCell scope="row" key={column.accessor}>
                    <Checkbox
                      disabled={true}
                      aria-hidden={true}
                      className="opacity-0"
                    />
                  </TableCell>
                );
              case nameLevel:
                return (
                  <TableCell
                    key={column.accessor}
                    className="text-sm text-left !text-line-selected !font-semibold"
                  >
                    {selectedRow[column.accessor]}
                  </TableCell>
                );
              default:
                const value = selectedRow[column.accessor];

                let valueString = "";

                if (typeof value !== "undefined") {
                  valueString = value.toLocaleString("en-US");
                }

                return (
                  <TableCell
                    key={column.accessor}
                    className="text-sm !text-center !text-line-selected !font-semibold"
                  >
                    {valueString}
                  </TableCell>
                );
            }
          })}
      </TableRow>
    );
  };

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
                  className={clsx("text-sm text-left", {
                    "!text-line-selected !font-semibold": isSelectedRow,
                  })}
                >
                  {row[column.accessor]}
                </TableCell>
              );
            default:
              const value = row[column.accessor];

              let valueString = "";

              if (typeof value !== "undefined") {
                valueString = value.toLocaleString("en-US");
              }

              return (
                <TableCell
                  key={column.accessor}
                  className={clsx("text-sm !text-center", {
                    "!text-line-selected !font-semibold": isSelectedRow,
                  })}
                >
                  {valueString}
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
    <>
      <TableContainer component={TableHolder}>
        <Table size="small">
          {tableHeader()}
          <TableBody>
            {tableSelectedRow()}
            {tableSearchRow()}
            {tableContentRows()}
            {tableEmptyRows()}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <Button
          variant="outlined"
          className="!normal-case order-2 md:order-1"
          onClick={clearSelection}
        >
          Clear Selection
        </Button>
        <Pagination
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={ROWS_PER_PAGE}
          count={sortedRows.length}
        />
      </div>
    </>
  );
}
