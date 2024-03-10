import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios, { AxiosError } from "axios";

import Head from "components/fragments/Head";
import Selection from "components/fragments/Selection";
import Page from "components/layouts/Page";
import Segregation from "components/fragments/Segregation";
import Footer from "components/fragments/Footer";

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
import { activateZoomOnMap, selectZoomOnMap } from "store/mapSlice";
import { AppDispatch } from "store/store";

import { ApiStatus, Level, SegData } from "interfaces";

import { getParamsInfo } from "utils";

export default function SegregationPage() {
  const dispatch = useDispatch<AppDispatch>();

  const [paramsChecked, setParamsChecked] = useState(false);

  const level = useSelector(selectLevel);
  const year = useSelector(selectYear);
  const grade = useSelector(selectGrade);
  const segDataStore = useSelector(selectSegData);
  const zoomOnMap = useSelector(selectZoomOnMap);

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

  const segKey = `${idlevel}-${year}-${grade}`;
  const segKeyCache = segDataStore[segKey];
  const isSegKeyCached = typeof segKeyCache !== "undefined";
  const segDataCache = isSegKeyCached ? segKeyCache.data : null;
  const isSegDataCached = typeof segDataCache !== "undefined";

  const segData = isSegDataCached ? segDataCache || [] : [];

  const isLoading =
    !isSegKeyCached ||
    (!isSegDataCached && segKeyCache.status !== ApiStatus.Failure) ||
    !paramsChecked;
  const hasFailed =
    !isSegDataCached && segKeyCache.status === ApiStatus.Failure;

  useEffect(() => {
    if (!zoomOnMap) {
      dispatch(activateZoomOnMap());
    }
  }, [dispatch, zoomOnMap]);

  useEffect(() => {
    if (paramsChecked) {
      return;
    }

    const paramsInfo = getParamsInfo(window.location.href);

    if (paramsInfo) {
      dispatch(setStateFromParams(paramsInfo));
    }
    setParamsChecked(true);
  }, [paramsChecked, dispatch]);

  useEffect(() => {
    if (level === Level.School) {
      dispatch(restoreInitialState());
    }

    const abortController = new AbortController();

    const url = `/api/${idlevel}/?year=${year}&grade=${grade}`;

    dispatch(setSegDataRequest(segKey));

    axios
      .get<SegData>(url, {
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
  }, [level, year, grade, dispatch, idlevel, segKey]);

  return (
    <>
      <Head title="Segregation" desc="Segregation Metrics" />
      <Selection omitSchools />
      <Page className="mt-12 lg:mt-0">
        <Segregation
          segData={segData}
          isLoading={isLoading}
          hasFailed={hasFailed}
        />
      </Page>
      <Footer />
    </>
  );
}
