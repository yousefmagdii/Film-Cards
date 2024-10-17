import React from 'react';
import MovieList from './ui/MovieList';
import Navbar from './ui/navbar';
import MovieDetails from './ui/MovieDetails';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './ui/AppLayout';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { element: <MovieList />, path: '/' },
      { element: <MovieDetails />, path: 'moviedetails/:imdbID' },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
