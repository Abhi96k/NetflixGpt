import useMovieTrailer from "../hooks/useMovieTrailer";

interface VideoBackgroundProps {
  movie_id: number;
}

const VideoBackground = ({ movie_id }: VideoBackgroundProps) => {
  const trailerVideo = useMovieTrailer(movie_id);
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {trailerVideo ? (
        <iframe
          className="w-full h-full object-cover"
          src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&loop=1&playlist=${trailerVideo.key}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`}
          title="Movie Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-xl">Loading trailer...</p>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent"></div>
    </div>
  );
};

export default VideoBackground;
