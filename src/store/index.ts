import { configureStore } from "@reduxjs/toolkit";
import movies from "./movies-slice";
import movie from "./movie-details-slice";
import modal from "./modal-slice";

const store = configureStore({
  reducer: {
    movies,
    movie,
    modal,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
