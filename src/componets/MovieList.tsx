import MovieCard from "./MovieCard";
import type { Movie } from "../store/MovieSlice/movieSlice";

interface MovieListProps {
  title: string;
  movies: Movie[];
}

const MovieList = ({ title, movies }: MovieListProps) => {
  if (!movies) return null;

  return (
    <div className="px-6">
      {title && (
        <h1 className="text-lg md:text-3xl py-4 text-white font-bold">
          {title}
        </h1>
      )}
      <div className="flex overflow-x-auto scrollbar-hide pb-4">
        <div className="flex space-x-2">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
