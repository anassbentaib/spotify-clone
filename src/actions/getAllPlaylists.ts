import { Playlist } from "@/features/playlists";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "@/api/index";
import { token } from "@/token";
import { ArtistDetails } from "@/features/artists";

export const fetchPlaylists = createAsyncThunk<
  Playlist[],
  string,
  { rejectValue: any }
>("playlists/getPlaylists", async (token: string, { rejectWithValue }) => {
  try {
    const response = await api.fetchPlaylists(token);
    const playlists: Playlist[] = response?.data?.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      type: item.type,
      creator: item?.owner?.display_name,
      images: item.images.length > 0 ? [{ url: item.images[0].url }] : [],
    }));

    return playlists;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const fetchPlaylistsByUserId = createAsyncThunk<
  ArtistDetails,
  string,
  { rejectValue: any }
>("artists/getTracksByArtits", async (id: string, { rejectWithValue }) => {
  try {
    if (!token.access_token) {
      return rejectWithValue("access_token is required");
    }
    try {
      const response = await api.fetchPlaylistByUserId(token.access_token, id);

      const asrtists: ArtistDetails = response?.data?.artists?.items.map(
        (item: any) => ({
          id: item?.id,
          name: item?.name,
          followers: item?.followers,
          images: [{ url: item?.images[0]?.url }],
          type: item?.type,
        })
      );

      return asrtists;
    } catch (error) {
      return rejectWithValue(error);
    }
  } catch (error) {
    return rejectWithValue(error);
  }
});
