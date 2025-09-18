import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import useFetchMovie from "../hooks/usFetchMovie";
import MovieList from "./MovieList";
import type { RootState } from "../store/appStore";

export const GptMovieSuggestion = () => {
  const gptMovies = useSelector((state: RootState) => state.movie.gptMovies);
  const gptSearchResults = useSelector(
    (state: RootState) => state.gpt.gptSearchResults
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useFetchMovie();

  useEffect(() => {
    if (gptSearchResults && gptSearchResults.length > 0) {
      setIsLoading(true);
      setHasError(false);
    } else {
      setIsLoading(false);
    }
  }, [gptSearchResults]);

  useEffect(() => {
    if (gptMovies !== null) {
      setIsLoading(false);
      setHasError(false);
    }
  }, [gptMovies]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="px-6 py-8">
        <h1 className="text-lg md:text-3xl py-4 text-white mb-4">
          Finding Movies for You...
        </h1>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          <span className="ml-4 text-white text-lg">Searching movies...</span>
        </div>
      </div>
    );
  }

  // Show error state
  if (hasError) {
    return (
      <div className="px-6 py-8">
        <h1 className="text-lg md:text-3xl py-4 text-white mb-4">
          Movie Suggestions
        </h1>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-white text-xl mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-300">
              We couldn't fetch movie suggestions. Please try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!gptMovies || gptMovies.length === 0) {
    return (
      <div className="px-6 py-8">
        <h1 className="text-lg md:text-3xl py-4 text-white mb-4">
          Movie Suggestions
        </h1>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">🎬</div>
            <h2 className="text-white text-xl mb-2">No movies found</h2>
            <p className="text-gray-300">
              Try searching for different movies or check your search terms.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show movie suggestions
  return (
    <div className="px-6 py-8">
      <h1 className="text-lg md:text-3xl py-4 text-white mb-4">
        Recommended Movies
      </h1>
      <MovieList title="" movies={gptMovies} />
    </div>
  );
};
