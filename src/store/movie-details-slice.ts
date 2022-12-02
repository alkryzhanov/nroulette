import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { MOVIES_URL } from "../constants";
import { MovieState } from "../types";

const initialState = {
  movieDetails: null,
  isMovieDetailsLoading: false,
  isMovieDetailsShow: false,
} as MovieState;

export const fetchMovieById = createAsyncThunk(
  "users/fetchMovieById",
  async (movieId: number) => {
    const res = await axios.get(`${MOVIES_URL}/${movieId}`);
    return res.data;
  },
);

const movieDetailsSlice = createSlice({
  name: "movie details",
  initialState,
  reducers: {
    // eslint-disable-next-line no-param-reassign
    showMovieDetails: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isMovieDetailsShow = true;
    },
    // eslint-disable-next-line no-param-reassign
    hideMovieDetails: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isMovieDetailsShow = false;
      // eslint-disable-next-line no-param-reassign
      state.movieDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieById.pending, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.isMovieDetailsLoading = true;
        // eslint-disable-next-line no-param-reassign
        state.movieDetails = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.isMovieDetailsLoading = false;
        // eslint-disable-next-line no-param-reassign
        state.isMovieDetailsShow = true;
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        state.movieDetails = action.payload;
      });
  },
});

export const { showMovieDetails, hideMovieDetails } = movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;
