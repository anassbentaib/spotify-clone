import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user";
import allTrackesReducers from "./features/trackes";
import playlistReducers from "./features/playlists";
import AlbumsReducers from "./features/albums";
import ArtistsReducers from "./features/artists";
import searchReducers from "./features/search";
import playerReducer from './features/player'

const store = configureStore({
  reducer: {
    user: userReducer,
    tracks: allTrackesReducers,
    albums: AlbumsReducers,
    artists: ArtistsReducers,
    playlists: playlistReducers,
    searchs : searchReducers,
    player: playerReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
