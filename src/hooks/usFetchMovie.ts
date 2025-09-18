import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/appStore";
import { type Movie, addGptMovies } from "../store/MovieSlice/movieSlice";
import { API_OPTIONS } from "../utils/constant";

const useFetchMovie = () => {
  const dispatch = useDispatch();

  const gptSearchResults = useSelector(
    (state: RootState) => state.gpt.gptSearchResults
  );

  const searchMovieInTMDB = useCallback(async (movieName: string): Promise<Movie[]> => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}`,
        API_OPTIONS
      );
      
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      
      const json = await data.json();

      if (json.results && json.results.length > 0) {
        return json.results;
      }
      
      return [];
    } catch (err) {
      console.error(`Error searching for movie: ${movieName}`, err);
      return [];
    }
  }, []);

  const fetchGptMovies = useCallback(async () => {
    if (!gptSearchResults || gptSearchResults.length === 0) {
      dispatch(addGptMovies([]));
      return;
    }

    try {
      const moviePromises = gptSearchResults.map((movieName) =>
        searchMovieInTMDB(movieName)
      );

      const movieArrays = await Promise.all(moviePromises);
      const allMovies = movieArrays.flat();
      dispatch(addGptMovies(allMovies));
    } catch (err) {
      console.error("Error fetching GPT movies:", err);
      dispatch(addGptMovies([]));
    }
  }, [gptSearchResults, searchMovieInTMDB, dispatch]);

  useEffect(() => {
    fetchGptMovies();
  }, [fetchGptMovies]); 
};

export default useFetchMovie;
