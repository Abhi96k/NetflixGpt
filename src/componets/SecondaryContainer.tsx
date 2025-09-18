import type { RootState } from "../store/appStore";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

function SecondaryContainer() {
  const movies = useSelector(
    (state: RootState) => state.movie.nowPlayingMovies
  );
  const popularMovies = useSelector(
    (state: RootState) => state.movie.popularMovies
  );
  const topRatedMovies = useSelector(
    (state: RootState) => state.movie.topRatedMovies
  );

  const upcomingMovies = useSelector(
    (state: RootState) => state.movie.upcomingMovies
  );

  return (
    <div className="bg-black">
      <div className="-mt-52 pl-12 relative z-20">
        {movies && <MovieList title="Now Playing" movies={movies} />}

        {popularMovies && <MovieList title="Popular" movies={popularMovies} />}

        {topRatedMovies && (
          <MovieList title="Top Rated" movies={topRatedMovies} />
        )}
        {upcomingMovies && (
          <MovieList title="Upcoming" movies={upcomingMovies} />
        )}
      </div>
    </div>
  );
}
export default SecondaryContainer;
