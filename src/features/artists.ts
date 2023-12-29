import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Track } from "./playlists";
import { Album } from "./albums";

const initialState: ArtistState & ArtistDetailsState = {
  token: localStorage.getItem("spotify_token") || null,
  items: null,
  artistDetails: null,
};

export interface Artist {
  id: string;
  followers: string | null;
  name: string | null;
  type: string | null;
  creator?: string | null; // Add this line
  images: { url: string }[] | null;
}

export interface ArtistState {
  token: string | null;
  items: Artist[] | null;
}

export interface ArtistDetails {
  id: string;
  name: string | null;
  artists: Artist[] | null;
  track_number: number | null;
  tracks: Track[] | null;
  added_at: string | null;
  type: string | null;
  images: { url: string }[];
  album: Album[] | null;
}

export interface ArtistDetailsState {
  token: string | null;
  artistDetails: ArtistDetails | null;
}

const artistSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("spotify_token", action.payload || "");
    },
    setArtists: (state, action: PayloadAction<Artist[] | null>) => {
      state.items = action.payload;
    },
    setArtistDetails: (state, action: PayloadAction<ArtistDetails | null>) => {
      state.artistDetails = action.payload;
    },
  },
});

export const { setToken, setArtists, setArtistDetails } = artistSlice.actions;

export default artistSlice.reducer;
