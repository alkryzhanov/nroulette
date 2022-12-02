import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { MOVIES_URL } from "../constants";

type MovieType = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  genres: [];
};

type MoviesType = MovieType[];

type MoviesState = {
  movies: MoviesType;
  isLoading: boolean;
  error: string;
};

const initialState = {
  movies: [],
  isLoading: false,
  error: "",
} as MoviesState;

export const fetchAllMovies = createAsyncThunk(
  "movies/fetchAllMovies",
  async (query: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${MOVIES_URL}?&sortOrder=asc${query}`);
      return res.data.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  },
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.pending, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = true;
      })
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = false;
        // eslint-disable-next-line no-param-reassign
        state.movies = action.payload;
      })
      .addCase(fetchAllMovies.rejected, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = false;
        // eslint-disable-next-line no-param-reassign
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        state.error = action.payload;
      });
  },
});

export default moviesSlice.reducer;
