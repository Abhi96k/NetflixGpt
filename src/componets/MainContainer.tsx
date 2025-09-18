import { useSelector } from "react-redux";
import type { RootState } from "../store/appStore";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

function MainContainer() {
  const movies = useSelector(
    (state: RootState) => state.movie.nowPlayingMovies
  );

  if (!movies) return null;
  const movie = movies?.[0];
  console.log(movie);
  const { original_title, overview, popularity, title, id } = movie;
  return (
    <div>
      <VideoTitle
        original_title={original_title}
        overview={overview}
        popularity={popularity}
        title={title}
      />
      <VideoBackground movie_id={id} />
    </div>
  );
}

export default MainContainer;
