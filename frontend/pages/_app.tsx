import React from "react";
import type { AppProps } from "next/app";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { Chart as ChartJS } from "chart.js";
import axios from "axios";

import Header from "components/fragments/Header";

import { wrapper, makeStore } from "../store/store";
import { theme } from "../styles/materialTheme";

import "../styles/global.scss";

ChartJS.defaults.font.family = "Libre Franklin";
ChartJS.defaults.font.weight = "500";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const store = makeStore();

const gaId = process.env.NEXT_PUBLIC_GAID;

function MyApp({ Component, ...rest }: AppProps) {
  const { props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <main className="flex flex-col min-h-screen">
            <Header />
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </Provider>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </>
  );
}

export default MyApp;
