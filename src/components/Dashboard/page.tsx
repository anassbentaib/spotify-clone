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
