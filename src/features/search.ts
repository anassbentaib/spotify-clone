// searchSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Track } from "./trackes";

interface SearchState {
  searchQuery: string;
  searchResults: Track[];
}

const initialState: SearchState = {
  searchQuery: "",
  searchResults: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<Track[]>) => {
      state.searchResults = action.payload;
    },
  },
});

export const { setSearchQuery, setSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
