import { configureStore } from "@reduxjs/toolkit";
import movies from "./movies-slice";
import movie from "./movie-details-slice";

const store = configureStore({
  reducer: {
    movies,
    movie,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
