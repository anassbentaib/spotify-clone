import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState: TrackState & FavoriteState = {
  token: localStorage.getItem("spotify_token") || null,
  items: null,
  favorits: JSON.parse(localStorage.getItem("favorits") || "[]"),
};
  export interface Track {
    id: string;
    name: string | null;
    artists: Artist[] | null;
    track_number: number;
    images: { url: string }[];
    favorited: boolean;
    creator?: string | null;
  }
export interface Favorites {
  id: string;
  name: string | null;
  artists: Artist[];
  track_number: number;
  images: { url: string }[];
  favorited: boolean;
}
export interface Image {
  url: string;
}
export interface Artist {
  id: string;
  name: string;
}

interface TrackState {
  token: string | null;
  items: Track[] | null;
}
interface FavoriteState {
  token: string | null;
  favorits: Favorites[] | null;
}

const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("spotify_token", action.payload || "");
    },
    setTrackData: (state, action: PayloadAction<Track[] | null>) => {
      state.items = action.payload;
    },

    addToFavorites: (state, action: PayloadAction<Favorites>) => {
      state?.favorits?.push(action.payload);
      localStorage.setItem("favorits", JSON.stringify(state?.favorits || []));
    },
    removeFromFavorites: (state, action: PayloadAction<Favorites | null>) => {
      if (state.favorits !== null && action.payload !== null) {
        state.favorits = state.favorits.filter(
          (track) => track && track.id !== action?.payload?.id
        );
        localStorage.setItem("favorits", JSON.stringify(state?.favorits || []));
      }
    },
  },
});

export const { setToken, setTrackData, removeFromFavorites, addToFavorites } =
  tracksSlice.actions;

export default tracksSlice.reducer;
