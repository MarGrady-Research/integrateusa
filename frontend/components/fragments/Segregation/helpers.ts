export function isEmpty(obj = {}) {
  return Object.keys(obj).length === 0;
}

export function isString(value) {
  return typeof value === "string" || value instanceof String;
}

export function isNumber(value) {
  return typeof value == "number" && !isNaN(value);
}

export function toLower(value) {
  if (isString(value)) {
    return value.toLowerCase();
  }
  return value;
}

export function isNil(value) {
  return typeof value === "undefined" || value === null;
}

export function convertType(value) {
  if (isNumber(value)) {
    return value.toString();
  }

  return value;
}

export const sortRows = (rows, sort) => {
  return rows.sort((a, b) => {
    const { order, orderBy } = sort;

    if (isNil(a[orderBy])) return 1;
    if (isNil(b[orderBy])) return -1;

    const alocale = convertType(a[orderBy]);
    const blocale = convertType(b[orderBy]);

    if (order == "asc") {
      return alocale.localeCompare(blocale, "en", {
        numeric: isNumber(b[orderBy]),
      });
    } else {
      return blocale.localeCompare(alocale, "en", {
        numeric: isNumber(a[orderBy]),
      });
    }
  });
};

export const filterRows = (rows, filters) => {
  if (isEmpty(filters)) return rows;

  return rows.filter((row) => {
    return Object.keys(filters).every((accessor) => {
      const value = row[accessor];
      const searchValue = filters[accessor];

      if (isString(value)) {
        return toLower(value).includes(toLower(searchValue));
      }
      if (isNumber(value)) {
        return value <= searchValue[1] && value >= searchValue[0];
      }

      return false;
    });
  });
};

export function paginateRows(sortedRows, activePage, rowsPerPage) {
  return [...sortedRows].slice(
    (activePage - 1) * rowsPerPage,
    activePage * rowsPerPage
  );
}
