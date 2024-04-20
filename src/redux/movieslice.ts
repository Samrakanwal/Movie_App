// src/features/moviesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as MovieAPI from '../api/MovieApi';

// Existing thunks for random movies and search
export const fetchRandomMovies = createAsyncThunk('movies/fetchRandomMovies', async () => {
  const response = await MovieAPI.fetchRandomMovies();
  return response.data.movies;
});

export const searchMovies = createAsyncThunk('movies/searchMovies', async (query: string) => {
  const response = await MovieAPI.searchMovies(query);
  return response.data.movies;
});

// Async thunk for fetching movie details
export const getMovieDetails = createAsyncThunk('movies/getMovieDetails', async (movieId: string) => {
  const response = await MovieAPI.getMovieDetails(movieId);
  return response.data.movie;
});

interface MovieState {
  movies: any[];
  selectedMovie?: any;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: MovieState = {
  movies: [],
  selectedMovie: undefined,
  status: 'idle',
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle state for random movies
      .addCase(fetchRandomMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRandomMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchRandomMovies.rejected, (state) => {
        state.status = 'failed';
      })
      // Handle state for search
      .addCase(searchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.status = 'idle';
      })
      .addCase(searchMovies.rejected, (state) => {
        state.status = 'failed';
      })
      // Handle state for movie details
      .addCase(getMovieDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.selectedMovie = action.payload;
        state.status = 'idle';
      })
      .addCase(getMovieDetails.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default moviesSlice.reducer;
