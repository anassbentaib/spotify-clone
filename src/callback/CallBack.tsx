import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CallBack = () => {
  const location = useLocation();
  const history = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    const state = params.get("state");
    const storedState = localStorage.getItem("spotify_token");

    if (state === storedState) {
      if (code) {
        history("/");
      } else {
        console.error("Authorization code not found in the URL");
      }
    } else {
      console.error("State mismatch - possible CSRF attack");
    }
  }, [location, history]);

  return <div>Loading...</div>;
};

export default CallBack;
