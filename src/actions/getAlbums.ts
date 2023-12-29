import { Album } from "@/features/albums";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "@/api/index";
import { format } from "date-fns";

export const fetchAllAlbums = createAsyncThunk<
  Album[],
  string,
  { rejectValue: any }
>("albums/getAllAlbums", async (token: string, { rejectWithValue }) => {
  try {
    const response = await api.getAllAlbums(token);

    const albums: Album[] = response?.data?.items?.map((item: any) => ({
      id: item?.album?.id,
      name: item?.album?.name,
      type: item?.album?.type,
      added_at: format(new Date(item?.added_at), "d MMM yyyy"),
      images: [{ url: item?.album?.images[0]?.url }],
    }));
    return albums;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error);
  }
});
