import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
// import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    // user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
