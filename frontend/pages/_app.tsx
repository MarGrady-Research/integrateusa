import React from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@mui/material/styles";
import { Chart as ChartJS } from "chart.js";
import axios from "axios";

import { wrapper, makeStore } from "../store/store";
import { theme } from "../styles/materialTheme";
import { Libre_Franklin } from "next/font/google";

import Loader from "../components/fragments/Loader";

import "../styles/global.scss";

const libre = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-libre",
});

//ChartJS.defaults.font.family = "var(--font-libre)";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const store = makeStore();

function MyApp({ Component, ...rest }: AppProps) {
  const { props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <PersistGate
        persistor={store.__persistor}
        loading={
          <div className="flex items-center justify-center h-screen">
            <Loader />
          </div>
        }
      >
        <ThemeProvider theme={theme}>
          <main className={`${libre.variable} font-sans`}>
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
