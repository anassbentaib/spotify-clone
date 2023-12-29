import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/types";

interface Artist {
  id: string;
  name: string;
}
interface Track {
  id: string;
  name: string | null;
  artists: Artist[] | null;
  track_number: number;
  images: { url: string }[];
  favorited: boolean;
}

interface PlayerState {
  isPlaying: boolean;
  currentTrack: Track | null;
}

const initialState: PlayerState = {
  isPlaying: false,
  currentTrack: null,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayTrack: (state, action: PayloadAction<Track>) => {
      state.isPlaying = true;
      state.currentTrack = action.payload;
    },
    setPauseTrack: (state, action: PayloadAction<Track>) => {
      state.isPlaying = false;
      state.currentTrack = action.payload;
    },
    setCurrentTrack: (state, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
    },
  },
});

export const { setPlayTrack, setPauseTrack, setCurrentTrack } =
  playerSlice.actions;
export const selectPlayer = (state: RootState) => state.player;

export default playerSlice.reducer;
