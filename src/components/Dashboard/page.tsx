import { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import MainPage from "./MainPage";
import { getCurrentUser } from "@/actions/getCurrectUser";
import { useSelector } from "react-redux";
import { RootState } from "@/types";
import { Footer } from "..";
const Dashboard = () => {
  const { user } = getCurrentUser();
  const playlists = useSelector((state: RootState) => state?.playlists?.items);

  useEffect(() => {
    const hash = window.location.hash
      .substring(1)
      .split("&")
      .reduce<{ [key: string]: string }>((acc, pair) => {
        const [key, value] = pair.split("=");
        acc[key] = value;
        return acc;
      }, {});

    const token = hash.access_token;
    if (!token) {
      console.error("Access token not found in hash:", hash);
      return;
    }
    const tokenObject = {
      access_token: token,
      token_type: hash.token_type,
      expires_in: hash.expires_in,
    };

    localStorage.setItem("spotify_token", JSON.stringify(tokenObject));
  }, [history]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="w-full relative mx-auto">
      <div className="">
        <div className="bg-[#000]  grid grid-cols-7 ">
          <div className="col-span-2 bg-[#000]  p-2 overflow-y-auto">
            <Sidebar currentUser={user} playlists={playlists} />
          </div>
          <div className="col-span-5 overflow-y-auto">
            <div className="pt-2 text-white">
              <MainPage currentUser={user} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
