import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useSearchParams } from "next/navigation";

import Head from "../components/fragments/Head";
import Header from "../components/fragments/Header";
import Selection from "../components/fragments/Selection";
import Info from "../components/fragments/Info";
import Trends from "../components/fragments/Trends";
import Page from "../components/layouts/Page";
import {
  selectYear,
  selectGrade,
  selectLevel,
  selectId,
  selectSelectedName,
  setStateFromParams,
} from "../store/selectSlice";
import {
  selectInfoData,
  setInfoData,
  selectTrendData,
  setTrendData,
} from "../store/apiCacheSlice";

import { Level } from "../interfaces";

export default function InfoPage() {
  const dispatch = useDispatch();

  const searchParams = useSearchParams();

  const [infoUsedParams, setInfoUsedParams] = useState(false);
  const [trendUsedParams, setTrendUsedParams] = useState(false);

  const level = useSelector(selectLevel);
  const year = useSelector(selectYear);
  const grade = useSelector(selectGrade);
  const id = useSelector(selectId);
  const title = useSelector(selectSelectedName);
  const infoDataStore = useSelector(selectInfoData);
  const trendDataStore = useSelector(selectTrendData);

  let levelTable = "";
  let levelId = "";

  switch (level) {
    case Level.School:
      levelTable = "schools";
      levelId = "nces_id";
      break;
    case Level.District:
      levelTable = "districttrends";
      levelId = "dist_id";
      break;
    case Level.County:
      levelTable = "countytrends";
      levelId = "county_id";
      break;
    case Level.State:
      levelTable = "statetrends";
      levelId = "state_abb";
      break;
  }

  const [infoDataState, setInfoDataState] = useState([]);
  const [infoDataRequestingApi, setInfoDataRequestingApi] = useState(true);

  const infoDataKey = `${year}-${grade}-${levelId}-${id}`;
  const infoDataCache = infoDataStore[infoDataKey];
  const isInfoDataCached = typeof infoDataCache !== "undefined";

  const infoData = infoDataRequestingApi ? infoDataCache || [] : infoDataState;
  const isInfoDataLoading = !isInfoDataCached && infoDataRequestingApi;

  const [trendDataState, setTrendDataState] = useState([]);
  const [isTrendDataRequestingApi, setIsTrendDataRequestingApi] =
    useState(true);

  const trendDataKey = `${levelTable}-${id}`;
  const trendDataCache = trendDataStore[trendDataKey];
  const isTrendDataCached = typeof trendDataCache !== "undefined";

  const trendData = isTrendDataRequestingApi
    ? trendDataCache || []
    : trendDataState;
  const isTrendDataLoading = !isTrendDataCached && isTrendDataRequestingApi;

  useEffect(() => {
    const paramsId = searchParams.get("id");
    const paramsName = searchParams.get("name");
    const paramsLevel = searchParams.get("level");
    const paramsXMin = searchParams.get("xmin");
    const paramsXMax = searchParams.get("xmax");
    const paramsYMin = searchParams.get("ymin");
    const paramsYMax = searchParams.get("ymax");

    const completeParams =
      !!paramsId &&
      !!paramsName &&
      !!paramsLevel &&
      !!paramsXMin &&
      !!paramsXMax &&
      !!paramsYMin &&
      !!paramsYMax;

    if (completeParams && !infoUsedParams) {
      const newState = {
        id: paramsId,
        selectedName: paramsName,
        level: parseInt(paramsLevel),
        bounds: {
          lngmin: parseFloat(paramsXMin),
          lngmax: parseFloat(paramsXMax),
          latmin: parseFloat(paramsYMin),
          latmax: parseFloat(paramsYMax),
        },
      };

      dispatch(setStateFromParams(newState));
      setInfoUsedParams(true);
      return;
    }

    const abortController = new AbortController();

    const infoUrl = `/api/schools/?year=${year}&grade=${grade}&${levelId}=${id}`;

    setInfoDataRequestingApi(true);

    axios
      .get(infoUrl, { signal: abortController.signal })
      .then((res) => {
        dispatch(setInfoData({ [infoDataKey]: res.data }));
        setInfoDataState(res.data);
        setInfoDataRequestingApi(false);
      })
      .catch((error) => {
        if (error.name !== "CanceledError") {
          setInfoDataRequestingApi(false);

          if (isInfoDataCached) {
            setInfoDataState(infoDataCache);
          } else {
            setInfoDataState([]);
          }
        }
      });

    return () => {
      abortController.abort();
    };
  }, [id, level, grade, year, searchParams, infoUsedParams]);

  useEffect(() => {
    const paramsId = searchParams.get("id");
    const paramsName = searchParams.get("name");
    const paramsLevel = searchParams.get("level");
    const paramsXMin = searchParams.get("xmin");
    const paramsXMax = searchParams.get("xmax");
    const paramsYMin = searchParams.get("ymin");
    const paramsYMax = searchParams.get("ymax");

    const completeParams =
      !!paramsId &&
      !!paramsName &&
      !!paramsLevel &&
      !!paramsXMin &&
      !!paramsXMax &&
      !!paramsYMin &&
      !!paramsYMax;

    if (completeParams && !trendUsedParams) {
      const newState = {
        id: paramsId,
        selectedName: paramsName,
        level: parseInt(paramsLevel),
        bounds: {
          lngmin: parseFloat(paramsXMin),
          lngmax: parseFloat(paramsXMax),
          latmin: parseFloat(paramsYMin),
          latmax: parseFloat(paramsYMax),
        },
      };

      dispatch(setStateFromParams(newState));
      setTrendUsedParams(true);
      return;
    }

    const abortController = new AbortController();

    const trendUrl = `/api/${levelTable}/?${levelId}=${id}`;

    setIsTrendDataRequestingApi(true);

    axios
      .get(trendUrl, { signal: abortController.signal })
      .then((res) => {
        dispatch(setTrendData({ [trendDataKey]: res.data }));
        setTrendDataState(res.data);
        setIsTrendDataRequestingApi(false);
      })
      .catch((error) => {
        if (error.name !== "CanceledError") {
          setIsTrendDataRequestingApi(false);
        }

        if (isTrendDataCached) {
          setTrendDataState(trendDataCache);
        } else {
          setTrendDataState([]);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [id, level, searchParams, trendUsedParams]);

  return (
    <>
      <Head title="Info" desc="Demographic Information">
        <link rel="icon" href="/mg_logo_cropped.png" />
      </Head>
      <Header />
      <Selection />
      <Page>
        <div className="mx-auto mt-5">
          <Info
            infoData={infoData}
            title={title}
            isLoading={isInfoDataLoading}
          />
          <Trends trendData={trendData || []} isLoading={isTrendDataLoading} />
        </div>
      </Page>
    </>
  );
}
