import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { MOVIES_URL, StatusValues } from "../constants";
import { MovieDetailsType, MovieState } from "../types";
import { getErrors } from "../helpers";

const initialState: MovieState = {
  movieStatus: "idle",
  movieDetails: null,
  isMovieDetailsLoading: false,
  movieErrors: null,
  movieId: "",
};

export const fetchMovieById = createAsyncThunk(
  "movie/fetchMovieById",
  async (movieId: number) => {
    const res = await axios.get(`${MOVIES_URL}/${movieId}`);
    return res.data;
  },
);

export const fetchMovieToEdit = createAsyncThunk(
  "movie/fetchMovieToEdit",
  // eslint-disable-next-line consistent-return
  async (movieId: number, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${MOVIES_URL}/${movieId}`);

      return res.data;
    } catch (e) {
      const err = e as AxiosError;
      const { data, status } = err.response as AxiosResponse;

      if (status === 404) {
        return rejectWithValue({ message: data });
      }
      return rejectWithValue({ message: err.message });
    }
  },
);

export const addNewMovie = createAsyncThunk(
  "movie/addNewMovie",
  // eslint-disable-next-line consistent-return
  async (movie: MovieDetailsType, { rejectWithValue }) => {
    try {
      await axios.post(`${MOVIES_URL}`, movie);
    } catch (e) {
      const err = e as AxiosError;
      const { data, status } = err.response as AxiosResponse;

      if (status === 400) {
        return rejectWithValue(getErrors(data.messages));
      }
      return rejectWithValue({ message: err.message });
    }
  },
);

export const updateMovie = createAsyncThunk(
  "movie/updateMovie",
  // eslint-disable-next-line consistent-return
  async (editedMovie: MovieDetailsType, { rejectWithValue }) => {
    try {
      await axios.put(`http://localhost:4000/movies`, editedMovie);
    } catch (e) {
      const err = e as AxiosError;
      const { data, status, statusText } = err.response as AxiosResponse;

      if (status === 400) {
        return rejectWithValue(getErrors(data.messages));
      }
      if (status === 404) {
        return rejectWithValue({ messages: statusText });
      }
      return rejectWithValue({ message: err.message });
    }
  },
);

export const deleteMovie = createAsyncThunk(
  "movie/deleteMovie",
  // eslint-disable-next-line consistent-return
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${MOVIES_URL}/${id}`);
    } catch (e) {
      const err = e as AxiosError;
      const { status, statusText } = err.response as AxiosResponse;

      if (status === 404) {
        return rejectWithValue({ messages: statusText });
      }
      return rejectWithValue({ message: err.message });
    }
  },
);

const movieDetailsSlice = createSlice({
  name: "movie details",
  initialState,
  reducers: {
    hideMovieDetails: (state) => {
      state.movieDetails = null;
    },
    setMovieStatus: (state, action) => {
      state.movieStatus = action.payload;
    },
    setMovieId: (state, action) => {
      state.movieId = action.payload;
    },
    resetMovieDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieById.pending, (state) => {
        state.isMovieDetailsLoading = true;
        state.movieDetails = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.isMovieDetailsLoading = false;
        state.movieDetails = action.payload;
      })
      .addCase(fetchMovieToEdit.pending, (state) => {
        state.movieStatus = StatusValues.LOADING;
      })
      .addCase(fetchMovieToEdit.fulfilled, (state, action) => {
        state.movieStatus = StatusValues.SUCCEEDED;
        state.movieDetails = action.payload;
      })
      .addCase(addNewMovie.fulfilled, (state) => {
        state.movieStatus = StatusValues.ADDED;
      })
      .addCase(addNewMovie.rejected, (state, action) => {
        state.movieStatus = StatusValues.FAILED;
        // @ts-ignore
        state.movieErrors = action.payload;
      })
      .addCase(updateMovie.fulfilled, (state) => {
        state.movieStatus = StatusValues.UPDATED;
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.movieStatus = StatusValues.FAILED;
        // @ts-ignore
        state.movieErrors = action.payload;
      })
      .addCase(deleteMovie.fulfilled, (state) => {
        state.movieStatus = StatusValues.DELETED;
      })
      .addCase(deleteMovie.rejected, (state) => {
        state.movieStatus = StatusValues.FAILED;
      });
  },
});

export const { setMovieStatus, resetMovieDetails, setMovieId } =
  movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;
