import { createSlice } from "@reduxjs/toolkit";

export interface User {
  token: string | null;
  userData: any;
}


const initialState: User = {
  token: localStorage.getItem("spotify_token") || null,
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("spotify_token", action.payload || "");
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.userData = null;
      localStorage.removeItem("spotify_token");
    },
  },
});

export const { setToken, setUserData, logout } = userSlice.actions;

export default userSlice.reducer;
