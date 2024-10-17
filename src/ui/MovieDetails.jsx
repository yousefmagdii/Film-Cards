import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularMovies } from '../lib/service/movies/movieSlice';

const MovieDetails = () => {
  const dispatch = useDispatch();

  const [movieDetails, setMovieDetails] = useState(null);
  const { imdbID } = useParams();
  //   console.log('pass', imdbID);
  const movies = useSelector((state) => state.movies.popularMovies);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);
  const foundMovie = movies.find((movie) => movie.imdbID === imdbID);
  console.log(foundMovie);
  useEffect(() => {
    dispatch(fetchPopularMovies());
    setMovieDetails(foundMovie || {});
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="relative flex h-dvh items-center justify-center overflow-hidden">
        <div className="absolute -inset-1 z-0 bg-cover bg-center blur-xl filter">
          <img
            src={movieDetails.Poster}
            alt="Background"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="container z-10 mx-auto p-4 md:p-6">
          <div className="flex flex-col items-center justify-center bg-black bg-opacity-60 md:flex-row">
            <img
              src={
                movieDetails.Poster !== 'N/A'
                  ? movieDetails.Poster
                  : 'default-poster-url'
              }
              alt={movieDetails.Title}
              className="w-full max-w-[13rem] rounded-lg p-3 md:max-w-[200px] lg:max-w-[250px]"
            />
            <div className="font-pacifico m-auto text-center text-sm leading-10 text-white md:ml-6 md:text-left md:text-base">
              <h1 className="mb-4 text-3xl font-bold text-red-600 md:text-5xl">
                {movieDetails.Title}
              </h1>
              <p className="hidden sm:block">
                <strong className="text-sm md:text-xl">Year:</strong>
                {movieDetails.Year}
              </p>
              <p>
                <strong className="text-sm md:text-xl">Genre:</strong>
                {movieDetails.Genre}
              </p>
              <p className="hidden sm:block">
                <strong className="text-sm md:text-xl">Director:</strong>
                {movieDetails.Director}
              </p>
              <p className="max-w-[50rem] px-5 sm:px-0">
                <strong className="text-sm md:text-xl">Plot:</strong>
                {movieDetails.Plot}
              </p>
              <p className="hidden sm:block">
                <strong className="text-sm font-light md:text-xl">
                  IMDB Rating:
                </strong>
                {movieDetails.Metascore / 10}
              </p>
              <p className="hidden sm:block">
                <strong className="text-sm md:text-xl">Duration:</strong>
                {movieDetails.Runtime}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
