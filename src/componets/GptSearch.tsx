import { GptSearchBar } from "./GptSearchBar";
import { GptMovieSuggestion } from "./GptMovieSuggestion";
import { BACKGROUND_IMAGE } from "../utils/constant";

export const GptSearch = () => {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 w-full h-full">
        <img
          src={BACKGROUND_IMAGE}
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 pt-20">
        <GptSearchBar />
        <GptMovieSuggestion />
      </div>
    </div>
  );
};
