import { useEffect, useCallback } from "react";
import { addTrailerVideo } from "../store/MovieSlice/movieSlice";
import { API_OPTIONS } from "../utils/constant";
import type { RootState } from "../store/appStore";
import { useDispatch, useSelector } from "react-redux";


const useMovieTrailer = (movie_id: number) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((state: RootState) => state.movie.trailerVideo);
  const getMovieVideo = useCallback(async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}/videos`,
        API_OPTIONS
      );
      const json = await data.json();

      const trailer = json.results?.find(
        (video: { type: string; site: string }) => video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        dispatch(addTrailerVideo(trailer));
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  }, [movie_id, dispatch]);

  useEffect(() => {
    getMovieVideo();
  }, [getMovieVideo]);

  return trailerVideo;
};

export default useMovieTrailer;