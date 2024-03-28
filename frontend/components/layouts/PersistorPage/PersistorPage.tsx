import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectPersistorHydrationState,
  selectRehydrated,
  activateRehydrated,
} from "store/hydrateSlice";
import { activateZoomOnMap, selectZoomOnMap } from "store/mapSlice";
import { AppDispatch } from "store/store";

interface Props {
  children: React.ReactNode;
}

export default function Page({ children }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const persistorRehydrated = useSelector(selectPersistorHydrationState);
  const rehydrated = useSelector(selectRehydrated);

  useEffect(() => {
    if (persistorRehydrated && !rehydrated) {
      dispatch(activateRehydrated());
    }
  }, [rehydrated, persistorRehydrated, dispatch]);

  const zoomOnMap = useSelector(selectZoomOnMap);

  useEffect(() => {
    if (!zoomOnMap) {
      dispatch(activateZoomOnMap());
    }
  }, [dispatch, zoomOnMap]);

  return <>{children}</>;
}
