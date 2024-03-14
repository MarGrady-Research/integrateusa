import React from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@mui/material/styles";
import { Chart as ChartJS } from "chart.js";
import axios from "axios";

import { wrapper, makeStore } from "../store/store";
import { theme } from "../styles/materialTheme";

import Loader from "../components/fragments/Loader";

import "../styles/global.scss";
import Header from "components/fragments/Header";

ChartJS.defaults.font.family = "Libre Franklin";
ChartJS.defaults.font.weight = "500";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const store = makeStore();

function MyApp({ Component, ...rest }: AppProps) {
  const { props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <PersistGate
        persistor={(store as any).__persistor}
        loading={
          <div className="flex items-center justify-center h-screen">
            <Loader />
          </div>
        }
      >
        <ThemeProvider theme={theme}>
          <main className="flex flex-col min-h-screen">
            <Header />
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
