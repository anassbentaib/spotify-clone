import { Track } from "@/features/trackes";
import { token } from "@/token";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPrevTrack = createAsyncThunk<Track>(
  "play/PrevTrack",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://api.spotify.com/v1/me/player/previous",
        {},
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getNextTrack = createAsyncThunk<Track>(
  "play/NextTrack",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://api.spotify.com/v1/me/player/next",
        {},
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const PauseTrack = createAsyncThunk<Track>(
  "play/pauseTrack",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "https://api.spotify.com/v1/me/player/pause",
        {},
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const PlayTrack = createAsyncThunk<Track>(
  "play/playTrack",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "https://api.spotify.com/v1/me/player/play",
        {},
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log("error", error);

      return rejectWithValue(error);
    }
  }
);

export const getCurrentyPlayingTrack = createAsyncThunk<Track>(
  "play/getCurrentyPlayingTrack",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getRecentlyPlayedTrack = createAsyncThunk<Track>(
  "play/getRecentlyPlayedTrack",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/recently-played",
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
