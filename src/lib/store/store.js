import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../service/movies/movieSlice';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});
