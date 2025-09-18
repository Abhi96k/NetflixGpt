import languages from "../utils/language";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../store/ConfigSlice/ConfigSlice";
import type { RootState } from "../store/appStore";
import { generateContent } from "../utils/Gemini";
import { useState } from "react";
import {
  setGptSearchQuery,
  setGptSearchResults,
} from "../store/GptSlice/GptSlice";
export const GptSearchBar = () => {
  const selectedLanguage = useSelector(
    (state: RootState) => state.config.language
  );

  const dispatch = useDispatch();
  const gptSearchQuery = useSelector(
    (state: RootState) => state.gpt.gptSearchQuery
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeLanguage(e.target.value as keyof typeof languages));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gptSearchQuery.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const prompt = `
I want you to act as a movie recommendation system. I will give you a movie name, and you will suggest 5 similar movies.
Only return the movie names, each on a new line, nothing else.
Movie name: ${gptSearchQuery}
`;

      const response = await generateContent(prompt);
      const movieArray = response
        .split("\n")
        .map((movie) => movie.trim())
        .filter((movie) => movie.length > 0);

      //output of movieArray
      //["movie1","movie2","movie3","movie4","movie5"]

      console.log("Movie Array:", movieArray);

      dispatch(setGptSearchResults(movieArray));
    } catch (err) {
      console.error("Error:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to get movie recommendations. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-8 pb-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            GPT Movie Search
          </h1>
          <p className="text-lg md:text-xl text-white">
            Discover your next favorite movie with AI-powered recommendations
          </p>
        </div>

        <form className="max-w-2xl mx-auto" onSubmit={handleSearch}>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={gptSearchQuery}
              onChange={(e) => dispatch(setGptSearchQuery(e.target.value))}
              placeholder={
                languages[selectedLanguage as keyof typeof languages]
                  .gptSearchPlaceholder
              }
              className="flex-1 px-6 py-4 bg-white bg-opacity-90 text-gray-900 placeholder-gray-600 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white text-lg shadow-lg"
              disabled={isLoading}
            />
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="px-4 py-4 bg-white bg-opacity-90 text-gray-900 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white text-lg shadow-lg cursor-pointer"
              disabled={isLoading}
            >
              <option value="en">English</option>
              <option value="hindi">हिन्दी</option>
              <option value="spanish">Español</option>
            </select>
            <button
              className={`px-8 py-4 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-lg whitespace-nowrap ${
                isLoading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              type="submit"
              disabled={isLoading || !gptSearchQuery.trim()}
            >
              {isLoading
                ? "Searching..."
                : languages[selectedLanguage as keyof typeof languages].search}
            </button>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
