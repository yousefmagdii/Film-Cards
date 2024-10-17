import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '2058f3b8';
const BASE_URL = 'http://www.omdbapi.com/';
const controller = new AbortController();

// Function to fetch detailed information for a specific movie by imdbID
const fetchMovieDetails = async (imdbID) => {
  const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`);
  return response.data;
};

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopularMovies',
  async () => {
    // Fetch the list of popular movies (basic information)
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=movie`, {
      signal: controller.signal,
    });

    const movies = response.data.Search; // List of movies from the first request

    // Fetch detailed information for each movie using imdbID
    const detailedMovies = await Promise.all(
      movies.map(async (movie) => {
        const movieDetails = await fetchMovieDetails(movie.imdbID);
        return movieDetails;
      }),
    );

    return detailedMovies; // Return the detailed movie information
  },
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    popularMovies: [], // Holds detailed movie information
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
        state.popularMovies = action.payload; // Store detailed movie info
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
