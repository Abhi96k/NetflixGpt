import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    gptSearchQuery: "",
    gptSearchResults: [] as string[],
  },
  reducers: {
    toggleGptSearch: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    setGptSearchQuery: (state, action: { payload: string }) => {
      state.gptSearchQuery = action.payload;
    },
    setGptSearchResults: (state, action: { payload: string[] }) => {
      state.gptSearchResults = action.payload;
    },
  },
});

export const { toggleGptSearch, setGptSearchQuery, setGptSearchResults } = gptSlice.actions;
export default gptSlice.reducer;