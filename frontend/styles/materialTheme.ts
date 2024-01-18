import { createTheme } from "@mui/material/styles";

import { primaryColor } from "../constants";
import { libre } from "./typography";

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
  },
  typography: {
    fontFamily: `var(${libre.variable})`,
  },
});
