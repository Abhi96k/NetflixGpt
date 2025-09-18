import { createSlice } from "@reduxjs/toolkit";

interface TrailerVideo {
  key: string;
  type: string;
  site: string;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  original_title: string;
  overview: string;
  popularity: number;
}

interface MovieState {
  nowPlayingMovies: Movie[] | null;
  trailerVideo: TrailerVideo | null;
  popularMovies: Movie[] | null;
  topRatedMovies: Movie[] | null;
  upcomingMovies: Movie[] | null;
  gptMovies: Movie[] | null;
}

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    nowPlayingMovies: null,
    trailerVideo: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    gptMovies: null,
  } as MovieState,
  reducers: {
    addNowPlayingMovies: (state, action: { payload: Movie[] }) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailerVideo: (state, action: { payload: TrailerVideo }) => {
      state.trailerVideo = action.payload;
    },
    addPopularMovies: (state, action: { payload: Movie[] }) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action: { payload: Movie[] }) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action: { payload: Movie[] }) => {
      state.upcomingMovies = action.payload;
    },
    addGptMovies: (state, action: { payload: Movie[] }) => {
      state.gptMovies = action.payload;
    },
  },
});

export const { addNowPlayingMovies, addTrailerVideo, addPopularMovies, addTopRatedMovies, addUpcomingMovies, addGptMovies } = movieSlice.actions;

export type { TrailerVideo, Movie, MovieState };
export default movieSlice.reducer;