interface VideoTitleProps {
  original_title: string;
  overview: string;
  popularity: number;
  title: string;
}

function VideoTitle({
  original_title,
  overview,
  popularity,
  title,
}: VideoTitleProps) {
  return (
    <div className="absolute top-[20%] p-6 md:p-12 text-white z-10">
      <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-2 text-shadow-lg">
        {title}
      </h1>
      <p className="text-sm md:text-lg text-gray-300 mb-4 italic">
        {original_title}
      </p>
      <p className="text-sm md:text-lg w-full md:w-1/2 lg:w-2/3 mb-6 leading-relaxed">
        {overview}
      </p>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-yellow-400 font-semibold">
          ⭐ {popularity.toFixed(1)}
        </span>
        <span className="text-gray-400">Popularity Score</span>
      </div>
      <div className="flex gap-4">
        <button className="bg-white text-black px-6 py-2 md:px-8 md:py-3 rounded-md font-semibold hover:bg-opacity-80 transition-all duration-200 flex items-center gap-2">
          <span className="text-lg">▶</span>
          Play
        </button>
        <button className="bg-gray-600 bg-opacity-70 text-white px-6 py-2 md:px-8 md:py-3 rounded-md font-semibold hover:bg-opacity-80 transition-all duration-200 flex items-center gap-2">
          <span className="text-lg">ℹ</span>
          More Info
        </button>
      </div>
    </div>
  );
}

export default VideoTitle;
