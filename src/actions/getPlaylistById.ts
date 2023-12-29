import { PlaylistsDetails } from "@/features/playlists";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { token } from "@/token";
import axios from "axios";
import { format } from "date-fns";

export const fetchPlaylistsById = createAsyncThunk<
  PlaylistsDetails,
  { id: string },
  { rejectValue: string }
>("playlists/getPlaylistsById", async ({ id }, { rejectWithValue }) => {
  try {
    if (!token.access_token) {
      throw new Error("Access token not available");
    }

    const playlistResponse = await axios.get(
      `https://api.spotify.com/v1/playlists/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    );

    const tracksResponse = await axios.get(
      `https://api.spotify.com/v1/playlists/${id}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    );

    const playlist: PlaylistsDetails = {
      id: playlistResponse.data.id,
      name: playlistResponse.data.name,
      images: playlistResponse.data.images,
      description: playlistResponse.data.description,
      tracks: tracksResponse.data.items.map((item: any, index: number) => ({
        id: item.track.id,
        name: item.track.name,
        artists: item.track.artists.map((artist: any) => ({
          id: artist.id,
          name: artist.name,
        })),
        album: item?.track?.album,

        track_number: index + 1,
        added_at: format(new Date(item.added_at), "d MMM yyyy"),
        duration: formatDuration(item.track.duration_ms),
        images: [{ url: item.track.album.images[0].url }],
      })),
    };
    function formatDuration(durationInMs: number): string {
      const minutes = Math.floor(durationInMs / 60000);
      const seconds = ((durationInMs % 60000) / 1000).toFixed(0);
      return `${minutes}:${(+seconds < 10 ? "0" : "") + seconds}`;
    }
    return playlist;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error?.message || "Unknown error";
    return rejectWithValue(errorMessage);
  }
});
