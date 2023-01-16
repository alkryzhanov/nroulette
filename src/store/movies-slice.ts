import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { StatusValues } from "../constants";
import { MoviesState } from "../types";

const initialState: MoviesState = {
  status: "idle",
  movies: [],
  isLoading: false,
  errors: null,
};

export const fetchAllMovies = createAsyncThunk(
  "movies/fetchAllMovies",
  async (url: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${url}`);
      return res.data.data;
    } catch (e: any) {
      return rejectWithValue({ message: e.response.data });
    }
  },
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.pending, (state) => {
        state.status = StatusValues.LOADING;
      })
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        state.status = StatusValues.INITIAL;
        state.movies = action.payload;
      })
      .addCase(fetchAllMovies.rejected, (state, action) => {
        state.status = StatusValues.FAILED;
        // @ts-ignore
        state.errors = action.payload;
      });
  },
});
export default moviesSlice.reducer;
