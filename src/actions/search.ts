import { token } from "@/token";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Track } from "@/features/trackes";
export const searchTracks = createAsyncThunk<
  Track[],
  string,
  { rejectValue: any }
>("search/searchTracks", async (query: string, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?type=track&q=${query}`,
      {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      }
    );
    return response.data.tracks.items;
  } catch (error) {
    console.error("Error searching tracks:", error);
    return rejectWithValue({
      message: "Failed to search tracks",
      error,
    });
  }
});
