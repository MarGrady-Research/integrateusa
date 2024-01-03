import { createTheme } from "@mui/material/styles";

import { primaryColor } from "../constants";

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
  },
  typography: {
    fontFamily: "var(--font-libre)",
  },
});
