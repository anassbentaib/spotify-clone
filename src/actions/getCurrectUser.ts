import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "@/api/index";
import { token } from "@/token";

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await api.getUserInfo(token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCurrentUser = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [user, setUser] = useState({
    userId: null,
    userUrl: null,
    name: null,
    imageUrl: null,
  });

  useEffect(() => {
    const checkExpirationAndRedirect = () => {
      const expirationTime = token?.expires_in
        ? Number(token.expires_in) * 1000
        : 0;
      const loginTime = localStorage.getItem("loginTime");
      const currentTime = new Date().getTime();

      if (
        loginTime !== null &&
        currentTime - Number(loginTime) > expirationTime
      ) {
        localStorage.removeItem("spotify_token");
        window.location.href = "/login";
      }
    };

    if (token && token.access_token) {
      localStorage.setItem("loginTime", new Date().getTime().toString());
      checkExpirationAndRedirect();
      dispatch(fetchUserInfo(token.access_token))
        .then((resultAction) => {
          if (fetchUserInfo.fulfilled.match(resultAction)) {
            const userInfo = {
              userId: resultAction.payload.id,
              userUrl: resultAction.payload.external_urls.spotify,
              name: resultAction.payload.display_name,
              imageUrl:
                resultAction.payload.images.length > 0
                  ? resultAction.payload.images[0].url
                  : null,
            };

            setUser(userInfo);
          } else if (fetchUserInfo.rejected.match(resultAction)) {
            console.error(resultAction.error);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [dispatch, token?.access_token, currentUser]);

  return { user };
};
