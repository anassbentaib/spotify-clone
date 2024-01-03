import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/types";
import { Album } from "./albums";

interface PlayerState {
  currentTrackIndex: number;
  tracks: Track[];
  isPlaying: boolean;
}

const initialState: PlayerState = {
  currentTrackIndex: 0,
  tracks: [],
  isPlaying: false,
};

interface Artist {
  id: string;
  name: string;
}
export interface Track {
  id: string;
  name: string | null;
  artists: Artist[] | null;
  track_number: number;
  images: { url: string }[];
  favorited: boolean;
  added_at: string | null;
  album: Album[] | null;
  duration: string | null;
}

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayTrack: (state, action: PayloadAction<Track>) => {
      state.isPlaying = true;
      state.currentTrackIndex = action.payload.track_number;

      const currentTrackData = {
        added_at: action.payload.added_at,
        album: action.payload.album,
        artists: action.payload.artists,
        duration: action.payload.duration,
        id: action.payload.id,
        images: action.payload.images,
        name: action.payload.name,
      };

      const currentTrackDataString = JSON.stringify(currentTrackData);
      localStorage.setItem("currentTrackIndex", currentTrackDataString);
    },
    setPauseTrack: (state) => {
      state.isPlaying = false;
    },
    setCurrentTrackIndex: (state, action: PayloadAction<Track>) => {
      state.currentTrackIndex = action.payload.track_number;

      const currentTrackData = {
        added_at: action.payload.added_at,
        album: action.payload.album,
        artists: action.payload.artists,
        duration: action.payload.duration,
        id: action.payload.id,
        images: action.payload.images,
        name: action.payload.name,
      };

      const currentTrackDataString = JSON.stringify(currentTrackData);
      localStorage.setItem("currentTrackIndex", currentTrackDataString);
    },
  },
});

export const { setPlayTrack, setPauseTrack, setCurrentTrackIndex } =
  playerSlice.actions;

export const selectPlayer = (state: RootState) => state.player;

export default playerSlice.reducer;
