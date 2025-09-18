import { MOVIE_POSTER_BASE_URL } from "../utils/constant";
import type { Movie } from "../store/MovieSlice/movieSlice";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  if (!movie.poster_path) return null;

  return (
    <div className="w-36 md:w-48 pr-4 group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl">
        <img
          className="w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-90"
          alt={movie.title}
          src={`${MOVIE_POSTER_BASE_URL}${movie.poster_path}`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
          <p className="text-xs text-gray-300 mt-1 line-clamp-2">
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
