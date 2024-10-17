import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPopularMovies } from '../lib/service/movies/movieSlice';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movies.popularMovies);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="font-pacifico mb-6 text-center text-4xl font-thin text-white">
        Movies
      </h1>
      {movies.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {movies.map((movie) => (
            <li
              className="group relative mx-auto flex w-fit cursor-pointer flex-col items-center"
              key={movie.imdbID}
            >
              <Link to={`moviedetails/${movie.imdbID}`}>
                <img
                  src={
                    movie.Poster !== 'N/A'
                      ? movie.Poster
                      : 'https://images.unsplash.com/photo-1620145648299-f926ac0a9470?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  }
                  alt={movie.Title}
                  className="h-90 w-64 rounded-lg bg-cover object-cover"
                />
              </Link>

              <span className="absolute bottom-0 left-0 right-0 z-10 hidden bg-gradient-to-t from-[#121212ac] to-[#00000000] py-5 text-center font-bold text-white group-hover:block group-hover:rounded-b-lg group-hover:duration-700">
                <span className="p-1">{movie.Title}</span>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex h-screen items-center justify-center text-center text-4xl text-gray-200">
          There are no Movies available.
        </div>
      )}
    </div>
  );
};

export default MovieList;
