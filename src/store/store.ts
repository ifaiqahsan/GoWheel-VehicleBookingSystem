import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./slices/carSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cars: carReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];