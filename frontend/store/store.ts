import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { getPersistConfig } from "redux-deep-persist";

import { selectSlice } from "./selectSlice";
import { apiCacheSlice } from "./apiCacheSlice";
import { mapSlice } from "./mapSlice";

const rootReducer = combineReducers({
  [selectSlice.name]: selectSlice.reducer,
  [apiCacheSlice.name]: apiCacheSlice.reducer,
  [mapSlice.name]: mapSlice.reducer,
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

export const makeStore = () => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    return {
      ...makeConfiguredStore(),
      __persistor: null,
    };
  } else {
    const persistConfig = getPersistConfig({
      key: "root",
      storage,
      version: 1,
      blacklist: ["select.grade", "select.year", "apiCache", "map"],
      rootReducer,
    });

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    const store = configureStore({
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== "production",
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    });

    const newStore = {
      ...store,
      __persistor: persistStore(store),
    };

    return newStore;
  }
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore);
