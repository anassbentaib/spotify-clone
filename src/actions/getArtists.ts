import { Artist, ArtistDetails } from "@/features/artists";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "@/api/index";
import { token } from "@/token";
import axios from "axios";

export const fetchAllArtists = createAsyncThunk<
  Artist[],
  string,
  { rejectValue: any }
>("artists/getArtists", async (token: string, { rejectWithValue }) => {
  try {
    const response = await api.fetchArtists(token);

    const asrtists: Artist[] = response?.data?.artists?.items.map(
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
});
export const getArtistTracks = createAsyncThunk<
  ArtistDetails,
  { id: string },
  { rejectValue: { message: string } }
>("artists/getArtistTracks", async ({ id }, { rejectWithValue }) => {
  try {
    if (!token?.access_token) {
      console.log("Token is required");
    }

    const Tracksresponse = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`,
      {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      }
    );


    return Tracksresponse.data;
    
  } catch (error: any) {
    return rejectWithValue({ message: error.message });
  }
});
