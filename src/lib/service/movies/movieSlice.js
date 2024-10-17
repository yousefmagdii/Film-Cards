import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '2058f3b8';
const BASE_URL = 'https://www.omdbapi.com/';
const controller = new AbortController();

const fetchMovieDetails = async (imdbID) => {
  const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`);
  return response.data;
};

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopularMovies',
  async () => {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=movie`, {
      signal: controller.signal,
    });

    const movies = response.data.Search;

    const detailedMovies = await Promise.all(
      movies.map(async (movie) => {
        const movieDetails = await fetchMovieDetails(movie.imdbID);
        return movieDetails;
      }),
    );

    return detailedMovies;
  },
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    popularMovies: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.popularMovies = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.error('Error fetching popular movies:', action.error);
      });
  },
});

export default movieSlice.reducer;
