const tokenString = localStorage.getItem("spotify_token");
export const token = tokenString ? JSON.parse(tokenString) : null;
