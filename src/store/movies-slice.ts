import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
};

const initialState = {
  movies: [],
  isLoading: false,
} as MoviesState;

export const fetchAllMovies = createAsyncThunk(
  "movies/fetchAllMovies",
  async () => {
    const res = await axios.get("http://localhost:4000/movies");
    return res.data.data;
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
      });
  },
});

export default moviesSlice.reducer;
