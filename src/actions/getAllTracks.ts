import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "@/api/index";
import { Favorites, Track } from "@/features/trackes";
import { format } from "date-fns";
import { token } from "@/token";
import axios from "axios";

export const fetchAllTracks = createAsyncThunk<
  Track[],
  string,
  { rejectValue: any }
>("tracks/getAllTracks", async (token: string, { rejectWithValue }) => {
  try {
    const response = await api.fetchAllTracks(token);

    const tracks: Track[] = response?.data?.items.map(
      (item: any, index: number) => ({
        id: item.track.id,
        name: item.track.name,
        artists: item.track.artists.map((artist: any) => ({
          id: artist.id,
          name: artist.name,
        })),
        track_number: index + 1,
        duration_ms: formatDuration(item.track.duration_ms),
        added_at: format(new Date(item.added_at), "d MM yyyy"),
        type: item.track.type,
        images: [{ url: item.track.album.images[0].url }],
      })
    );
    function formatDuration(durationInMs: number): string {
      const minutes = Math.floor(durationInMs / 60000);
      const seconds = ((durationInMs % 60000) / 1000).toFixed(0);
      return `${minutes}:${(+seconds < 10 ? "0" : "") + seconds}`;
    }
    return tracks;
  } catch (error) {
    return rejectWithValue(error);
  }
});
// Update the addTrackToFavorites and removeTrackFromFavorites thunks to accept an object with the 'id' property
export const addTrackToFavorites = createAsyncThunk<
  Favorites,
  { id: string },
  { rejectValue: any }
>("tracks/addTrackToFavorites", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/tracks?ids=${id}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    );

    // Set the 'favorited' property to true in the response
    const addedFavorite = { ...response.data, favorited: true };
    return addedFavorite;
  } catch (error) {
    console.error("Error adding to Spotify favorites:", error);
    return rejectWithValue({
      message: "Failed to add track to favorites",
      error,
    });
  }
});

export const removeTrackFromFavorites = createAsyncThunk<
  Favorites,
  { id: string },
  { rejectValue: any }
>("tracks/removeTrackFromFavorites", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axios.delete(
      `https://api.spotify.com/v1/me/tracks?ids=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    );

    // Set the 'favorited' property to false in the response
    const removedFavorite = { ...response.data, favorited: false };
    return removedFavorite;
  } catch (error) {
    console.error("Error removing from Spotify favorites:", error);
    return rejectWithValue({
      message: "Failed to remove track from favorites",
      error,
    });
  }
});
