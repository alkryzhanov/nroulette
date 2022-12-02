import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { MOVIES_URL } from "../constants";

type MovieDetailsType = {
  title: string;
  vote_average: number;
  release_date: string;
  poster_path: string;
  overview: string;
  genres: string[];
  runtime: number;
};

type MovieState = {
  movieDetails: MovieDetailsType | null;
  isMovieDetailsLoading: boolean;
};

const initialState = {
  movieDetails: null,
  isMovieDetailsLoading: false,
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieById.pending, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.isMovieDetailsLoading = true;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.isMovieDetailsLoading = false;
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        state.movieDetails = action.payload;
      });
  },
});

export default movieDetailsSlice.reducer;
