import React from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@mui/material/styles";
import { Chart as ChartJS } from "chart.js";

import { wrapper } from "../store/store";
import { theme } from "../styles/materialTheme";
import { defaultFont } from "../constants";

import "../styles/global.scss";

ChartJS.defaults.font.family = defaultFont;

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <PersistGate persistor={store.__persistor} loading={<div />}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
