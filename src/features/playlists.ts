import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Album } from "./albums";

const initialState: playlistState & playlistDetailsState = {
  token: localStorage.getItem("spotify_token") || null,
  items: null,
  playlisDetails: null,
};

export interface Track {
  id: string;
  name: string;
  artists: Artist[] | null;
  track_number: number | null;
  added_at: string | null;
  duration: string | null;
  images: { url: string }[];
  duration_ms: number | null;
  album: Album | null;
  creatore?: string 
}
export interface Artist {
  id: string;
  name: string;
  album: Album[] | null;
}
export interface Playlist {
  id: string;
  name: string | null;
  images: { url: string }[];
  description: string | null;
  type: string | null;
  creator: string | null;
}

export interface PlaylistsDetails {
  id: string;
  name: string | null;
  images: { url: string }[] | null;
  tracks: Track[] | null;
  description: string | null;
}

interface playlistState {
  token: string | null;
  items: Playlist[] | null;
}

interface playlistDetailsState {
  token: string | null;
  playlisDetails: PlaylistsDetails | null;
}

const playlistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("spotify_token", action.payload || "");
    },
    setPlayListData: (state, action: PayloadAction<Playlist[] | null>) => {
      state.items = action.payload;
    },
    setPlaylistDetails: (
      state,
      action: PayloadAction<PlaylistsDetails | null>
    ) => {
      state.playlisDetails = action.payload;
    },
  },
});

export const { setToken, setPlayListData, setPlaylistDetails } =
  playlistSlice.actions;

export default playlistSlice.reducer;
