import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Head from "components/fragments/Head";
import Selection from "components/fragments/Selection";
import Info from "components/fragments/Info";
import Trends from "components/fragments/Trends";
import Page from "components/layouts/Page";

import {
  selectYear,
  selectGrade,
  selectLevel,
  selectId,
  selectSelectedName,
  setStateFromParams,
} from "store/selectSlice";
import {
  selectInfoData,
  setInfoDataRequest,
  setInfoDataSuccess,
  setInfoDataFailure,
  selectTrendData,
  setTrendDataRequest,
  setTrendDataSuccess,
  setTrendDataFailure,
} from "store/apiCacheSlice";
import { activateZoomOnMap, selectZoomOnMap } from "store/mapSlice";

import { Level, ApiStatus, InfoData, TrendData } from "interfaces";

import { getParamsInfo } from "utils";

export default function InfoPage() {
  const dispatch = useDispatch();

  const [paramsChecked, setParamsChecked] = useState(false);

  const level = useSelector(selectLevel);
  const year = useSelector(selectYear);
  const grade = useSelector(selectGrade);
  const id = useSelector(selectId);
  const title = useSelector(selectSelectedName);
  const infoDataStore = useSelector(selectInfoData);
  const trendDataStore = useSelector(selectTrendData);
  const zoomOnMap = useSelector(selectZoomOnMap);

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

  const infoKey = `${year}-${grade}-${levelId}-${id}`;
  const infoKeyCache = infoDataStore[infoKey];
  const isInfoKeyCached = typeof infoKeyCache !== "undefined";
  const infoDataCache = isInfoKeyCached ? infoKeyCache.data : null;
  const isInfoDataCached = typeof infoDataCache !== "undefined";

  const infoData = isInfoDataCached ? infoDataCache || [] : [];

  const isInfoDataLoading =
    !isInfoKeyCached ||
    (!isInfoDataCached && infoKeyCache.status !== ApiStatus.Failure) ||
    !paramsChecked;

  const trendKey = `${levelTable}-${id}`;
  const trendKeyCache = trendDataStore[trendKey];
  const isTrendKeyCached = typeof trendKeyCache !== "undefined";
  const trendDataCache = isTrendKeyCached ? trendKeyCache.data : null;
  const isTrendDataCached = typeof trendDataCache !== "undefined";

  const trendData = isTrendDataCached ? trendDataCache || [] : [];

  const isTrendDataLoading =
    !isTrendKeyCached ||
    (!isTrendDataCached && trendKeyCache.status !== ApiStatus.Failure) ||
    !paramsChecked;

  const isSchool = level == Level.School;

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
  }, [dispatch, paramsChecked]);

  useEffect(() => {
    if (level == Level.School) {
      return;
    }

    const abortController = new AbortController();

    const infoUrl = `/api/schools/?year=${year}&grade=${grade}&${levelId}=${id}`;

    dispatch(setInfoDataRequest(infoKey));

    axios
      .get<InfoData>(infoUrl, { signal: abortController.signal })
      .then((res) => {
        dispatch(setInfoDataSuccess({ key: infoKey, data: res.data }));
      })
      .catch((error) => {
        if (error.name !== "CanceledError") {
          dispatch(setInfoDataFailure(infoKey));
        }
      });

    return () => {
      abortController.abort();
    };
  }, [id, level, grade, year, dispatch, infoKey, levelId]);

  useEffect(() => {
    const abortController = new AbortController();

    const trendUrl = isSchool
      ? `/api/schools/?nces_id=${id}`
      : `/api/${levelTable}/${id}`;

    dispatch(setTrendDataRequest(trendKey));

    axios
      .get<TrendData>(trendUrl, { signal: abortController.signal })
      .then((res) => {
        dispatch(setTrendDataSuccess({ key: trendKey, data: res.data }));
      })
      .catch((error) => {
        if (error.name !== "CanceledError") {
          dispatch(setTrendDataFailure(trendKey));
        }
      });

    return () => {
      abortController.abort();
    };
  }, [id, level, dispatch, levelId, levelTable, trendKey, isSchool]);

  const infoDataDeduplicated = isSchool
    ? (trendData.filter(
        (td) => td.grade === grade && td.year === year
      ) as InfoData)
    : infoData;
  const isInfoDataLoadingDedepulicated = isSchool
    ? isTrendDataLoading
    : isInfoDataLoading;

  return (
    <>
      <Head title="Info" desc="Demographic Information" />
      <Selection />
      <Page>
        <div className="mx-auto mt-5">
          <Info
            infoData={infoDataDeduplicated}
            title={title}
            isLoading={isInfoDataLoadingDedepulicated}
          />
          <Trends trendData={trendData || []} isLoading={isTrendDataLoading} />
        </div>
      </Page>
    </>
  );
}
