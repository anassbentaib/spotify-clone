import { Image } from "@chakra-ui/react";
import Button from "../Button/Button";
import { FaSpotify, FaFacebook, FaApple } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link } from "@chakra-ui/react";
const Authentification = () => {
  const handleLogin = () => {
    try {
      const clientId = import.meta.env.VITE_REACT_APP_CLIENT_ID;
      const redirectUri =
        import.meta.env.VITE_REACT_APP_REDIRECT_URI ||
        "http://localhost:5173/callback";
      const appUrl =
        import.meta.env.VITE_REACT_APP_APP_URL ||
        "https://accounts.spotify.com/authorize";

      const scopes = [
        "user-read-private",
        "user-modify-playback-state",
        "user-read-email",
        "user-read-playback-state",
        "user-read-currently-playing",
        "user-follow-modify",
        "user-follow-read",
        "user-read-playback-position",
        "user-top-read",
        "user-read-recently-played",
        "user-library-read",
        "user-library-modify",
      ];

      window.location.href = `${appUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
        "%20"
      )}&response_type=token&show_dialog=true`;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative w-full mx-auto bg-gradient-to-b from-[#242424] to-[#000] min-h-[100vh] ">
      <div>
        <div className="h-[100px] bg-[#000] w-full p-8 lg:mb-[30px] xl:mb-[30px] md:mb-[30px] sm:mb-0  ">
          <Link href="/">
            <Image
              cursor="pointer"
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
              h="32px"
            />
          </Link>
        </div>
      </div>
      <div className="w-full mx-auto   max-w-[900px] lg:max-w-[730px] min-h-[80vh] md:max-w-[500px] sm:max-w-[100%] bg-[#000] px-10 rounded-[7px]">
        <div className=" justify-center">
          <div className="pt-20  mx-auto text-center max-w-[400px]">
            <h5 className="xl:text-[2.1rem] lg:text-[2.1rem] md:text-[2rem] sm:text-[1.9rem] font-[700] text-white pb-8">
              Log in to Spotify
            </h5>
            <div className="flex justify-center items-center">
              <Button
                icon={FcGoogle}
                border
                onClick={handleLogin}
                label="Continue with Google"
              />
            </div>
            <div className="flex justify-center items-center mt-[13px]">
              <Button
                icon={FaFacebook}
                border
                onClick={handleLogin}
                label="Continue with Facebook"
              />
            </div>
            <div className="flex justify-center items-center mt-[13px]">
              <Button
                icon={FaApple}
                border
                onClick={handleLogin}
                label="Continue with Apple"
              />
            </div>
            <div className="flex justify-center items-center mt-[13px]">
              <Button
                icon={FaSpotify}
                onClick={handleLogin}
                label="Continue with Spotify"
              />
            </div>
          </div>
        </div>
        <div className="mt-10 flex items-center text-center justify-center text-[#a7a7a7] pb-10 text-[12px]">
          <p>
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Authentification;
