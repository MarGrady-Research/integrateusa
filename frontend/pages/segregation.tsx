import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios, { AxiosError } from "axios";
import dynamic from "next/dynamic";
import Alert from "@mui/material/Alert";

const Snackbar = dynamic(() => import("@mui/material/Snackbar"));

import Head from "components/fragments/Head";
import Selection from "components/fragments/Selection";
import Segregation from "components/fragments/Segregation";
import Footer from "components/fragments/Footer";
import Page from "components/layouts/Page";
import PersistorPage from "components/layouts/PersistorPage";

import {
  selectYear,
  selectGrade,
  selectLevel,
  restoreInitialState,
  setStateFromParams,
} from "store/selectSlice";
import {
  selectSegData,
  setSegDataRequest,
  setSegDataSuccess,
  setSegDataFailure,
} from "store/apiCacheSlice";
import { AppDispatch } from "store/store";

import { ApiStatus, Level, SegEntity } from "interfaces";

import { getParamsInfo } from "utils";

export default function SegregationPage() {
  const dispatch = useDispatch<AppDispatch>();

  const [paramsChecked, setParamsChecked] = useState(false);

  const paramsInfo = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return getParamsInfo(window.location.href);
  }, []);

  const level = useSelector(selectLevel);
  const year = useSelector(selectYear);
  const grade = useSelector(selectGrade);
  const segDataStore = useSelector(selectSegData);

  let idlevel = "";

  switch (level) {
    case Level.School:
    case Level.District:
      idlevel = "district";
      break;
    case Level.County:
      idlevel = "county";
      break;
    case Level.State:
      idlevel = "state";
      break;
  }

  const isSchoolLevel = level === Level.School;

  const segKey = `${idlevel}-${year}-${grade}`;
  const segKeyCache = segDataStore[segKey];
  const isSegKeyCached = typeof segKeyCache !== "undefined";
  const segDataCache = isSegKeyCached ? segKeyCache.data : null;
  const isSegDataCached = typeof segDataCache !== "undefined";

  const segData = isSegDataCached ? segDataCache || [] : [];

  const isLoading =
    !isSegKeyCached ||
    (!isSegDataCached && segKeyCache.status !== ApiStatus.Failure) ||
    (paramsInfo !== null && !paramsChecked) ||
    isSchoolLevel;
  const hasFailed =
    !isSegDataCached && segKeyCache.status === ApiStatus.Failure;

  useEffect(() => {
    if (paramsChecked) {
      return;
    }

    if (paramsInfo) {
      dispatch(setStateFromParams(paramsInfo));
    }
    setParamsChecked(true);
  }, [dispatch, paramsChecked, paramsInfo]);

  useEffect(() => {
    if (isSchoolLevel) {
      dispatch(restoreInitialState());
    }

    const abortController = new AbortController();

    const url = `/api/${idlevel}/?year=${year}&grade=${grade}`;

    dispatch(setSegDataRequest(segKey));

    axios
      .get<SegEntity[]>(url, {
        signal: abortController.signal,
      })
      .then((res) => {
        dispatch(setSegDataSuccess({ key: segKey, data: res.data }));
      })
      .catch((error: AxiosError) => {
        if (error.name !== "CanceledError") {
          dispatch(setSegDataFailure(segKey));
        }
      });

    return () => {
      abortController.abort();
    };
  }, [isSchoolLevel, year, grade, dispatch, idlevel, segKey]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (event: any, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <PersistorPage>
      <Head
        title="Integrate USA | Segregation"
        desc="IntegrateUSA is a project by MarGrady Research, a mission-driven consulting firm specializing in education projects."
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error" variant="filled">
          There was an error downloading the data. Please try again.
        </Alert>
      </Snackbar>
      <Selection omitSchools />
      <Page className="mt-12 lg:mt-0">
        <Segregation
          segData={segData}
          isLoading={isLoading}
          hasFailed={hasFailed}
          setSnackbarOpen={setSnackbarOpen}
        />
      </Page>
      <Footer />
    </PersistorPage>
  );
}
