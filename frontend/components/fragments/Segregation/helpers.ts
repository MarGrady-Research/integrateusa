import { Filters, MinMaxAccessor, EntityName, SegEntity } from "interfaces";
import { Sort } from "interfaces/segregationInterfaces";

export function isEmpty(obj: Filters) {
  return Object.keys(obj).length === 0;
}

export function isNumber(value: number | string) {
  return typeof value == "number" && !isNaN(value);
}

export const sortRows = (rows: SegEntity[], sort: Sort) => {
  return [...rows].sort((a, b) => {
    const { orderDesc, orderBy } = sort;

    if (!orderDesc) {
      return a[orderBy] < b[orderBy] ? -1 : a[orderBy] > b[orderBy] ? 1 : 0;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : a[orderBy] > b[orderBy] ? -1 : 0;
    }
  });
};

export const filterRows = (rows: SegEntity[], filters: Filters) => {
  if (isEmpty(filters)) return [...rows];

  return rows.filter((row) => {
    return Object.keys(filters).every(
      (accessor: EntityName | MinMaxAccessor) => {
        const value = row[accessor];
        const searchValue: string | [string, string] = filters[accessor];

        const isValueString = typeof value === "string";
        const isSearchValueString = typeof searchValue === "string";

        if (isValueString && isSearchValueString) {
          return value.toLowerCase().includes(searchValue.toLowerCase());
        } else {
          const isValueNumber = typeof value === "number";
          const isSearchValueNumbers = Array.isArray(searchValue);
          const isMinNumber =
            isSearchValueNumbers &&
            searchValue[0] &&
            !isNaN(parseInt(searchValue[0]));
          const isMaxNumber =
            isSearchValueNumbers &&
            searchValue[1] &&
            !isNaN(parseInt(searchValue[1]));

          if (
            isValueNumber &&
            isSearchValueNumbers &&
            isMinNumber &&
            isMaxNumber
          ) {
            return (
              value <= parseInt(searchValue[1]) &&
              value >= parseInt(searchValue[0])
            );
          }
        }

        return false;
      }
    );
  });
};
