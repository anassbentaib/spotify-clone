import axios from "axios";

const baseUrl = "https://api.spotify.com/v1/me";

export const getUserInfo = (token: string) =>
  axios
    .get(`${baseUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error in getUserInfo:", error);
      throw error;
    });

export const fetchAllTracks = (token: string) =>
  axios
    .get(`${baseUrl}/tracks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error in fetchAllTracks:", error);
      throw error;
    });

export const fetchPlaylists = (token: string) =>
  axios
    .get(`${baseUrl}/playlists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error in fetchAllTracks:", error);
      throw error;
    });
export const fetchPlaylistById = (token: string, id: string) =>
  axios
    .get(`${baseUrl}/playlists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error in fetchPlaylistsById:", error);
      throw error;
    });

export const fetchPlaylistByUserId = (token: string, id: string) =>
  axios
    .get(`${baseUrl}/users/${id}/playlists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error in fetchPlaylistsById:", error);
      throw error;
    });
export const fetchTracksById = (token: string, id: string) =>
  axios
    .get(`${baseUrl}/playlists/${id}/tracks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error in fetchPlaylistsById:", error);
      throw error;
    });

export const fetchArtists = (token: string) =>
  axios
    .get(`${baseUrl}/following?type=artist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // console.log("All Artists Response:", response);
      return response;
    })
    .catch((error) => {
      console.error("Error in fetchAllAriss:", error);
      throw error;
    });

export const getAllAlbums = (token: string) =>
  axios
    .get(`${baseUrl}/albums`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // console.log("All albums Response:", response);
      return response;
    })
    .catch((error) => {
      console.error("Error in getAlbums:", error);
      throw error;
    });
