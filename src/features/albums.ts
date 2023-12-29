import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: AlbumsState = {
  token: localStorage.getItem("spotify_token") || null,
  items: null,
};

export interface Album {
  id: string;
  name: string | null;
  type: string | null;
  added_at: string | null;
  images: { url: string }[] | null;
  release_date: string | null;
  creator?: string | null;
}

interface AlbumsState {
  token: string | null;
  items: Album[] | null;
}

const albumSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("spotify_token", action.payload);
    },
    setItems: (state, action: PayloadAction<Album[] | null>) => {
      state.items = action.payload;
    },
  },
});

export const { setToken, setItems } = albumSlice.actions;

export default albumSlice.reducer;
