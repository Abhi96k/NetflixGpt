import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovie";
import useUpcomingMovies from "../hooks/useUpComingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import { GptSearch } from "./GptSearch";
import { useSelector } from "react-redux";
import type { RootState } from "../store/appStore";

const Browse = () => {
  const showGptSearch = useSelector(
    (state: RootState) => state.gpt.showGptSearch
  );
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};
export default Browse;
