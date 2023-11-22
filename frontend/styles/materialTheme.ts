import { createTheme } from "@mui/material/styles";

import { primaryColor, defaultFont } from "../constants";

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
  },
  typography: {
    fontFamily: [defaultFont].join(","),
  },
});
